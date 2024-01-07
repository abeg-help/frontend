import { DatePicker } from "@/components/primitives/Form/DatePicker";
import { Select } from "@/components/primitives/Form/Select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

function StepTwo() {
  return (
    <section>
      <h2 className="text-[1.6rem] font-bold text-formBtn">
        Share your funding goal and deadline
      </h2>

      <form className="mt-[3.2rem] flex flex-col gap-[2.4rem]">
        <div>
          <label className="text-[1.4rem] font-semibold">Campaign Title</label>

          <input
            type="text"
            placeholder="Give your campaign a catchy title that can resonate with donors"
            className="mt-[1.6rem] w-full rounded-[10px] border-[1px] border-unfocused p-[1.5rem_0.8rem] text-[1rem] focus-visible:outline-formBtn"
          />
        </div>

        <div>
          <label className="text-[1.4rem] font-semibold">
            Who is fundraising?
          </label>

          <Select.Root>
            <Select.Trigger
              icon={<ChevronDownIcon />}
              className="mt-[1.6rem] rounded-[10px] border-unfocused p-[2.3rem_0.8rem] text-[1rem] data-[placeholder]:text-placeholder"
            >
              <Select.Value placeholder="Select your country" />
            </Select.Trigger>

            <Select.Content id="category">
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="blueberry">Blueberry</Select.Item>
              <Select.Item value="grapes">Grapes</Select.Item>
              <Select.Item value="pineapple">Pineapple</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div>
          <label className="text-[1.4rem] font-semibold">Campaign Goal</label>

          <input
            type="text"
            placeholder="Set a realistic target amount"
            className="mt-[1.6rem] w-full rounded-[10px] border-[1px] border-unfocused p-[1.5rem_0.8rem] text-[1rem] focus-visible:outline-formBtn"
          />
        </div>

        <div>
          <label className="text-[1.4rem] font-semibold">
            Campaign Deadline
          </label>

          <DatePicker />
        </div>
      </form>
    </section>
  );
}

export default StepTwo;
