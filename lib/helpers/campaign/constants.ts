import type { Writeable } from "@/lib/type-helpers";
import { add } from "date-fns";

const _targetCountries = [
	"Nigeria",
	"Ghana",
	"Mali",
	"Liberia",
	"Cameroon",
	"Gambia",
] as const;

export const targetCountries = _targetCountries as Writeable<
	typeof _targetCountries
>;

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const MAX_FILE_QUANTITY = 5;

export const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

export const acceptedFilesString = allowedFileTypes.join(", ");

export const DATE_TODAY = new Date();

export const DATE_NEXT_TOMORROW = add(DATE_TODAY, { days: 2 });
