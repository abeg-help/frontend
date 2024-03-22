const CrossIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width="8"
		height="9"
		viewBox="0 0 8 9"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M7 7.5L1 1.5"
			stroke="#008080"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M1 7.5L7 1.5"
			stroke="#008080"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
export default CrossIcon;
