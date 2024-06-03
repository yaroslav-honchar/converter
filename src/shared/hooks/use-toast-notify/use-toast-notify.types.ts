import { ToastMessage } from "primereact/toast"
import { Formats } from "intl-messageformat"
import { TranslationValues } from "use-intl"

export type NotifyHandlerMessage = [string, TranslationValues?, Partial<Formats>?]

export type NotifyHandlerTypeOptions = Omit<ToastMessage, "detail" | "summary" | "severity">

type NotifyHandlerType = (message: NotifyHandlerMessage, options?: NotifyHandlerTypeOptions) => void

export interface IUseToastNotifyReturn {
  notifyWarning: NotifyHandlerType
  notifyError: NotifyHandlerType
  notifySuccess: NotifyHandlerType
  notifyInfo: NotifyHandlerType
}
