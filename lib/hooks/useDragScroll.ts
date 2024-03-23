import { useEffect, useRef } from "react";
import { checkIsDeviceMobileOrTablet } from "../helpers/checkIsDeviceMobileOrTablet";
import { useCallbackRef } from "./useCallbackRef";

const updateCursor = <TElement extends HTMLElement>(element: TElement) => {
	element.style.cursor = "grabbing";
	element.style.userSelect = "none";
};

const handleScrollSnap = <TElement extends HTMLElement>(
	element: TElement,
	action: "reset" | "remove"
) => {
	if (action === "remove") {
		element.style.scrollSnapType = "none";
		return;
	}

	element.style.scrollSnapType = "";
};

const resetCursor = <TElement extends HTMLElement>(element: TElement) => {
	element.style.cursor = "";
	element.style.userSelect = "";
};

const useDragScroll = <TElement extends HTMLElement>(options?: {
	hasMobileSupport: boolean;
}) => {
	const { hasMobileSupport = false } = options ?? {};

	const dragContainerRef = useRef<TElement>(null);
	const positionRef = useRef({ top: 0, left: 0, x: 0, y: 0 });

	const handleMouseMove = useCallbackRef<MouseEvent>((event) => {
		if (!dragContainerRef.current) return;

		const dx = event.clientX - positionRef.current.x;
		const dy = event.clientY - positionRef.current.y;

		dragContainerRef.current.scrollTop = positionRef.current.top - dy;
		dragContainerRef.current.scrollLeft = positionRef.current.left - dx;
	});

	const handleMouseUpOrLeave = useCallbackRef<MouseEvent>(() => {
		if (!dragContainerRef.current) return;

		dragContainerRef.current.removeEventListener("mousemove", handleMouseMove);
		dragContainerRef.current.removeEventListener(
			"mouseup",
			handleMouseUpOrLeave
		);
		dragContainerRef.current.removeEventListener(
			"mouseleave",
			handleMouseUpOrLeave
		);

		resetCursor(dragContainerRef.current);
	});

	const onMouseDown = useCallbackRef((event: React.MouseEvent<TElement>) => {
		if (!dragContainerRef.current) return;

		positionRef.current = {
			left: dragContainerRef.current.scrollLeft,
			top: dragContainerRef.current.scrollTop,
			x: event.clientX,
			y: event.clientY,
		};

		updateCursor(dragContainerRef.current);
		dragContainerRef.current.addEventListener("mousemove", handleMouseMove);
		dragContainerRef.current.addEventListener("mouseup", handleMouseUpOrLeave);
		dragContainerRef.current.addEventListener(
			"mouseleave",
			handleMouseUpOrLeave
		);
	});

	const onTouchMove = useCallbackRef((event: TouchEvent) => {
		if (!dragContainerRef.current) return;

		const touch = event.touches[0];

		const dx = touch.clientX - positionRef.current.x;
		const dy = touch.clientY - positionRef.current.y;

		dragContainerRef.current.scrollTop = positionRef.current.top - dy;
		dragContainerRef.current.scrollLeft = positionRef.current.left - dx;
	});

	const onTouchEnd = useCallbackRef<TouchEvent>(() => {
		if (!dragContainerRef.current) return;

		dragContainerRef.current.removeEventListener("touchmove", onTouchMove);
		dragContainerRef.current.removeEventListener("touchend", onTouchEnd);
	});

	const onTouchStart = useCallbackRef<React.TouchEvent<TElement>>((event) => {
		if (!dragContainerRef.current) return;

		const touch = event.touches[0];

		positionRef.current = {
			left: dragContainerRef.current.scrollLeft,
			top: dragContainerRef.current.scrollTop,
			x: touch.clientX,
			y: touch.clientY,
		};

		dragContainerRef.current.addEventListener("touchmove", onTouchMove);
		dragContainerRef.current.addEventListener("touchend", onTouchEnd);
	});

	useEffect(() => {
		const { isMobileOrTablet } = checkIsDeviceMobileOrTablet();

		if (!dragContainerRef.current) return;

		if (!isMobileOrTablet) {
			handleScrollSnap(dragContainerRef.current, "remove");
		} else {
			handleScrollSnap(dragContainerRef.current, "reset");
		}
	}, []);

	const dragScrollProps = {
		ref: dragContainerRef,
		onMouseDown,
		...(hasMobileSupport && { onTouchStart }),
	};

	const dragContainerClasses =
		"w-full flex flex-row cursor-grab overflow-x-scroll [scrollbar-width:none] hide-scrollbar snap-x snap-mandatory" as const;

	const dragItemClasses = "snap-center snap-always" as const;

	return { dragContainerClasses, dragScrollProps, dragItemClasses };
};

export { useDragScroll };
