import React from "react"
import { Icon, LinkRoot } from "@/shared/components"
import { ClientRoutes } from "@/app/routes"

export const LinkLogo: React.FC = () => {
  return (
    <LinkRoot href={ClientRoutes.home}>
      <Icon
        name={"logo"}
        className={"w-8 h-8"}
      />
    </LinkRoot>
  )
}
