import { Request, Response, NextFunction } from 'express';
import db from '../models/AccountModel'

const accountController: { [key: string]: (req: Request, res: Response, next: NextFunction) => void } = {};

accountController.addAccount = (req: Request, res: Response, next: NextFunction) => {
  const queryString = `
    WITH existing_account AS (
      SELECT username
      FROM accounts
      WHERE username = $1
    ),
    inserted_account AS (
      INSERT INTO accounts (username, password)
      SELECT $1, $2
      WHERE NOT EXISTS (SELECT 1 FROM existing_account)
      RETURNING username
    )
    INSERT INTO forms (username)
    SELECT username FROM inserted_account
    WHERE username IS NOT NULL
    RETURNING username;
  `;
  const { username, password } = req.body;
  db.query(queryString, [username, password])
    .then((data) => {
      console.log(data);
      req.body.data = data;
      return next()
    })
    .catch((err) => {return next(err);});
}

accountController.getAccount = (req: Request, res: Response, next: NextFunction) => {
  const queryString = `
    SELECT a.*, f.* FROM accounts a
    JOIN forms f ON a.username = f.username
    WHERE a.username = $1 AND a.password = $2;
  `;
  const { username, password } = req.query;
  db.query(queryString, [username, password])
    .then((data) => {
      console.log(data.rows);
      res.locals.exists = data.rows[0];
      return next();
    })
    .catch((err) => {return next(err);});
}

accountController.getAccountsTable = (req: Request, res: Response, next: NextFunction) => {
  const queryString = `SELECT * FROM accounts;`;
  db.query(queryString, [])
    .then((data) => {
      console.log(data.rows);
      res.locals.accounts = data.rows;
      return next();
    })
    .catch((err) => {return next(err);});
}

accountController.getFormsTable = (req: Request, res: Response, next: NextFunction) => {
  const queryString = `SELECT * FROM forms;`;
  db.query(queryString, [])
    .then((data) => {
      console.log(data.rows);
      res.locals.forms = data.rows;
      return next();
    })
    .catch((err) => {return next(err);});
}

accountController.updateFormsTable = (req: Request, res: Response, next: NextFunction) => {
  const { columns, username } = req.body;
  console.log(username, columns);
  const queryColumns = columns.join(", ");
  const queryString = `
    UPDATE forms
    SET ${queryColumns}
    WHERE username = $1;
  `;
  db.query(queryString, [username])
    .then((data) => {
      console.log(data);
      return next();
    })
    .catch((err) => {return next(err);});
}

export default accountController;