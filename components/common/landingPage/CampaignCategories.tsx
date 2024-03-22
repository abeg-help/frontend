import { cn } from "@/lib";

const categories = [
	{ title: "Health & Wellness (20)", color: "bg-[#A8CCCC]" },
	{ title: "Business (12)", color: "bg-[#E6E6E6]" },
	{ title: "Family (15)", color: "bg-[#455A64]" },
	{ title: "Emergency (30)", color: "bg-[#2B908E]" },
	{ title: "Religion {12)", color: "bg-[#ACDCDC]" },
	{ title: "Medical (18)", color: "bg-[#D6BBFB]" },
	{ title: "Volunteer (20)", color: "bg-[#FFC3C2]" },
	{ title: "Education (15)", color: "bg-[#D2D2D2]" },
	{ title: "Events (10)", color: "bg-[#748178]" },
	{ title: "Wedding(8)", color: "bg-[#A8CCCC]" },
	{ title: "Others", color: "bg-[#8BD2BD]" },
];

const CampaignCategories = ({ className }: { className?: string }) => {
	return (
		<div className={cn("flex flex-col gap-12 justify-center", className)}>
			<div className="w-full flex flex-col gap-2">
				<h1 className="text-4xl font-bold md:text-5xl">Campaign Categories</h1>
				<p className="text-xl text-placeholder font-medium max-w-[540px]">
					Join the effortless way to fundraise and make a difference and empower
					your cause with Abeghelp.me
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
				{categories.map((category, id) => {
					return (
						<p
							key={id}
							className={`text-center p-6 ${category.color} rounded-lg font-bold text-xl truncate`}
						>
							{category.title}
						</p>
					);
				})}
			</div>
		</div>
	);
};
export default CampaignCategories;
