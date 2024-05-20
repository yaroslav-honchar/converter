import { PropsWithChildren } from "react"

export interface ILayoutCommonProps extends PropsWithChildren {
  params: {
    locale: string
  }
}
