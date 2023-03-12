export const createCategory = async (categoryName) => {
    const res = await fetch('/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
    });
    return res.json();
}

export async function createTransaction(formData) {
    const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export async function deleteTransaction(transactionId) {
    const response = await fetch(`/api/transactions/${transactionId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    if (data.status === 'success') return true;
    throw new Error(`Failed to delete transaction with id ${transactionId}`);
}