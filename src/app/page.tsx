"use client";
import Wrapped from "@/lib/Wrapped";
import React from "react";
import dynamic from "next/dynamic";
import FileUpload from "@/components/Preparation/FileUpload";
import WrappedCreator from "@/lib/WrappedCreator";
import WrappedContainer from "@/components/Wrapped/WrappedContainer";
import FatHeading from "@/components/Wrapped/FatHeading";
import InfoText from "@/components/Wrapped/InfoText";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import IntroInformation from "@/components/Wrapped/IntroInformation";
import SpotifyFramePlayer from "@/lib/Spotify/FramePlayer";
import SpotifyPlayer from "@/components/Wrapped/SpotifyPlayer";
import SpotifyInfoText from "@/components/Wrapped/SpotifyInfoText";
import MutedText from "@/components/Wrapped/MutedText";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { trackEvent } from "@/lib/analytics";
import HideForTime from "@/components/Wrapped/HideForTime";
import * as Sentry from "@sentry/nextjs";
dayjs.extend(localizedFormat);

const WrappedPlayerComponent = dynamic(
  () => import("@/components/Wrapped/WrappedPlayerComponent"),
  {
    ssr: false,
  }
);

function TikTokWrappedAppPage() {
  const [page, setPageRaw] = React.useState("intro");
  const setPage = (page: string) => {
    setPageRaw(page);
    window.scrollTo(0, 0);
    trackEvent("page_" + page);
  };
  const [wrapped, setWrapped] = React.useState<Wrapped | null>(null);
  const [spotify, setSpotify] = React.useState<SpotifyFramePlayer | null>(null);

  return (
    <div>
      <SpotifyPlayer />

      {page === "intro" && (
        <IntroInformation
          onContinue={() => setPage("upload")}
          onDemo={async () => {
            trackEvent("demo");
            setPage("loading");

            const creator = new WrappedCreator();
            const wrapped = creator.forDemoMode();
            setWrapped(wrapped);

            const spotify = new SpotifyFramePlayer();
            await spotify.loadLibrary();
            setSpotify(spotify);

            trackEvent("demo_ready");
            setPage("demo");
          }}
        />
      )}

      {page === "upload" && (
        <FileUpload
          onFileSelect={async (file) => {
            setPage("loading");
            trackEvent("file_selected");

            if (file.name.endsWith(".txt")) {
              setPage("text");
              trackEvent("text_error");
              return;
            }

            if (!file.name.endsWith(".csv") && !file.name.endsWith(".zip")) {
              setPage("unknown_file");
              trackEvent("unknown_file_error");
              trackEvent("unknown_file_error_" + file.name.split(".").pop());
              return;
            }

            const creator = new WrappedCreator();
            let wrapped: Wrapped;
            try {
              wrapped = await creator.fromFile(file);
              setWrapped(wrapped);

              trackEvent("file_loaded");
            } catch (e) {
              trackEvent("load_error");
              console.error(e);
              setPage("error");
              return;
            }

            try {
              console.log("stats", wrapped?.getStatistics());
            } catch (e) {
              Sentry.captureException(
                new Error("Exception when calculating statistics"),
                {
                  extra: {
                    originalError: e,
                  },
                }
              );
            }

            const spotify = new SpotifyFramePlayer();
            await spotify.loadLibrary();
            setSpotify(spotify);
            trackEvent("spotify_loaded");

            if (wrapped.possiblyEmptyExport) {
              trackEvent("possibly_empty");
              setPage("possibly_empty");
            } else if (spotify.canPlaySongs) {
              trackEvent("spotify_ready");
              setPage("ready");
            } else {
              trackEvent("spotify_error");
              setPage("spotify");
            }
          }}
        />
      )}

      {page === "error" && (
        <WrappedContainer>
          <FatHeading>Something doesn't look right</FatHeading>
          <MutedText>
            We couldn't read your Health data export. Please make sure you
            selected the correct file format and try again.
          </MutedText>
          <Button
            onClick={() => {
              setPage("upload");
              trackEvent("try_again");
            }}
          >
            Try again
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </WrappedContainer>
      )}

      {page === "unknown_file" && (
        <WrappedContainer>
          <FatHeading>Unknown file format</FatHeading>
          <MutedText className="max-w-lg mx-auto">
            It looks like you selected an unknown file format. Please make sure
            you select a ".xml" or ".zip" file.
            <br />
            If you modified the file, make sure your file has the correct file
            extension.
          </MutedText>
          <Button
            onClick={() => {
              setPage("intro");
              trackEvent("text_error_go_back");
            }}
          >
            Go back
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </WrappedContainer>
      )}

      {page === "demo" && (
        <WrappedContainer>
          <FatHeading>View Demo Wrapped</FatHeading>
          <MutedText className="max-w-xl mx-auto">
            You can view a demo of Wrapped for Doordash with sample data if you
            want to.
            <br />
            <strong>
              This is NOT your Wrapped, but a demo of what it could look like.
              <br />
              It does not use your Doordash data export.
            </strong>
            <br />
            <br />
            The data is randomly generated and does not represent any real
            DoorDash user - if you want to see your own Wrapped, you can reload
            the page at any time and upload your own data export.
          </MutedText>
          <Button
            onClick={() => {
              setPage("play");
              trackEvent("play_demo_click");
            }}
          >
            Play demo
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </WrappedContainer>
      )}

      {page === "loading" && (
        <WrappedContainer>
          <Loader2 size={32} className="animate-spin" />
          <InfoText className="text-base">
            We're preparing your Wrapped...
          </InfoText>
          <MutedText className="text-sm">
            This may take up to a minute depending on the size of your data
            export.
          </MutedText>
          <HideForTime time={50000}>
            <MutedText className="text-sm">
              Uh oh, this is taking longer than expected...
            </MutedText>
          </HideForTime>
          <HideForTime time={100000}>
            <MutedText className="text-sm text-center">
              This should've been done by now...
              <br />
              If it doesn't start soon try reloading
              <br />
              the page and uploading your Health data export again.
            </MutedText>
          </HideForTime>
        </WrappedContainer>
      )}

      {page === "spotify" && (
        <SpotifyInfoText
          onContinue={() => {
            setPage("ready");
            trackEvent("continue_without_spotify");
          }}
        />
      )}

      {page === "ready" && (
        <WrappedContainer>
          <FatHeading>Your Wrapped is ready!</FatHeading>
          <InfoText>
            We've crunched the numbers and found some...interesting insights.
            <br />
            Are you ready to see them?
          </InfoText>

          <Button
            onClick={() => {
              setPage("play");
              trackEvent("play");
            }}
          >
            Show me!
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </WrappedContainer>
      )}

      {page === "play" && (
        <WrappedPlayerComponent
          statistics={wrapped!.getStatistics()}
          spotify={spotify}
          isDemo={wrapped!.demoMode}
        />
      )}

      {page === "play" &&
        wrapped?.demoMode &&
        !localStorage.getItem("sneaky-demo") && (
          <div className="fixed bottom-12 left-12 right-12 z-0 opacity-60 text-zinc-500 break-words">
            <h2 className="text-2xl md:text-4xl font-bold">Demo Mode</h2>
            <p className="text-sm">
              This is a demo of Wrapped for Doordash. It does not use your real
              Doordash data.
              <br />
              To see your own Wrapped, reload the page and upload your Doordash
              data.
            </p>
          </div>
        )}
    </div>
  );
}

export default TikTokWrappedAppPage;
