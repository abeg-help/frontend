import { DatePicker, Select } from "@/components/ui";
import type { Campaign } from "@/interfaces/Campaign";
import { cn, zodValidator } from "@/lib";
import { callApi } from "@/lib/helpers/campaign";
import { useWatchFormStatus } from "@/lib/hooks";
import { useFormStore } from "@/store";
import type { StepTwoData } from "@/store/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Heading from "../../common/Heading";
import FormErrorMessage from "../FormErrorMessage";

function StepTwo() {
	const {
		currentStep,
		campaignId,
		formStepData,
		actions: { goToStep, updateFormData, updateCampaignId },
	} = useFormStore((state) => state);

	const { control, formState, reset, getValues, register, handleSubmit } =
		useForm({
			mode: "onChange",
			resolver: zodResolver(zodValidator("campaignStepTwo")!),
			defaultValues: formStepData,
		});

	useEffect(() => {
		if (!getValues().categoryId) {
			reset(formStepData);
		}
	}, [formStepData]);

	useWatchFormStatus(formState);

	const onSubmit = async (data: StepTwoData) => {
		updateFormData(data);

		const { data: dataInfo, error } = await callApi<Partial<Campaign>>(
			`/campaign/create/two`,
			{
				...data,
				campaignId,
			}
		);

		if (error) {
			toast.error(error.status, {
				description: error.message,
			});

			return;
		}

		if (!dataInfo.data) return;

		updateCampaignId(dataInfo.data._id);
		goToStep(3);
	};

	return (
		<section className="w-full">
			<Heading as="h1" className="text-abeg-primary">
				Share your funding goal and deadline
			</Heading>

			<form
				id={`${currentStep}`}
				className="mt-8"
				onSubmit={(event) => {
					event.preventDefault();
					void handleSubmit(onSubmit)(event);
				}}
			>
				<ol className="flex flex-col gap-6">
					<li>
						<label htmlFor="title" className="text-sm font-semibold lg:text-xl">
							Campaign Title
						</label>

						<input
							{...register("title")}
							id="title"
							type="text"
							placeholder="Give your campaign a catchy title that can resonate with donors"
							className={cn(
								"mt-4 w-full rounded-[10px] border border-unfocused px-2 py-4 text-xs focus-visible:outline-abeg-primary lg:p-4  lg:text-base",

								formState.errors.title &&
									"border-abeg-error-20 focus-visible:outline-abeg-error-20"
							)}
						/>

						<FormErrorMessage formState={formState} errorField="title" />
					</li>

					<li>
						<label
							htmlFor="fundraiser"
							className="text-sm font-semibold lg:text-xl"
						>
							Who is fundraising?
						</label>

						<Controller
							control={control}
							name="fundraiser"
							render={({ field }) => (
								<Select.Root
									defaultValue={field.value}
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}
								>
									<Select.Trigger
										icon={<ChevronDownIcon />}
										className="mt-4 h-[50px] rounded-[10px] border-unfocused px-2 text-xs data-[placeholder]:text-placeholder lg:h-[58px] lg:px-4 lg:text-base"
									>
										<Select.Value placeholder="Specify who is fundraising" />
									</Select.Trigger>

									<Select.Content id="category">
										<Select.Item value="INDIVIDUAL" className="lg:text-base">
											For Myself
										</Select.Item>
										<Select.Item value="BENEFICIARY" className="lg:text-base">
											For Someone else
										</Select.Item>
									</Select.Content>
								</Select.Root>
							)}
						/>

						<FormErrorMessage formState={formState} errorField="fundraiser" />
					</li>

					<li>
						<label htmlFor="goal" className="text-sm font-semibold lg:text-xl">
							Campaign Goal
						</label>

						<input
							{...register("goal")}
							id="goal"
							type="number"
							placeholder="Set a realistic target amount"
							className={cn(
								"mt-4 w-full rounded-[10px] border border-unfocused px-2 py-4 text-xs focus-visible:outline-abeg-primary lg:p-4  lg:text-base",

								formState.errors.goal &&
									"border-abeg-error-20 focus-visible:outline-abeg-error-20"
							)}
						/>

						<FormErrorMessage formState={formState} errorField="goal" />
					</li>

					<li>
						<label
							htmlFor="deadline"
							className="text-sm font-semibold lg:text-xl"
						>
							Campaign Deadline
						</label>

						<Controller
							control={control}
							name="deadline"
							render={({ field }) => (
								<DatePicker
									className="mt-4 h-[50px] w-full justify-between rounded-[10px] border border-unfocused px-2 text-xs lg:h-[58px] lg:px-4 lg:text-base"
									placeholder="Specify the end date for your campaign"
									dateValueString={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<FormErrorMessage formState={formState} errorField="deadline" />
					</li>
				</ol>
			</form>
		</section>
	);
}

export default StepTwo;
