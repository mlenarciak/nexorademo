import { Calendar } from "@repo/design-system/components/ui/calendar";
import type { Meta, StoryObj } from "@storybook/react";
import { addDays } from "date-fns";
import { action } from "storybook/actions";

const MINIMUM_MULTIPLE_SELECTION = 1;
const MULTIPLE_SELECTION_OFFSETS = [2, 8] as const;
const RANGE_SELECTION_END_OFFSET = 7;
const DISABLED_DAY_OFFSETS = [1, 2, 3, 5];
const VISIBLE_MONTHS_COUNT = 2;

/**
 * A date field component that allows users to enter and edit date.
 */
const meta = {
  title: "ui/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    mode: "single",
    selected: new Date(),
    onSelect: action("onDayClick"),
    className: "rounded-md border w-fit",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the calendar.
 */
export const Default: Story = {};

/**
 * Use the `multiple` mode to select multiple dates.
 */
export const Multiple: Story = {
  args: {
    min: MINIMUM_MULTIPLE_SELECTION,
    selected: [
      new Date(),
      ...MULTIPLE_SELECTION_OFFSETS.map((offset) =>
        addDays(new Date(), offset)
      ),
    ],
    mode: "multiple",
  },
};

/**
 * Use the `range` mode to select a range of dates.
 */
export const Range: Story = {
  args: {
    selected: {
      from: new Date(),
      to: addDays(new Date(), RANGE_SELECTION_END_OFFSET),
    },
    mode: "range",
  },
};

/**
 * Use the `disabled` prop to disable specific dates.
 */
export const Disabled: Story = {
  args: {
    disabled: DISABLED_DAY_OFFSETS.map((offset) => addDays(new Date(), offset)),
  },
};

/**
 * Use the `numberOfMonths` prop to display multiple months.
 */
export const MultipleMonths: Story = {
  args: {
    numberOfMonths: VISIBLE_MONTHS_COUNT,
    showOutsideDays: false,
  },
};
