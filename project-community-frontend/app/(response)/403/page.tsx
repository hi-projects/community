'use client'

import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function Page(){
    const [showModal, setShowModal] = useState(true);

    return (
        <Modal show={showModal} onHide={()=>setShowModal(false)}>
            <Modal.Body>权限不足</Modal.Body>
        </Modal>
    )
}