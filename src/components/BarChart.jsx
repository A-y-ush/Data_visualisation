import { BarChart } from "@tremor/react";

const chartdata = [
  {
    name: "90_day_Cooling_off",
    Count: 74,
  },
  {
    name: "Other",
    Count: 11,
  },
  {
    name: "state_process",
    Count: 6,
  },
  {
    name: "Open_negotiation_not_initiated",
    Count: 31,
  },
  {
    name: "Open_negotiation_not_complete",
    Count: 12,
  },
  {
    name: "Exceeded_4_day",
    Count: 1,
  },
  {
    name: "Notice_of_initiation_not_submitted",
    Count: 6,
  },
  {
    name: "nsa_ineligible",
    Count: 3,
  },
  {
    name: "Incorrectly_bundled",
    Count: 0,
  },
  {
    name: "Plan_not_subject_to_NSA",
    Count: 1,
  },
  {
    name: "Item_or_service_not_covered_by_plan",
    Count: 0,
  },
  {
    name: "Incorrectly_batchedtem_or_service_not_covered_by_plan",
    Count: 8,
  },
  {
    name: "Prior_to_applicable_policy_year",
    Count: 1,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

const BarChartHero = () => (
  <div className="">
    <BarChart
      data={chartdata}
      index="name"
      categories={["Count"]}
      colors={["blue"]}
      valueFormatter={dataFormatter}
      yAxisWidth={24}
      onValueChange={(v) => console.log(v)}
    />
  </div>
);

export default BarChartHero;
