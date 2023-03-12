import Link from 'next/link';

import styles from './Logo.module.css'

const Logo = () => {
    return (
        <div className={styles.logo}>
            <Link href="/"></Link>
            <img className={styles.logoImage} src="logo.webp" alt="Logo" />
            <span>Budget Manager</span>
        </div>
    );
};

export default Logo;