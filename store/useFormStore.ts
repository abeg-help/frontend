import type { Campaign, Image } from "@/interfaces/Campaign";
import type { Prettify } from "@/lib/type-helpers";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "./store-types";
import { useInitCampaignStore } from "./useCampaignStore";

export type StepOneData = Prettify<
	Pick<Campaign, "country" | "tags"> & {
		categoryId: string;
	}
>;

export type StepTwoData = Prettify<
	Pick<Campaign, "title" | "goal" | "deadline" | "fundraiser">
>;

export type StepThreeData = Prettify<
	Pick<Campaign, "story" | "storyHtml"> & {
		photos: Array<File | Image["secureUrl"]>;
	}
>;

export type FormStore = {
	formStatus: {
		isValid: boolean;
		isSubmitting: boolean;
	};

	currentStep: Campaign["currentStep"];

	campaignId: Campaign["_id"];

	formStepData: Prettify<StepOneData & StepTwoData & StepThreeData>;

	actions: {
		goToStep: (newStep: number) => void;

		updateCampaignId: (
			updatedId: Partial<FormStore["campaignId"]> | undefined
		) => void;

		updateFormStatus: (
			updatedFormStatus: Partial<FormStore["formStatus"]>
		) => void;

		updateFormData: (
			updatedFormData: Partial<FormStore["formStepData"]>
		) => void;

		resetFormData: () => void;

		initializeFormData: () => void;
	};
};

export const initialFormState = {
	currentStep: 1,

	formStatus: {
		isValid: true,
		isSubmitting: false,
	},

	campaignId: "",

	formStepData: {
		categoryId: "",
		country: "" as Campaign["country"],
		tags: [],
		title: "",
		fundraiser: "" as Campaign["fundraiser"],
		goal: 0,
		deadline: "",
		photos: [],
		storyHtml: "",
		story: "",
	},
} satisfies Omit<FormStore, "actions">;

export const useInitFormStore = create<FormStore>()((set, get) => ({
	...initialFormState,

	actions: {
		goToStep: (newStep) => {
			if (newStep < 1 || newStep > 3) return;

			set({ currentStep: newStep as FormStore["currentStep"] });
		},

		updateFormStatus: (newFormStatus) => {
			const { formStatus: previousFormStatus } = get();

			set({ formStatus: { ...previousFormStatus, ...newFormStatus } });
		},

		updateCampaignId: (updatedId) => {
			if (!updatedId || updatedId === get().campaignId) return;

			set({ campaignId: updatedId });
		},

		updateFormData: (updatedFormData) => {
			const { formStepData } = get();

			set({ formStepData: { ...formStepData, ...updatedFormData } });
		},

		resetFormData: () => set({ formStepData: initialFormState.formStepData }),

		initializeFormData: () => {
			const { campaigns } = useInitCampaignStore.getState();

			if (campaigns.length === 0) return;

			const { 0: currentCampaign } = campaigns;

			if (currentCampaign.status !== "Draft") return;

			set({
				currentStep: currentCampaign.currentStep,

				campaignId: currentCampaign._id,

				formStepData: {
					categoryId: currentCampaign.category?._id ?? "",
					country: currentCampaign.country,
					tags: currentCampaign.tags,
					title: currentCampaign.title,
					deadline: currentCampaign.deadline,
					fundraiser: currentCampaign.fundraiser,
					goal: currentCampaign.goal,
					story: currentCampaign.story,
					storyHtml: currentCampaign.storyHtml,
					photos: currentCampaign.images.map((image) => image.secureUrl),
				},
			});
		},
	} satisfies FormStore["actions"],
}));

export const useFormStore = <TResult>(
	selector: SelectorFn<FormStore, TResult>
) => {
	const state = useInitFormStore(useShallow(selector));

	return state;
};
