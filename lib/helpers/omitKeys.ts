import type { Prettify, Writeable } from "../type-helpers";

type PrettifyOmitResult<
	TObject extends Record<string, unknown>,
	TOmitArray extends Array<keyof TObject>,
> = Prettify<Writeable<Omit<TObject, TOmitArray[number]>>>;

export const omitKeys = <
	const TObject extends Record<string, unknown>,
	const TOmitArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const arrayFromFilteredObject = Object.entries(initialObject).filter(
		([key]) => !keysToOmit.includes(key)
	);

	const updatedObject = Object.fromEntries(arrayFromFilteredObject);

	return updatedObject as PrettifyOmitResult<TObject, TOmitArray>;
};
