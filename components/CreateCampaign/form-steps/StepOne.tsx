import Button from "@/components/primitives/Button/button";
import { Select } from "@/components/primitives/Form/Select";
import crossIcon from "@/public/assets/icons/campaign/cross-icon.svg";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRef, useState } from "react";

function StepOne() {
  const [campaignTags, setCampaignTags] = useState<string[]>([]);
  const campaignTagInputRef = useRef<HTMLInputElement>(null);

  const handleCampaignTagAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!campaignTagInputRef.current) return;

    if (campaignTagInputRef.current.value.length < 3) return; //TODO - show error

    if (campaignTags.includes(campaignTagInputRef.current.value)) return; //TODO - show error

    if (campaignTags.length >= 5) return; //TODO - show error

    setCampaignTags([...campaignTags, campaignTagInputRef.current.value]);

    campaignTagInputRef.current.value = "";
  };

  const handleRemoveTags = (tag: string) => () => {
    setCampaignTags((prevState) => prevState.filter((t) => t !== tag));
  };

  return (
    <section>
      <h2 className="text-[1.6rem] font-bold text-formBtn">
        Create a campaign to fund your passion or cause.
      </h2>

      <form className="mt-[3.2rem] flex flex-col gap-[2.4rem]">
        <div>
          <label className="text-[1.4rem] font-semibold">
            What best describes your fundraiser?
          </label>

          <Select.Root>
            <Select.Trigger
              icon={<ChevronDownIcon />}
              className="mt-[1.6rem] rounded-[10px] border-unfocused p-[2.1rem_0.8rem] text-[1rem] data-[placeholder]:text-placeholder"
            >
              <Select.Value placeholder="Select what category best suit your fundraiser" />
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
          <label className="text-[1.4rem] font-semibold">
            What country are you located?
          </label>

          <Select.Root>
            <Select.Trigger
              icon={<ChevronDownIcon />}
              className="mt-[1.6rem] rounded-[10px] border-unfocused p-[2.3rem_0.8rem] text-[1rem] data-[placeholder]:text-placeholder"
            >
              <Select.Value placeholder="Select your country" />
            </Select.Trigger>

            <Select.Content>
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="blueberry">Blueberry</Select.Item>
              <Select.Item value="grapes">Grapes</Select.Item>
              <Select.Item value="pineapple">Pineapple</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </form>

      <form
        className="mt-[2.4rem] flex flex-col gap-[1.6rem]"
        onSubmit={handleCampaignTagAdd}
      >
        <label className="text-[1.4rem] font-semibold">Campaign Tags</label>

        <div className="flex gap-[1.6rem]">
          <input
            ref={campaignTagInputRef}
            type="text"
            placeholder="Add hashtags or search keywords to your campaign"
            className="w-full rounded-[10px] border-[1px] border-unfocused p-[1.5rem_0.8rem] text-[1rem] focus-visible:outline-formBtn"
          />

          <Button
            variant="secondary"
            className="rounded-[6px] border-formBtn p-[0.8rem_1.2rem] text-[1.2rem] font-semibold text-formBtn"
            type="submit"
          >
            Add
          </Button>
        </div>

        <span className="text-[1.2rem] text-formBtn">
          {campaignTags.length}/5 tags
        </span>

        <ul className="flex min-h-[3.6rem] flex-wrap gap-[0.8rem] text-[1.2rem] font-medium text-formBtn">
          {campaignTags.map((tag) => (
            <li
              key={tag}
              className="flex min-w-[8rem] items-center justify-between gap-[1rem] rounded-[20px] border-[1px] border-formBtn bg-[rgb(229,242,242)] p-[0.4rem_1.2rem]"
            >
              <p>#{tag}</p>

              <button
                className="aspect-square w-[1.8rem] transition-transform duration-100 active:scale-[1.12]"
                type="button"
                onClick={handleRemoveTags(tag)}
              >
                <Image src={crossIcon as string} alt="remove tag" />
              </button>
            </li>
          ))}
        </ul>
      </form>
    </section>
  );
}

export default StepOne;
