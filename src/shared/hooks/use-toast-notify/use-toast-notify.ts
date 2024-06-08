import { RefObject } from "react"
import { Toast } from "primereact/toast"
import {
  IUseToastNotifyReturn,
  NotifyHandlerMessage,
  NotifyHandlerTypeOptions,
} from "./use-toast-notify.types"
import { NOTIFY_LIFE } from "./use-toast-notify.constants"
import { useTranslations } from "next-intl"

export const useToastNotify = (toastRef: RefObject<Toast>): IUseToastNotifyReturn => {
  const tNotify = useTranslations("Notify")

  const notifyWarning = (
    message: NotifyHandlerMessage,
    options: NotifyHandlerTypeOptions = {},
  ): void => {
    toastRef.current?.show({
      severity: "warn",
      // summary: tNotify("warning"),
      detail: typeof message === "string" ? message : tNotify(...message),
      life: NOTIFY_LIFE,
      ...options,
    })
  }

  const notifyError = (
    message: NotifyHandlerMessage,
    options: NotifyHandlerTypeOptions = {},
  ): void => {
    toastRef.current?.show({
      severity: "error",
      // summary: tNotify("error"),
      detail: typeof message === "string" ? message : tNotify(...message),
      life: NOTIFY_LIFE,
      ...options,
    })
  }

  const notifySuccess = (
    message: NotifyHandlerMessage,
    options: NotifyHandlerTypeOptions = {},
  ): void => {
    toastRef.current?.show({
      severity: "success",
      // summary: tNotify("success"),
      detail: typeof message === "string" ? message : tNotify(...message),
      life: NOTIFY_LIFE,
      ...options,
    })
  }

  const notifyInfo = (
    message: NotifyHandlerMessage,
    options: NotifyHandlerTypeOptions = {},
  ): void => {
    toastRef.current?.show({
      severity: "info",
      // summary: tNotify("info"),
      detail: typeof message === "string" ? message : tNotify(...message),
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
