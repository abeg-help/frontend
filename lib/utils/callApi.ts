import { useSession } from "@/store/useSession";
import { createFetcher } from "./create-fetcher";
import { assertENV } from "./global-type-helpers";

const callApi = createFetcher({
  baseURL: assertENV(process.env.NEXT_PUBLIC_BACKEND_URL),
  timeout: 60000, // Set timeout to 60 seconds

  onResponseError: (response) => {
    if (response.status === 401) {
      useSession.getState().clearSession();
    }
  },
});

export { callApi };
