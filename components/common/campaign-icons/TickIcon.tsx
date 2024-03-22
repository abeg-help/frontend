const TickIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 12 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g id="vuesax/linear/tick-circle">
			<g id="tick-circle">
				<path
					id="Vector"
					d="M6 11C8.75 11 11 8.75 11 6C11 3.25 8.75 1 6 1C3.25 1 1 3.25 1 6C1 8.75 3.25 11 6 11Z"
					stroke="white"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					id="Vector_2"
					d="M3.875 5.99996L5.29 7.41496L8.125 4.58496"
					stroke="white"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
		</g>
	</svg>
);

export default TickIcon;
