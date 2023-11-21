import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";

function TopCategory({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        and have spend ${Math.round(statistics.topCategory.totalPrice ?? 0)} on
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.topCategory.times ?? 0} duration={2} /> <br />
        {statistics.topCategory.name}
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          making it your favorite category!
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default TopCategory;
