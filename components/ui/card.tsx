import type { PolymorphicProps } from "@/lib/type-helpers";

type CardProps = {
	className?: string;
	children?: React.ReactNode;
};

function Card<TElement extends React.ElementType = "article">(
	props: PolymorphicProps<TElement, CardProps>
) {
	const { as: Element = "article", children, ...restOfProps } = props;

	return <Element {...restOfProps}>{children}</Element>;
}

function CardHeader<TElement extends React.ElementType = "header">(
	props: PolymorphicProps<TElement, CardProps>
) {
	const { as: Element = "header", children, ...restOfProps } = props;

	return <Element {...restOfProps}>{children}</Element>;
}

function CardContent<TElement extends React.ElementType = "div">(
	props: PolymorphicProps<TElement, CardProps>
) {
	const { as: Element = "div", children, ...restOfProps } = props;

	return <Element {...restOfProps}>{children}</Element>;
}

function CardFooter<TElement extends React.ElementType = "footer">(
	props: PolymorphicProps<TElement, CardProps>
) {
	const { as: Element = "footer", children, ...restOfProps } = props;

	return <Element {...restOfProps}>{children}</Element>;
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
