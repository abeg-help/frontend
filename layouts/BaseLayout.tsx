import { Footer, Header } from "@/components/common";
import type { BaseLayoutProps } from "@/interfaces";

export const BaseLayout = ({ children }: BaseLayoutProps) => {
	return (
		<>
			<Header />
			{/* <Image
        src={bgContours}
        alt=""
        role="presentation"
        priority
        className="absolute inset-0 -z-[1] h-full w-full object-cover object-[75%]"
        /> */}
			{children}
			<Footer />
		</>
	);
};
