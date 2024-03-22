export type PossibleRef<TRef> = React.Ref<TRef> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
const setRef = <TRef>(ref: PossibleRef<TRef>, value: TRef) => {
	if (ref == null) return;

	if (typeof ref === "function") {
		ref(value);

		return;
	}

	// eslint-disable-next-line no-param-reassign
	(ref as React.MutableRefObject<TRef>).current = value;
};

/**
 * A utility to compose refs together
 * Accepts callback refs and RefObject(s)
 */
const composeRefs = <TRef>(...refs: Array<PossibleRef<TRef>>) => {
	const setNode = (node: TRef) => refs.forEach((ref) => setRef(ref, node));

	return setNode;
};

export { composeRefs };
