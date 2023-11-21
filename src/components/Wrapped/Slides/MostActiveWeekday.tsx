import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";

const commentsOnWeekdays: {
  [key: string]: string;
} = {
  Monday: "Mondays are the worst, aren't they?",
  Tuesday: "Establishing Taco Tuesdays?",
  Wednesday: "Trying to get over the hump?",
  Thursday: "Rewarding yourself for almost making it to the weekend?",
  Friday: "I understand, Fridays are the best.",
  Saturday: "Saturday nights are for partying!",
  Sunday: "Sunday scaries?",
};

function MostActiveWeekday({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        You order most often on
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        {statistics.mostActiveWeekday.weekday}
      </FatHeading>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-2000">
        with a total of {statistics.mostActiveWeekday.times} orders.{" "}
        {statistics.mostActiveWeekday.weekday
          ? commentsOnWeekdays[statistics.mostActiveWeekday.weekday]
          : ""}
      </InfoText>
    </WrappedContainer>
  );
}

export default MostActiveWeekday;
