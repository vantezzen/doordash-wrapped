import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import formatTimeLength from "@/lib/utils/formatTimeLength";

function DeliveryTime({ statistics }: WrappedSlideProps) {
  const { amount, unit } = formatTimeLength(
    statistics.deliveryTime.totalDeliveryTime ?? 0
  );
  const { amount: averageAmount, unit: averageUnit } = formatTimeLength(
    statistics.deliveryTime.averageDeliveryTime ?? 0
  );

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000">
        In total, you've spent
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={amount} duration={2} />
        <br />
        {unit}
      </FatHeading>

      <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000">
        waiting for your food to arrive - that's
        <br />
        {averageAmount} {averageUnit} on average!
      </InfoText>
    </WrappedContainer>
  );
}

export default DeliveryTime;
