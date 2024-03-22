import { Moneys, Verify, WalletAdd } from "@/components/common";
import { Button } from "@/components/ui";
import { cn } from "@/lib";
import Link from "next/link";

const howItWorksCards = [
	{
		title: "Select a Fundraiser",
		icon: <Verify />,
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam. quis nostrud ullamco laboris. ",
	},
	{
		title: "Choose you Donation Method",
		icon: <WalletAdd />,
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam. quis nostrud ullamco laboris. ",
	},
	{
		title: "Submit your donation method",
		icon: <Moneys />,
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam. quis nostrud ullamco laboris. ",
	},
];
const HowItWorks = ({ className }: { className?: string }) => {
	return (
		<div className={cn("flex flex-col justify-center gap-8", className)}>
			<div className="w-full space-y-5 md:flex md:justify-between lg:space-y-0 lg:divide-x-2 lg:divide-slate-500">
				<div className="flex flex-1 flex-col items-start gap-3 space-y-2 md:pr-20">
					<h4 className="text-xl font-normal text-placeholder">
						Want to know more?
					</h4>
					<h1 className="text-4xl font-bold md:text-5xl">
						Here’s how it works
					</h1>
					<Button variant="primary" asChild>
						<Link href="/c/create"> Donate now</Link>
					</Button>
				</div>
				<div className="flex-1 items-center md:flex md:justify-center lg:pl-20">
					<p className="text-xl font-medium text-placeholder">
						Join the effortless way to raise funds <br /> and make a difference
						and empower <br /> your cause with Abeghelp.me
					</p>
				</div>
			</div>
			<div className=" grid grid-cols-1 gap-x-4 gap-y-10 pt-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-4">
				{howItWorksCards.map((card, id) => {
					return (
						<div key={id} className="relative bg-gray-100 px-4 py-12">
							<div className="absolute left-2 top-[-24px] rounded-full border-4 border-gray-100 bg-white p-4">
								{card.icon}
							</div>
							<p className="mt-12 text-2xl font-semibold">{card.title}</p>
							<p className="text-base font-light">{card.text}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default HowItWorks;
