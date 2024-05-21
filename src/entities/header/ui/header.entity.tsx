import React from "react"
import { MegaMenu } from "primereact/megamenu"
import { Icon } from "@/shared/components"

export const Header: React.FC = () => {
  return (
    <header>
      <MegaMenu
        orientation="horizontal"
        start={
          <Icon
            className={"w-8 h-8"}
            name={"logo"}
          />
        }
        className="p-3 rounded-none"
      />
    </header>
  )
}
