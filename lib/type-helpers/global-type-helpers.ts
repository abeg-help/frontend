export type ForwardedRefType<
	TComponent extends React.ElementType | HTMLElement,
> = TComponent extends React.ElementType
	? React.ForwardedRef<React.ElementRef<TComponent>>
	: React.ForwardedRef<TComponent>;

export type InferProps<TComponent extends React.ElementType | HTMLElement> =
	TComponent extends React.ElementType
		? React.ComponentPropsWithoutRef<TComponent>
		: React.HTMLAttributes<TComponent>;

export type CallbackFn<TParams, TResult = void> = (
	...params: TParams[]
) => TResult;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

// == The intersection with "{}" or "unknown" or "NonNullable<unknown>"
// == is necessary to make it work as expected due to quirks in the TS compiler
export type Prettify<TObject> = {
	[key in keyof TObject]: TObject[key];
} & NonNullable<unknown>;

export type PrettyOmit<TObject, K extends keyof TObject> = Prettify<
	Omit<TObject, K>
>;
