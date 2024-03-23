export const getResponseData = async <TResponse>(response: Response) => {
	return response.json() as TResponse;
};
