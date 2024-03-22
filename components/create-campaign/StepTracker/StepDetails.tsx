import { TickIcon } from "@/components/common/campaign-icons";
import { cn } from "@/lib";
import type { FormStore } from "@/store";
import Heading from "../../common/Heading";

type StepIndicatorProps = {
	step: FormStore["currentStep"];
	disabled?: boolean;
	isCompleted?: boolean;
};

type StepInfoProps = Pick<StepIndicatorProps, "disabled"> & {
	title: string;
	description: string;
};

function StepIndicator(props: StepIndicatorProps) {
	const { step, isCompleted = false, disabled = false } = props;

	const Separator = (
		<hr
			className={cn(
				"my-1 basis-full border border-dashed border-abeg-primary",
				disabled && "border-unfocused"
			)}
		/>
	);

	return (
		<div className={cn(step > 1 && "flex basis-full flex-col items-center")}>
			{step > 1 && Separator}

			<span
				className={cn(
					"grid aspect-square w-5 shrink-0 place-content-center rounded-full bg-abeg-primary font-bold text-white",
					disabled && "bg-unfocused"
				)}
			>
				{isCompleted ? <TickIcon /> : step}
			</span>
		</div>
	);
}

function StepInformation({
	title,
	description,
	disabled = false,
}: StepInfoProps) {
	return (
		<article className={cn("w-full", disabled && "text-unfocused")}>
			<Heading as="h4">{title}</Heading>

			<p>{description}</p>
		</article>
	);
}

export { StepIndicator, StepInformation };
