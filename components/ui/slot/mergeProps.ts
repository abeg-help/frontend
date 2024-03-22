import { isObject } from "@/lib/type-helpers/typeof";

export type UnknownProps = Record<string, unknown>;

const mergeProps = (slotProps: UnknownProps, childProps: UnknownProps) => {
	// all child props should override slotProps
	const overrideProps = { ...childProps };

	for (const propName of Object.keys(slotProps)) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];

		// if it's `style`, we merge them
		if (
			propName === "style" &&
			isObject(slotPropValue) &&
			isObject(childPropValue)
		) {
			overrideProps[propName] = { ...slotPropValue, ...childPropValue };
		}

		if (propName === "className") {
			overrideProps[propName] = [slotPropValue, childPropValue]
				.filter(Boolean)
				.join(" ");
		}

		const isHandler = /^on[A-Z]/.test(propName);

		if (!isHandler) continue;

		// if the handler exists on both, we compose them
		if (
			typeof slotPropValue === "function" &&
			typeof childPropValue === "function"
		) {
			overrideProps[propName] = (...args: unknown[]) => {
				childPropValue(...args);
				slotPropValue(...args);
			};
		}

		// but if it exists only on the slot, we use only that one
		if (typeof slotPropValue === "function") {
			overrideProps[propName] = slotPropValue;
		}
	}

	return { ...slotProps, ...overrideProps };
};

export { mergeProps };
