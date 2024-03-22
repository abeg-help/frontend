import { cn } from "@/lib";
import type { ForwardedRefType } from "@/lib/type-helpers";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { Slot } from "./slot";

type ButtonProps = {
	asChild?: boolean;
	className?: string;
	fullWidth?: boolean;
	children: React.ReactNode;
	loading?: boolean;
	usage?: "auth";
	size?: "sm" | "base" | "lg";
	variant?: "primary" | "secondary" | "danger" | "regular";
} & React.ComponentPropsWithRef<"button">;

const ButtonUI = (
	props: ButtonProps,
	ref: ForwardedRefType<HTMLButtonElement>
) => {
	const {
		asChild,
		className,
		children,
		fullWidth,
		variant,
		usage,
		size,
		loading = false,
		...restOfProps
	} = props;

	const buttonClass = {
		"bg-abeg-error-20": variant === "danger",
		"border-abeg-primary text-abeg-primary border": variant === "secondary",
		"bg-abeg-primary": variant === "primary",
		"px-3": size === "sm",
		"px-10": size === "lg",
		"md:py-4 md:px-5 text-sm md:text-base": usage === "auth",
		"w-full": fullWidth,
		"bg-transparent p-0 text-abeg-text rounded-none flex items-center justify-center":
			variant === "regular",
	};

	const Element = asChild ? Slot : "button";

	return (
		<Element
			className={cn(
				"rounded-lg px-4 block py-3 text-sm font-medium text-white disabled:bg-abeg-neutral-50",
				buttonClass,
				className
			)}
			ref={ref}
			{...restOfProps}
		>
			{loading ? (
				<div role="status" className="flex items-center justify-center gap-2">
					<svg
						aria-hidden="true"
						className="size-5 animate-spin fill-blue-500 text-gray-200"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span className="sr-only">Loading...</span>
					<span className="">Loading...</span>
				</div>
			) : (
				children
			)}
		</Element>
	);
};

const Button = forwardRef(ButtonUI);

export default Button;

export const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-[4rem] px-4 py-2",
				sm: "h-[3.6rem] rounded-md px-3",
				lg: "h-[4rem] rounded-md px-8",
				icon: "size-[4rem]",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);
