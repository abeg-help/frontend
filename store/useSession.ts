import type { ApiResponse, User } from "@/interfaces";
import type { SessionData } from "@/interfaces/ApiResponses";
import { callApi } from "@/lib";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "./store-types";
import { useInitCampaignStore } from "./useCampaignStore";

type Session = {
	isFirstMount: boolean;
	loading: boolean;
	user: User | null;

	actions: {
		clearSession: () => void;
		updateUser: (data: User) => void;
		getSession: (isInitialLoad?: boolean) => Promise<void>;
	};
};

const initialState = {
	loading: true,
	user: null,
	isFirstMount: false,
};

export const useInitSession = create<Session>()((set, get) => ({
	...initialState,

	actions: {
		getSession: async (isInitialLoad) => {
			if (typeof isInitialLoad === "boolean") {
				set({ isFirstMount: true });
			}

			const { data } = await callApi<ApiResponse<SessionData>>("/auth/session");
			console.log(data);
			useInitCampaignStore
				.getState()
				.actions.initializeCampaigns(data?.data?.campaigns ?? []);

			set({
				...(data?.data && { user: data.data.user }),
				loading: false,
			});
		},

		updateUser: (data) => set({ user: data }),

		clearSession: () => {
			set((state) => ({
				...initialState,
				loading: false,
				isFirstMount: state.isFirstMount,
			}));

			const currentPageUrl = window.location.pathname;

			if (
				currentPageUrl !== "/signin" &&
				currentPageUrl !== "/signup" &&
				!get().isFirstMount
			) {
				window.location.replace("/signin?unauthorized=true");
			}
		},
	} satisfies Session["actions"],
}));

export const useSession = <TResult>(selector: SelectorFn<Session, TResult>) => {
	const state = useInitSession(useShallow(selector));

	return state;
};
