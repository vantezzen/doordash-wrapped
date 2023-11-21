import React from "react";
import WrappedContainer from "./WrappedContainer";
import FatHeading from "./FatHeading";
import InfoText from "./InfoText";
import MutedText from "./MutedText";
import { Button } from "../ui/button";
import { ArrowRight, PlugZap } from "lucide-react";
import Faq from "../Preparation/Faq";
import heroImage from "@/app/hero.png";
import Image from "next/image";
import Footer from "../Footer";
import Projects from "../Projects";

function IntroInformation({
  onContinue,
  onDemo,
}: {
  onContinue: () => void;
  onDemo: () => void;
}) {
  return (
    <WrappedContainer>
      <div className="grid md:grid-cols-2 gap-6 p-6 md:p-12">
        <div className="flex flex-col justify-center gap-6 text-left">
          <FatHeading>Wrapped for Doordash</FatHeading>
          <InfoText>Get insights into your deliveries 🚀</InfoText>

          <div className="max-w-xl">
            <MutedText className="break-words hyphens-auto">
              How many burgers did you get delivered this year? Was that
              late-night Taco Bell really a one-off? Wrapped for Doordash is
              here to bring you insightful analytics of your deliveries
              throughout the year.
              <br />
              Your data is never uploaded to any server, all statistics are
              generated locally in your browser.
            </MutedText>
          </div>

          <div className="flex flex-col gap-4">
            <Button onClick={onContinue} className="w-full">
              Let's get started
              <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button className="dark w-full bg-starship-100" onClick={onDemo}>
              Show demo Wrapped
              <PlugZap className="ml-2" size={16} />
            </Button>
          </div>
        </div>

        <div>
          <Image
            src={heroImage}
            alt="Wrapped for Doordash"
            width={1080}
            height={1920}
            style={{
              maxHeight: "70vh",
              objectFit: "contain",
              borderRadius: 10,
            }}
          />
        </div>
      </div>

      <FatHeading className="mt-12 mb-6 text-xl">
        Frequently Asked Questions
      </FatHeading>
      <Faq />

      <Projects />

      <div className="max-w-lg mx-auto mt-6 text-sm font-medium text-zinc-600 text-left">
        <strong>For the Search Engines:</strong>
        <p>
          Welcome to Wrapped for DoorDash - Your Personalized Order History
          Summary:
        </p>

        <p>
          Ever wonder how your food delivery choices stack up over the year?
          With Wrapped for DoorDash, delve into a detailed retrospective of your
          order history, uncovering insights from your favorite cuisines to your
          most frequented restaurants.
        </p>

        <p>
          Wrapped for DoorDash allows you to explore a variety of statistics -
          from the total number of deliveries you’ve had to the average wait
          time for your orders, and even your top go-to stores for a quick bite
          or a gourmet meal.
        </p>

        <p>
          Starting is easy. Simply export your DoorDash order history directly
          from the app. Go to your profile, select 'Order History', and choose
          'Export Order Data'. Once you've downloaded your 'DoorDashOrders.zip',
          upload it to Wrapped for DoorDash, and we'll whip up your personalized
          order summary right in your browser.
        </p>

        <p>
          Your privacy is paramount to us. At Wrapped for DoorDash, your data
          remains exclusively yours - never uploaded, never shared, securely
          yours. We ensure transparency in our process: your order data is
          processed entirely within your browser, never touched or stored by our
          servers.
        </p>

        <p>
          For the curious minds, our full source code is available on GitHub.
          Visit https://github.com/vantezzen/doordash-wrapped to see how Wrapped
          for DoorDash upholds your data privacy and security.
        </p>

        <p>
          Wrapped for DoorDash is a project born from a passion for food and
          technology. It's a unique, engaging, and private way to reflect on
          your food delivery experiences and culinary journeys over the year.
        </p>

        <p>
          To add some flavor to your data exploration, you can integrate tunes
          from Spotify. Enjoy a soundtrack to your stats, enhancing the
          experience without any need to share your Spotify credentials with us.
          It's all about celebrating your culinary choices, securely and
          joyfully.
        </p>

        <p>
          Embark on a journey with Wrapped for DoorDash and let your food stats
          tell their story. Join a community where your order history gets a
          lively twist, offering you a new perspective on your year's culinary
          adventures.
        </p>
      </div>

      <Footer />
    </WrappedContainer>
  );
}

export default IntroInformation;
