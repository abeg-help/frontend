import tickIcon from "@/public/assets/icons/campaign/tick-circle.svg";
import Image from "next/image";

const semanticClasses = {
  stepperIcon:
    "grid font-bold shrink-0 text-white place-content-center aspect-square w-[2rem] bg-formBtn rounded-full",
};

function Stepper() {
  return (
    <section className="flex gap-[1.2rem]">
      <div className="flex flex-col items-center gap-[0.4rem] text-[1.2rem]">
        <span className={semanticClasses.stepperIcon}>
          <Image src={tickIcon as string} alt="" width={12} height={12} />
        </span>

        <hr className="basis-full [border:1px_dashed_rgb(0,128,128)]" />

        <span className={semanticClasses.stepperIcon}>2</span>

        <hr className="basis-full [border:1px_dashed_rgb(0,128,128)]" />

        <span className={semanticClasses.stepperIcon}>3</span>
      </div>

      <div className="flex flex-col items-center justify-between gap-[3.2rem] text-[1rem] text-formBtn">
        <article className="w-full">
          <h5 className="text-[1.2rem] font-medium">Basic Info</h5>
          <p>Create a campaign to fund your passion or cause</p>
        </article>

        <article className="w-full">
          <h5 className="text-[1.2rem] font-medium">Funding</h5>
          <p>Share your funding goal and deadline</p>
        </article>

        <article className="w-full">
          <h5 className="text-[1.2rem] font-medium">Story</h5>
          <p>Your story matters, and this is where it begins</p>
        </article>
      </div>
    </section>
  );
}
export default Stepper;
