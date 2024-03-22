import { cn } from "@/lib";
import { useDragScroll } from "@/lib/hooks";
import { testimonialImage1 } from "@/public/assets/images/landing-page";
import Image from "next/image";

const testimonials = [
	{
		image: testimonialImage1,
		name: "Jonathan Doe",
		greeting: "Thanks AHM",
		text: "Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me",
	},
	{
		image: testimonialImage1,
		name: "Sandra Doe",
		greeting: "Thanks AHM",
		text: "Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me",
	},
	{
		image: testimonialImage1,
		name: "William Doe",
		greeting: "Thanks AHM",
		text: "Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me",
	},
];

const TestimonialCard = ({ className }: { className?: string }) => {
	const { dragScrollProps, dragContainerClasses } =
		useDragScroll<HTMLDivElement>();

	return (
		<section className={cn("w-full", className)}>
			<h1 className="hidden text-center text-5xl font-bold md:block lg:px-32">
				Hear from some of our users we&apos;ve helped reach their goals
			</h1>
			<h1 className="text-center text-4xl font-bold md:hidden">
				Some of our users we&apos;ve helped reach their goals
			</h1>
			<div
				{...dragScrollProps}
				className={cn(
					dragContainerClasses,
					"w-full gap-5 pl-6 lg:flex lg:flex-row lg:items-center lg:justify-between lg:pl-[100px]"
				)}
			>
				{testimonials.map((testimonial, index) => (
					<div
						key={index}
						className="relative mt-16 w-[90%] shrink-0 grow-0 items-center justify-center p-4 text-white md:p-7 lg:mt-20 lg:flex lg:gap-20"
					>
						<Image
							src="/assets/images/landing-page/background.png"
							className="z-[-1] rounded-xl object-cover object-center"
							fetchPriority="high"
							priority={true}
							alt=""
							fill
						/>
						<Image
							src={testimonial.image}
							alt="testimonial image"
							draggable={false}
							width={400}
							height={400}
							className="w-full"
						/>
						<div className="mt-5 lg:mt-0">
							<p className="text-2xl font-extralight text-gray-200 md:text-3xl">
								{testimonial.text}
							</p>
							<h1 className="mt-10 text-3xl font-bold md:text-4xl lg:mt-20">
								{testimonial.greeting}
							</h1>
							<h1 className="text-xl font-normal md:text-2xl">
								{testimonial.name}
							</h1>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default TestimonialCard;
