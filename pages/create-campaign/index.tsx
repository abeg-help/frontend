import Stepper from "@/components/CreateCampaign/Stepper";
import { StepTwo } from "@/components/CreateCampaign/form-steps";
import Button from "@/components/primitives/Button/button";

function CreateCampaignPage() {
  return (
    <main className="pt-[3.2rem]" data-rem-reset>
      <div className="flex flex-col gap-[3.2rem] px-[2.4rem]">
        <Stepper />
        {/* <StepOne /> */}
        <StepTwo />
      </div>

      <div className="mt-[4rem] w-full border-t-[1px] border-t-formBtn p-[1.6rem_2.4rem]">
        <Button
          variant="primary"
          className="ml-auto block rounded-[6px] bg-formBtn p-[0.8rem_1.2rem] text-[1.2rem] font-semibold"
        >
          Continue
        </Button>
      </div>
    </main>
  );
}

export default CreateCampaignPage;
