import { useNavigate } from 'react-router-dom';
import classes from '../../modules_css/Modal.module.css';

function Modal({ children }) {
  const navigate = useNavigate();

  return (
    <>
      <div className={classes.backdrop} onClick={() => navigate('..')} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
