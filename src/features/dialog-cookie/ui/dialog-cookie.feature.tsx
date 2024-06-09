"use client"

import { Dialog } from "primereact/dialog"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Button } from "primereact/button"
import { useTranslations } from "next-intl"
import { LinkRoot } from "@/shared/components"
import { ClientRoutes } from "@/_app/routes"
import { usePathname } from "@/_app/localization"

export const DialogCookie = () => {
  const pathname = usePathname()
  const tDialogCookie = useTranslations("DialogCookie")
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const onDeclineHandle = (): void => {
    Cookies.set("cookies_accepted", "false", { expires: 365 })
    setIsVisible(false)
  }

  const onAcceptHandle = (): void => {
    Cookies.set("cookies_accepted", "true", { expires: 365 })
    setIsVisible(false)
  }

  useEffect(() => {
    console.log("work")
    const hasCookie = Cookies.get("cookies_accepted")
    if (!hasCookie && !pathname.match(ClientRoutes.cookiePolicy)) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [pathname])

  return (
    <Dialog
      className={"max-w-lg"}
      position={"bottom-right"}
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
      onHide={(): void => {
        setIsVisible(false)
      }}
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
