import prisma from "@/lib/prisma";

export default async function handler(req, res) {

    if (req.method !== 'DELETE') {
        res.status(405).json({
            status: 'error',
            message: 'Method Not Allowed',
        });
        return;
    }

    if (req.method === 'DELETE') {
        const { id } = req.query;

        try {
            const transaction = await prisma.transaction.delete({
                where: { id: id },
            });

            res.status(200).json({
                status: 'success',
                message: 'Transaction deleted successfully',
                data: transaction,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }

}