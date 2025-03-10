import {useEffect, useState} from 'react';

type BaseResult = {
	name: string;
	url: string;
};

type Endpoint<T extends BaseResult> = {
	count: number | null;
	next: string | null;
	previous: string | null;
	results: T[];
};

export default function useFetch<T extends BaseResult, U>(
	url: string,
	isType: (data: unknown) => data is U,
) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<U[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(url);
				const endpointData = (await response.json()) as Endpoint<T>;

				if (!endpointData.results) {
					throw new Error('No data found');
				}

				const fetchedData = await Promise.all(
					endpointData.results.map(async (object) => {
						const fetchedResponse = await fetch(object.url);
						const json = await fetchedResponse.json();

						if (isType(json)) {
							return json;
						}

						throw new Error('Unexpected data structure');
					}),
				);

				setData(fetchedData);
			} catch (error) {
				setError((error as Error).message);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			}
		};

		fetchData();
	}, [url]);

	return {loading, data, error};
}