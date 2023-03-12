import prisma from "@/lib/prisma";

export default async function handler(req, res) {

    // On vérifie la méthode HTTP utilisée
    switch (req.method) {
        // Si la méthode est POST, on continue
        case 'POST':
            // On extraie le "name" de la catégorie du body de la requête
            const { name } = req.body;
            // On vérifie si le nom est valide (au moins 3 caractères)
            if (!name || name.trim().length < 3) {
                return res.status(400).json({ status: "error", message: 'Le nom de la catégorie doit comporter au moins 3 caractères' });
            }

            try {
                // On vérifie si une catégorie avec le même nom existe déjà
                const categoryExists = await prisma.transactionCategory.findFirst({
                    where: {
                        name
                    },
                });

                // Si la catégorie existe déjà on arrête ici
                if (categoryExists) {
                    return res.status(409).json({ status: "error", message: 'La catégorie existe déjà' });
                }

                // Sinon on crée une nouvelle catégorie
                const newCategory = await prisma.transactionCategory.create({
                    data: { name }
                });
                res.status(201).json({ status: "success", data: newCategory });
            } catch (error) {
                console.error(error);
                res.status(500).json({ status: "error", message: 'Une erreur est survenue' });
            }
            break;

        // Si la méthode n'est pas POST, on ignore la requête
        default:
            return res.status(405).json({ status: "error", message: 'Méthode non autorisée' });
    }

}