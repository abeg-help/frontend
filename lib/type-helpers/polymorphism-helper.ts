export type AsProp<TElement extends React.ElementType = React.ElementType> = {
	as?: TElement;
};

export type RequiredAsProp<
	TElement extends React.ElementType = React.ElementType,
> = Required<AsProp<TElement>>;

type RefProp<TElement extends React.ElementType> = {
	ref?: React.ComponentPropsWithRef<TElement>["ref"];
};

type MergePropsWithAsProp<TElement extends React.ElementType, TProps> = TProps &
	AsProp<TElement>;

// == Get all other primitive element props by Omitting the result of MergedProps from React.ComponentPropsWithoutRef
type InferPrimitiveProps<TElement extends React.ElementType, TProps> = Omit<
	React.ComponentPropsWithoutRef<TElement>,
	keyof MergePropsWithAsProp<TElement, TProps> | "className" | "children" // == Removing children and className props to give components control over these props
>;

// == Polymorphic props helper
export type PolymorphicProps<
	TElement extends React.ElementType,
	TProps extends Record<string, unknown> = AsProp<TElement>,
> = MergePropsWithAsProp<TElement, TProps> &
	InferPrimitiveProps<TElement, TProps>;

// == For Components with Ref Prop
export type PolymorphicPropsWithRef<
	TElement extends React.ElementType,
	TProps extends Record<string, unknown> = AsProp<TElement>,
> = PolymorphicProps<TElement, TProps> & RefProp<TElement>;
