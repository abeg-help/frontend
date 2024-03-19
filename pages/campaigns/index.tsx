import { HowItWorks, SuccessStories } from "@/components/campaigns-page";
import {
	CampaignCategories,
	FAQ,
	Hero,
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
			<div className="px-5 py-10 md:px-20 md:py-20 flex flex-col gap-8 md:gap-20 justify-center">
				<CampaignCategories />
				<HowItWorks />
				<SuccessStories />
				<UrgentFundraisers />
				<FAQ />

			</div>
		</BaseLayout>
	);
};
export default Campaigns;
