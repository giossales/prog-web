import { Request, Response } from "express";
import { createMajor, getMajor, getMajors, removeMajor, updateMajor } from "../services/major";

const index = async (req: Request, res: Response) => {
    try {
        const majors = await getMajors();
        res.render("major/index", {
            majors,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

const create = async (req: Request, res: Response) => {
    if (req.method === "GET") {
        res.render("major/create");
    } else if (req.method === "POST") {
        try {
            const major = req.body;
            await createMajor(major);
            res.redirect("/majors");
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
};

const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const major = await getMajor(id);
        res.render("major/read", {
            major,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    // aqui ele só busca pra mostrar no formulário
    if (req.method === "GET") {
        const major = await getMajor(id);
        if (major) {
            return res.render("major/update", { major });
        }
        return res.status(404).send("Curso não encontrado.");
    }

    // se for post, salva
    try {
        await updateMajor(id, req.body);
        res.redirect("/majors");
    } catch (err) {
        console.error("Erro ao atualizar curso:", err);
        res.status(500).send("Erro ao atualizar o curso.");
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const removedMajor = await removeMajor(id);

        if (removedMajor) {
            res.status(200).json({ message: 'Curso excluído com sucesso.' });
        } else {
            res.status(404).json({ error: 'Curso não encontrado.' });
        }
    } catch (error) {
        console.error("Erro ao excluir curso:", error);
        res.status(500).json({ error: 'Falha ao excluir o curso.' });
    }
};

export default { index, create, read, update, remove };