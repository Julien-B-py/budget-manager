import TransactionCard from "@/components/molecules/TransactionCard";

import { deleteTransaction } from "@/utils/api";

import styles from './TransactionList.module.css'

export default function TransactionList({ transactions, onDeleteTransaction }) {

    async function handleDelete(transactionId) {

        const confirmed = window.confirm("Are you sure you want to delete this transaction?");

        if (confirmed) {
            try {
                if (deleteTransaction(transactionId)) onDeleteTransaction(transactionId);
            } catch (error) {
                console.error(error);
            }

        }
    }

    return (
        <div className={styles.grid}>
            {transactions.map((transaction) => (
                <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}