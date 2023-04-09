import { IProduct } from '@/mongodb/models/Product';

export type ResponseData = {
	success: boolean;
	error: string | null;
	data: IProduct[] | null;
};

export const fetcher = (url: string): Promise<ResponseData> =>
	fetch(url).then((res) => res.json());
