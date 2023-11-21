import { WrappedSlideProps } from "@/components/Wrapped/WrappedContainer";
import EventEmitter from "events";
import Intro from "@/components/Wrapped/Slides/Intro";
import Roundup from "@/components/Wrapped/Slides/Roundup";
import SpotifyFramePlayer from "../Spotify/FramePlayer";
import { trackEvent } from "../analytics";
import { Statistics } from "../Wrapped";
import TotalPrice from "@/components/Wrapped/Slides/TotalPrice";
import DeliveryTime from "@/components/Wrapped/Slides/DeliveryTime";
import DeliveryTimeComparableActivity from "@/components/Wrapped/Slides/DeliveryTimeComparableActivity";
import MostActiveWeekday from "@/components/Wrapped/Slides/MostActiveWeekday";
import TopStore from "@/components/Wrapped/Slides/TopStore";
import TopCategory from "@/components/Wrapped/Slides/TopCategory";

export type Slide = {
  name: string;
  component: React.FC<WrappedSlideProps>;
  duration: number;
  spotify?: {
    uri: string;
  };
  skip?: (statistics: Statistics) => boolean;
};

const SLIDES: Slide[] = [
  {
    name: "Intro",
    component: Intro,
    duration: 6000,
    spotify: {
      uri: "spotify:track:7KA4W4McWYRpgf0fWsJZWB",
    },
  },

  {
    name: "TotalPrice",
    component: TotalPrice,
    duration: 6000,
    skip: (statistics) => !statistics.basics.totalOrders,
  },
  {
    name: "DevliveryTime",
    component: DeliveryTime,
    duration: 7000,
    skip: (statistics) => !statistics.deliveryTime.totalDeliveryTime,
    spotify: {
      uri: "spotify:track:2DwUdMJ5uxv20EhAildreg",
    },
  },
  {
    name: "DevliveryTimeComparableActivity",
    component: DeliveryTimeComparableActivity,
    duration: 7000,
    skip: (statistics) => !statistics.deliveryTime.totalDeliveryTime,
  },

  {
    name: "MostActiveWeekday",
    component: MostActiveWeekday,
    duration: 6000,
    skip: (statistics) => !statistics.mostActiveWeekday.weekday,
  },
  {
    name: "TopStore",
    component: TopStore,
    duration: 6000,
    skip: (statistics) => !statistics.topStore.name,
    spotify: {
      uri: "spotify:track:7cRLSuOaw8RzS5avx30uOQ",
    },
  },
  {
    name: "TopCategory",
    component: TopCategory,
    duration: 6000,
    skip: (statistics) => !statistics.topCategory.name,
  },

  {
    name: "Roundup",
    component: Roundup,
    duration: 6000,
    spotify: {
      uri: "spotify:track:5odlY52u43F5BjByhxg7wg",
    },
  },
];

export default class WrappedPlayer extends EventEmitter {
  public currentSlide: Slide | null = null;

  constructor(public spotifyPlayer: SpotifyFramePlayer | null = null) {
    super();
  }

  public async play(statistics: Statistics) {
    for (let i = 0; i < SLIDES.length; i++) {
      const slide = SLIDES[i];

      if (slide.skip && slide.skip(statistics)) {
        continue;
      }

      this.currentSlide = slide;
      console.log(`Playing slide`, this.currentSlide, this.spotifyPlayer);
      if (this.currentSlide.spotify && this.spotifyPlayer) {
        console.log(`Playing Spotify song`, this.currentSlide.spotify.uri);
        await this.spotifyPlayer.playSong(this.currentSlide.spotify.uri);
        console.log(`Loaded spotify song`);
      }
      trackEvent(`slide-${slide.name}`);

      this.emit("update");
      await this.wait(slide.duration);
    }
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
