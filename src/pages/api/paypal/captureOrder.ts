import dbConnect from '@/mongodb/dbConnect';
import Product from '@/mongodb/models/Product';
import User from '@/mongodb/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function captureOrderHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return res.status(405).end();

	if (!req.body || Object.keys(req.body).length === 0)
		return res.status(400).json({
			success: false,
			error: 'Orders data is missing.',
			data: null,
		});

	const { orders, userEmail } = req.body;

	try {
		await dbConnect();

		const findProduct = await Product.find(
			{
				name: {
					$in: orders.items.map((order: any) => order.name),
				},
			},
			{
				name: 1,
				stock: 1,
			}
		);

		if (orders.items.length !== findProduct.length)
			return res.status(400).json({
				success: false,
				error: 'Some products are not found in the database.',
				data: null,
			});

		// check if stock is greater or equal than orders
		let subtractStock: number[] = [];

		for (let i = 0; i < findProduct.length; i++) {
			for (let j = 0; j < orders.items.length; j++) {
				if (orders.items[j].name === findProduct[i].name) {
					subtractStock.push(findProduct[i].stock - orders.items[j].quantity);
				}
			}
		}

		if (!subtractStock.every((stock) => stock >= 0))
			return res.status(400).json({
				success: false,
				error: 'Some products stock are less than orders.',
				data: null,
			});

		const updatedStock = orders.items.map(async (order: any) => {
			const result = await Product.updateOne(
				{
					name: order.name,
					stock: { $gt: 0 },
				},
				[
					{
						$set: { stock: { $subtract: ['$stock', order.quantity] } },
					},
					{
						$set: { stock: { $cond: [{ $lt: ['$stock', 0] }, 0, '$stock'] } },
					},
				]
			);
			return result;
		});

		Promise.all(updatedStock).then((result) => {
			console.log('updated: ', result);
			if (!result.every((item: any) => item.modifiedCount > 0)) {
				return res.status(400).json({
					success: false,
					error: 'Some product stock failed to update.',
					data: null,
				});
			}
		});

		// Add orders detail to User
		const userUpdateResult = await User.updateOne(
			{
				email: userEmail,
			},
			{ $push: { orders: orders } },
			{ upsert: true, new: true }
		);

		if (!userUpdateResult.modifiedCount)
			return res.status(400).json({
				success: false,
				error: 'Update user failed.',
				data: null,
			});

		res.status(200).json({
			success: true,
			error: null,
			data: 'Order checkout success.',
		});
	} catch (err) {
		return res.status(500).json({ success: false, error: err, data: null });
	}
}
