import Modal from 'react-bootstrap/Modal';

export default function ModalPopup(props){
    return (<Modal show={props.showModal} onHide={()=>{props.toggleModal()}}>
    <Modal.Header closeButton>{props.header}</Modal.Header>
    <Modal.Body>
        {props.body}
    </Modal.Body>
    <Modal.Footer>
        {props.footer}
    </Modal.Footer>
</Modal>)
}