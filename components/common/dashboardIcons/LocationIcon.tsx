const LocationIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
				d="M8.00187 8.95297C9.15063 8.95297 10.0819 8.02172 10.0819 6.87297C10.0819 5.72422 9.15063 4.79297 8.00187 4.79297C6.85312 4.79297 5.92188 5.72422 5.92188 6.87297C5.92188 8.02172 6.85312 8.95297 8.00187 8.95297Z"
				stroke="white"
				strokeWidth="1.5"
			/>
			<path
				d="M2.41184 5.65968C3.72517 -0.113657 12.2785 -0.106991 13.5852 5.66634C14.3518 9.05301 12.2452 11.9197 10.3985 13.693C9.0585 14.9863 6.9385 14.9863 5.59184 13.693C3.75184 11.9197 1.64517 9.04634 2.41184 5.65968Z"
				stroke="white"
				strokeWidth="1.5"
			/>
		</svg>
	);
};

export default LocationIcon;
