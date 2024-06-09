"use client"

import { createContext } from "react"
import { ModalNamesType } from "@/_app/context/modal/modal-names.type"

type ModalContextValueType = {
  modalState: Record<ModalNamesType, boolean>
  openModal: (modalName: ModalNamesType) => void
  closeModal: (modalName: ModalNamesType) => void
}

export const ModalContext = createContext<ModalContextValueType>({
  modalState: {
    cookie: false,
  },
  openModal: (): void => {},
  closeModal: (): void => {},
})
