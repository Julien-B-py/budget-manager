import { useState } from 'react';

import styles from './NewTransactionForm.module.css'

import { createTransaction } from '@/utils/api';

export default function NewTransactionForm({ categories, onAddTransaction }) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const [formData, setFormData] = useState({
        amount: 0,
        type: 'EXPENSE',
        category: '',
        date: currentDate,
        info: ""
    });
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await createTransaction(formData);
            console.log('Transaction created successfully', data);
            onAddTransaction(data.data)
            setFeedbackMessage('Transaction created successfully');
        } catch (error) {
            setFeedbackMessage(`Transaction creation failed: ${error.message}`);
            console.error('Transaction creation failed', error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>{feedbackMessage}</div>
            <label htmlFor="info">Désignation:
                <input type="text" id="info" name="info" value={formData.info} onChange={handleInputChange} />
            </label>
            <label htmlFor="amount">Montant:
                <input value={formData.amount} type="number" id="amount" name="amount" required onChange={handleInputChange} />
            </label>
            <label htmlFor="type">Type:
                <select id="type" value={formData.type} name="type" required onChange={handleInputChange}>
                    <option value="EXPENSE">Dépense</option>
                    <option value="INCOME">Revenu</option>
                </select>
            </label>
            <label htmlFor="category">Catégorie:
                <select value={formData.category} onChange={handleInputChange} name="category" required>
                    <option value="">Choisir une catégorie</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </label>
            <label htmlFor="date">Date:
                <input type="date" id="date" name="date" value={formData.date} required onChange={handleInputChange} />
            </label>
            <button type="submit">Ajouter une transaction</button>
        </form>
    )
}