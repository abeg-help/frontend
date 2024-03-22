import { cn } from "@/lib";
import { useElementList } from "@/lib/hooks";
import { type StepThreeData, useFormStore } from "@/store";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

type ImagePreviewProps = {
	value: StepThreeData["photos"];
	onChange: (files: StepThreeData["photos"]) => void;
};

function ImagePreview(props: ImagePreviewProps) {
	const { value: imageFiles, onChange } = props;

	const { updateFormData } = useFormStore((state) => state.actions);

	const [ImagePreviewList] = useElementList();

	const imageUrls = imageFiles.map((file) => {
		if (file instanceof File) {
			return URL.createObjectURL(file);
		}

		return file;
	});

	const handleRemoveImage =
		(imageFile: StepThreeData["photos"][number]) => () => {
			const updatedFileState = imageFiles.filter((file) => {
				if (file instanceof File && imageFile instanceof File) {
					return file.name !== imageFile.name;
				}

				if (typeof file === "string" && typeof imageFile === "string") {
					return file !== imageFile;
				}

				return false;
			});

			updateFormData({ photos: updatedFileState });

			onChange(updatedFileState);
		};

	return (
		<ImagePreviewList
			className={cn(
				"custom-scrollbar relative mt-[13px] max-h-[140px] divide-y divide-gray-600 overflow-y-auto overscroll-y-contain rounded-md border border-gray-600",
				imageFiles.length === 0 && "hidden"
			)}
			each={imageFiles}
			render={(file, index) => {
				const isCoverImage = index === 0;

				return (
					<li
						key={file instanceof File ? file.name : file}
						className="flex items-center justify-between p-2 text-xs"
					>
						<div className="flex min-w-0 items-center gap-2">
							<Image
								src={imageUrls[index]}
								className="size-[50px] shrink-0 rounded-md object-cover"
								width={50}
								height={50}
								fetchPriority="high"
								priority
								alt="thumbnail"
							/>

							{file instanceof File && <p className="truncate">{file.name}</p>}

							{isCoverImage && (
								<span className="absolute left-[50%] top-0.5 block translate-x-[-50%] text-xs font-bold text-abeg-primary">
									*Cover image
								</span>
							)}
						</div>

						{file instanceof File && (
							<button type="button" onClick={handleRemoveImage(file)}>
								<Trash2Icon
									size={20}
									className="text-red-500 active:scale-110"
								/>
							</button>
						)}
					</li>
				);
			}}
		/>
	);
}

export default ImagePreview;
