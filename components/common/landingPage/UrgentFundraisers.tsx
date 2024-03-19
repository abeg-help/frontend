import { Button, ProgressBar } from "@/components/ui";
import { happyPeople } from "@/public/assets/images/landing-page";
import Image from "next/image";
import Link from "next/link";

const urgentFundraisers = [
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
	},
];

const UrgentFundraisers = ({ padding }: { padding?: String }) => {
	return (
		<div className={`${padding} 'py-20'`}>
			<div className="md:items-center md:justify-between lg:flex">
				<div className="mb-5 space-y-5">
					<h4 className="text-xl text-gray-500">Donate today</h4>
					<h1 className="text-4xl font-bold md:text-5xl">Urgent Fundraisers</h1>
					<p className="text-xl text-gray-500">
						Join our community of change-makers and make an impact today
					</p>
				</div>
				<Button className="border border-gray-500 font-semibold text-gray-500 outline-none">
					<Link href="/c/create">Explore campaigns</Link>
				</Button>
			</div>

			<div className="mt-14 gap-5 md:flex md:overflow-x-auto md:hide-scrollbar">
				{urgentFundraisers.map((item: any, index) => (
					<div
						key={index}
						className="mb-5 flex-shrink-0 flex-grow-0 space-y-4 md:mb-0 md:w-[45%] lg:w-[30%]"
					>
						<Image
							src={item.image}
							alt={item.name}
							priority
							width={400}
							height={400}
							className="h-60 w-full rounded-md object-cover"
						/>
						<h3 className="text-md text-base font-semibold xl:pr-10 xl:text-lg">
							{item.title}
						</h3>
						<p className="text-xs">
							By: {item.name} - {item.proffession}
						</p>
						<ProgressBar
							value={70}
							className="rounded-full progress-unfilled:h-1 progress-unfilled:bg-teal-400 progress-filled:bg-abeg-primary"
						/>
						<p className="pt-2 text-xs text-abeg-primary">
							{item.amountRaised} raised
						</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default UrgentFundraisers;
