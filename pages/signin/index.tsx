import {
	CloudFlareTurnStile,
	CustomDialog,
	FormErrorMessage,
} from "@/components/common";
import { Button, Input } from "@/components/ui";
import type { ApiResponse } from "@/interfaces";
import type { SessionData } from "@/interfaces/ApiResponses";
import { AuthPagesLayout } from "@/layouts";
import { type LoginType, callApi, zodValidator } from "@/lib";
import { useCloudflareTurnstile } from "@/lib/hooks";
import { useCampaignStore, useSession } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Login = () => {
	const { cfTurnStile, checkBotStatus, handleBotStatus } =
		useCloudflareTurnstile();
	const showModal = useRef(false);
	const router = useRouter();
	const [openModal, setOpenModal] = useState(false);
	const [success] = useState(false);
	const [skip2FA, setSkip2FA] = useState<string | boolean>(false);
	const {
		user,
		actions: { updateUser, clearSession },
	} = useSession((state) => state);

	const {
		actions: { initializeCampaigns },
	} = useCampaignStore((state) => state);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<LoginType>({
		resolver: zodResolver(zodValidator("login")!),
		mode: "onChange",
		reValidateMode: "onChange",
	});
	const handleSkip2fa = () => {
		localStorage.setItem(`skip-2FA-${user?._id}`, JSON.stringify(true));
		void router.push("/c");
		setOpenModal(false);
	};

	const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
		const { data: responseData, error } = await callApi<
			ApiResponse<SessionData>
		>("/auth/signin", {
			email: data.email,
			password: data.password,
		});
		if (error) {
			const email = (error?.error as string)?.split(":")?.[1];
			if (email) {
				void router.push({
					pathname: "/signup/verification",
					query: {
						signup: true,
						email: data.email.toLowerCase(),
						title: "Email Verification",
						type: "verification",
						endpoint: "resend-verification",
					},
				});
			}
			toast.error(error.status, {
				description: error.message,
			});
		} else {
			toast.success("Success", {
				description: responseData?.message,
			});

			if (responseData?.data) {
				const { user, campaigns } = responseData?.data;

				if (user.twoFA.active === false) {
					const skipModal = localStorage.getItem(`skip-2FA-${user._id}`);
					if (skipModal === "true") {
						router.push(campaigns.length > 0 ? "/c" : "/c/create");
					} else {
						setOpenModal(true);
						await router.push("/signin?redirect=false", undefined, {
							shallow: true,
						});
					}
					// populate store with initial data
					updateUser(user);
					initializeCampaigns(campaigns);
				} else {
					router.push({
						pathname: "/2fa/authenticate",
						query: { type: user.twoFA.type, email: data?.email },
					});
				}
			}
		}
		reset();
	};

	return (
		<AuthPagesLayout
			title="Sign in to your account"
			content="Sign in to your account to continue using Abeg Help!"
			heading="Welcome back!"
			greeting="Sign in to continue"
			withHeader
			hasSuccess={false}
		>
			<form
				className=""
				onSubmit={(event) => {
					event.preventDefault();

					const response = checkBotStatus();

					response && void handleSubmit(onSubmit)(event);
				}}
			>
				<div className="space-y-1">
					<label htmlFor="email" className="text-sm font-medium md:text-lg">
						Email Address
					</label>
					<Input
						{...register("email")}
						autoFocus
						type="email"
						id="email"
						placeholder="Enter your email address"
						className={`min-h-[45px] ${
							errors.email &&
							"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
						}`}
					/>
					<FormErrorMessage
						error={errors.email!}
						errorMsg={errors.email?.message!}
					/>
				</div>
				<div className="mt-2 space-y-1 md:mt-4">
					<label htmlFor="password" className="text-sm font-medium md:text-lg">
						Password
					</label>
					<Input
						{...register("password")}
						type="password"
						id="password"
						placeholder="Enter password"
						className={`min-h-[45px] ${
							errors.password &&
							"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
						}`}
					/>
					<FormErrorMessage
						error={errors.password!}
						errorMsg={errors.password?.message!}
					/>
				</div>
				<div className="mb-4 mt-2 flex justify-end ">
					<Link
						href="/forgot-password"
						className="text-sm font-semibold text-abeg-primary hover:underline md:text-base"
					>
						Forgot Password?
					</Link>
				</div>

				<CloudFlareTurnStile
					ref={cfTurnStile}
					onStatusChange={handleBotStatus}
				/>
				<div className="mt-6 flex flex-col gap-6">
					<CustomDialog
						isOpen={openModal}
						setIsOpen={() => setOpenModal(skip2FA as boolean)}
						trigger={
							<Button
								type="submit"
								disabled={isSubmitting || success}
								loading={isSubmitting}
								variant="primary"
								className="disabled:bg-gray-500 "
								fullWidth
							>
								Sign in
							</Button>
						}
					>
						<div className="text-center">
							<h2 className="text-2xl font-semibold">
								Keep your account safe!
							</h2>
							<div className="mt-3 space-y-2">
								<p className="">Your safety is our number one priority</p>
								<p className="">
									Activate two-factor authentication and add an extra layer of
									security to your account
								</p>
							</div>
							<div className="mt-6 flex flex-col">
								<Link
									className="w-full rounded-md bg-abeg-primary py-4 text-sm font-semibold text-white"
									href="/2fa"
								>
									Activate
								</Link>

								<Button
									type="submit"
									disabled={isSubmitting}
									onClick={handleSkip2fa}
									className="mt-4 border border-abeg-primary py-4 text-abeg-primary disabled:bg-gray-500 disabled:text-white"
									fullWidth
								>
									Skip
								</Button>
							</div>
						</div>
					</CustomDialog>
					{/* <Button
						type="submit"
						disabled={isSubmitting || success}
						loading={isSubmitting}
						className="mt-6"
						variant="primary"
						fullWidth
					>
						Sign in
					</Button> */}
					<p className="text-center text-sm md:text-base">
						Don&apos;t have an account?&nbsp;
						<Link
							href="/signup"
							className="font-medium text-abeg-primary underline"
						>
							Sign up
						</Link>
					</p>
				</div>
			</form>
		</AuthPagesLayout>
	);
};

export default Login;

Login.protect = true;
