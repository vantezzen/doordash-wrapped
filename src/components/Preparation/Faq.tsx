"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const items = [
  {
    question: "How can I get my Doordash data?",
    answer: (
      <>
        You can export your Doordash data from{" "}
        <a
          href="https://doordash.com/consumer/privacy/archive_request"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://doordash.com/consumer/privacy/archive_request
        </a>
        .
        <br />
        Simply log in to your Doordash account and click on "Request Archive".
        <br />
        Depending on how much data you have, this process can take a few hours -
        you should get an email once completed. After that, simply save the ZIP
        file to your computer and upload it to Wrapped for Doordash.
      </>
    ),
  },
  {
    question: "Which file should I use for Wrapped for Doordash?",
    answer: (
      <>
        After downloading your Doordash data export, you can choose the ZIP file
        you downloaded. Wrapped will the automatically extract the ZIP file and
        use the file inside.
        <br />
        Please note that the ZIP files contains personal data about you and
        should be treated with care. Wrapped for Doordash will never upload your
        data to any server.
        <br />
        If you want to be extra safe, you can extract the ZIP file yourself and
        upload the file named "consumer_order_details.csv" inside - this is the
        only file Wrapped for Doordash needs to generate your Wrapped.
      </>
    ),
  },
  {
    question: "Is this safe? Is Wrapped for Doordash legit?",
    answer: (
      <>
        Wrapped for Doordash is safe and privacy-centered. If you know how to
        read code, you can look at Wrapped for Doordash's full source code at{" "}
        <a
          href="https://github.com/vantezzen/doordash-wrapped"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          https://github.com/vantezzen/doordash-wrapped
        </a>
        . Your Doordash data is only used in your browser and never uploaded to
        any server. We will not store or process your data on our server in any
        way.
      </>
    ),
  },
  {
    question: "What is this website for?",
    answer: (
      <>
        I always like Spotify Wrapped and wanted to have something similar for
        Doordash. So I built Wrapped for Doordash, a website that generates a
        personalized summary of your Doordash activity based on your Doordash
        data export.
        <br />
        <br />
        Wrapped for Doordash is simply a fun little project for me to work on in
        my free time.
      </>
    ),
  },
  {
    question: "Can you get access to my Doordash account with my data?",
    answer: (
      <>
        The short answer is <strong>no</strong>. Your Doordash data export only
        contains data about your activity data, not your login credentials!
        <br />
        You can <strong>verify this yourself</strong> by opening your data
        export and looking at the files in a text editor. You can try searching
        for your password in the file and you'll see that it's not there.
        <br />
        In general, Doordash doesn't store your unencrypted password anywhere
        and only stores a hashed version of it. Due to this, it's impossible for
        the data export to contain your password.
        <br />
        Wrapped for Doordash will never ask you for your login credentials and
        doesn't require you to enter them anywhere.
        <br />
        <br />
        Your data is <strong>not used or transferred</strong> by Wrapped for
        Doordash!
      </>
    ),
  },
  {
    question: "Does my Wrapped contain my full activity history?",
    answer: (
      <>
        Due to the size of the Doordash data export, Wrapped for DoorDash will
        only show your activity history for the last 365 days.
      </>
    ),
  },
  {
    question: "How does Wrapped for Doordash work?",
    answer: (
      <>
        Wrapped for Doordash uses your Doordash data export to calculate your
        Wrapped. We use exported data about items you ordered and generate
        statistics based on that.
      </>
    ),
  },
  {
    question: "How does the Spotify integration work?",
    answer: (
      <>
        If you want to, Wrapped for Doordash can play fitting songs in the
        background while you're looking at your Wrapped - similar to how Spotify
        Wrapped works.
        <br />
        To achieve this, Wrapped for Doordash uses{" "}
        <a
          href="https://developer.spotify.com/documentation/embeds"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          Spotify Embeds
        </a>{" "}
        to embed a Spotify player to the bottom right of the screen.
        <br />
        For this to work, you'll only need to be logged into Spotify in your
        browser - you don't need to connect your Spotify account to Wrapped for
        Doordash! Because Spotify is embedded using Spotify's build-in support
        for websites to do so, we don't have access to your Spotify account in
        any way.
      </>
    ),
  },
];

function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-lg dark mx-auto text-left"
    >
      {items.map((item) => (
        <AccordionItem value={item.question} key={item.question}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Faq;
