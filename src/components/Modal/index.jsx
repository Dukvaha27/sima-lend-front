import React, {useRef} from 'react';
import styles from './modal.module.css'
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const Modal = ({children,  onClose}) => {
    const ref = useRef();

    useOutsideAlerter(ref, onClose)

    return (
        <div className={styles.container}>
            <div className={styles.block} ref={ref}>
                {children}
            </div>
        </div>
    );
};

export default Modal;