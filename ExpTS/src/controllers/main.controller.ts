import { Request, Response, NextFunction } from "express"
import { loremIpsum } from "lorem-ipsum";

const index = (req: Request, res: Response) =>{
    res.render('home', {
        mensagem: "Página principal",
});
}

const about = (req: Request ,res: Response) =>{
    res.render('sobre', {
        mensagem: "Página sobre",
    });
}

const welcome = (req: Request ,res: Response) =>{
    res.status(200).send(`Bem vindo, ${req.params.nome}`)
}

const lorem = (req: Request ,res: Response) =>{
    res.status(200).send(loremIpsum({
        count: parseInt(req.params.num),                // Number of "words", "sentences", or "paragraphs"
        format: "plain",         // "plain" or "html"
        paragraphLowerBound: 7,  // Min. number of sentences per paragraph.
        paragraphUpperBound: 15,  // Max. number of sentences per paragarph.
        random: Math.random,     // A PRNG function
        sentenceLowerBound: 5,   // Min. number of words per sentence.
        sentenceUpperBound: 15,  // Max. number of words per sentence.
        suffix: "<br><br>",            // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs",      // paragraph(s), "sentence(s)", or "word(s)"
        // words: ["ad", ...]       // Array of words to draw from
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

const hb3 = (req: Request ,res: Response) => {
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
const testeCookie =(req: Request, res: Response) =>{
    if(!('teste-cookie' in req.cookies)){
        res.cookie('teste-cookie', 'algum valor')
        res.send('Você nunca passou por aqui')
    } else{
        res.send('Você já passou por aqui')
    }
}
export default { index, about, welcome, lorem, hb1, hb2, hb3, hb4, testeCookie}