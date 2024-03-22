import { cn } from "@/lib";
import { useDragScroll, useElementList } from "@/lib/hooks";
import type { AsProp } from "@/lib/type-helpers";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, ProgressBar } from "../ui";
import Heading from "./Heading";
import { DonorIcon } from "./campaign-icons";
import { BankIcon, ClockIcon, EyeIcon, LocationIcon } from "./dashboardIcons";

export type CardProps = AsProp & {
	classNames?: { base?: string; header?: string; image?: string };

	cardType?: "overview" | "regular";

	cardDetails: {
		id?: string;
		imageSrc: string;
		title: string;
		location: string;
		name: string;
		goal: number;
		amountRaised: number;
		donorCount: number;
		commentCount: number;
		daysLeft: number;
		category: string;
		status: string;
	};
};

export type CardListProps = {
	listType: "horizontal" | "grid";
	classNames?: {
		base?: string;
		card?: CardProps["classNames"];
	};
	cardDetailList: Array<CardProps["cardDetails"]>;
};

export const generateDummyCardData = (count = 5) =>
	Array<CardProps["cardDetails"]>(count).fill({
		imageSrc: "/assets/images/dashboard/dummyCardImg.svg",
		title: "Bringing Dental Care to Underserved Communities",
		location: "Lagos, Nigeria",
		name: "Locs Designer",
		goal: 3000000,
		amountRaised: 2000000,
		donorCount: 235567,
		commentCount: 235567,
		daysLeft: 20,
		category: "Health and Wellness",
		status: "Incomplete",
	});

export const dummyCardData = generateDummyCardData();

export function CampaignCard(props: CardProps) {
	const {
		as = "article",
		cardDetails,
		cardType = "regular",
		classNames,
	} = props;

	const donationProgress = Math.floor(
		(cardDetails.amountRaised / cardDetails.goal) * 100
	);

	return (
		<Card
			as={as}
			className={cn("w-full min-w-[310px] space-y-6", classNames?.base)}
		>
			<Card.Header className={cn("relative rounded-md", classNames?.header)}>
				<Image
					src={cardDetails.imageSrc}
					className={cn("size-full rounded-md", classNames?.image)}
					width={383}
					height={263}
					draggable={false}
					alt="Campaigns Image"
				/>

				<div className="absolute inset-0 flex select-none flex-col items-start justify-between p-6 text-xs text-white">
					<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
						<LocationIcon />
						<figcaption>{cardDetails.location}</figcaption>
					</figure>

					<div className="flex w-full justify-between">
						{cardType === "regular" && (
							<figure className="mr-auto flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
								<DonorIcon stroke="light" className="size-4" />
								<figcaption>{cardDetails.donorCount} total donors</figcaption>
							</figure>
						)}

						<figure className="ml-auto flex items-center gap-1 rounded-md bg-abeg-text/30 p-2 backdrop-blur-md">
							<ClockIcon />
							<figcaption>{cardDetails.daysLeft} days left</figcaption>
						</figure>
					</div>
				</div>
			</Card.Header>

			{cardType === "regular" && (
				<Card.Content>
					<Heading
						as="h4"
						className="max-w-[30ch] text-base font-bold lg:text-base"
					>
						{cardDetails.title}
					</Heading>

					<p className="mt-2 text-sm font-medium">
						By: {cardDetails.name} - {cardDetails.category}
					</p>
				</Card.Content>
			)}

			{cardType === "regular" ? (
				<Card.Footer className="flex flex-col gap-2">
					<ProgressBar
						value={donationProgress}
						className="progress-unfilled:h-1"
					/>

					<p className="text-xs font-medium text-abeg-primary">
						₦ {cardDetails.amountRaised} raised
					</p>
				</Card.Footer>
			) : (
				<Card.Footer>
					<div className="space-y-4 md:space-y-5">
						<Heading as="h4" className="hidden font-bold md:block md:text-2xl">
							{cardDetails.title}
						</Heading>

						<article className="flex flex-col justify-between gap-4 md:flex-row md:gap-6">
							<div className="flex-1 space-y-4 text-sm">
								<div className="flex items-center justify-between">
									<p className="font-bold">₦ {cardDetails.amountRaised}</p>

									<p className="text-xs font-semibold">
										₦ {Math.floor(cardDetails.goal - cardDetails.amountRaised)}{" "}
										<span className="text-placeholder">remaining</span>
									</p>
								</div>

								<ProgressBar
									value={donationProgress}
									className="progress-unfilled:h-1"
								/>

								<div className="flex items-center justify-between gap-7">
									<figure className="flex items-center gap-1">
										<DonorIcon stroke="dark" className="size-4 lg:size-5" />
										<figcaption>
											{cardDetails.donorCount} total donors
										</figcaption>
									</figure>

									<figure className="flex items-center gap-1">
										<figcaption>{cardDetails.commentCount} comments</figcaption>
									</figure>
								</div>
							</div>

							<div className="flex justify-between gap-4 text-sm md:w-fit md:flex-col">
								<Button variant="secondary" className="flex items-center gap-2">
									<BankIcon />
									<p>Set up account</p>
								</Button>

								<Button variant="primary" asChild>
									<Link
										href={{
											pathname: "/c/preview",
											query: { id: cardDetails.id },
										}}
										className="flex items-center gap-2"
									>
										<EyeIcon />
										<p>View campaign</p>
									</Link>
								</Button>
							</div>
						</article>
					</div>
				</Card.Footer>
			)}
		</Card>
	);
}

export function CampaignCardList(props: CardListProps) {
	const { cardDetailList, listType, classNames } = props;

	const [CardList] = useElementList();

	const { dragScrollProps, dragContainerClasses, dragItemClasses } =
		useDragScroll<HTMLUListElement>();

	const semanticClasses = {
		cardList: {
			horizontal: dragContainerClasses,
			grid: "grid md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 w-full",
		},

		card: {
			horizontal: cn(
				"max-w-[383px] shrink-0 lg:max-w-[396px]",
				dragItemClasses
			),
			grid: "",
		},
	};

	return (
		<CardList
			{...(listType === "horizontal" && dragScrollProps)}
			className={cn(
				"gap-4",
				semanticClasses.cardList[listType],
				classNames?.base
			)}
			each={cardDetailList}
			render={(detail, index) => (
				<CampaignCard
					key={index}
					as="li"
					cardDetails={detail}
					classNames={{
						base: cn(semanticClasses.card[listType], classNames?.card?.base),
						header: classNames?.card?.header,
					}}
				/>
			)}
		/>
	);
}
