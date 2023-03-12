import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Sidebar.module.css'

import Logo from './Logo';

import { isActiveRoute } from '@/utils/helpers';

const Sidebar = () => {

    const router = useRouter()

    return (
        <nav className={styles.aside}>

            <Logo />

            <ul className={styles.navList}>
                <li className={`${styles.navListItem} ${styles[isActiveRoute(router.pathname, '/transactions')]}`}>
                    <Link href="/transactions">Transactions</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;