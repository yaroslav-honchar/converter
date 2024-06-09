"use client"

import { Dialog } from "primereact/dialog"
import { useEffect } from "react"
import Cookies from "js-cookie"
import { Button } from "primereact/button"
import { useTranslations } from "next-intl"
import { LinkRoot } from "@/shared/components"
import { ClientRoutes } from "@/_app/routes"
import { usePathname } from "@/_app/localization"
import { COOKIE_NAMES } from "@/shared/constants"
import { useModal } from "@/shared/hooks"

export const DialogCookie = () => {
  const pathname = usePathname()
  const tDialogCookie = useTranslations("DialogCookie")
  const {
    modalState: { cookie: isVisible },
    openModal,
    closeModal,
  } = useModal()

  const onDeclineHandle = (): void => {
    Cookies.set(COOKIE_NAMES.cookiesAccepted, "false", { expires: 365 })
    Cookies.remove(COOKIE_NAMES.tgUsername)
    Cookies.remove(COOKIE_NAMES.tgConfirmed)
    closeModal("cookie")
  }

  const onAcceptHandle = (): void => {
    Cookies.set(COOKIE_NAMES.cookiesAccepted, "true", { expires: 365 })
    closeModal("cookie")
  }

  useEffect((): void => {
    const hasCookie = Cookies.get(COOKIE_NAMES.cookiesAccepted)
    const isCookiePage = pathname.match(ClientRoutes.cookiePolicy)
    if (!hasCookie && !isCookiePage) {
      openModal("cookie")
    } else if (hasCookie && isCookiePage && isVisible) {
      closeModal("cookie")
    }
  }, [pathname, openModal, closeModal])

  return (
    <Dialog
      className={"max-w-lg"}
      position={"bottom-right"}
      appendTo={typeof document !== "undefined" ? document.body : "self"}
      visible={isVisible}
      draggable={false}
      modal={true}
      resizable={false}
      header={<h2 className={"text-2xl lg:text-3xl font-bold"}>{tDialogCookie("title")}</h2>}
      footer={
        <div className={"flex flex-col sm:flex-row gap-3"}>
          <Button
            className="text-sm sm:text-lg"
            label={tDialogCookie("disagree")}
            icon="pi pi-times"
            onClick={onDeclineHandle}
            severity={"danger"}
          />
          <Button
            className="text-sm sm:text-lg"
            label={tDialogCookie("agree")}
            icon="pi pi-check"
            onClick={onAcceptHandle}
            severity={"success"}
          />
        </div>
      }
      onHide={() => closeModal("cookie")}
      closeOnEscape={false}
      closable={false}
    >
      <p className="sm:text-lg mb-3">{tDialogCookie("content")}</p>
      <LinkRoot
        href={ClientRoutes.cookiePolicy}
        className="text-sm sm:text-lg underline"
      >
        {tDialogCookie("learn_more")}
      </LinkRoot>
    </Dialog>
  )
}
