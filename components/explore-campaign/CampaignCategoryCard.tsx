import { Button } from "@/components/ui";
import {
	arrowDown,
	arrowLeft,
	arrowRight,
} from "@/public/assets/images/campaign-category";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
	CampaignCardList,
	generateDummyCardData,
} from "../common/CampaignCard";

const dummyCardData = generateDummyCardData(15);

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

			handleResize(); // Call to initialize, to prevent flashing original state on load when resizing window
			window.addEventListener("resize", handleResize);

			return () => {
				window.removeEventListener("resize", handleResize);
			};
		}, []);

		return itemsPerPage;
	};
	const itemsPerPage = useItemsPerPage();
	const [currentPage, setCurrentPage] = useState(1);

	const totalItems = dummyCardData.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
	const currentItems = dummyCardData.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	// Code below is for dropdown filter button of this component
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState("");

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (filter: string) => {
		setSelectedFilter(filter);
		setIsOpen(false);
	};
	return (
		<div className="px-5 md:px-20">
			<div className="flex w-full flex-col gap-2 space-y-5">
				<h1 className="text-4xl font-bold md:w-full md:text-5xl">
					Explore our health & Wellness Campaigns
				</h1>
				<p className="text-xl font-medium text-placeholder md:w-3/6">
					Join the effortless way to fundraise and make a difference and empower
					your cause with Abeghelp.me
				</p>
			</div>

			<div className="relative mr-10 mt-2 hidden items-center justify-end md:flex">
				<Button
					onClick={toggleDropdown}
					className="flex items-center gap-3 border border-gray-500 px-3 py-2"
				>
					<span className="text-base text-black">
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
						<div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-md bg-white shadow-lg">
							<button
								onClick={() => handleSelect("Latest")}
								className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
							>
								Latest
							</button>
							<button
								onClick={() => handleSelect("Monthly")}
								className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
							>
								Monthly
							</button>
							<button
								onClick={() => handleSelect("Weekly")}
								className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
							>
								Weekly
							</button>
						</div>
					)}
				</Button>
			</div>

			{/* href={`/explore?category=${item.url}`} */}
			<CampaignCardList
				listType="grid"
				cardDetailList={currentItems}
				classNames={{ base: "mt-10" }}
			/>

			<div className="mt-10 flex items-center justify-center gap-5 md:mt-20">
				<button
					onClick={handlePrevPage}
					disabled={currentPage === 1}
					className="flex items-center gap-2 font-bold outline-none md:text-2xl"
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
				{[...Array<number>(totalPages).keys()].map((number, i) => {
					const pageNumber = number + 1;

					return (
						<div key={i} className="flex items-center">
							{(pageNumber <= 3 || i === totalPages - 1) && (
								<button
									key={pageNumber}
									onClick={() => handlePageChange(pageNumber)}
									className={`rounded-full px-3 py-1 md:px-4 md:text-2xl ${
										currentPage === pageNumber
											? "border border-black bg-abeg-primary font-bold text-white"
											: "font-bold"
									}`}
								>
									{pageNumber}
								</button>
							)}
							{pageNumber === 3 && totalPages > 3 && (
								<span className="mb-2 flex items-center px-2 py-1 font-bold md:text-2xl">
									...
								</span>
							)}
						</div>
					);
				})}
				<button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					className="flex items-center gap-2 bg-transparent font-bold outline-none md:text-2xl"
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
		</div>
	);
};
export default CampaignCategoryCard;
