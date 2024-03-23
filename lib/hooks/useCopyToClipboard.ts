import { useState } from "react";

const oldSchoolCopy = (text: string) => {
	const tempTextArea = document.createElement("textarea");
	tempTextArea.value = text;
	document.body.append(tempTextArea);
	tempTextArea.select();
	document.execCommand("copy");
	tempTextArea.remove();
};

const useCopyToClipboard = () => {
	const [state, setState] = useState("");

	const copyToClipboard = (value: string) => {
		const handleCopy = async () => {
			try {
				if (!navigator?.clipboard?.writeText) {
					throw new Error("writeText not supported");
				}

				await navigator.clipboard.writeText(value);
				setState(value);
			} catch (error) {
				console.warn(error);

				oldSchoolCopy(value);
				setState(value);
			}
		};

		void handleCopy();
	};

	return { copiedValue: state, copyToClipboard };
};

export { useCopyToClipboard };
