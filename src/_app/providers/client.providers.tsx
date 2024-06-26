import React, { PropsWithChildren } from "react"

import { PrimeReactProvider } from "primereact/api"

import { ModalProvider } from "@/_app/context"

export const ClientProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <PrimeReactProvider>
      <ModalProvider>{children}</ModalProvider>
    </PrimeReactProvider>
  )
}
