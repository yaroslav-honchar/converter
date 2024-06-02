import { RefObject } from "react"
import { Toast } from "primereact/toast"
import { IUseToastNotifyReturn, NotifyHandlerTypeOptions } from "./use-toast-notify.types"
import { NOTIFY_LIFE } from "./use-toast-notify.constants"

export const useToastNotify = (toastRef: RefObject<Toast>): IUseToastNotifyReturn => {
  const notifyWarning = (message: string, options: NotifyHandlerTypeOptions = {}): void => {
    toastRef.current?.show({
      severity: "warn",
      summary: "Warning",
      detail: message,
      life: NOTIFY_LIFE,
      ...options,
    })
  }

  const notifyError = (message: string, options: NotifyHandlerTypeOptions = {}): void => {
    toastRef.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: NOTIFY_LIFE,
      ...options,
    })
  }

  const notifySuccess = (message: string, options: NotifyHandlerTypeOptions = {}): void => {
    toastRef.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: NOTIFY_LIFE,
      ...options,
    })
  }

  const notifyInfo = (message: string, options: NotifyHandlerTypeOptions = {}): void => {
    toastRef.current?.show({
      severity: "info",
      summary: "Info",
      detail: message,
      life: NOTIFY_LIFE,
      ...options,
    })
  }

  return {
    notifyWarning,
    notifyError,
    notifySuccess,
    notifyInfo,
  }
}
