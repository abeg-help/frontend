import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import Button, { buttonVariants } from "../../Button/button";
import Calendar from "./Calender";
import { Popover } from "./Popover";

const DatePicker = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="secondary"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounder-[6px] mt-[1.6rem] w-full justify-between border border-unfocused p-[2.3rem_0.8rem] text-left text-[1.2rem] font-normal",
            !date && "text-muted-foreground",
          )}
        >
          {date ? (
            format(date, "PPP")
          ) : (
            <span>Specify the end date for your campaign</span>
          )}

          <CalendarIcon className="aspect-square w-[1.6rem]" />
        </Button>
      </Popover.Trigger>

      <Popover.Content className="w-auto p-0">
        <Calendar
          className="rounded-[10px] border border-unfocused p-[1.2rem]"
          classNames={{
            cell: "text-[1.2rem] font-medium hover:scale-[1.03]",
          }}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </Popover.Content>
    </Popover.Root>
  );
};

export default DatePicker;
