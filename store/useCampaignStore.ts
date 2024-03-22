import type { Campaign } from "@/interfaces/Campaign";
import { callApi } from "@/lib/helpers/campaign";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "./store-types";

type CampaignStore = {
	loading: boolean;
	campaigns: Campaign[];
	categories: Array<{ _id: string; name: string }>;

	actions: {
		addCampaign: (newCampaign: Campaign) => void;
		initializeCampaigns: (campaigns: Campaign[]) => void;
		initializeCategories: () => Promise<void>;
	};
};

const initialState = {
	loading: true,
	campaigns: [],
	categories: [],
} satisfies Omit<CampaignStore, "actions">;

export const useInitCampaignStore = create<CampaignStore>()((set, get) => ({
	...initialState,

	actions: {
		addCampaign: (newCampaign) => {
			const { campaigns: oldCampaigns } = get();

			set({ campaigns: [...oldCampaigns, newCampaign] });
		},

		initializeCampaigns: (campaigns) => set({ campaigns }),

		initializeCategories: async () => {
			const { data, error } = await callApi<CampaignStore["categories"]>(
				"/campaign/categories"
			);

			if (error || !data.data) return;

			set({ categories: data.data });
		},
	} satisfies CampaignStore["actions"],
}));

export const useCampaignStore = <TResult>(
	selector: SelectorFn<CampaignStore, TResult>
) => {
	const state = useInitCampaignStore(useShallow(selector));

	return state;
};
