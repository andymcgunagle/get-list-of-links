import React from "react";

export default function Intro() {
  return (
    <div className="titled-section-wrapper">
      <h2>Instructions</h2>
      <div className="card">
        <p>
          Enter a URL and get a list of links from that page.
        </p>
        <p>
          Save your searches if you&apos;d like to use them again. The app uses your browser&apos;s local storage - no login required.
        </p>
        <p>
          Note that some pages are generated dynamically and may not return all visible (or any) results.
        </p>
      </div>
    </div>
  );
};
