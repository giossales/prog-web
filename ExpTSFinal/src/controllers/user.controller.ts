import { Request, Response } from "express";
import { createUser, getUser, getUsers, removeUser, updateUser, changePasswordService } from "../services/user";
import { getMajors } from "../services/major";
import { checkCredentials } from "../services/auth";

const index = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.render("user/index", { users });
    } catch (err) {
        console.log(err);
        res.status(500).send("Erro ao carregar a lista de usuários.");
    }
};

const create = async (req: Request, res: Response) => {
    if (req.method === "GET") {
        try {
            const majors = await getMajors();
            res.render("user/create", { majors }); // manda os cursos para o usuário escolher
        } catch (err) {
            console.log(err);
            res.status(500).send("Erro ao carregar a página de cadastro.");
        }
    }
    else if (req.method === "POST") {
        try {
            const { fullname, email, password, repeatPassword, majorId } = req.body;

            if (password !== repeatPassword) {
                const majors = await getMajors();
                return res.render("user/create", {
                    majors,
                    error: "As senhas não conferem!",
                    formData: { fullname, email, majorId }
                });
            }

            // cria o usuário
            await createUser({ fullname, email, password, majorId });
            res.redirect("/users");

        } catch (err) {
            console.log(err);
            res.status(500).send("Erro ao criar o usuário.");
        }
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const removedUser = await removeUser(id);
        if (removedUser) {
            res.status(200).json({ message: 'Usuário excluído com sucesso.' });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({ error: 'Falha ao excluir o usuário.' });
    }
};

const read = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await getUser(id);

        if (user) {
            res.render("user/read", { user });
        } else {
            res.status(404).send("Usuário não encontrado.");
        }
    } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        res.status(500).send("Erro no servidor.");
    }
};

const login = async (req: Request, res: Response) => {
    if (req.method === "GET") {
        return res.render('user/login');
    }

    const { email, password } = req.body;

    const user = await checkCredentials(email, password);

    if (!user) {
        return res.render('user/login', {
            error: "Email ou senha inválidos."
        });
    }

    req.session.uid = user.id;
    res.redirect('/users');
};

const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }

        res.redirect("/");
    });
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.method === "GET") {
        try {
            const user = await getUser(id);
            const majors = await getMajors();

            if (user) {
                return res.render("user/update", {
                    user,
                    majors,
                    helpers: {
                        eq: function (a: any, b: any) { return a === b; }
                    }
                });
            } else {
                return res.status(404).send("Usuário não encontrado.");
            }
        } catch (err) {
            return res.status(500).send("Erro no servidor.");
        }
    }

    try {
        await updateUser(id, req.body);
        res.redirect("/");
    } catch (err) {
        console.error("Erro ao atualizar usuário:", err);
        res.status(500).send("Falha ao atualizar dados.");
    }
};

const changePassword = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.method === "GET") {
        return res.render("user/change-password", { id });
    }

    const { currentPassword, newPassword, repeatNewPassword } = req.body;

    if (newPassword !== repeatNewPassword) {
        return res.render("user/change-password", { id, error: "As novas senhas não conferem." });
    }

    try {
        await changePasswordService(id, currentPassword, newPassword);

        res.redirect("/");
    } catch (err: any) {
        res.render("user/change-password", { id, error: err.message });
    }
};


export default { index, create, read, remove, login, logout, update, changePassword };