import { Request, Response, NextFunction } from 'express';
import { getUser } from '../services/user';

export const setLocals = async (req: Request, res: Response, next: NextFunction) => {
	res.locals.isLoggedIn = false;

	if (req.session.uid) {
		const user = await getUser(req.session.uid);
		if (user) {
			res.locals.user = user;
			res.locals.isLoggedIn = true;
		}
	}

	next();
};