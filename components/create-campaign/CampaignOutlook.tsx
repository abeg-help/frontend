import {
	DonorIcon,
	DummyAvatar,
	MoneyIcon,
	ShareIcon,
	whatsappIcon,
	xIcon,
} from "@/components/common/campaign-icons";
import type { Campaign } from "@/interfaces/Campaign";
import { cn } from "@/lib";
import { getDateFromString } from "@/lib/helpers/campaign";
import { useElementList, useShareCampaign } from "@/lib/hooks";
import { useSlot } from "@/lib/hooks/useSlot";
import { format } from "date-fns";
import { FilesIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CustomDialog } from "../common";
import Heading from "../common/Heading";
import { FAQ, UrgentFundraisers } from "../common/landingPage";
import { Button, ProgressBar } from "../ui";
import CampaignCarousel from "./CampaignCarousel";
import DonorSection from "./DonorSection";

type CampaignOutlookProps = {
	children?: React.ReactNode;
	campaign: Campaign;
	excerpt: string;
};

type CampaignHeaderProps = {
	children: React.ReactNode;
	className?: string;
};

function CampaignOutlook(props: CampaignOutlookProps) {
	const { campaign, excerpt, children } = props;

	const [TagList] = useElementList();

	const HeaderSlot = useSlot(children, CampaignOutlook.Header);

	const { generateTweet, generateWhatsAppMessage, handleShareLink } =
		useShareCampaign();

	const fundraiserTarget =
		campaign.fundraiser === "INDIVIDUAL"
			? `${campaign.creator?.firstName} ${campaign.creator?.lastName}`
			: "BENEFICIARY";

	const campaignDeadline = getDateFromString(campaign.deadline);

	const donationProgress = Math.floor(
		(campaign.amountRaised / campaign.goal) * 100
	);

	return (
		<main className="flex flex-col items-center pb-20 text-abeg-text">
			<section className="relative px-6 pb-14 pt-11 text-white md:px-[100px]">
				<Image
					src="/assets/images/shared/hero-background.svg"
					className="z-[-1] object-cover object-center"
					fetchPriority="high"
					priority={true}
					alt=""
					fill
				/>

				{HeaderSlot}

				<p className="mt-3 text-pretty lg:text-xl">{excerpt}</p>

				<div className="relative mt-6 flex items-center max-lg:justify-between lg:gap-9">
					<figure className="flex items-center gap-3 ">
						<DummyAvatar className="size-10" />

						<figcaption className="text-xl">{fundraiserTarget}</figcaption>
					</figure>

					<button className="rounded-[20px] border border-white bg-white/30 px-[30px] py-1 text-xl font-bold">
						Donate
					</button>

					<button className="absolute right-0 rounded-full border border-white bg-abeg-text/40 p-2 active:scale-[1.03] max-lg:hidden">
						<ShareIcon />
					</button>
				</div>

				<CampaignCarousel
					images={campaign.images}
					classNames={{ base: "mt-8" }}
				/>

				<div className="relative mt-6">
					<TagList
						className="flex flex-wrap gap-5"
						each={campaign.tags}
						render={(tag, index) => (
							<li
								key={`${tag}-${index}`}
								className="rounded-[20px] border border-white bg-white/30 px-[30px] py-1 text-xl font-bold "
							>
								<p>{tag}</p>
							</li>
						)}
					/>

					<button className="absolute right-0 top-0 rounded-full border border-white bg-abeg-text/40 p-2 active:scale-[1.03] lg:hidden">
						<ShareIcon />
					</button>
				</div>
			</section>

			<div className="flex flex-col px-6 max-lg:max-w-[450px] max-lg:items-center lg:flex-row-reverse lg:gap-5 lg:px-[100px]">
				<section className="mt-16 space-y-5 px-[18px] py-6 lg:min-w-[383px] lg:max-w-[505px]">
					<article>
						<div className="flex items-center justify-between">
							<p className="font-bold">₦ {campaign.amountRaised}</p>

							<p className="text-xs font-semibold ">
								₦ {Math.floor(campaign.goal - campaign.amountRaised)}{" "}
								<span className="text-placeholder">remaining</span>
							</p>
						</div>

						<ProgressBar
							value={donationProgress}
							className="progress-unfilled:h-1"
						/>
					</article>

					<article className="space-y-4">
						<Button
							variant="primary"
							className="w-full rounded-md bg-abeg-primary py-3 text-base font-bold lg:rounded-lg"
						>
							Donate to this campaign
						</Button>
						<CustomDialog
							classNames={{
								content: "gap-0 p-12 md:p-12 max-w-[500px]",
							}}
							trigger={
								<Button
									variant="secondary"
									className="w-full rounded-md border-abeg-primary py-3 text-base font-bold text-abeg-primary lg:rounded-lg"
								>
									Share this campaign
								</Button>
							}
						>
							<p className="text-center">
								Spread the word, share your campaign with friends, family, and
								the world. Every share brings us one step closer to making a
								difference
							</p>
							<div className="mt-6 flex w-full items-center justify-between rounded-lg bg-abeg-primary p-2 text-base text-white">
								<div className="flex w-full gap-1">
									<LinkIcon className="size-5" />
									<p>{campaign.url}</p>
								</div>
								<button
									className="flex shrink-0 gap-1 rounded-lg bg-white px-1 py-[5px] text-xs text-abeg-primary"
									onClick={handleShareLink(campaign.url)}
								>
									<FilesIcon className="size-4" />
									Copy link
								</button>
							</div>
							<div className="mt-6 flex w-full items-center justify-between gap-4 text-base">
								<hr className="my-1 basis-full border border-placeholder" />
								<p className="shrink-0">or share on</p>
								<hr className="my-1 basis-full border border-placeholder" />
							</div>
							<div className="mt-6 flex w-full items-center justify-between">
								<Link
									href={generateTweet(
										campaign.title,
										campaign.url,
										campaign.tags
									)}
									target="_blank"
									className="flex w-full items-center gap-2"
								>
									<Image src={xIcon as string} width={32} height={32} alt="" />
									Twitter (X)
								</Link>

								<Link
									href={generateWhatsAppMessage(campaign.title, campaign.url)}
									target="_blank"
									className="flex w-full items-center justify-end gap-2"
								>
									<Image
										src={whatsappIcon as string}
										width={32}
										height={32}
										alt=""
									/>
									Whatsapp
								</Link>
							</div>
						</CustomDialog>
					</article>

					<article className="space-y-7">
						<figure className="flex items-start gap-2.5 text-sm lg:text-base">
							<MoneyIcon className="mt-[5px] size-6 shrink-0" />
							<figcaption>
								Be the first to donate to this fundraiser, every penny donated
								will go a long way
							</figcaption>
						</figure>
						<figure className="flex items-center gap-2.5 text-sm lg:text-base">
							<DonorIcon className="shrink-0" />
							<figcaption>0 total donors</figcaption>
						</figure>
						<figure className="flex items-center gap-2 text-sm lg:text-base">
							<DummyAvatar className="size-8 shrink-0" />
							<figcaption>
								{fundraiserTarget} is in charge of this fundraiser.
							</figcaption>
						</figure>
					</article>

					<DonorSection className="px-[19px]" />
				</section>

				<section className="mt-14 max-w-[714px] text-2xl">
					<article>
						<Heading
							as="h3"
							className="flex gap-4 border-b border-b-placeholder p-2 text-xl"
						>
							Category:
							<span className="font-normal">{campaign.category?.name}</span>
						</Heading>
						<Heading
							as="h3"
							className="mt-3 border-b border-b-placeholder p-2 text-xl lg:mt-6"
						>
							Story
						</Heading>
						<div
							className="mt-6 min-h-16 text-justify text-2xl"
							dangerouslySetInnerHTML={{
								__html: campaign.storyHtml,
							}}
						/>

						<p className="mt-6 lg:mt-12">
							Campaign closes on: {format(campaignDeadline, "dd-MM-yyyy")}.
						</p>

						<TagList
							className="mt-4 font-medium max-lg:space-y-2 lg:grid lg:grid-cols-3 lg:gap-x-2 lg:gap-y-6"
							each={campaign.tags}
							render={(tag, index) => (
								<li key={`${tag}-${index}`} className="flex min-w-0">
									<p className="truncate">{tag}</p>
								</li>
							)}
						/>
					</article>

					<article className="mt-12 flex items-start gap-6">
						<DummyAvatar className="size-[82px]" />

						<div>
							<p className="flex flex-col">
								{fundraiserTarget} is in charge of this fundraiser.
								<span className="mt-4">{campaign.country}</span>
							</p>
							<Button
								variant="primary"
								className="mt-8 w-full rounded-md bg-abeg-primary py-3 text-base font-bold lg:mt-8 lg:py-4"
							>
								Reach out
							</Button>
						</div>
					</article>
				</section>
			</div>

			<UrgentFundraisers className="mt-[72px] lg:mt-[120px]" />

			<FAQ className="mt-[72px] w-full px-6 lg:mt-[120px] lg:px-[100px]" />
		</main>
	);
}

function CampaignOutlookHeader(props: CampaignHeaderProps) {
	const { children, className } = props;

	return <header className={cn("w-full", className)}>{children}</header>;
}

CampaignOutlook.Header = CampaignOutlookHeader;
CampaignOutlookHeader.slot = "header";

export default CampaignOutlook;
