import { RenderProgress } from "@remotion/lambda";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
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
  initialProgress: RenderProgress;
  renderId: string;
  bucketName: string;
}> = ({ initialProgress, renderId, bucketName, username }, ref) => {
  const [downloadProgress, setDownloadProgress] = useState(initialProgress);

  const pollProgress = useCallback(async () => {
    const poll = async () => {
      const progress = await fetch("/api/progress", {
        method: "POST",
        body: JSON.stringify({
          renderId,
          bucketName,
        }),
      });
      const progressJson = (await progress.json()) as RenderProgress;
      setDownloadProgress(progressJson);
      if (!progressJson.outputFile) {
        setTimeout(poll, 1000);
      }
    };

    setTimeout(() => {
      poll();
    }, 1000);
  }, [bucketName, renderId]);

  useEffect(() => {
    pollProgress();
  }, [pollProgress]);

  return (
    <div>
      {downloadProgress.outputFile ? (
        <a href={downloadProgress.outputFile} download={`${username}.mp4`}>
          <div style={downloadButton}>Download video</div>
        </a>
      ) : (
        <button style={downloadButton} type="button">
          {"Rendering... " +
            Math.round(downloadProgress.overallProgress * 100) +
            "%"}
        </button>
      )}
    </div>
  );
};

export default forwardRef(Download);
