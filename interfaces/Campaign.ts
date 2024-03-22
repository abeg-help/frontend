import { targetCountries } from "@/lib/helpers/campaign";
import type { Prettify } from "@/lib/type-helpers";

export type Image = Prettify<{
	secureUrl: string;
	blurHash: string;
	_id: string;
}>;

type Creator = Prettify<{
	_id: string;
	firstName: string;
	lastName: string;
}>;

type Category = Prettify<{
	isDeleted: boolean;
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}>;

type Fundraiser = "INDIVIDUAL" | "BENEFICIARY";

type Status = "In Review" | "Approved" | "Rejected" | "Draft";

type FlaggedReasonType = "Inappropriate Content" | "Mismatch" | "Exists";

export type Campaign = {
	_id: string;
	currentStep: 1 | 2 | 3;
	url: string;
	category: Category | null;
	country: (typeof targetCountries)[number];
	tags: string[];
	goal: number;
	amountRaised: number;
	story: string;
	storyHtml: string;
	images: Image[];
	title: string;
	fundraiser: Fundraiser;
	deadline: string;
	creator: Creator | null;
	isPublished: boolean;
	status: Status;
	isFlagged: boolean;
	flaggedReasons: Array<{ type: FlaggedReasonType; reason: string }>;
	isDeleted: boolean;
	featured: boolean;
};
