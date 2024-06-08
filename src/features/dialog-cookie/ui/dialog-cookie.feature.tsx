"use client"

import { Dialog } from "primereact/dialog"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Button } from "primereact/button"
import { useTranslations } from "next-intl"
import { LinkRoot } from "@/shared/components"
import { ClientRoutes } from "@/_app/routes"

export const DialogCookie = () => {
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
    const hasCookie = Cookies.get("cookies_accepted")
    if (!hasCookie) {
      setIsVisible(true)
    }
  }, [])

  return (
    <Dialog
      className={"max-w-lg"}
      position={"bottom-right"}
      visible={isVisible}
      draggable={false}
      modal={true}
      resizable={false}
      header={<h2 className={"text-3xl font-bold"}>{tDialogCookie("title")}</h2>}
      footer={
        <div className={"flex gap-3"}>
          <Button
            className="text-lg"
            label={tDialogCookie("disagree")}
            icon="pi pi-times"
            onClick={onDeclineHandle}
            severity={"danger"}
          />
          <Button
            className="text-lg"
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
      <p className="text-lg mb-3">{tDialogCookie("content")}</p>
      <LinkRoot
        href={ClientRoutes.cookiePolicy}
        className="text-lg underline"
      >
        {tDialogCookie("learn_more")}
      </LinkRoot>
    </Dialog>
  )
}
