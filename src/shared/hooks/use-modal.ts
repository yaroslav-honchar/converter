import { useContext } from "react"

import { ModalContext } from "@/_app/context"

export const useModal = () => {
  return useContext(ModalContext)
}
