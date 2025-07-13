import { Request, Response } from 'express';
import { saveScore } from '../services/score';

export const createScore = async (req: Request, res: Response) => {
	try {
		const userId = req.session.uid;
		const { score } = req.body;

		if (!userId) {
			return res.status(401).json({ error: 'Usuário não autenticado.' });
		}
		if (typeof score !== 'number') {
			return res.status(400).json({ error: 'Pontuação inválida.' });
		}

		await saveScore(userId, score);
		res.status(200).json({ message: 'Pontuação salva com sucesso!' });
	} catch (error) {
		console.error("Erro ao salvar pontuação:", error);
		res.status(500).json({ error: 'Falha ao salvar a pontuação.' });
	}
};

export default { createScore };