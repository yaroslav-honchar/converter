import React from "react"
import { LinkLogo } from "@/entities/link-logo"
import { LangSwitcher } from "@/entities/lang-switcher/ui/lang-switcher.feature"

export const Header: React.FC = () => {
  return (
    <header className={"px-1 py-4 bg-secondary"}>
      <div className="container flex items-center justify-between gap-2">
        <LinkLogo />
        <LangSwitcher />
      </div>
    </header>
  )
}
