import {
	AnalyticsIcon,
	ArrowDown,
	Avatar,
	CloseIcon,
	DashboardIcon,
	Hamburger,
	LogoBanner,
	MegaphoneIcon,
	Notification,
	PlusIcon,
	SettingsIcon,
	UpdatesIcon,
} from "@/components/common";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui";
import type { User } from "@/interfaces";
import { callApi } from "@/lib";
import { useSession } from "@/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { type ReactNode, useState } from "react";

type AuthenticatedUserLayoutProps = {
	isDashboard?: boolean;
	children: ReactNode;
	footer?: ReactNode;
};
const navigation = [
	{
		path: "/c",
		icon: <DashboardIcon stroke />,
		title: "dashboard",
	},
	{
		path: "/c/campaigns",
		icon: <MegaphoneIcon stroke />,
		title: "campaigns",
	},
	{
		path: "/c/analytics",
		icon: <AnalyticsIcon stroke />,
		title: "analytics",
	},
	{
		path: "/notifications",
		icon: <UpdatesIcon stroke />,
		title: "updates",
	},
	{
		path: "/settings",
		icon: <SettingsIcon stroke />,
		title: "settings",
	},
];
export const AuthenticatedUserLayout = ({
	isDashboard,
	children,
	footer,
}: AuthenticatedUserLayoutProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const {
		user,
		actions: { clearSession },
	} = useSession((state) => state);
	const castedUser = user as User;
	const initials = castedUser?.firstName[0] + castedUser?.lastName[0];
	return (
		<>
			<header className="sticky left-0 top-0 z-10 flex items-center justify-between gap-10 border-b border-b-abeg-primary bg-white px-[5%] py-5 lg:px-[7%] 2xl:px-[10%]">
				<div className="flex items-center gap-5">
					{isDashboard && (
						<Button
							onClick={() => setIsOpen(!isOpen)}
							variant="regular"
							className="md:hidden"
						>
							<Hamburger />
						</Button>
					)}
					<LogoBanner className="hidden md:block" />
				</div>
				{/* Mobile menu */}
				{isDashboard && (
					<div
						className={`absolute inset-0 z-[110] flex h-full min-h-svh -translate-x-[110%] flex-col gap-7 bg-white p-[51px] transition-transform duration-500 md:hidden ${
							isOpen ? "translate-x-0" : ""
						}`}
					>
						<Button
							onClick={() => setIsOpen(false)}
							variant="regular"
							className="!justify-end"
						>
							<CloseIcon />
						</Button>
						<div className="space-y-6">
							{navigation.map(({ title, icon, path }) => (
								<Link
									onClick={() => setIsOpen(false)}
									key={title}
									href={path}
									className={`flex items-center gap-4 text-xl capitalize`}
								>
									<span className="">{title}</span>
								</Link>
							))}
						</div>
					</div>
				)}
				<div className="flex items-center gap-3">
					<Button
						className={`!rounded-none border-r border-r-headerDivider !p-0 !pr-2 md:!px-4 lg:border-r`}
					>
						<Notification />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex cursor-pointer items-center gap-2 md:gap-0">
								<Avatar initials={initials} />

								<span className="ml-4 mr-2 hidden px-1 md:block">
									{castedUser?.firstName || "First Name"}
								</span>
								<span className="cursor-pointer" aria-hidden>
									<ArrowDown />
								</span>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">Profile</p>
									<p className="text-xs leading-none text-muted-foreground">
										{castedUser?.email || "m@example.com"}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Link href="/c" className="">
										Dashboard
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem className="lg:hidden">
									<Link
										href="/c"
										className="flex w-full items-center gap-2 rounded-md bg-abeg-primary px-2 py-2 text-sm"
									>
										<PlusIcon />
										Create Campaign
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Button
									variant="danger"
									onClick={async () => {
										const { data, error } = await callApi("/auth/signout");
										clearSession();
									}}
									fullWidth
									className="!py-2"
								>
									Signout
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			{isDashboard && (
				<section className="flex-col gap-6 bg-cover bg-no-repeat md:flex md:h-[42svh] md:bg-abeg-primary md:bg-dashboardBg xl:h-[37svh] 2xl:h-[40svh] 3xl:h-[19svh]">
					<div className="px-[5%] lg:px-[7%] 2xl:px-[10%]">
						<div className="mt-6 flex flex-col items-start justify-between gap-5 md:mt-0 md:flex-row md:py-6 lg:gap-10">
							<div className="space-y-2 md:text-xl md:text-white xl:text-2xl">
								<p className="font-bold">
									Hi, {castedUser?.firstName || "FirstName"}👋
								</p>

								{router.pathname === "/c" ? (
									<p className="">Welcome to your dashboard✨.</p>
								) : router.pathname === "/c/campaigns" ? (
									<p className=""> Here is an overview of your campaigns✨.</p>
								) : router.pathname === "/c/analytics" ? (
									<p className="">
										Here is an overview of your campaign activities✨.
									</p>
								) : null}
							</div>
							<Link
								href={"/c/create"}
								className="flex w-fit items-center rounded-md bg-abeg-primary p-2 px-3 font-bold text-white md:bg-white md:text-abeg-primary"
							>
								<span className="hidden pr-2 md:block">
									<PlusIcon fill />
								</span>
								<span className="pr-2 md:hidden">
									<PlusIcon />
								</span>
								<span>Create Campaign</span>
							</Link>
						</div>
						<div className="hidden gap-7 border-b-2 border-b-white pb-3 md:flex lg:gap-12">
							<Link
								href="/c"
								className={`flex items-center gap-2 !text-white ${
									router.pathname === "/c" && "font-semibold"
								}`}
							>
								<DashboardIcon fill={router.pathname === "/c"} />
								Dashboard
							</Link>

							<Link
								href="/c/analytics"
								className={`flex items-center gap-2 !text-white ${
									router.pathname === "/c/analytics" && "font-semibold"
								}`}
							>
								<AnalyticsIcon fill={router.pathname === "/c/analytics"} />
								Analytics
							</Link>
							<Link
								href="/notifications"
								className={`flex items-center gap-2 !text-white ${
									router.pathname === "/notifications" && "font-semibold"
								}`}
							>
								<UpdatesIcon fill={router.pathname === "/notifications"} />
								Updates
							</Link>
							<Link
								href="/settings"
								className={`flex items-center gap-2 !text-white ${
									router.pathname === "/settings" && "font-semibold"
								}`}
							>
								<SettingsIcon fill={router.pathname === "/settings"} />
								Settings
							</Link>
						</div>
					</div>
				</section>
			)}
			<main
				data-isopen={isOpen}
				className={`authenticatedUserLayoutMain h-full flex-1 px-[5%] lg:px-[7%] 2xl:px-[10%] ${
					isDashboard &&
					"mt-10 space-y-8 md:mt-0 md:-translate-y-[4.8rem] lg:space-y-10"
				}`}
			>
				{children}
			</main>
			{!isDashboard && (
				<footer className="mt-20 border-t border-t-abeg-primary px-[5%] py-4 md:py-7 lg:px-[7%] 2xl:px-[10%]">
					{footer}
				</footer>
			)}
		</>
	);
};
