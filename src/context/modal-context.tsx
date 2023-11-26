import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
  type ReactElement,
} from "react";

interface ModalContextType {
  isModalOpen: boolean;
  setModal: (modal: ReactElement | null) => void;
  closeModal: () => void;
  modal: ReactElement | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ReactElement | null>(null);

  function closeModal() {
    setModal(null);
  }

  const isModalOpen = Boolean(modal);

  return (
    <ModalContext.Provider value={{ modal, isModalOpen, setModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
