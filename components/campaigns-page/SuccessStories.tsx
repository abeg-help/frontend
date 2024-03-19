import { storiesAboutUs } from "@/public/assets/images/landing-page";
import Image from "next/image";

const successStories = [
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat.",
		image: storiesAboutUs,
	},
];
const SuccessStories = () => {
	return (
		<div className="flex flex-col gap-8 md:gap-12">
			<h1 className="text-4xl font-bold md:text-5xl text-center">
				The Success stories of the <br />
				benefactors speak for themselves
			</h1>
			<div className="flex flex-col gap-8 md:gap-16">
				{successStories.map((story, id) => {
					return (
						<div
							key={id}
							className={`flex flex-col-reverse gap-4 md:gap-16 justify-between ${
								(id + 1) % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
							}`}
						>
							<div className="flex flex-col gap-1 md:gap-4 w-full lg:w-2/3 justify-center">
								<p className="text-xl font-normal">{story.title}</p>
								<p className="text-4xl md:text-5xl font-bold">
									{story.secondTitle}
								</p>
								<p className="text-xl font-extralight">{story.text}</p>
							</div>
							<Image
								src={story.image}
								alt="stories about us"
								width={400}
								height={400}
								className="w-full lg:w-1/3 max-h-[400px] rounded-2xl object-cover"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default SuccessStories;
