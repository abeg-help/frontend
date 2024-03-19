"use client";
import { useToggle } from "@/lib/hooks";
import { closeIcon, menuIcon } from "@/public/assets/images/landing-page";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import LogoBanner from "./LogoBanner";

const navLinks = [
	{ name: "How it works", url: "/c/create" },
	{ name: "Explore Campaigns", url: "/c/create" },
	{ name: "About", url: "/about" },
];
const Header = () => {
	const [isMobileNavOpen, toggleMobileNav] = useToggle(false);

	return (
		<header className="bg-abeg-primary px-5  text-white md:px-20 lg:py-7">
			<div className="hidden items-center lg:flex lg:justify-between">
				<LogoBanner className="font-normal text-white" />
				<nav className="text-lg">
					<ul className="lg:flex-row lg:justify-between lg:space-x-10">
						{navLinks.map((link, index) => (
							<Link key={index} href={link.url}>
								{link.name}
							</Link>
						))}
					</ul>
				</nav>
				<div className="gap-2 md:flex">
					<Link href="/signin">
						<Button className="text-md border-2 border-white bg-transparent px-8 font-semibold">
							Sign In
						</Button>
					</Link>
					<Link href="/c/create">
						<Button className="text-md bg-white font-semibold text-abeg-primary">
							Start Fundraiser
						</Button>
					</Link>
				</div>
			</div>

			<div className="flex justify-between lg:hidden">
				<LogoBanner className="font-normal text-white" />
				<Button onClick={toggleMobileNav}>
					<Image src={menuIcon} alt="menu icon" width={35} height={35} />
				</Button>
			</div>

			{/* Mobile Navigation Menu */}
			{isMobileNavOpen && (
				<div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col space-y-5 bg-white px-5 py-10 text-2xl font-medium text-abeg-primary md:items-center md:justify-center lg:hidden">
					{/* Close button for mobile nav */}
					<div className="flex justify-end md:absolute md:right-20 md:top-20">
						<Button onClick={toggleMobileNav} className="text-abeg-primary">
							<Image src={closeIcon} alt="menu icon" width={70} height={70} />
						</Button>
					</div>

					{navLinks.map((link, index) => (
						<div key={index}>
							<Link className="text-xl" href={link.url}>
								{link.name}
							</Link>
						</div>
					))}

					<div className="justify-center space-y-5 md:flex md:flex-col">
						<Link href="/signin">
							<Button className="mt-4 w-full border-2 border-abeg-primary bg-transparent text-xl font-semibold text-abeg-primary md:w-80">
								Sign In
							</Button>
						</Link>
						<Link href="/c/create">
							<Button className="mt-2 w-full bg-abeg-primary px-8 text-xl font-semibold md:w-80">
								Start Fundraiser
							</Button>
						</Link>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
