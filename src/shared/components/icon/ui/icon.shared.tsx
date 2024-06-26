import React from "react"

import { iconsNames } from "../lib/icons-names"

import { IIconProps } from "./icon.props"

export const Icon: React.FC<IIconProps> = ({ name, ...props }) => {
  const IconComponent = iconsNames[name]

  return <IconComponent {...props} />
}
