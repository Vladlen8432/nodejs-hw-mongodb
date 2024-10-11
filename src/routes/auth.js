import { Router } from "express";
import { registerController } from "../controllers/authController.js";
import validateBody from "../middlewares/validateBody.js";
import { registerSchema } from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

export default authRouter;

// import { Router } from "express";
// import { registerController } from "../controllers/auth.js";
// import { validateBody } from "../middlewares/validateBody.js";
// import { registerSchema } from "../schemas/authSchemas.js";

// const router = Router();

// router.post("/register", validateBody(registerSchema), registerController);

// export default router;
