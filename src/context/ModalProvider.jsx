import { createContext, useContext, useState } from "react";

const ModalContext = createContext()

export const useModal = () => {
  return useContext(ModalContext)
}

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modal) => {
    setActiveModal(modal)
  }

  const closeModal = () => {
    setActiveModal(null)
  }
  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

