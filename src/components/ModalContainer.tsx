import { useModal } from "~/context/modal-context";

export function ModalContainer() {
  const { isModalOpen, closeModal, modal } = useModal();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-gray-700 p-6">
        {modal}
        <button
          onClick={closeModal}
          className="mt-4 w-full rounded bg-red-500 py-2 text-white hover:bg-red-600 focus:outline-none"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
