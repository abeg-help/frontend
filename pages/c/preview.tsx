import { Heading } from "@/components/common";
import {
	CampaignOutlook,
	FormActionButton,
} from "@/components/create-campaign";
import type { Campaign } from "@/interfaces/Campaign";
import { BaseLayout } from "@/layouts";
import { callApi } from "@/lib/helpers/campaign";
import { generateExcerpt } from "@/lib/helpers/campaign/generateExcerpt";
import { useCampaignStore } from "@/store";
import { NextSeo } from "next-seo";
import Error from "next/error";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { toast } from "sonner";

function PreviewCampaignPage() {
	const searchParams = useSearchParams();
	const currentCampaign = useCampaignStore((state) =>
		state.campaigns.find(
			(campaign) =>
				campaign._id === searchParams.get("id") && !campaign.isPublished
		)
	);

	const router = useRouter();

	if (!currentCampaign) {
		return <Error statusCode={404} />;
	}

	const handlePublish = async () => {
		const { error } = await callApi<Campaign>("/campaign/publish", {
			campaignId: currentCampaign._id,
		});

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success("Campaign published successfully");
		void router.push(`/c/${currentCampaign.url.split("/c/")[1]}`);
	};

	const excerpt = generateExcerpt(currentCampaign.story);

	return (
		<>
			<NextSeo
				title={currentCampaign.title}
				description={excerpt}
				canonical={currentCampaign.url}
				openGraph={{
					url: currentCampaign.url,
					title: currentCampaign.title,
					description: excerpt,
					...(currentCampaign.images.length > 0 && {
						images: currentCampaign.images.map((image) => {
							return { url: image.secureUrl };
						}),
					}),
				}}
			/>
			<CampaignOutlook excerpt={excerpt} campaign={currentCampaign}>
				<CampaignOutlook.Header className="flex flex-col gap-2 text-white lg:text-2xl">
					<Heading as="h1">Campaign Preview</Heading>

					<p>This is what your fundraiser campaign will look like to donors</p>

					<p className="font-semibold lg:text-xl">
						Note: Your campaign will become visible to donors once published and
						cannot be edited after!
					</p>

					<div className="flex gap-5">
						<FormActionButton
							type="button"
							className="bg-white font-bold text-abeg-primary"
							onClick={() => void handlePublish()}
						>
							Publish Campaign
						</FormActionButton>

						<FormActionButton
							type="button"
							className="bg-white font-bold text-abeg-primary"
							asChild
						>
							<Link
								href={{
									pathname: "/c/create",
									query: { id: currentCampaign._id },
								}}
							>
								Edit Campaign
							</Link>
						</FormActionButton>
					</div>

					<Heading as="h1" className="mt-7 text-4xl lg:text-4xl">
						{`${currentCampaign.title[0].toUpperCase()}${currentCampaign.title.slice(
							1
						)}`}
					</Heading>
				</CampaignOutlook.Header>
			</CampaignOutlook>
		</>
	);
}

PreviewCampaignPage.getLayout = (page: React.ReactElement) => (
	<BaseLayout>{page}</BaseLayout>
);

export default PreviewCampaignPage;
PreviewCampaignPage.protect = true;
