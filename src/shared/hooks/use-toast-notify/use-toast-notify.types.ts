import { Formats } from "intl-messageformat"
import { TranslationValues } from "use-intl"

import { ToastMessage } from "primereact/toast"

export type NotifyHandlerMessage = [string, TranslationValues?, Partial<Formats>?] | string

export type NotifyHandlerTypeOptions = Omit<ToastMessage, "detail" | "summary" | "severity">

type NotifyHandlerType = (message: NotifyHandlerMessage, options?: NotifyHandlerTypeOptions) => void

export interface IUseToastNotifyReturn {
  notifyWarning: NotifyHandlerType
  notifyError: NotifyHandlerType
  notifySuccess: NotifyHandlerType
  notifyInfo: NotifyHandlerType
}
