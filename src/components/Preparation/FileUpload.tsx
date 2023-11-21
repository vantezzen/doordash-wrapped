"use client";
import React from "react";
import FatHeading from "../Wrapped/FatHeading";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import MutedText from "../Wrapped/MutedText";

function FileUpload({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col gap-6 text-center bg-zinc-900 text-starship-400 dark p-6">
      <FatHeading className="text-3xl">
        Select your Doordash
        <br />
        data to get started
      </FatHeading>

      <MutedText className="!text-zinc-200 text-base">
        Wrapped for Doordash needs your data export to generate your statistics.
        <br />
        Your privacy is important to us, that's why your data is never uploaded
        to any server.
        <br />
        Wrapped for Doordash is{" "}
        <a
          href="https://github.com/vantezzen/health-wrapped"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-source
        </a>{" "}
        if you want to verify this.
        <br />
        <br />
        You can export your Doordash data by going to
        <br />
        <a
          href="https://doordash.com/consumer/privacy/archive_request"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://doordash.com/consumer/privacy/archive_request
        </a>
        .<br />
        It might take a few hours for Doordash to generate your data export.
      </MutedText>
      <label htmlFor="file-upload">
        <Button
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <File size={16} className="mr-2" />
          Select file
        </Button>
      </label>

      <input
        type="file"
        accept=".zip,.csv"
        id="file-upload"
        className="hidden"
        ref={inputRef}
        onChange={(e) => {
          if (e.target.files) {
            onFileSelect(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}

export default FileUpload;
