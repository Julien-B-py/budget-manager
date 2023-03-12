import { useEffect, useRef } from 'react';

import styles from './Modal.module.css'

export default function Modal({ children, onClose }) {

    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (event.target === ref.current) {
                onClose()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onClose]);

    return (
        <div className={styles.modal} ref={ref}>
            <div className={styles.modal__content}  >
                <span className={styles.close} onClick={onClose}>
                    &times;
                </span>
                {children}
            </div>
        </div>
    );

}