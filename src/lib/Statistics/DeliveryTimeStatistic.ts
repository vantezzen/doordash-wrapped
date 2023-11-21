import Statistic from "./Statistic";

export type DeliveryTimeStatisticResult = {
  averageDeliveryTime: number | undefined; // in seconds
  totalDeliveryTime: number | undefined; // in seconds
};

export default class DeliveryTimeStatistic extends Statistic<DeliveryTimeStatisticResult> {
  name = "DeliveryTimeStatistic";

  calculateResult(): DeliveryTimeStatisticResult {
    const [totalDeliveryTime, deliveriesWithTime] =
      this.wrapped.userData.reduce(
        (acc, cur) => {
          if (cur.deliveryTime) {
            const deliveryLength =
              (cur.deliveryTime.getTime() - cur.createdAt.getTime()) / 1000;
            return [acc[0] + deliveryLength, acc[1] + 1];
          }
          return acc;
        },
        [0, 0]
      );

    const averageDeliveryTime = totalDeliveryTime / deliveriesWithTime;

    return {
      averageDeliveryTime,
      totalDeliveryTime,
    };
  }

  getDefaultValue(): DeliveryTimeStatisticResult {
    return {
      averageDeliveryTime: undefined,
      totalDeliveryTime: undefined,
    };
  }
}
