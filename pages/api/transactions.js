import prisma from "@/lib/prisma";

export default async function handler(req, res) {

    // Si la méthode de la requête n'est pas POST on ignore
    if (req.method !== 'POST') {
        res.status(405).json({
            status: 'error',
            message: 'Méthode non autorisée',
        });
        return;
    }

    // Extraction des données de la requête
    const { amount, type, category, date, info } = req.body;

    // Vérification des valeurs
    if (!info) {
        res.status(400).json({
            status: 'error',
            message: 'Le champ désignation ne peut être vide',
        });
        return;
    }


    if (!amount || amount <= 0) {
        res.status(400).json({
            status: 'error',
            message: 'Le montant ne peut pas être nul ou négatif',
        });
        return;
    }

    try {
        const transaction = await prisma.transaction.create({
            data: {
                amount: parseFloat(amount),
                info,
                type,
                categoryId: category,
                date: new Date(date),
            },
            include: {
                category: true,
            },
        });

        res.status(201).json({
            status: 'success',
            data: transaction,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erreur interne du serveur',
        });
    }
}