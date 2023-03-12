import styles from './Topbar.module.css'

const Topbar = ({ children }) => {
    return (
        <div className={styles.topbar}>
            {children}
        </div>
    );
};

export default Topbar;