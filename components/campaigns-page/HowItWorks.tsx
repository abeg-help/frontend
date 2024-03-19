import { Moneys, Verify, WalletAdd } from "@/components/common";
import { Button } from "@/components/ui";
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
const HowItWorks = () => {
	return (
		<div className="flex flex-col gap-8 justify-center ">
			<div className="w-full space-y-5 md:justify-between md:flex lg:space-y-0 lg:divide-x-2 lg:divide-slate-500">
				<div className=" flex-1 space-y-2 md:pr-20">
					<h4 className="text-xl text-placeholder font-normal">
						Want to know more?
					</h4>
					<h1 className="text-4xl font-bold md:text-5xl">
						Here’s how it works
					</h1>
					<Button variant="primary">
						<Link href="/c/create">Donate now</Link>
					</Button>
				</div>
				<div className="flex-1 lg:pl-20 md:flex md:justify-center">
					<p className="text-xl text-placeholder font-medium">
						Join the effortless way to raise funds <br /> and make a difference
						and empower <br /> your cause with Abeghelp.me
					</p>
				</div>
			</div>
			<div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 lg:gap-y-4 pt-8">
				{howItWorksCards.map((card, id) => {
					return (
						<div key={id} className="relative bg-gray-100 px-4 py-12">
							<div className="absolute top-[-24px] left-2 bg-white rounded-full p-4 border-4 border-gray-100">
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
