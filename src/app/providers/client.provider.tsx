import React, { PropsWithChildren } from "react"
import { PrimeReactProvider } from "primereact/api"

export const ClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <PrimeReactProvider>{children}</PrimeReactProvider>
}
