import React from "react"
import { IIconProps } from "./icon.props"
import { iconsNames } from "../lib/icons-names"

export const Icon: React.FC<IIconProps> = ({ name, ...props }) => {
  const IconComponent = iconsNames[name]

  return <IconComponent {...props} />
}
