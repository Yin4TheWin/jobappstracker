import Modal from 'react-bootstrap/Modal';
import ModalTypes from '../globals/types/ModalTypes';

export default function ModalPopup({showModal, toggleModal, header, body, footer} : ModalTypes){
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