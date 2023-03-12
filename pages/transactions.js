import { useState } from "react";
import Topbar from "@/components/Topbar";

import prisma from "@/lib/prisma";
import { makeSerializable } from "@/utils/makeSerializable";

import Modal from "@/components/Modal";
import NewCategoryForm from "@/components/organisms/NewCategoryForm";
import NewTransactionForm from "@/components/organisms/NewTransactionForm";

import TransactionList from "@/components/organisms/TransactionList";
import CategoryFilter from "@/components/CategoryFilter";

export default function Transactions({ initialTransactions, initialCategories }) {

    const [categories, setCategories] = useState(initialCategories);
    const [transactions, setTransactions] = useState(initialTransactions);
    const [modalType, setModalType] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleAddCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    const handleAddTransaction = newTransaction => {
        setTransactions([...transactions, newTransaction]);
    }

    const handleDeleteTransaction = (deletedTransactionId) => {
        setTransactions(transactions.filter((transaction) => transaction.id !== deletedTransactionId));
    }

    const handleOpenCategoryModal = () => {
        setModalType("category");
    };

    const handleOpenTransactionModal = () => {
        setModalType("transaction");
    };

    const handleCloseModal = () => {
        setModalType(null);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredTransactions = selectedCategory
        ? transactions.filter((transaction) => transaction.category.id === selectedCategory)
        : transactions;

    return (
        <>
            <Topbar>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h1>Transactions</h1>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
                        <button onClick={handleOpenCategoryModal}>+ Catégorie</button>
                        <button onClick={handleOpenTransactionModal}>+ Transaction</button>
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={handleCategoryChange}
                        />
                    </div>
                </div>
            </Topbar>

            <div style={{ padding: "1rem" }}>
                <TransactionList
                    transactions={filteredTransactions}
                    onDeleteTransaction={handleDeleteTransaction}
                />
            </div>

            {modalType === "category" && (
                <Modal onClose={handleCloseModal}>
                    <NewCategoryForm
                        onAddCategory={handleAddCategory}
                    />
                </Modal>
            )}

            {modalType === "transaction" && (
                <Modal onClose={handleCloseModal}>
                    <NewTransactionForm
                        categories={categories}
                        onAddTransaction={handleAddTransaction}
                    />
                </Modal>
            )}

        </>
    )
}

export async function getServerSideProps() {
    const transactions = await prisma.transaction.findMany({
        include: {
            category: true,
        },
    });

    const categories = await prisma.transactionCategory.findMany();

    return {
        props: {
            initialTransactions: makeSerializable(transactions),
            initialCategories: makeSerializable(categories)
        },
    };
}