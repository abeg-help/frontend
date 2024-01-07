import { cn } from "@/lib/utils";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef } from "react";

type ForwardedRefType<TComponent extends React.ElementType> =
  React.ForwardedRef<React.ElementRef<TComponent>>;

type SelectPropsType<TComponent extends React.ElementType> =
  React.ComponentPropsWithoutRef<TComponent>;

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = (
  props: SelectPropsType<typeof SelectPrimitive.Trigger> & {
    icon?: React.JSX.Element;
  },
  ref: ForwardedRefType<typeof SelectPrimitive.Trigger>,
) => {
  const { children, icon, className, ...restOfProps } = props;

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
      {...restOfProps}
    >
      {children}

      <SelectPrimitive.Icon asChild>
        {icon ?? <CaretSortIcon className="h-4 w-4 opacity-50" />}
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

const SelectScrollUpButton = (
  props: SelectPropsType<typeof SelectPrimitive.ScrollUpButton>,
  ref: ForwardedRefType<typeof SelectPrimitive.ScrollUpButton>,
) => {
  const { className, ...restOfProps } = props;

  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...restOfProps}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
};

const SelectScrollDownButton = (
  props: SelectPropsType<typeof SelectPrimitive.ScrollDownButton>,
  ref: ForwardedRefType<typeof SelectPrimitive.ScrollDownButton>,
) => {
  const { className, ...restOfProps } = props;

  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...restOfProps}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  );
};

const SelectContent = (
  props: SelectPropsType<typeof SelectPrimitive.Content>,
  ref: ForwardedRefType<typeof SelectPrimitive.Content>,
) => {
  const { className, children, position = "popper", ...restOfProps } = props;

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...restOfProps}
      >
        <SelectScrollUpButton />

        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>

        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

const SelectLabel = (
  props: SelectPropsType<typeof SelectPrimitive.Label>,
  ref: ForwardedRefType<typeof SelectPrimitive.Label>,
) => {
  const { className, ...restOfProps } = props;

  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...restOfProps}
    />
  );
};

const SelectItem = (
  props: SelectPropsType<typeof SelectPrimitive.Item>,
  ref: ForwardedRefType<typeof SelectPrimitive.Item>,
) => {
  const { className, children, ...restOfProps } = props;

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...restOfProps}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

const SelectSeparator = (
  props: SelectPropsType<typeof SelectPrimitive.Separator>,
  ref: ForwardedRefType<typeof SelectPrimitive.Separator>,
) => {
  const { className, ...restOfProps } = props;

  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...restOfProps}
    />
  );
};

const Select = {
  Root: SelectRoot,
  Content: forwardRef(SelectContent),
  Group: SelectGroup,
  Item: forwardRef(SelectItem),
  Label: forwardRef(SelectLabel),
  ScrollDownButton: forwardRef(SelectScrollDownButton),
  ScrollUpButton: forwardRef(SelectScrollUpButton),
  Separator: forwardRef(SelectSeparator),
  Trigger: forwardRef(SelectTrigger),
  Value: SelectValue,
};

export { Select, SelectPrimitive };
