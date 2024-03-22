import {
	Closed,
	Drafts,
	MegaphoneIcon,
	SlashedStar,
	Star,
} from "@/components/common";
import {
	CampaignCardList,
	type CardListProps,
	dummyCardData,
} from "@/components/common/CampaignCard";
import { Button } from "@/components/ui";
import { AuthenticatedUserLayout } from "@/layouts";
import { useReducer } from "react";

const reducer = (
	campaigns: {
		original: CardListProps["cardDetailList"];
		filtered: CardListProps["cardDetailList"];
		state: string;
	},
	action: { status: string }
) => {
	switch (action.status) {
		case "incomplete":
			return {
				...campaigns,
				filtered: campaigns.original.filter((c) => c.status === "incomplete"),
				state: "incomplete",
			};
		case "completed":
			return {
				...campaigns,
				filtered: campaigns.original.filter((c) => c.status === "completed"),
				state: "completed",
			};
		case "all":
			return {
				...campaigns,
				filtered: campaigns.original,
				state: "all",
			};
		default:
			return campaigns;
	}
};

const initialState = {
	original: dummyCardData,
	filtered: dummyCardData,
	state: "all",
};

const DashboardCampaigns = () => {
	const [campaigns, dispatch] = useReducer(reducer, initialState);

	const handleCompleted = () => {
		dispatch({ status: "completed" });
	};

	const handleUnCompleted = () => {
		dispatch({ status: "incomplete" });
	};

	const handleAll = () => {
		dispatch({ status: "all" });
	};

	return (
		<AuthenticatedUserLayout isDashboard>
			<div className="mb-8 hidden space-y-6 md:block">
				<h1 className="text-2xl font-extrabold uppercase text-white">
					your campaigns
				</h1>
				<div className="flex items-center justify-between gap-8 rounded-lg border border-headerDivider bg-white p-3 py-2 lg:w-fit">
					<Button
						onClick={() => handleAll()}
						variant="regular"
						className={`flex items-center gap-2 ${
							campaigns.state === "all" && "font-semibold text-abeg-primary"
						}`}
					>
						<MegaphoneIcon
							fill={campaigns.state === "all" ? "#008080" : "none"}
							stroke={campaigns.state !== "all"}
						/>
						All Campaigns
					</Button>
					<Button
						variant="regular"
						onClick={() => handleCompleted()}
						className={`flex items-center gap-2 ${
							campaigns.state === "completed" &&
							"font-semibold text-abeg-primary"
						}`}
					>
						<Star
							fill={campaigns.state === "completed"}
							stroke={campaigns.state === "completed"}
						/>
						Goals Reached
					</Button>
					<Button
						variant="regular"
						onClick={() => handleUnCompleted()}
						className={`flex items-center gap-2 ${
							campaigns.state === "incomplete" &&
							"font-semibold text-abeg-primary"
						}`}
					>
						<SlashedStar
							fill={campaigns.state === "incomplete"}
							stroke={campaigns.state === "incomplete"}
						/>
						Unreached
					</Button>
					<Button
						variant="regular"
						className={`flex items-center gap-2 ${
							campaigns.state === "closed" && "font-semibold text-abeg-primary"
						}`}
					>
						<Closed />
						Closed
					</Button>
					<Button
						variant="regular"
						className={`flex items-center gap-2 ${
							campaigns.state === "draft" && "font-semibold text-abeg-primary"
						}`}
					>
						<Drafts
							fill={campaigns.state === "draft"}
							stroke={campaigns.state === "draft"}
						/>
						Drafts
					</Button>
				</div>
			</div>
			<section>
				<CampaignCardList cardDetailList={campaigns.filtered} listType="grid" />
			</section>
		</AuthenticatedUserLayout>
	);
};

export default DashboardCampaigns;
DashboardCampaigns.protect = true;
