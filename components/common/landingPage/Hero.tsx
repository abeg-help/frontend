import { Button } from "@/components/ui";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type ButtonType = {
	href: string;
	text: string;
};

type Props = {
	h1Tag: string;
	pTag: string;
	button1: ButtonType;
	button2?: ButtonType;
	imageSrc: StaticImageData;
};
const Hero = ({ h1Tag, pTag, button1, button2, imageSrc }: Props) => {
	return (
		<div className="relative flex items-center bg-cover bg-center md:py-10 lg:h-screen">
			<Image
				src="/assets/images/shared/hero-background.svg"
				className="z-[-1] object-cover object-center"
				fetchPriority="high"
				priority={true}
				alt=""
				fill
			/>
			<div className="flex flex-col gap-4 px-5 text-gray-50 md:px-20 lg:flex-row lg:items-center  lg:gap-12">
				<div className="flex w-full flex-col gap-6 lg:w-1/2">
					<h1 className="pr-5 text-5xl font-bold leading-tight md:pr-0 md:text-6xl md:leading-snug">
						{h1Tag}
					</h1>
					<p className="pr-10 text-lg text-gray-50 md:pr-5">{pTag} </p>
					<div className="flex space-x-10 py-5 md:pt-20">
						<Button
							className="text-md bg-gray-50 font-semibold text-abeg-primary outline-none"
							asChild
						>
							<Link href={button1.href}>{button1.text}</Link>
						</Button>
						{button2 && (
							<Button
								className="text-md border border-gray-200 bg-transparent font-semibold text-gray-100 outline-none"
								asChild
							>
								<Link href={button2.href}>{button2.text}</Link>
							</Button>
						)}
					</div>
				</div>
				<Image
					src={imageSrc}
					alt="hero image"
					width={300}
					height={300}
					priority={true}
					className="ml-[-1.5rem] flex w-full justify-center py-10 md:justify-start lg:w-1/2 lg:py-0"
				/>
			</div>
		</div>
	);
};
export default Hero;
