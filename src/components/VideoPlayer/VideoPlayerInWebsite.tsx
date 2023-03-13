"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import "react-scrubber/lib/scrubber.css";
import { useMeasure } from "react-use";
import { usePlayerPositionStyle } from "./hooks/usePlayerPositionStyle";
import { useToggleFullscreen } from "./hooks/useToggleFullscreen";
import { Chapter } from "./utils";

import { VideoPlayerCore } from "./VideoPlayerCore";

type VideoPlayerInWebsiteProps = {
  chapters: Chapter[];
  initialActiveChapter: string;
  onChapterChange?: (currentChapter: string) => void;
};
export function VideoPlayerInWebsite({
  chapters,
  initialActiveChapter,
}: VideoPlayerInWebsiteProps) {
  const [isShareVisible, setIsShareVisible] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(initialActiveChapter);
  const [videoContainerRef, { height }] = useMeasure<HTMLDivElement>();
  const { ref, isFullscreen, toggleFullscreen } = useToggleFullscreen();
  const positionStyle = usePlayerPositionStyle();

  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        position: "relative",
      }}
      flexDir={{ base: "column", lg: "row" }}
    >
      <div
        style={
          isFullscreen
            ? { inset: 0, height: "100%", width: "100%" }
            : { position: "relative", paddingBottom: "56.25%", flex: 1 }
        }
        ref={ref}
      >
        <div
          style={
            isFullscreen
              ? {
                  position: "absolute",
                  width: positionStyle.width,
                  height: positionStyle.height,
                  top: "50%",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                }
              : {
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "100%",
                }
          }
        >
          <VideoPlayerCore
            chapters={chapters}
            currentChapter={currentChapter}
            onChapterChange={setCurrentChapter}
            videoContainerRef={videoContainerRef}
            onFullscreen={toggleFullscreen}
          />
        </div>
      </div>
      <Box
        sx={{
          overflow: "scroll",
          maxHeight: height,
          display: "grid",
          gap: "20px",
        }}
        maxH={{ base: "300px", lg: height }}
      >
        {chapters.map((chapter) => {
          const isActive = chapter.id === currentChapter;
          return (
            <Box
              key={chapter.id}
              onClick={() => setCurrentChapter(chapter.id)}
              sx={{
                display: "flex",
                gap: "10px",
                pointer: "cursor",
              }}
            >
              <Image
                src={chapter.thumbnail}
                width={142}
                height={80}
                alt={chapter.title}
                style={{
                  borderBottom: isActive ? "1px solid#EC796B" : "",
                }}
              />
              <Box>
                <Box
                  as="h2"
                  sx={{
                    lineHeight: 1,
                    marginBottom: 2,
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "heading-navy-fg" : "",
                  }}
                >
                  {chapter.title}
                </Box>
                <Box
                  as="p"
                  sx={{
                    maxW: "200px",
                    fontSize: "12px",
                    lineHeight: 1,
                    marginBottom: 2,
                    color: isActive ? "heading-navy-fg" : "",
                  }}
                >
                  {chapter.description}
                </Box>
                <Box
                  as="p"
                  fontSize="12px"
                  lineHeight={1}
                  sx={{
                    color: isActive ? "heading-navy-fg" : "",
                  }}
                >
                  00:20
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
