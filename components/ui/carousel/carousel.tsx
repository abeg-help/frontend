import { cn } from "@/lib";
import { useBaseElementList } from "@/lib/hooks";
import type { PolymorphicProps } from "@/lib/type-helpers";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";
import type {
	CarouselButtonsProps,
	CarouselContentProps,
	CarouselControlProps,
	CarouselIndicatorProps,
	CarouselIndicatorWrapperProps,
	CarouselItemWrapperProps,
	OtherCarouselProps,
} from "./carousel.types";
import {
	CarouselContextProvider,
	useCarouselStore,
} from "./carouselStoreContext";
import { useCarouselOptions } from "./useCarouselOptions";

// TODO -  Add dragging and swiping support

function CarouselContent<TElement extends React.ElementType = "article">(
	props: PolymorphicProps<TElement, CarouselContentProps>
) {
	const {
		as: HtmlElement = "article",
		children,
		classNames = {},
		hasAutoSlide,
		autoSlideInterval,
		shouldPauseOnHover,
	} = props;

	const { pauseAutoSlide, resumeAutoSlide } = useCarouselOptions({
		hasAutoSlide,
		autoSlideInterval,
		shouldPauseOnHover,
	});

	return (
		<HtmlElement
			data-id="Carousel"
			className={cn("relative w-full touch-none select-none", classNames.base)}
			onMouseEnter={pauseAutoSlide}
			onMouseLeave={resumeAutoSlide}
		>
			<div
				data-id="Scroll Container"
				className={cn(
					"flex size-full touch-none snap-x snap-mandatory overflow-x-scroll scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					classNames.scrollContainer
				)}
			>
				{children}
			</div>
		</HtmlElement>
	);
}

function CarouselButton(props: CarouselButtonsProps) {
	const { type, icon, classNames = {} } = props;

	const nextOrPreviousSlide = useCarouselStore((state) =>
		type === "prev" ? state.actions.previousSlide : state.actions.nextSlide
	);

	const DefaultIcon =
		type === "prev" ? ChevronLeftCircleIcon : ChevronRightCircleIcon;

	return (
		<button
			className={cn(
				"z-[30] flex h-full w-[15%] items-center",
				type === "prev" ? "justify-start" : "justify-end",
				classNames.base
			)}
			onClick={nextOrPreviousSlide}
		>
			<span
				className={cn(
					"transition-transform active:scale-[1.06]",
					classNames.iconContainer
				)}
			>
				{icon ?? <DefaultIcon className={classNames.defaultIcon} />}
			</span>
		</button>
	);
}

function CarouselControls(props: CarouselControlProps) {
	const { classNames, icons } = props;

	return (
		<div
			className={cn("absolute inset-0 flex justify-between", classNames?.base)}
		>
			<CarouselButton
				type="prev"
				classNames={{
					defaultIcon: classNames?.defaultIcons,
					iconContainer: classNames?.iconsContainer,
				}}
				icon={icons?.prev}
			/>

			<CarouselButton
				type="next"
				classNames={{
					defaultIcon: classNames?.defaultIcons,
					iconContainer: classNames?.iconsContainer,
				}}
				icon={icons?.next}
			/>
		</div>
	);
}

function CarouselItemWrapper<TArrayItem>(
	props: CarouselItemWrapperProps<TArrayItem>
) {
	const { each, children, render, className } = props;

	const [ItemList] = useBaseElementList();
	const currentSlide = useCarouselStore((state) => state.currentSlide);
	const images = useCarouselStore(
		(state) => each ?? (state.images as TArrayItem[])
	);

	return (
		<ul
			data-id="Carousel Image Wrapper"
			className={cn(
				"flex w-full shrink-0 [transition:transform_800ms_ease]",
				className
			)}
			style={{
				transform: `translate3d(-${currentSlide * 100}%, 0, 0)`,
			}}
		>
			{typeof render === "function" ? (
				<ItemList each={images} render={render} />
			) : (
				<ItemList each={images}>{children}</ItemList>
			)}
		</ul>
	);
}

function CarouselItem({
	children,
	className,
	...restOfProps
}: OtherCarouselProps) {
	return (
		<li
			className={cn(
				"flex w-full shrink-0 snap-center justify-center",
				className
			)}
			{...restOfProps}
		>
			{children}
		</li>
	);
}

function CarouselCaption<TElement extends React.ElementType = "div">(
	props: PolymorphicProps<TElement, OtherCarouselProps>
) {
	const { as: HtmlElement = "div", children, className } = props;

	return (
		<HtmlElement
			data-id="Carousel Caption"
			className={cn("absolute z-[10]", className)}
		>
			{children}
		</HtmlElement>
	);
}

function CarouselIndicatorWrapper<TArrayItem>(
	props: CarouselIndicatorWrapperProps<TArrayItem>
) {
	const { each, children, render, classNames = {} } = props;

	const images = useCarouselStore(
		(state) => each ?? (state.images as TArrayItem[])
	);
	const [IndicatorList] = useBaseElementList();

	return (
		<div
			data-id="Carousel Indicators"
			className={cn(
				"absolute top-[-25px] z-[20] flex w-full justify-center",
				classNames.base
			)}
		>
			<ul
				className={cn(
					"flex items-center justify-center gap-4",
					classNames.indicatorContainer
				)}
			>
				{typeof render === "function" ? (
					<IndicatorList each={images} render={render} />
				) : (
					<IndicatorList each={images}>{children}</IndicatorList>
				)}
			</ul>
		</div>
	);
}

function CarouselIndicator(props: CarouselIndicatorProps) {
	const { classNames = {}, currentIndex } = props;

	const {
		currentSlide,
		actions: { goToSlide },
	} = useCarouselStore((state) => state);

	return (
		<li>
			<button
				onClick={() => goToSlide(currentIndex)}
				className={cn(
					"size-[6px] shrink-0 cursor-pointer ease-in-out",
					classNames.base,
					currentIndex === currentSlide && ["w-[20px]", classNames.onActive]
				)}
			/>
		</li>
	);
}

const Carousel = {
	Root: CarouselContextProvider,
	Content: CarouselContent,
	Controls: CarouselControls,
	Item: CarouselItem,
	ItemWrapper: CarouselItemWrapper,
	Caption: CarouselCaption,
	Indicator: CarouselIndicator,
	IndicatorWrapper: CarouselIndicatorWrapper,
};

export default Carousel;
