import { formatDate } from '@/utils/date';

import styles from './TransactionCard.module.css';

export default function TransactionCard({ transaction, onEdit, onDelete }) {

    console.log(transaction)

    const transactionBorder = transaction.type === 'EXPENSE' ? styles['card--red'] : styles['card--green'];
    const formattedDate = formatDate(transaction.date);

    return (
        <div className={`${styles.card} ${transactionBorder}`} >
            <p className={styles['card__title']}>{transaction.info}</p>
            <p className={styles['card__amount']}>{transaction.amount}€</p>
            <p>{transaction.category.name}</p>
            <p>{formattedDate}</p>
            <div>
                <button>Edit</button>
                <button onClick={() => onDelete(transaction.id)}>Delete</button>
            </div>
        </div >
    )
}