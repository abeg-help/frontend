import { DonorIcon } from "@/components/common/campaign-icons";
import type { Campaign } from "@/interfaces/Campaign";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { ClockIcon, LocationIcon } from "../common";
import { Carousel } from "../ui/carousel";

type CampaignCarouselProps = {
	images: Campaign["images"];
	classNames?: {
		base?: string;
	};
};

const CampaignCarousel = (props: CampaignCarouselProps) => {
	const { images, classNames } = props;

	return (
		<Carousel.Root images={images}>
			<Carousel.Content
				classNames={{
					base: classNames?.base,
					scrollContainer: "rounded-[5px] lg:rounded-[15px]",
				}}
			>
				<Carousel.Controls
					classNames={{
						base: "px-[18px] py-[25px] md:px-[53px] lg:py-10",
						iconsContainer:
							"size-[25px] lg:size-20 bg-abeg-text/40 flex justify-center items-center border border-white backdrop-blur-md rounded-full",
					}}
					icons={{
						prev: <ArrowLeftIcon className="size-2.5 lg:size-[30px]" />,
						next: <ArrowRightIcon className="size-2.5 lg:size-[30px]" />,
					}}
				/>

				<Carousel.Caption className="inset-0 flex flex-col items-start justify-between px-[18px] py-[25px] text-[10px] font-medium md:px-[53px] lg:rounded-[15px] lg:py-10 lg:text-[30px]">
					<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-[6px] backdrop-blur-md lg:gap-2 lg:rounded-[15px] lg:p-5">
						<LocationIcon className="size-4 lg:size-10" />
						<figcaption>Lagos, Nigeria</figcaption>
					</figure>

					<div className="flex w-full justify-between">
						<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-[6px] backdrop-blur-md lg:gap-2 lg:rounded-[15px] lg:p-5">
							<DonorIcon stroke="light" className="size-4 lg:size-10" />
							<figcaption>235,567 total donors</figcaption>
						</figure>

						<figure className="flex items-center gap-1 rounded-md bg-abeg-text/30 p-[6px] backdrop-blur-md lg:gap-2 lg:rounded-[15px] lg:p-5">
							<ClockIcon className="size-4 lg:size-10" />
							<figcaption>20 days left</figcaption>
						</figure>
					</div>
				</Carousel.Caption>

				<Carousel.ItemWrapper<(typeof images)[number]>
					render={(image) => (
						<Carousel.Item key={image.secureUrl}>
							<Image
								src={image.secureUrl}
								alt="campaign image"
								className="aspect-[381/250] w-full object-cover max-lg:max-h-[350px] lg:aspect-[1241/599]"
								width={381}
								height={250}
								priority={true}
								draggable={false}
								fetchPriority="high"
							/>
						</Carousel.Item>
					)}
				/>
			</Carousel.Content>
		</Carousel.Root>
	);
};

export default CampaignCarousel;
