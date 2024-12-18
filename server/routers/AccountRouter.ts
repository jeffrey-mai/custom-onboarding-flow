import { Router, Request, Response } from 'express';
import accountController from '../controllers/AccountController';

const router = Router();

// router.get("/", accountController.getCartList, (req: Request, res: Response) =>
//   res.status(200).json(res.locals.cartList)
// );

// router.post("/", accountController.addToCart, (req: Request, res: Response) =>
//   res.status(200).send("Item added to cart")
// );

// router.delete("/", accountController.deleteCartItem, (req: Request, res: Response) =>
//   res.status(200).send("Item deleted")
// );

export default router;