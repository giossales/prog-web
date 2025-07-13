import express from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import { engine } from "express-handlebars";
import cookieParser from 'cookie-parser';
import path from 'path';

import validateEnv from "./utils/validateEnv";
import logger from "./middleware/logger";
import router from "./router/router";
import { setLocals } from './middleware/setLocals';

import * as helpers from './views/helpers/helpers';

declare module "express-session" {
    export interface SessionData {
        uid: string;
        logado: boolean;
    }
}

const app = express();
dotenv.config();
validateEnv();

const PORT = process.env.PORT ?? 6688;

app.engine("handlebars", engine({
    helpers: helpers
}));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, 'views'));

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(logger("simple"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

app.use(session({
    genid: () => uuidv4(),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
}));

app.use(setLocals);

app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
