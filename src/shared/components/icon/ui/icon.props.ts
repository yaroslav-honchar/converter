import { SVGProps } from "react"

import { iconsNames } from "../lib/icons-names"

export interface IIconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof iconsNames
}
