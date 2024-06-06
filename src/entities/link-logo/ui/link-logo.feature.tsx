import React from "react"
import { Img, LinkRoot } from "@/shared/components"
import { ClientRoutes } from "@/_app/routes"
import cn from "classnames"

export const LinkLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <LinkRoot
      className={cn("flex items-center justify-center gap-3 font-urbanist text-", className)}
      href={ClientRoutes.home}
    >
      <Img
        className={"w-16 h-16 object-contain"}
        src={"/logo.svg"}
        alt={"Logo"}
        width={64}
        height={64}
      />
      <span>ConvertStage</span>
    </LinkRoot>
  )
}
