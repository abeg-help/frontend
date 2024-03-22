import { cn } from "@/lib";
import { Button } from "../ui";

type BaseProps = {
	targetForm?: string;
	asChild?: boolean;
	type: "button" | "submit";
	variant?: "primary" | "secondary" | "danger";
	className?: string;
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: () => void;
};

type FormActionButtonProps =
	| (BaseProps & {
			text: string;
	  })
	| (BaseProps & {
			children: React.ReactNode;
	  });

function FormActionButton(props: FormActionButtonProps) {
	const {
		targetForm,
		asChild,
		variant = "primary",
		className,
		type,
		isLoading = false,
		disabled = false,
		onClick,
		...restOfProps
	} = props;

	return (
		<Button
			asChild={asChild}
			form={targetForm}
			type={type}
			variant={variant}
			className={cn(
				"rounded-md px-3 py-2 text-center text-xs font-semibold max-md:h-9 lg:rounded-lg lg:px-6 lg:py-4 lg:text-base lg:font-bold",
				disabled && "cursor-not-allowed bg-unfocused",
				className
			)}
			onClick={onClick}
			loading={isLoading}
			disabled={disabled}
		>
			{"children" in restOfProps ? restOfProps.children : restOfProps.text}
		</Button>
	);
}

export default FormActionButton;
