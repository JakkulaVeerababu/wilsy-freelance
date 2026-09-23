"use client";
import { useState } from "react";
import { Pause, Play } from "lucide-react";

export function ServiceLights() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div
        className={`service-light-layer ${paused ? "lights-paused" : ""}`}
        aria-hidden="true"
      >
        <span />
        <span />
      </div>
      <button
        className="light-control"
        type="button"
        aria-label={paused ? "Play service lights" : "Pause service lights"}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={12} /> : <Pause size={12} />}
        <span>{paused ? "Play lights" : "Pause lights"}</span>
      </button>
    </>
  );
}
