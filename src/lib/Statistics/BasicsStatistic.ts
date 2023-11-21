import Statistic from "./Statistic";

export type BasicsStatisticResult = {
  totalOrders: number | undefined;
  totalProducts: number | undefined;
  totalStores: number | undefined;
  totalAmount: number | undefined;
};

export default class BasicsStatistic extends Statistic<BasicsStatisticResult> {
  name = "BasicsStatistic";

  calculateResult(): BasicsStatisticResult {
    const totalOrders = this.wrapped.userData.length;
    const { totalProducts, totalStores, totalAmount } =
      this.wrapped.userData.reduce(
        (acc, cur) => {
          return {
            totalProducts: acc.totalProducts + cur.items.length,
            totalStores: acc.totalStores + (cur.storeName ? 1 : 0),
            totalAmount: acc.totalAmount + cur.totalPrice,
          };
        },
        { totalProducts: 0, totalStores: 0, totalAmount: 0 }
      );

    return {
      totalOrders,
      totalProducts,
      totalStores,
      totalAmount,
    };
  }

  getDefaultValue(): BasicsStatisticResult {
    return {
      totalOrders: undefined,
      totalProducts: undefined,
      totalStores: undefined,
      totalAmount: undefined,
    };
  }
}
