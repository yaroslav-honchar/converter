import { ToastMessage } from "primereact/toast"

export type NotifyHandlerTypeOptions = Omit<ToastMessage, "detail" | "summary" | "severity">

type NotifyHandlerType = (message: string, options?: NotifyHandlerTypeOptions) => void

export interface IUseToastNotifyReturn {
  notifyWarning: NotifyHandlerType
  notifyError: NotifyHandlerType
  notifySuccess: NotifyHandlerType
  notifyInfo: NotifyHandlerType
}
