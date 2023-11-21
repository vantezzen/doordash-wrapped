import Statistic from "./Statistic";

export type MostActiveWeekdayStatisticResult = {
  weekday: string | undefined;
  times: number | undefined;
};

export default class MostActiveWeekdayStatistic extends Statistic<MostActiveWeekdayStatisticResult> {
  name = "MostActiveWeekdayStatistic";

  calculateResult(): MostActiveWeekdayStatisticResult {
    const ordersPerWeekday = [0, 0, 0, 0, 0, 0, 0];

    for (const order of this.wrapped.userData) {
      ordersPerWeekday[order.createdAt.getDay()]++;
    }

    const mostActiveWeekday = ordersPerWeekday.reduce(
      (acc, cur, index) => {
        if (cur > acc[1]) {
          return [index, cur] as [number, number];
        }
        return acc;
      },
      [0, 0] as [number, number]
    );

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ] as const;

    return {
      weekday: weekdays[mostActiveWeekday[0]],
      times: mostActiveWeekday[1],
    };
  }

  getDefaultValue(): MostActiveWeekdayStatisticResult {
    return {
      weekday: undefined,
      times: undefined,
    };
  }
}
