import { fetcher, ResponseData } from '@/lib/swrFetch';
import useSWR, { SWRConfiguration } from 'swr';

export default function useProduct(id?: string, config?: SWRConfiguration) {
	const productUrl: string = id ? `/api/product/?id=${id}` : '/api/product';

	const {
		data: resp,
		error,
		isValidating,
		isLoading,
		mutate,
	} = useSWR<ResponseData>(productUrl, {
		...config,
	});

	const data: ResponseData = {
		data: resp ? resp.data : null,
		error: resp ? resp.error : null,
		success: resp ? true : false,
	};

	return { data, error, isValidating, isLoading, mutate };
}
