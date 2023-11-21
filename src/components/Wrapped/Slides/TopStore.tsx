import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import InfoText from "../InfoText";
import FatHeading from "../FatHeading";
import HideForTime from "../HideForTime";
import lookup from "@/lib/utils/lookup";

const commentsOnTopStore = {
  1: "First date with your favorite spot, how sweet!",
  2: "Back for seconds? It must be love.",
  3: "Third time’s a charm - found your food soulmate yet?",
  5: "Starting to get cozy with your top pick, aren't you?",
  10: "In a committed relationship with your favorite eatery now?",
  15: "Lucky for them, loyalty is your middle name.",
  20: "You and this place - better together!",
  25: "Quarter-century club of orders – impressive!",
  30: "Are you in their Top Customers list yet?",
  40: "Your loyalty’s cooking up a storm!",
  50: "Halfway to a hundred - now that’s dedication!",
  60: "Sixty servings of satisfaction!",
  70: "Seventy times and still savoring every bite!",
  80: "Eighty orders of excellence!",
  90: "Ninety noshes - almost at the century mark!",
  100: "A hundred orders? You’re practically family there now!",
};

function TopStore({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200">
        With a total of ${Math.round(statistics.topStore.totalPrice ?? 0)} and{" "}
        {statistics.topStore.times} orders, you've ordered most from
      </InfoText>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        {statistics.topStore.name}
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          {lookup(statistics.topStore.times ?? 0, commentsOnTopStore)}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default TopStore;
