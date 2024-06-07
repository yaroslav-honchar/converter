import React from "react"
import { LinkLogo } from "@/entities/link-logo"
import { LangSwitcher } from "@/entities/lang-switcher/ui/lang-switcher.feature"

export const Header: React.FC = () => {
  return (
    <header
      className={
        "px-1 py-4 sm:py-6 bg-[rgba(255,255,255,0.05)] backdrop-blur-primary relative z-10"
      }
    >
      <div className="container flex items-center justify-between gap-2">
        <LinkLogo />
        <LangSwitcher />
      </div>
    </header>
  )
}
