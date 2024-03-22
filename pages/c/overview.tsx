import { DonationStatsPanel } from "@/components/campaign-analytics";
import MapDisplay from "@/components/campaign-analytics/MapDisplay";
import { ArrowDown, Heading } from "@/components/common";
import { CampaignCard, dummyCardData } from "@/components/common/CampaignCard";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui";
import { AuthenticatedUserLayout } from "@/layouts";
import userImage from "@/public/assets/icons/dashboard/userIcon.svg";
import { useCampaignStore } from "@/store";
import Error from "next/error";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const donorData = {
	image: userImage as string,
	name: "Jane Doe",
	email: "Janedoe12@gmail.com",
	time: "4 mins",
	amount: "+300,000",
};

const donorDataList = Array<typeof donorData>(6).fill(donorData);

const Overview = () => {
	const searchParams = useSearchParams();
	const currentCampaign = useCampaignStore((state) =>
		state.campaigns.find(
			(campaign) =>
				campaign._id === searchParams.get("id") && !campaign.isPublished
		)
	);

	if (!currentCampaign) {
		return <Error statusCode={404} />;
	}

	return (
		<AuthenticatedUserLayout isDashboard>
			<section className="">
				<div className="flex flex-col justify-between gap-8 md:m-0 lg:flex-row">
					<Heading
						as="h1"
						className="mb-4 text-lg font-bold md:hidden lg:w-3/5 lg:space-y-5"
					>
						{currentCampaign.title}
					</Heading>

					<CampaignCard
						classNames={{
							image:
								"aspect-[382/266] md:aspect-[751/313] max-h-[313px] rounded-[10px] object-cover object-center",
						}}
						cardType="overview"
						cardDetails={{
							...dummyCardData[0],
							title: currentCampaign.title,
							amountRaised: currentCampaign.amountRaised,
							goal: currentCampaign.goal,
							id: currentCampaign._id,
							imageSrc: currentCampaign.images[0].secureUrl,
						}}
					/>

					<div className="rounded-lg border-[0.5px] border-placeholder bg-white p-4 lg:w-[45%] lg:max-w-[450px]">
						<div className="mb-8 flex items-center justify-between">
							<h2 className="text-2xl font-bold">Donors list</h2>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className="flex cursor-pointer items-center gap-2 rounded-lg border border-placeholder px-3 py-2 md:gap-0">
										<span
											className="flex cursor-pointer items-center gap-2 text-sm font-medium"
											aria-hidden
										>
											Latest
											<ArrowDown />
										</span>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="end" forceMount>
									<DropdownMenuGroup>
										<DropdownMenuItem className="py-2">7 days</DropdownMenuItem>
										<DropdownMenuItem className="py-2">
											14 days
										</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="space-y-6">
							{donorDataList.map((user, index) => (
								<div
									key={index}
									className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-7"
								>
									<div className="flex items-center gap-2">
										<Image
											src={user.image}
											alt="User Image"
											width={30}
											height={30}
										/>
										<div className="xl: flex flex-col">
											<span className="font-medium">{user.name}</span>
											<span className="text-sm">{user.email}</span>
										</div>
									</div>
									<div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:gap-0">
										<div className="ml-10 flex items-center gap-2">
											<span className="text-sm">sent</span>
											<span className="font-semibold">{user.amount}</span>
										</div>
										<span className="text-sm">{user.time} ago</span>
									</div>
								</div>
							))}
						</div>
						<Button variant="secondary" fullWidth className="mt-8">
							See more
						</Button>
					</div>
				</div>
			</section>
			<section className="">
				<MapDisplay />
			</section>
			<section className="">
				<DonationStatsPanel />
			</section>
		</AuthenticatedUserLayout>
	);
};
export default Overview;
Overview.protect = true;
