type DeviceCheckReturnType = { isMobileOrTablet: boolean };

const checkIsDeviceMobileOrTablet = (): DeviceCheckReturnType => {
	const deviceHasMouse = window.matchMedia("(pointer:fine)").matches;
	const deviceHasNoMouse = window.matchMedia("(pointer:coarse)").matches;

	switch (true) {
		case deviceHasMouse: {
			return { isMobileOrTablet: false };
		}

		case deviceHasNoMouse: {
			return { isMobileOrTablet: true };
		}

		case "ontouchstart" in window && "maxTouchPoints" in navigator: {
			return { isMobileOrTablet: navigator.maxTouchPoints > 0 };
		}

		case "userAgentData" in navigator &&
			(navigator.userAgentData as { mobile: boolean }).mobile: {
			return { isMobileOrTablet: true };
		}

		default: {
			const mobileDeviceRegex =
				/android|webos|iphone|ipad|ipod|blackberry|mobi|iemobile|opera mini/i;

			return { isMobileOrTablet: mobileDeviceRegex.test(navigator.userAgent) };
		}
	}
};

export { checkIsDeviceMobileOrTablet };
