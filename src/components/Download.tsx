import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { RenderProgressOrFinality } from "../../pages/api/progress";
import { button } from "./button";

const downloadButton: React.CSSProperties = {
  ...button,
  width: "100%",
  paddingTop: 28,
  paddingBottom: 28,
  textAlign: "center",
};

const Download: React.FC<{
  username: string;
  initialProgress: RenderProgressOrFinality;
}> = ({ initialProgress, username }, ref) => {
  const [downloadProgress, setDownloadProgress] = useState(initialProgress);

  const pollProgress = useCallback(async () => {
    const poll = async () => {
      const progress = await fetch("/api/progress", {
        method: "POST",
        body: JSON.stringify({
          username,
        }),
      });
      const progressJson = (await progress.json()) as RenderProgressOrFinality;
      setDownloadProgress(progressJson);
      if (progressJson.type !== "finality") {
        setTimeout(poll, 1000);
      }
    };

    setTimeout(() => {
      poll();
    }, 1000);
  }, [username]);

  useEffect(() => {
    if (downloadProgress.type === "finality") {
      return;
    }
    pollProgress();
  }, [downloadProgress.type, pollProgress]);

  return (
    <div>
      {downloadProgress.type == "finality" &&
      downloadProgress.finality.type === "success" ? (
        <a href={downloadProgress.finality.url} download={`${username}`}>
          <div style={downloadButton}>Download video</div>
        </a>
      ) : downloadProgress.type === "finality" &&
        downloadProgress.finality.type === "error" ? (
        <div
          style={{
            fontFamily: "Jelle",
            color: "red",
          }}
        >
          Oops, we couldn{"'"}t render a video for you! Sorry. We logged the
          exception and will investigate it shortly. Our goal is to fix all
          errors and have a 100% success rate for renders, so come back in a few
          hours and see if it works then!
        </div>
      ) : downloadProgress.type === "progress" ? (
        <button style={downloadButton} type="button">
          {"Rendering... " +
            Math.round(downloadProgress.progress.overallProgress * 100) +
            "%"}
        </button>
      ) : null}
    </div>
  );
};

export default forwardRef(Download);
