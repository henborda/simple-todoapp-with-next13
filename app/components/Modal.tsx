
interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className='modal-box relative'>
        <label
          onClick={() => setModalOpen(false)}
          className='btn btn-squar absolute right-3 top-3'
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;
