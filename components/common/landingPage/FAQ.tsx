import { useState } from "react";

const faqData = [
	{
		question: "How does AbegHelp.me work?",
		answer: (
			<>
				<p>Here&apos;s how fundraising on AbegHelp.me works:</p>
				<p>
					To get started, just tap the &apos;Start fundraiser&apos; button.
					After a few questions to help set up your fundraiser, you&apos;ll then
					write your fundraising story. Next, you&apos;ll customize your
					fundraiser, adding details to let potential donors understand your
					cause.
				</p>
				<p>
					Once your fundraiser is live, you can always add additional photos and
					videos or lower or raise your goal anytime. The best way to raise
					funds is by sharing your fundraiser. Call family, text friends,
					message coworkers, or post your fundraiser link on social media to
					help you reach your fundraising goal.
				</p>
				<p>
					If you need us, we&apos;ll be there every step of the way with
					fundraising tips and support. Ready to get started? Start a
					AbegHelp.me fundraiser today!
				</p>
			</>
		),
	},
	{
		question: "What can I raise money for?",
		answer: (
			<>
				<p>
					We see people use AbegHelp.me to raise money for themselves, friends
					and family, or even complete strangers in random acts of kindness.
					People raise money for just about everything, including medical
					expenses, education costs, volunteer programs, youth sports, funerals
					& memorials, and even animals & pets.
				</p>

				<p>
					We&apos;re always amazed at the ways people use AbegHelp.me to raise
					money. Check out some recent success stories, or see how AbegHelp.me
					works.
				</p>
			</>
		),
	},
	{
		question: "How does AbegHelp.me keep fundraisers safe?",
		answer: (
			<>
				<p>
					AbegHelp.me features the very best in secure payment encryption
					technology. Your donors&apos; online payments are safe, and your money
					is stored securely until you&apos;re ready to request a withdrawal via
					electronic bank transfer.
				</p>
			</>
		),
	},
	{
		question: "Can a friend withdraw the money I raise for them?",
		answer: (
			<>
				<p>
					Yes. AbegHelp.me makes it easy for another friend or family member to
					securely access the funds you have raised. Through AbegHelp.me, they
					will receive direct access to the money you have raised. Please note:
					You will not be able to enter their bank information during the
					withdrawal process; they will need to do this themselves.
				</p>
			</>
		),
	},
	{
		question: "Are there any deadlines or time limits?",
		answer: (
			<>
				<p>
					While there are important withdrawals deadlines you&apos;ll need to
					observe to avoid donations being refunded to donors, your fundraiser
					will remain live until you choose to turn off donations or remove the
					fundraiser altogether. Most organizers leave their fundraisers active
					indefinitely to refer back to the kind comments and support they
					received.
				</p>
			</>
		),
	},
	{
		question: "What if I do not reach my goal?",
		answer: (
			<>
				<p>
					No problem. Reaching your goal is not required. With AbegHelp.me, you
					keep each and every donation you receive. Your fundraiser will be able
					to accept donations even after your goal is reached. Once the goal is
					reached, the progress meter on your fundraiser will show that you have
					received more than your goal amount. If you&apos;d like to continue
					raising money, you can keep your fundraiser running for as long as
					you&apos;d like.
				</p>
			</>
		),
	},
	{
		question: "How do I get donations?",
		answer: (
			<>
				<p>
					AbegHelp.me provides an easy way to raise money from your friends,
					family, and online community. Our platform makes it simple to share
					your fundraiser in a variety of ways to bring in donations, track your
					progress, and post updates to engage your community.
				</p>
			</>
		),
	},
	{
		question: "Is my country supported?",
		answer: (
			<>
				<p>
					We are currently supporting 17 African countries. We are working on
					expanding our support to more countries.
				</p>
			</>
		),
	},
];

const FAQ = ({ padding }: { padding?: String }) => {
	// State to manage the visibility of each question's answer
	const [expanded, setExpanded] = useState<boolean[]>([]);

	const toggleAnswer = (index: number) => {
		setExpanded((prevExpanded) => {
			const newExpanded = [...prevExpanded];
			newExpanded[index] = !newExpanded[index]; // Toggle the visibility of the answer when the '+' or '-' icon is clicked
			return newExpanded;
		});
	};
	return (
		<div className={`${padding}`}>
			<p className="text-xl text-placeholder">Wanna know more?</p>
			<h1 className="mb-10 mt-5 text-4xl font-bold md:mb-20 md:text-5xl">
				Frequently asked questions
			</h1>
			{faqData.map((item, index) => (
				<div key={index} className="mb-4 space-y-2 bg-white p-4">
					<div className="flex items-center justify-between">
						<h3
							className="cursor-pointer text-2xl font-semibold"
							onClick={() => toggleAnswer(index)}
						>
							{item.question}
						</h3>
						<span
							className="mr-2 cursor-pointer text-2xl md:text-3xl"
							onClick={() => toggleAnswer(index)}
						>
							{expanded[index] ? "−" : "+"}
						</span>
					</div>
					{expanded[index] && (
						<div className="space-y-5 pt-5 text-xl"> {item.answer}</div>
					)}
					<div className="mt-2 border-t-2 border-gray-300"></div>
				</div>
			))}
		</div>
	);
};
export default FAQ;
