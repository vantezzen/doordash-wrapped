import { Statistics } from "../Wrapped";
import { ShareImageData } from "../types";
import { round } from "../utils";
import formatTimeLength from "./formatTimeLength";

export default function getShareUrl(statistics: Statistics) {
  const totalDeliveryTime = formatTimeLength(
    statistics.deliveryTime.totalDeliveryTime ?? 0
  );

  const data: ShareImageData = {
    totalOrders: statistics.basics.totalOrders ?? 0,
    totalPrice: round(statistics.basics.totalAmount ?? 0),
    totalDeliveryTime: `${totalDeliveryTime.amount} ${totalDeliveryTime.unit}`,
    topCategory: `${statistics.topCategory.times} ${statistics.topCategory.name}`,
    topStore: `${statistics.topStore.times}x ${statistics.topStore.name}`,
  };

  const url = new URL("/api/image", window.location.href);
  url.searchParams.set("data", JSON.stringify(data));

  return url.toString();
}
