"use client"

import React, { PropsWithChildren, useState } from "react"
import { ModalNamesType } from "./modal-names.type"
import { ModalContext } from "./modal.context"
import { Scrollbar } from "@/shared/utils"

type ModalProviderState = Record<ModalNamesType, boolean>

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalProviderState>({
    cookie: false,
  })

  const openModal = (modalName: ModalNamesType): void => {
    if (modalState[modalName]) {
      return
    }

    setModalState(
      (prevState: ModalProviderState): ModalProviderState => ({ ...prevState, [modalName]: true }),
    )
    Scrollbar.lock()
  }

  const closeModal = (modalName: ModalNamesType): void => {
    if (!modalState[modalName]) {
      return
    }

    setModalState(
      (prevState: ModalProviderState): ModalProviderState => ({ ...prevState, [modalName]: false }),
    )
    Scrollbar.unlock()
  }

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}
