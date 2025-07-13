import { NextFunction, Request, Response } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.logado || req.session.uid) { // Sem erro
        next()
    } else {
        res.redirect("/login");
    }
}
