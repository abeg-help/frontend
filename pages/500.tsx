import { Button } from "@/components/ui";
import ErrorImage from "@/public/assets/images/error-pages/500-image.png";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const ServerError: React.FC = () => {
	const router = useRouter();
	return (
		<div className="w-full min-h-screen px-6 md:px-[9vw] flex flex-col justify-center">
			<div className="px-[10px] py-1 flex justify-center items-center space-x-1 rounded-lg border w-fit mb-12 md:mb-4">
				<div className="w-3 h-3 rounded-full bg-[#dcfae7] flex justify-center items-center">
					<div className="w-[6px] h-[6px] rounded-full bg-abeg-primary" />
				</div>
				<p className="text-sm font-medium">500 error</p>
			</div>
			<div className="flex flex-col md:flex-row items-center justify-between gap-8">
				<div className="flex-1 order-2 md:order-1">
					<h1 className="mb-6 text-4xl md:text-6xl font-bold text-primary">
						Uh oh, an error occurred...
					</h1>
					<h3 className="text-lg md:text-xl md:max-w-[90%]">
						An error occurred on our server. Please try again or click here to
						file a report
					</h3>
					<div className="flex flex-col md:flex-row gap-4 my-12">
						<Button
							size="lg"
							variant="regular"
							className="font-semibold md:text-lg rounded-md px-6 py-4 border"
							onClick={() => router.back()}
						>
							<div className="flex space-x-2 items-center">
								<ArrowLeft size={24} />
								<p> Go back</p>
							</div>
						</Button>
						<Button
							size="lg"
							variant="primary"
							className="font-semibold md:text-lg rounded-md px-6 py-4"
							onClick={() => router.push("/")}
						>
							Go home
						</Button>
					</div>
					<div className="mb-6">
						<div className="flex space-x-2 items-center text-abeg-primary">
							<h3 className="font-semibold ">Our Blog</h3>
							<ArrowRight size={24} />
						</div>
						<p>Read the latest post on our blog.</p>
					</div>
					<div>
						<div className="flex space-x-2 items-center text-abeg-primary">
							<h3 className="font-semibold ">Chat with support</h3>
							<ArrowRight size={24} />
						</div>
						<p>Our friendly team is here to help.</p>
					</div>
				</div>
				<div className="flex-1 order-1 md:order-2 mb-12">
					<Image
						src={ErrorImage}
						alt=""
						height={400}
						width={400}
						role="presentation"
						// sizes="(min-width: 808px) 50vw, 100vw"
						priority
						className="w-full max-h-[28rem] shrink-0"
					/>
				</div>
			</div>
		</div>
	);
};

export default ServerError;
