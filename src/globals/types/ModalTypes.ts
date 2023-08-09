import { ReactNode } from "react";

export default interface ModalProps{
    showModal: boolean,
    toggleModal: ()=>void,
    header?: ReactNode,
    body?: ReactNode,
    footer?: ReactNode
}