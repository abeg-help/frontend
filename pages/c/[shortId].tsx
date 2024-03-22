import { Heading, Loader } from "@/components/common";
import { CampaignOutlook } from "@/components/create-campaign";
import type { Campaign } from "@/interfaces/Campaign";
import { BaseLayout } from "@/layouts";
import { callApi } from "@/lib/helpers/campaign";
import { generateExcerpt } from "@/lib/helpers/campaign/generateExcerpt";
import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export const getStaticPaths = (async () => {
	const { data, error } = await callApi<Campaign[]>(
		"/campaign/all?limit=100&isPublished=true&status=Approved"
	);

	if (error || !data.data || data.data.length === 0) {
		return {
			paths: [],
			fallback: "blocking",
		};
	}

	return {
		paths: data.data.map((campaign) => ({
			params: { shortId: campaign.url.split("/c/")[1] },
		})),

		fallback: true,
	};
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
	const { shortId } = context.params as { shortId: string };

	const { data, error } = await callApi<Campaign>(`/campaign/one/${shortId}`);
	if (error || !data.data) {
		return {
			notFound: true,
		};
	}

	return {
		props: { campaign: data.data },
		revalidate: 60, // 60 seconds
	};
}) satisfies GetStaticProps<{ campaign: Campaign }>;

function CampaignView({
	campaign,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();

	if (router.isFallback) {
		return <Loader message="Generating page please wait..." />;
	}

	const excerpt = generateExcerpt(campaign.story);

	return (
		<>
			<NextSeo
				title={campaign.title}
				description={excerpt}
				canonical={campaign.url}
				openGraph={{
					url: campaign.url,
					title: campaign.title,
					description: excerpt,
					...(campaign.images.length > 0 && {
						images: campaign.images.map((image) => {
							return {
								url: image.secureUrl,
								width: 800,
								height: 600,
								alt: campaign.title,
							};
						}),
					}),
				}}
				twitter={{
					cardType: "summary_large_image",
				}}
			/>

			<CampaignOutlook excerpt={excerpt} campaign={campaign}>
				<CampaignOutlook.Header>
					<Heading as="h1" className="text-4xl lg:text-4xl">
						{`${campaign.title[0].toUpperCase()}${campaign.title.slice(1)}`}
					</Heading>
				</CampaignOutlook.Header>
			</CampaignOutlook>
		</>
	);
}

export default CampaignView;

CampaignView.getLayout = (page: React.ReactElement) => (
	<BaseLayout>{page}</BaseLayout>
);
