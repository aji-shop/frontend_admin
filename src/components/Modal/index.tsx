import React from 'react'
import styles from './style.module.css'

export interface ModalProps {
    title: string,
    handleConfirm(): void,
    handleCancel(): void,
    children: any
}

export default function Modal(props: ModalProps) {
    return (
       <div className={"d-flex justify-content-center align-items-center " + styles.modal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.title}</h5>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
      <div className="modal-footer">
        <button 
            type="button" 
            className="btn btn-primary" 
            onClick={() => {props.handleConfirm()}}
        >Save</button>

        <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => {props.handleCancel()}}
        >Cancel</button>
      </div>
    </div>
    </div>
       </div>
    )
}