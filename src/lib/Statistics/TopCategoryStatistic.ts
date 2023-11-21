import { Item } from "../types";
import Statistic from "./Statistic";

export type TopCategoryStatisticResult = {
  name: string | undefined;
  totalPrice: number | undefined;
  times: number | undefined;
};

export default class TopCategoryStatistic extends Statistic<TopCategoryStatisticResult> {
  name = "TopCategoryStatistic";

  calculateResult(): TopCategoryStatisticResult {
    const itemsPerCategory: {
      [category: string]: Item[];
    } = {};

    for (const order of this.wrapped.userData) {
      for (const item of order.items) {
        if (!itemsPerCategory[item.category]) {
          itemsPerCategory[item.category] = [];
        }

        itemsPerCategory[item.category].push(item);
      }
    }

    // Get the category with the most items
    const topCategory = Object.entries(itemsPerCategory).reduce(
      (acc, cur) => {
        if (cur[1].length > acc[1].length) {
          return cur;
        }
        return acc;
      },
      ["", []] as [string, Item[]]
    );

    return {
      name: topCategory[0],
      totalPrice: topCategory[1].reduce((acc, cur) => acc + cur.subtotal, 0),
      times: topCategory[1].reduce((acc, cur) => acc + cur.quantity, 0),
    };
  }

  getDefaultValue(): TopCategoryStatisticResult {
    return {
      name: undefined,
      totalPrice: undefined,
      times: undefined,
    };
  }
}
