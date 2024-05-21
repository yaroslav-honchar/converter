import React from "react"
import { LinkLogo } from "@/features/link-logo"

export const Header: React.FC = () => {
  return (
    <header className={"px-1 py-4 bg-secondary"}>
      <div className="container">
        <LinkLogo />
      </div>
    </header>
  )
}
