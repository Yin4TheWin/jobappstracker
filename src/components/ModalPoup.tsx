import Modal from 'react-bootstrap/Modal';
import ModalProps from '../types/ModalProps';

export default function ModalPopup({showModal, toggleModal, header, body, footer} : ModalProps){
    return (<Modal size={header==="Job Application Info"?'lg':undefined} show={showModal} onHide={()=>{toggleModal()}}>
    <Modal.Header closeButton>{header}</Modal.Header>
    <Modal.Body style={{width: '100%'}}>
        {body}
    </Modal.Body>
    {footer?<Modal.Footer>
        {footer}
    </Modal.Footer>:<></>}
</Modal>)
}