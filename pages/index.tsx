import TestimonialCard from "@/components/common/TestimonialCard";
import { FAQ, Hero, UrgentFundraisers } from "@/components/common/landingPage";
import { Button } from "@/components/ui";
import { BaseLayout } from "@/layouts";
import { cn } from "@/lib";
import { useDragScroll } from "@/lib/hooks";
import {
	avatar1,
	avatar2,
	avatar3,
	createCampaignImage1,
	createCampaignImage2,
	createCampaignImage3,
	crowdFund,
	globalCommunity,
	hero,
	joinnUs,
} from "@/public/assets/images/landing-page";
import Image from "next/image";
import Link from "next/link";

const campaignCard = [
	{
		index: 1,
		image: createCampaignImage1,
		heading: "Create Your Campaign",
		text: "Share your vision. In just a few clicks, set up your fundraising page and tell us what you're passionate about.",
	},
	{
		index: 2,
		image: createCampaignImage2,
		heading: "Share your story",
		text: "Spread the word with our easy sharing tools. Reach out to friends, family, and beyond.",
	},
	{
		index: 3,
		image: createCampaignImage3,
		heading: "Collect Donations",
		text: "See generosity in action. Our secure platform makes donating simple, so you can focus on your cause.",
	},
	{
		index: 4,
		image: createCampaignImage1,
		heading: "Be Happy",
		text: "Change lives With the funds raised, take the steps to turn your dream project into reality.",
	},
];

const HomePage = () => {
	const { dragContainerClasses, dragScrollProps } =
		useDragScroll<HTMLDivElement>();

	return (
		<BaseLayout>
			<Hero
				h1Tag="Start your journey into fundraising with ease"
				pTag="Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me"
				button1={{ href: "/c/create", text: "Start fundraiser" }}
				button2={{ href: "/c/create", text: "Donate now" }}
				imageSrc={hero}
			/>
			<div className="py-10 md:pt-20">
				<div className="w-full space-y-5 px-5 md:justify-between md:px-20 lg:flex lg:space-y-0 lg:divide-x-2 lg:divide-slate-500">
					<div className="space-y-5 md:pr-20">
						<h4 className="text-xl text-gray-500">How it works</h4>
						<h1 className="text-4xl font-bold md:text-5xl">
							A Path to Making <br /> a Difference.
						</h1>
					</div>
					<div className="w-full flex-1 items-center justify-between gap-10 lg:flex lg:pl-20 xl:w-1/3">
						<p className="text-2xl text-gray-500">
							Join the effortless way to raise funds <br /> and make a
							difference and empower <br /> your cause with Abeghelp.me
						</p>
						<Button
							className="mt-5 border border-gray-500 font-semibold text-gray-500 outline-none"
							asChild
						>
							<Link href="/explore">Explore campaigns</Link>
						</Button>
					</div>
				</div>

				<div
					{...dragScrollProps}
					className={cn(
						"gap-5 space-y-5 px-5 py-10 md:space-y-0 md:p-20",
						dragContainerClasses
					)}
				>
					{campaignCard.map((card, index) => (
						<div
							key={index}
							className="relative shrink-0 grow-0 space-y-3 rounded-xl bg-gray-200 p-5 md:w-[45%] lg:w-[30%]"
						>
							<h1 className="text-2xl font-bold">{card.heading}</h1>
							<p className="text-md font-medium">{card.text}</p>
							<div className="flex">
								<Image
									src={card.image}
									alt="Create campaign card image"
									width={200}
									height={200}
								/>
								<p className="absolute bottom-0 left-0 right-[-1.5rem] top-[8rem] flex justify-end text-end text-[13rem] font-bold text-white">
									{card.index}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="px-5 md:px-20">
					<div className="relative flex justify-center py-20 text-white lg:px-20">
						<Image
							src="/assets/images/shared/hero-background.svg"
							className="z-[-1] rounded-xl object-cover object-center"
							alt=""
							fill
						/>

						<div className="space-y-5 md:px-10">
							<p className="flex justify-center text-center text-xl font-light">
								Let&apos;s Help you start your Journey
							</p>
							<h1 className="flex justify-center px-5 text-center text-4xl font-bold sm:px-10 md:px-0 lg:text-5xl">
								Together We are Stronger
							</h1>
							<div className="space-y-20 py-14 md:flex md:gap-10 md:space-y-0 lg:px-10">
								<div className="space-y-5 px-16 md:px-0">
									<h1 className="flex justify-center text-4xl font-bold lg:text-5xl">
										50K
									</h1>
									<p className="flex text-center text-xl font-light">
										Reach more people and hit your goals faster
									</p>
								</div>
								<div className="space-y-5 px-16 md:px-0">
									<h1 className="flex justify-center  text-4xl font-bold lg:text-5xl">
										15+
									</h1>
									<p className="flex text-center text-xl font-light">
										Get donations across 15 different countries
									</p>
								</div>
								<div className="space-y-5 px-16 md:px-0">
									<h1 className="flex justify-center  text-4xl font-bold lg:text-5xl">
										20M
									</h1>
									<p className="flex text-center text-xl font-light">
										More than 20M naira donated every day
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="items-center justify-between px-5 py-16 md:px-20 lg:flex lg:gap-20 lg:py-20">
					<div className="mb-8 space-y-5 lg:mb-0">
						<p className="text-xl">Let&apos;s Help you start your Journey</p>
						<h1 className="text-4xl font-bold md:text-5xl">
							A Path to Making a Difference.
						</h1>
						<div className="border-t-2 border-gray-400" />
						<div className="space-y-10">
							<div className="flex items-start gap-5">
								<Image
									src={globalCommunity}
									alt="hero image"
									width={50}
									height={50}
								/>
								<div className="space-y-2">
									<h1 className="text-xl font-bold">Global Community</h1>
									<p className="text-gray-400">
										Join the effortless way to raise funds and make a difference
										and empower your cause with Abeghelp.me
									</p>
								</div>
							</div>
							<div className="flex items-start gap-5">
								<Image
									src={crowdFund}
									alt="hero image"
									width={50}
									height={50}
								/>
								<div className="space-y-2">
									<h1 className="text-xl font-bold">Crowd Funding</h1>
									<p className="text-gray-400">
										Join the effortless way to raise funds and make a difference
										and empower your cause with Abeghelp.me
									</p>
								</div>
							</div>
						</div>
						<div className="relative flex w-56 items-center rounded-full bg-teal-300 p-3 md:w-72">
							<div className="relative">
								<Image
									src={avatar1}
									alt="Avatar 1"
									width={50}
									height={50}
									className="relative z-10 rounded-full md:size-full"
								/>
								<Image
									src={avatar2}
									alt="Avatar 2"
									width={50}
									height={50}
									className="absolute left-10 top-0 z-20 rounded-full md:left-14 md:size-full"
								/>
								<Image
									src={avatar3}
									alt="Avatar 3"
									width={50}
									height={50}
									className="absolute left-20 top-0 z-30 rounded-full md:left-28 md:size-full"
								/>
								<p className="absolute left-32 top-2 ml-2 text-3xl font-semibold text-white md:left-48 md:top-4">
									8k+
								</p>
							</div>
						</div>
					</div>
					<Image src={joinnUs} alt="hero image" width={600} height={600} />
				</div>
				<div className="md:pt-10">
					<TestimonialCard />
				</div>

				<UrgentFundraisers className="py-20" />

				<FAQ className="px-5 py-10 md:px-20" />
			</div>
		</BaseLayout>
	);
};

export default HomePage;
