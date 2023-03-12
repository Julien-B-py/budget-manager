import { useState } from "react";

import { createCategory } from "@/utils/api";

import styles from './NewCategoryForm.module.css'

export default function NewCategoryForm({ onAddCategory }) {
    const [categoryName, setCategoryName] = useState("");
    const [feedbackMsg, setFeedbackMsg] = useState('');

    const handleInputChange = (event) => {
        const { value } = event.target;
        setCategoryName(value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await createCategory(categoryName);

        if (data.status === 'success') {
            onAddCategory(data.data)
            setFeedbackMsg('Catégorie ajoutée avec succès');
            setCategoryName('');
        } else if (data.status === 'error') {
            setFeedbackMsg('Error: ' + data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>
                Nom:
                <input
                    type="text"
                    name="name"
                    value={categoryName}
                    onChange={handleInputChange}
                />
            </label>
            <button type="submit">Ajouter catégorie</button>
            {feedbackMsg && <p>{feedbackMsg}</p>}
        </form>
    );

}