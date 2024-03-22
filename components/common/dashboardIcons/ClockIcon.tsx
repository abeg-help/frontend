const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M14.6654 7.99967C14.6654 11.6797 11.6787 14.6663 7.9987 14.6663C4.3187 14.6663 1.33203 11.6797 1.33203 7.99967C1.33203 4.31967 4.3187 1.33301 7.9987 1.33301C11.6787 1.33301 14.6654 4.31967 14.6654 7.99967Z"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M10.4739 10.1202L8.40724 8.88684C8.04724 8.6735 7.75391 8.16017 7.75391 7.74017V5.00684"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ClockIcon;
