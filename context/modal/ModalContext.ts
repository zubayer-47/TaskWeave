import { ModalType } from "@/types/modal";
import { createContext, useContext } from "react";

export const ModalContext = createContext<ModalType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => {
  if (!ModalContext) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return useContext(ModalContext);
};
