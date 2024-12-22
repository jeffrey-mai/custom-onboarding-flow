import { Request, Response, NextFunction } from 'express';
import db from '../models/AccountModel'

const accountController: { [key: string]: (req: Request, res: Response, next: NextFunction) => void } = {};

accountController.addAccount = (req: Request, res: Response, next: NextFunction) => {
  const queryString = `
    WITH inserted_account AS (
      INSERT INTO accounts (username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING username
    ),
    inserted_forms AS (
      INSERT INTO forms (username)
      SELECT $1
      WHERE NOT EXISTS (SELECT 1 FROM forms WHERE username = $1)
      RETURNING *
    )
    SELECT * FROM inserted_forms;
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
      console.log(data);
      res.locals.account = data;
      return next();
    })
    .catch((err) => {return next(err);});
}

accountController.getAccountsTable = (req: Request, res: Response, next: NextFunction) => {
  const queryString = `SELECT * FROM accounts;`;
  db.query(queryString, [])
    .then((data) => {
      res.locals.accounts = data.rows;
      return next();
    })
    .catch((err) => {return next(err);});
}

accountController.getFormsTable = (req: Request, res: Response, next: NextFunction) => {
  const queryString = `SELECT * FROM forms;`;
  db.query(queryString, [])
    .then((data) => {
      res.locals.forms = data.rows;
      return next();
    })
    .catch((err) => {return next(err);});
}

accountController.updateFormsTable = (req: Request, res: Response, next: NextFunction) => {
  const { columns, accountData, wizardpage2, wizardpage3 } = req.body;
  console.log(accountData, columns, wizardpage2, wizardpage3);
  if(columns){
    const queryColumns = columns.join(", ");
    const queryString = `
      UPDATE forms
      SET ${queryColumns}
      WHERE username = $1;
    `;
    if(!(queryColumns.includes("item_category = $2"))){
      db.query(queryString, [accountData.username])
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch((err) => {return next(err);});
    }
    else{
      console.log("item_category FOUNDDDDDDDDDDDDDD", accountData.item_category)
      db.query(queryString, [accountData.username, accountData.item_category])
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch((err) => {return next(err);});
    }
  }
  else{
    const queryString = `
      UPDATE forms
      SET wizardpage2 = $2, wizardpage3 = $3
      WHERE username = $1;
    `;
    db.query(queryString, [accountData.username, wizardpage2, wizardpage3])
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch((err) => {return next(err);});
  }
}

accountController.updateQuestions = (req: Request, res: Response, next: NextFunction) => {
  const { username, wizardpage2, wizardpage3 } = req.body;
  console.log(username, wizardpage2, wizardpage3);
  const queryString = `
    UPDATE forms
    SET wizardpage2 = $2, wizardpage3 = $3
    WHERE username = $1;
  `;
  db.query(queryString, [username, wizardpage2, wizardpage3])
    .then((data) => {
      console.log(data);
      return next();
    })
    .catch((err) => {return next(err);});
}

export default accountController;