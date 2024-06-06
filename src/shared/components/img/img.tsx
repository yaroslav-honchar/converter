import React from "react"
import Image, { ImageProps } from "next/image"
import { IImgProps } from "./img.props"

export const Img: React.FC<IImgProps> = ({ src, alt, width, height, className, ...props }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  )
}
