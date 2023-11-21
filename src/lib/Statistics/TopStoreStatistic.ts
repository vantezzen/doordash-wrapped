import { Orders } from "../types";
import Statistic from "./Statistic";

export type TopStoreStatisticResult = {
  name: string | undefined;
  totalPrice: number | undefined;
  times: number | undefined;
};

export default class TopStoreStatistic extends Statistic<TopStoreStatisticResult> {
  name = "TopStoreStatistic";

  calculateResult(): TopStoreStatisticResult {
    const ordersPerStore: {
      [store: string]: Orders;
    } = {};

    for (const order of this.wrapped.userData) {
      if (!ordersPerStore[order.storeName]) {
        ordersPerStore[order.storeName] = [];
      }

      ordersPerStore[order.storeName].push(order);
    }

    // Get the store with the most orders
    const topStore = Object.entries(ordersPerStore).reduce(
      (acc, cur) => {
        if (cur[1].length > acc[1].length) {
          return cur;
        }
        return acc;
      },
      ["", []] as [string, Orders]
    );

    return {
      name: topStore[0],
      totalPrice: topStore[1].reduce((acc, cur) => acc + cur.totalPrice, 0),
      times: topStore[1].length,
    };
  }

  getDefaultValue(): TopStoreStatisticResult {
    return {
      name: undefined,
      totalPrice: undefined,
      times: undefined,
    };
  }
}
