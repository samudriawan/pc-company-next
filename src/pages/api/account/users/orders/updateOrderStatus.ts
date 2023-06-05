import dbConnect from '@/mongodb/dbConnect';
import User from '@/mongodb/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseJson = {
	status: number;
	responseJson: {
		success: boolean;
		error: string | null;
		data: string | null;
	};
};

export default async function updateOrderStatusHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return res.status(405).end();

	const { body } = req;

	if (!body || Object.keys(body).length === 0)
		return res.status(400).json({
			success: false,
			error: 'Orders status data is missing.',
			data: null,
		});

	if (body.changedStatus === body.currentStatus)
		return res.status(400).json({
			success: false,
			error:
				'No order status changes, current status and changed status from request is the same.',
			data: null,
		});

	try {
		await dbConnect();

		const doc = await User.findOne({
			_id: body.userId,
		});
		// .select('orders -_id');

		let isChangeStatusSuccess: boolean = true;
		let responseData: ResponseJson = {
			status: 200,
			responseJson: {
				success: true,
				error: null,
				data: 'Order status successfully updated.',
			},
		};

		const userStatus: string = doc.orders.find(
			(x) => x.orderId === body.orderId
		).status;

		if (userStatus === body.changedStatus)
			return res.status(400).json({
				success: false,
				error:
					'No order status changes, status from request changed status is equal to status from database.',
				data: null,
			});

		if (userStatus === 'COMPLETED')
			return res.status(400).json({
				success: false,
				error: 'order status has already COMPLETED.',
				data: null,
			});

		switch (body.changedStatus) {
			case 'PAID':
				responseData.status = 400;
				responseData.responseJson = {
					success: false,
					error: 'Order status already PAID.',
					data: null,
				};
				isChangeStatusSuccess = false;
				break;
			case 'PROCESSING':
				if (userStatus !== 'PAID') {
					responseData.status = 400;
					responseData.responseJson = {
						success: false,
						error: 'Order status can not go back.',
						data: null,
					};
					isChangeStatusSuccess = false;
				}
				break;
			case 'SHIPPED':
				if (userStatus === 'DELIVERED' || userStatus === 'COMPLETED') {
					responseData.status = 400;
					responseData.responseJson = {
						success: false,
						error: 'Order status can not go back.',
						data: null,
					};
					isChangeStatusSuccess = false;
				}
				break;
			case 'DELIVERED':
				if (userStatus === 'COMPLETED') {
					responseData.status = 400;
					responseData.responseJson = {
						success: false,
						error: 'Order status can not go back.',
						data: null,
					};
					isChangeStatusSuccess = false;
				}
				break;
			default:
				responseData.status = 400;
				responseData.responseJson = {
					success: false,
					error: 'Order status is invalid.',
					data: null,
				};
				isChangeStatusSuccess = false;
				break;
		}

		if (isChangeStatusSuccess) {
			const result = await User.updateOne(
				{
					_id: body.userId,
				},
				{
					$set: { 'orders.$[b].status': body.changedStatus },
					$push: {
						'orders.$[a].statusLogs': {
							status: body.changedStatus,
							updatedTime: new Date().toISOString(),
						},
					},
				},
				{
					upsert: true,
					new: true,
					arrayFilters: [
						{ 'a.orderId': body.orderId },
						{ 'b.orderId': body.orderId },
					],
				}
			);

			if (!result.modifiedCount)
				return res.status(400).json({
					success: false,
					error: 'Orders status failed.',
					data: null,
				});
		}

		res.status(responseData.status).json(responseData.responseJson);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ success: false, error: err, data: null });
	}
}
