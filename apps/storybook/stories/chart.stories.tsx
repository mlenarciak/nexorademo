import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/design-system/components/ui/chart";
import type { Meta, StoryObj } from "@storybook/react";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from "recharts";

const CHART_HORIZONTAL_MARGIN = 12;
const MONTH_LABEL_LENGTH = 3;
const AREA_TICK_MARGIN = 8;
const BAR_TICK_MARGIN = 10;
const AREA_FILL_OPACITY = 0.4;
const BAR_CORNER_RADIUS = 4;
const LINE_STROKE_WIDTH = 2;
const PIE_INNER_RADIUS = 48;
const PIE_STROKE_WIDTH = 5;
const PIE_LABEL_OFFSET = 24;

const multiSeriesData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const multiSeriesConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const singleSeriesData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const singleSeriesConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

/**
 * Beautiful charts. Built using Recharts. Copy and paste into your apps.
 */
const meta = {
  title: "ui/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    children: <div />,
  },
} satisfies Meta<typeof ChartContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Combine multiple Area components to create a stacked area chart.
 */
export const StackedAreaChart: Story = {
  args: {
    config: multiSeriesConfig,
  },
  render: (args) => (
    <ChartContainer {...args}>
      <AreaChart
        accessibilityLayer
        data={multiSeriesData}
        margin={{
          left: CHART_HORIZONTAL_MARGIN,
          right: CHART_HORIZONTAL_MARGIN,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="month"
          tickFormatter={(value) => value.slice(0, MONTH_LABEL_LENGTH)}
          tickLine={false}
          tickMargin={AREA_TICK_MARGIN}
        />
        <ChartTooltip
          content={<ChartTooltipContent indicator="dot" />}
          cursor={false}
        />
        <Area
          dataKey="mobile"
          fill="var(--color-mobile)"
          fillOpacity={AREA_FILL_OPACITY}
          stackId="a"
          stroke="var(--color-mobile)"
          type="natural"
        />
        <Area
          dataKey="desktop"
          fill="var(--color-desktop)"
          fillOpacity={AREA_FILL_OPACITY}
          stackId="a"
          stroke="var(--color-desktop)"
          type="natural"
        />
      </AreaChart>
    </ChartContainer>
  ),
};

/**
 * Combine multiple Bar components to create a stacked bar chart.
 */
export const StackedBarChart: Story = {
  args: {
    config: multiSeriesConfig,
  },
  render: (args) => (
    <ChartContainer {...args}>
      <BarChart accessibilityLayer data={multiSeriesData}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="month"
          tickFormatter={(value) => value.slice(0, MONTH_LABEL_LENGTH)}
          tickLine={false}
          tickMargin={BAR_TICK_MARGIN}
        />
        <ChartTooltip
          content={<ChartTooltipContent indicator="dashed" />}
          cursor={false}
        />
        <Bar
          dataKey="desktop"
          fill="var(--color-desktop)"
          radius={BAR_CORNER_RADIUS}
        />
        <Bar
          dataKey="mobile"
          fill="var(--color-mobile)"
          radius={BAR_CORNER_RADIUS}
        />
      </BarChart>
    </ChartContainer>
  ),
};

/**
 * Combine multiple Line components to create a single line chart.
 */
export const MultiLineChart: Story = {
  args: {
    config: multiSeriesConfig,
  },
  render: (args) => (
    <ChartContainer {...args}>
      <LineChart
        accessibilityLayer
        data={multiSeriesData}
        margin={{
          left: CHART_HORIZONTAL_MARGIN,
          right: CHART_HORIZONTAL_MARGIN,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="month"
          tickFormatter={(value) => value.slice(0, MONTH_LABEL_LENGTH)}
          tickLine={false}
          tickMargin={AREA_TICK_MARGIN}
        />
        <ChartTooltip
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
        />
        <Line
          dataKey="desktop"
          dot={false}
          stroke="var(--color-desktop)"
          strokeWidth={LINE_STROKE_WIDTH}
          type="natural"
        />
        <Line
          dataKey="mobile"
          dot={false}
          stroke="var(--color-mobile)"
          strokeWidth={LINE_STROKE_WIDTH}
          type="natural"
        />
      </LineChart>
    </ChartContainer>
  ),
};

/**
 * Combine Pie and Label components to create a doughnut chart.
 */
export const DoughnutChart: Story = {
  args: {
    config: singleSeriesConfig,
  },
  render: (args) => {
    const totalVisitors = useMemo(
      () => singleSeriesData.reduce((acc, curr) => acc + curr.visitors, 0),
      []
    );
    return (
      <ChartContainer {...args}>
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent hideLabel />}
            cursor={false}
          />
          <Pie
            data={singleSeriesData}
            dataKey="visitors"
            innerRadius={PIE_INNER_RADIUS}
            nameKey="browser"
            strokeWidth={PIE_STROKE_WIDTH}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      dominantBaseline="middle"
                      textAnchor="middle"
                      x={viewBox.cx}
                      y={viewBox.cy}
                    >
                      <tspan
                        className="fill-foreground font-bold text-3xl"
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        className="fill-muted-foreground"
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + PIE_LABEL_OFFSET}
                      >
                        Visitors
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    );
  },
};
