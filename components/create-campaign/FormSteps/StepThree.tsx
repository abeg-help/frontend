import { Heading } from "@/components/common";
import type { Campaign } from "@/interfaces/Campaign";
import { zodValidator } from "@/lib";
import { callApi } from "@/lib/helpers/campaign";
import { useWatchFormStatus } from "@/lib/hooks";
import { type StepThreeData, useCampaignStore, useFormStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import DropZoneInput from "../DropZoneInput";
import FormErrorMessage from "../FormErrorMessage";
import ImagePreview from "../ImagePreview";
import { TipTapEditor } from "../TipTapEditor";

function StepThree() {
	const router = useRouter();

	const {
		currentStep,
		campaignId,
		formStepData,
		actions: { resetFormData },
	} = useFormStore((state) => state);

	const { addCampaign } = useCampaignStore((state) => state.actions);

	const {
		control,
		handleSubmit,
		formState,
		getValues,
		reset,
		setValue: setFormValue,
	} = useForm({
		mode: "onChange",
		resolver: zodResolver(zodValidator("campaignStepThree")!),
		defaultValues: formStepData,
	});

	useEffect(() => {
		if (!getValues().categoryId) {
			reset(formStepData);
		}
	}, [formStepData]);

	useWatchFormStatus(formState);

	const onSubmit = async (data: StepThreeData) => {
		const formData = new FormData();

		formData.set("story", data.story);
		formData.set("storyHtml", data.storyHtml);
		formData.set("campaignId", campaignId);
		data.photos.forEach((imageFile) => formData.append("photos", imageFile));

		const { data: dataInfo, error } = await callApi<Campaign>(
			`/campaign/create/three`,
			formData
		);

		if (error) {
			toast.error(error.status, {
				description: error.message,
			});

			return;
		}

		if (!dataInfo.data) return;

		resetFormData();

		addCampaign(dataInfo.data);

		toast.success("Success", {
			description: "Campaign created successfully!",
		});

		void router.push({
			pathname: "/c/overview",
			query: { id: dataInfo.data._id },
		});
	};

	return (
		<section className="w-full">
			<Heading as="h1" className="text-abeg-primary">
				Your story matters and this is where it begins.
			</Heading>

			<form
				id={`${currentStep}`}
				className="mt-8 lg:mt-12"
				onSubmit={(event) => {
					event.preventDefault();
					void handleSubmit(onSubmit)(event);
				}}
			>
				<ol className="flex flex-col gap-6">
					<li>
						<label
							htmlFor="photos"
							className="text-sm font-semibold lg:text-xl"
						>
							Campaign Cover Image
						</label>

						<Controller
							control={control}
							name="photos"
							render={({ field }) => (
								<>
									<DropZoneInput
										value={field.value}
										onChange={field.onChange}
									/>

									<FormErrorMessage formState={formState} errorField="photos" />

									<ImagePreview value={field.value} onChange={field.onChange} />
								</>
							)}
						/>
					</li>

					<li>
						<label htmlFor="story" className="text-sm font-semibold lg:text-xl">
							Campaign Story
						</label>

						<p className="my-4 text-xs lg:text-base">
							A detailed description of the campaign, outlining the need for
							funding and how the funds will be used.
						</p>

						<Controller
							control={control}
							name="storyHtml"
							render={({ field }) => (
								<TipTapEditor
									placeholder="Write a compelling story that would arouse the interest of donors..."
									editorContent={field.value}
									setFormValue={setFormValue}
									onChange={field.onChange}
								/>
							)}
						/>

						<FormErrorMessage formState={formState} errorField="story" />
					</li>
				</ol>
			</form>
		</section>
	);
}

export default StepThree;
