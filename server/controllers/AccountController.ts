import { Request, Response, NextFunction } from 'express';
import db from '../models/AccountModel'

const accountController: { [key: string]: (req: Request, res: Response, next: NextFunction) => void } = {};

accountController.addAccount = (req: Request, res: Response, next: NextFunction) => {
  const queryString = `
    INSERT INTO accounts (username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING;
  `;
  db.query(queryString, [])
    .then((data) => {return next()})
    .catch((err) => {return next(err);});
}

export default accountController;