import { Request, Response, NextFunction } from "express"
import fsPromise from "fs/promises"

type LoggerType = "simple" | "complete"

function logger(type: LoggerType) {
    const LOGS_PATH = process.env.LOGS_PATH ?? "log"

    if (type === 'simple') {
        return async (req: Request, res: Response, next: NextFunction) => {
            const time = new Date()
            await fsPromise.writeFile(
                `${process.cwd()}/${LOGS_PATH}/logs.log`,   
                `Acesso em ${time.toISOString()} URL:${req.url} Method:${req.method}\n`,
                { flag: 'a' }
            )
            next()
        }
    }
    else{
        return async (req: Request, res: Response, next: NextFunction) => {
            const time = new Date()
            await fsPromise.writeFile(
                `${process.cwd()}/${LOGS_PATH}/logs.log`,
                `Acesso em ${time.toISOString()} URL:${req.url} Method:${req.method} HTTP_ver:${req.httpVersion} User-Agent:${req.get('User-Agent')}\n`,
                { flag: 'a' }
            )
            next()
        }
    }
}

export default logger