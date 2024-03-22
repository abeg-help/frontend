import type { ForwardedRefType } from "@/lib/type-helpers/global-type-helpers";
import { Children, cloneElement, forwardRef, isValidElement } from "react";
import { type PossibleRef, composeRefs } from "./composeRefs";
import { type UnknownProps, mergeProps } from "./mergeProps";

type SlotCloneProps = {
	children: React.ReactNode;
};

function SlotClone(
	props: SlotCloneProps,
	forwardedRef: ForwardedRefType<HTMLElement>
) {
	const { children, ...slotProps } = props;

	if (isValidElement(children)) {
		const unknownChildren = children as unknown as UnknownProps;

		const clonedProps = {
			...mergeProps(slotProps, children.props as UnknownProps),
			ref: forwardedRef
				? composeRefs(forwardedRef, unknownChildren.ref as PossibleRef<unknown>)
				: unknownChildren.ref,
		};

		return cloneElement(children, clonedProps);
	}

	return Children.count(children) > 1 ? Children.only(null) : null;
}

export default forwardRef(SlotClone);
