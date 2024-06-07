import React from "react"
import { Img, LinkRoot } from "@/shared/components"
import { ClientRoutes } from "@/_app/routes"
import cn from "classnames"

export const LinkLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <LinkRoot
      className={cn("gap-1 sm:gap-3 font-urbanist text-2xl sm:text-3xl", className)}
      href={ClientRoutes.home}
    >
      <Img
        className={"w-16 h-16 object-contain"}
        src={"/logo.svg"}
        alt={"Logo"}
        width={64}
        height={64}
      />
      <span className={"hidden sm:inline-block"}>Convertage</span>
    </LinkRoot>
  )
}
