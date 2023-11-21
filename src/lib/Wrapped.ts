import SpotifyFramePlayer from "./Spotify/FramePlayer";
import * as Sentry from "@sentry/nextjs";
import Statistic from "./Statistics/Statistic";
import { Orders } from "./types";
import BasicsStatistic, {
  BasicsStatisticResult,
} from "./Statistics/BasicsStatistic";
import DeliveryTimeStatistic, {
  DeliveryTimeStatisticResult,
} from "./Statistics/DeliveryTimeStatistic";
import TopCategoryStatistic, {
  TopCategoryStatisticResult,
} from "./Statistics/TopCategoryStatistic";
import TopStoreStatistic, {
  TopStoreStatisticResult,
} from "./Statistics/TopStoreStatistic";
import MostActiveWeekdayStatistic, {
  MostActiveWeekdayStatisticResult,
} from "./Statistics/MostActiveWeekdayStatistic";

export type Statistics = {
  basics: BasicsStatisticResult;
  deliveryTime: DeliveryTimeStatisticResult;
  topCategory: TopCategoryStatisticResult;
  topStore: TopStoreStatisticResult;
  mostActiveWeekday: MostActiveWeekdayStatisticResult;
};

export const SAMPLE_STATISTICS: Statistics = {
  basics: {
    totalOrders: 134,
    totalProducts: 203,
    totalStores: 40,
    totalAmount: 5234.56007,
  },
  deliveryTime: {
    averageDeliveryTime: 60 * 32,
    totalDeliveryTime: 60 * 32 * 124,
  },
  topCategory: {
    name: "Burgers",
    totalPrice: 698,
    times: 73,
  },
  topStore: {
    name: "Taco Bell",
    totalPrice: 923,
    times: 53,
  },
  mostActiveWeekday: {
    weekday: "Monday",
    times: 49,
  },
};

export default class Wrapped {
  public spotifyPlayer: SpotifyFramePlayer | null = null;
  public demoMode = false;
  public possiblyEmptyExport = false;
  private statisticCache: Statistics | null = null;

  constructor(public userData: Orders) {
    console.log("Creating wrapped");
  }

  public getStatistics(): Statistics {
    console.log("Getting statistics");

    if (this.demoMode) {
      return SAMPLE_STATISTICS;
    }

    if (this.statisticCache) {
      return this.statisticCache;
    }

    const statistics = {
      basics: this.calculateStatistic(BasicsStatistic),
      deliveryTime: this.calculateStatistic(DeliveryTimeStatistic),
      topCategory: this.calculateStatistic(TopCategoryStatistic),
      topStore: this.calculateStatistic(TopStoreStatistic),
      mostActiveWeekday: this.calculateStatistic(MostActiveWeekdayStatistic),
    };
    this.statisticCache = statistics;

    console.log("Got statistics", statistics);

    return statistics;
  }

  private calculateStatistic<T>(
    statistic: new (wrapped: Wrapped) => Statistic<T>
  ): T {
    const statisticInstance = new statistic(this);

    try {
      return statisticInstance.calculateResult();
    } catch (e) {
      Sentry.captureException(
        new Error(`Failed to calculate statistic ${statistic.name}`),
        {
          extra: {
            originalException: e,
          },
        }
      );
      console.log(`Failed to calculate statistic ${statistic.name}`, e);
      return statisticInstance.getDefaultValue();
    }
  }
}
