import type { ForwardedRefType } from "@/lib/type-helpers/global-type-helpers";
import { Children, cloneElement, forwardRef, isValidElement } from "react";
import SlotClone from "./slot-clone";

type SlotProps = {
	children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

export function Slottable({ children }: Pick<SlotProps, "children">) {
	return <>{children}</>;
}

const isSlottable = (child: React.ReactNode): child is React.ReactElement => {
	return isValidElement(child) && child.type === Slottable;
};

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/

type ReactElementWithChildren = { props: { children: React.ReactNode } };

function Slot(props: SlotProps, forwardedRef: ForwardedRefType<HTMLElement>) {
	const { children, ...restOfSlotProps } = props;

	const childrenArray = Children.toArray(children);
	const slottable = childrenArray.find((child) => isSlottable(child));

	if (slottable) {
		// == The new element to render is the one passed as a child of `Slottable`
		const newElement = (slottable as ReactElementWithChildren).props.children;

		const newChildren = childrenArray.map((child) => {
			if (child !== slottable) {
				return child;
			}

			if (Children.count(newElement) > 1) {
				return Children.only(null);
			}

			// == Because the new element will be the one rendered, we are only interested in grabbing its children (`newElement.props.children`)
			return isValidElement(newElement)
				? (newElement as ReactElementWithChildren).props.children
				: null;
		});

		return (
			<SlotClone {...restOfSlotProps} ref={forwardedRef}>
				{isValidElement(newElement)
					? cloneElement(newElement, undefined, newChildren)
					: null}
			</SlotClone>
		);
	}

	return (
		<SlotClone {...restOfSlotProps} ref={forwardedRef}>
			{children}
		</SlotClone>
	);
}

export default forwardRef(Slot);
