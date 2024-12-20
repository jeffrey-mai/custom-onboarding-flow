import { Router, Request, Response } from 'express';
import accountController from '../controllers/AccountController';

const router = Router();

router.post("/", accountController.addAccount, (req: Request, res: Response) => {
  if(req.body.data.rows.length == 0) req.body.data.rows.push = {success: false};
  else req.body.data.rows.push = {success: false};
  res.status(200).json(req.body.data);
});

router.put("/", accountController.updateFormsTable, (req: Request, res: Response) =>
  res.status(200).send("updated form")
);

router.get("/account", accountController.getAccount, (req: Request, res: Response) =>
  res.status(200).json(res.locals.exists)
);

router.get("/data/accounts", accountController.getAccountsTable, (req: Request, res: Response) =>
  res.status(200).json(res.locals.accounts)
);

router.get("/data/forms", accountController.getFormsTable, (req: Request, res: Response) =>
  res.status(200).json(res.locals.forms)
);

export default router;