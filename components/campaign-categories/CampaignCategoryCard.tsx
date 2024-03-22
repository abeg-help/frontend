import { Button, ProgressBar } from "@/components/ui";
import {
	arrowDown,
	arrowLeft,
	arrowRight,
} from "@/public/assets/images/campaign-category";
import { happyPeople } from "@/public/assets/images/landing-page";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const wellnessCampaign = [
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
		url: "explore-one",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
		url: "explore-two",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
		url: "explore-three",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
		url: "explore-four",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
		url: "explore-five",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
		url: "explore-six",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
		url: "explore-seven",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
		url: "explore-eight",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
		url: "explore-nine",
	},
	{
		image: happyPeople,
		title: "Bringing Dental Care to Undeserved Communities",
		name: "Locs Designer",
		proffession: "Health and Welness",
		amountRaised: "$2,000,000",
		url: "explore-ten",
	},
];
export const CampaignCategoryCard = () => {
	// Custom hook to determine the number of items per page based on screen size
	const useItemsPerPage = () => {
		const [itemsPerPage, setItemsPerPage] = useState(9);

		useEffect(() => {
			const handleResize = () => {
				if (window.innerWidth < 768) {
					setItemsPerPage(3);
				} else if (window.innerWidth < 1024) {
					setItemsPerPage(8);
				} else {
					setItemsPerPage(9);
				}
			};

			handleResize(); // Call once to initialize
			window.addEventListener("resize", handleResize); // Listen for resize events

			return () => {
				window.removeEventListener("resize", handleResize); // Cleanup
			};
		}, []);

		return itemsPerPage;
	};
	const itemsPerPage = useItemsPerPage();
	const [currentPage, setCurrentPage] = useState(1);

	const totalItems = wellnessCampaign.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
	const currentItems = wellnessCampaign.slice(startIndex, endIndex);

	const handlePageChange = (page: any) => {
		setCurrentPage(page);
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	const [isOpen, setIsOpen] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState("");

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (filter: any) => {
		setSelectedFilter(filter);
		setIsOpen(false);
		// Perform any other actions based on the selected filter
	};
	return (
		<>
			<div className="w-full flex flex-col gap-2 space-y-5">
				<h1 className="text-4xl md:w-full font-bold md:text-5xl">
					Explore our health & Wellness Campaigns
				</h1>
				<p className="text-xl md:w-3/6 text-placeholder font-medium">
					Join the effortless way to fundraise and make a difference and empower
					your cause with Abeghelp.me
				</p>
			</div>

			<div className="relative hidden md:flex justify-end items-center mt-2 mr-10">
				<Button
					onClick={toggleDropdown}
					className="border border-gray-500 flex gap-3 items-center px-3 py-2"
				>
					<span className="text-black text-base">
						{selectedFilter || "Latest"}
					</span>
					<span>
						<Image
							src={arrowDown}
							alt={"arrow down icon"}
							priority
							width={20}
							height={20}
						/>
					</span>
					{/* Dropdown menu */}
					{isOpen && (
						<div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10">
							<button
								onClick={() => handleSelect("latest")}
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
							>
								Latest
							</button>
							<button
								onClick={() => handleSelect("monthly")}
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
							>
								Monthly
							</button>
							<button
								onClick={() => handleSelect("weekly")}
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
							>
								Weekly
							</button>
						</div>
					)}
				</Button>
			</div>
			<div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
				{currentItems.map((item, index) => (
					<Link
						key={index}
						href={`/explore?category=${item.url}`}
						className="mb-5 space-y-4 md:mb-0"
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
					</Link>
				))}
			</div>

			<div className="flex justify-center items-center gap-5 mt-10 md:mt-20">
				<button
					onClick={handlePrevPage}
					disabled={currentPage === 1}
					className="flex gap-2 items-center font-bold md:text-2xl outline-none"
				>
					<span>
						{" "}
						<Image
							src={arrowLeft}
							alt={"arrow left icon"}
							priority
							width={30}
							height={30}
							className=""
						/>
					</span>
					<span> Prev</span>
				</button>
				{Array.from({ length: totalPages }, (_, index) => index + 1).map(
					(pageNumber, i) => (
						<div key={i} className="flex items-center">
							{(pageNumber <= 3 || i === totalPages - 1) && (
								<button
									key={pageNumber}
									onClick={() => handlePageChange(pageNumber)}
									className={`px-3 md:px-4 py-1 rounded-full md:text-2xl ${
										currentPage === pageNumber
											? "bg-abeg-primary text-white font-bold border border-black"
											: "font-bold"
									}`}
								>
									{pageNumber}
								</button>
							)}
							{pageNumber === 3 && totalPages > 3 && (
								<span className="px-2 py-1 mb-2 font-bold md:text-2xl flex items-center">
									...
								</span>
							)}
						</div>
					)
				)}
				<button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					className="flex gap-2 items-center font-bold md:text-2xl outline-none bg-transparent"
				>
					<span>Next</span>

					<span>
						{" "}
						<Image
							src={arrowRight}
							alt={"arrow right icon"}
							priority
							width={30}
							height={30}
							className=""
						/>
					</span>
				</button>
			</div>
		</>
	);
};
export default CampaignCategoryCard;
