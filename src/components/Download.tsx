import { RenderProgress } from "@remotion/lambda";
import React, { useCallback, useEffect, useState } from "react";
import { button } from "./button";

type RenderResponse = {
  renderId: string;
  bucketName: string;
};

const Download: React.FC<{
  username: string;
  initialProgress: RenderProgress;
  renderId: string;
  bucketName: string;
}> = ({ initialProgress, renderId, bucketName }) => {
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
        <a href={downloadProgress.outputFile} download>
          <button style={button} type="button">
            Download video
          </button>
        </a>
      ) : (
        <button style={button} type="button">
          {"Rendering... " +
            Math.round(downloadProgress.overallProgress * 100) +
            "%"}
        </button>
      )}
    </div>
  );
};

export default Download;
