import Auth from "@/components/Protect";
import { Toaster } from "@/components/ui";
import { useSession } from "@/store";
import "@/styles/globals.css";
import { DefaultSeo, type DefaultSeoProps } from "next-seo";
import type { AppProps } from "next/app";
import { Manrope } from "next/font/google";
import NextNProgress from "nextjs-progressbar";
import type { ReactElement, ReactNode } from "react";
import { useEffect } from "react";

const manrope = Manrope({ subsets: ["latin"] });
interface ComponentWithPageLayout extends AppProps {
	Component: AppProps["Component"] & {
		protect?: boolean;
		getLayout?: (page: ReactElement) => ReactNode;
	};
}

const SEOCONFIG: DefaultSeoProps = {
	defaultTitle: "Start your journey into fundraising with ease",
	titleTemplate: "AbegHelp |'%s",
	description:
		"Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me",
	canonical: "https://www.abeghelp.me/",
	openGraph: {
		type: "website",
		locale: "en_IE",
		url: "https://www.abeghelp.me/",
		siteName: "AbegHelp",
	},
	twitter: {
		handle: "@abeghelpme",
		site: "@abeghelpme",
		cardType: "summary_large_image",
	},
};

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
	const {
		actions: { getSession },
	} = useSession((state) => state);

	const getLayout = Component.getLayout ?? ((page) => page);

	useEffect(() => {
		void (async () => {
			await getSession(true);
		})();
	}, []);

	return (
		<>
			<DefaultSeo {...SEOCONFIG} />
			<style jsx global>{`
        html {
          font-family: ${manrope.style.fontFamily};
          color: #484848;
        }
      `}</style>
			<NextNProgress color="#324823" />
			{Component.protect === true ? (
				<Auth>{getLayout(<Component {...pageProps} />)}</Auth>
			) : (
				getLayout(<Component {...pageProps} />)
			)}

			<Toaster />
		</>
	);
}
