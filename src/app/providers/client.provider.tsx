import React, { PropsWithChildren } from "react"

export const ClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>
}
