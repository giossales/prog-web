import { Request, Response } from "express"
import { loremIpsum } from "lorem-ipsum";
import { getTopTenRanking } from "../services/ranking";

const index = (req: Request, res: Response) => {
    res.render('game');
};

const about = (req: Request, res: Response) => {
    res.render('sobre', {
        mensagem: "Página sobre",
    });
}

const welcome = (req: Request, res: Response) => {
    res.status(200).send(`Bem vindo, ${req.params.nome}`)
}

const lorem = (req: Request, res: Response) => {
    res.status(200).send(loremIpsum({
        count: parseInt(req.params.num),
        format: "plain",
        paragraphLowerBound: 7,
        paragraphUpperBound: 15,
        random: Math.random,
        sentenceLowerBound: 5,
        sentenceUpperBound: 15,
        suffix: "<br><br>",
        units: "paragraphs",
    }))
}

const hb1 = (req: Request, res: Response) => {
    res.render('hb1', {
        mensagem: 'Universidade Federal Do Amazonas',
    });
}

const hb2 = (req: Request, res: Response) => {
    res.render('hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
    });
}

const hb3 = (req: Request, res: Response) => {
    const discs = [
        { nome: "AED1", cg: 90 },
        { nome: "BD1", cg: 60 },
        { nome: "IC", cg: 90 },
    ]

    const profs = [
        { nome: "David Fernandes", sala: 2338 },
        { nome: "Edleno Moura", sala: 2336 },
        { nome: "Pio", sala: 2330 },
    ]

    res.render("hb3", {
        discs,
        profs,
        mensagem: "Bem-vindo(a) ao IComp",
        mostrar_mensagem: true,
    })
}

const hb4 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('hb4', { technologies });
}

const testeCookie = (req: Request, res: Response) => {
    if (!('teste-cookie' in req.cookies)) {
        res.cookie('teste-cookie', 'algum valor')
        res.send('Você nunca passou por aqui')
    } else {
        res.send('Você já passou por aqui')
    }
}

const ranking = async (req: Request, res: Response) => {
    try {
        const topPlayers = await getTopTenRanking();
        res.render("ranking", { players: topPlayers });
    } catch (err) {
        console.error("Erro ao carregar o ranking:", err);
        res.status(500).send("Erro ao carregar o ranking.");
    }
};

export default { index, about, welcome, lorem, hb1, hb2, hb3, hb4, testeCookie, ranking }
