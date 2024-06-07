import React from "react"

export const BackgroundVideo: React.FC = () => {
  return (
    <video
      className={"fixed top-0 left-0 w-full h-full object-cover z-0"}
      controls={false}
      muted={true}
      autoPlay={true}
      playsInline
      src={"/videos/main-bg.mp4"}
      poster={"/img/video-placeholder.jpg"}
      loop={true}
    />
  )
}
