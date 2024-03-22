import { SuccessStories } from "@/components/campaigns-page";
import {
	CampaignCategories,
	FAQ,
	Hero,
	HowItWorks,
	UrgentFundraisers,
} from "@/components/common/landingPage";
import { BaseLayout } from "@/layouts";
import { campaignHero } from "@/public/assets/images/landing-page";

const Campaigns = () => {
	return (
		<BaseLayout>
			<Hero
				h1Tag="Be part of the change makers today!"
				pTag="Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me"
				button1={{ href: "/c/create", text: "Donate now" }}
				imageSrc={campaignHero}
			/>
			<div className="md:py-20 flex flex-col gap-8 md:gap-20 justify-center">
				<CampaignCategories className="px-5 md:px-20" />
				<HowItWorks className="px-5 md:px-20" />
				<SuccessStories className="px-5 md:px-20" />
				<UrgentFundraisers />
				<FAQ className="px-5 md:px-20" />
			</div>
		</BaseLayout>
	);
};
export default Campaigns;
