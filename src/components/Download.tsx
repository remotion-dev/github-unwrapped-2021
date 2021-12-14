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
  const [retrying, setRetrying] = useState(false);

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

  const retry = useCallback(async () => {
    setRetrying(true);
    await fetch("/api/retry", {
      method: "POST",
      body: JSON.stringify({
        username,
      }),
    });
    setRetrying(false);
    pollProgress();
  }, [pollProgress, username]);

  useEffect(() => {
    if (downloadProgress.type === "finality") {
      return;
    }
    pollProgress();
  }, [downloadProgress.type, pollProgress]);

  return (
    <div>
      {downloadProgress.type == "finality" &&
      downloadProgress.finality &&
      downloadProgress.finality.type === "success" ? (
        <a href={downloadProgress.finality.url} download={`${username}`}>
          <div style={downloadButton}>Download video</div>
        </a>
      ) : downloadProgress.type === "finality" &&
        downloadProgress.finality &&
        downloadProgress.finality.type === "error" ? (
        <>
          <div
            style={{
              fontFamily: "Jelle",
              color: "red",
            }}
          >
            Oops, sorry the render failed! We will fix all render bugs, so come
            back tomorrow and it should be fixed! Or just press the retry button
            which will work most of the time.
          </div>
          <div
            style={{
              height: 15,
            }}
          ></div>
          <button disabled={retrying} style={downloadButton} onClick={retry}>
            {retrying ? "Retrying..." : "Retry"}
          </button>
        </>
      ) : downloadProgress.type === "progress" ? (
        <button style={downloadButton} type="button">
          {"Rendering... " +
            Math.round(downloadProgress.progress.percent * 100) +
            "%"}
        </button>
      ) : null}
    </div>
  );
};

export default forwardRef(Download);
