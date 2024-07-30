import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { passwordRoutes } from "./password.routes";
import { usuarioRoutes } from "./usuario.routes";

const router = Router();

router.use("/password", passwordRoutes);
router.use(authenticateRoutes);

router.use("/usuario", usuarioRoutes);

export { router }