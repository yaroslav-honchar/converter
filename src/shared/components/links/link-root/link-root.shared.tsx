import React from "react"
import { Link } from "@/_app/localization"
import { ILinkRootProps } from "./link-root.props"
import cn from "classnames"

export const LinkRoot: React.FC<ILinkRootProps> = ({
  href,
  locale,
  children,
  className,
  ...props
}) => {
  return (
    <Link
      href={href}
      locale={locale}
      className={cn("p-button p-component p-button-link p-0 hover:text-blue-400", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
