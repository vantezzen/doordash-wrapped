import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import InfoText from "../InfoText";
import FatHeading from "../FatHeading";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import lookup from "@/lib/utils/lookup";

const commentsOnTotalSpend = {
  0: "Looks like your kitchen is still your best friend!",
  1: "A single dollar? Was it for a candy?",
  10: "Dipping your toes in the DoorDash waters, I see.",
  50: "A casual dabbler in the art of delivery dining.",
  100: "Got a taste for takeout, huh?",
  200: "Starting to have a favorite delivery driver, aren’t you?",
  500: "Ah, a connoisseur of convenience cuisine!",
  1000: "DoorDash devotee status: unlocked.",
  1500: "You’re on a first-name basis with local restaurant owners now, right?",
  2000: "Master of the menu, ruler of the delivery realm!",
  2500: "You've probably tried every cuisine in town by now!",
  3000: "DoorDash should be giving you loyalty points!",
  4000: "In a serious relationship with DoorDash, I presume?",
  5000: "You're the VIP customer every restaurant dreams of.",
  6000: "At this point, you might as well have your own delivery route.",
  7000: "You’ve spent more on DoorDash than some people on their cars!",
  8000: "Is your kitchen just for show now?",
  9000: "Have you ever touched a pan? Like, ever?",
  10000:
    "Just hink of the luxury kitchen you could have built with that money!",
};

function TotalPrice({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200">
        In your {statistics.basics.totalOrders} orders last year, you've spent
      </InfoText>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        $
        <CountUp
          end={Math.round(statistics.basics.totalAmount ?? 0)}
          duration={2}
        />
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          {lookup(statistics.basics.totalAmount ?? 0, commentsOnTotalSpend)}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default TotalPrice;
