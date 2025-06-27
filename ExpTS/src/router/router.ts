import { Router } from "express";
import mainController from "../controllers/main.controller";
import majorController from "../controllers/major.controller";

const router = Router()

router.get("/", mainController.index)
router.get("/about", mainController.about)
router.get("/bem-vindo/:nome", mainController.welcome)
router.get("/lorem/:num", mainController.lorem)
router.get("/cookie", mainController.testeCookie)
router.get("/hb1", mainController.hb1)
router.get("/hb2", mainController.hb2)
router.get("/hb3", mainController.hb3)
router.get("/hb4", mainController.hb4)

// rotas do controlador major
router.get("/majors/", majorController.index)
router.all("/majors/create", majorController.create)
router.get("/majors/read/:id", majorController.read)
router.all("/majors/update/:id", majorController.update)
router.get("/majors/remove/:id", majorController.remove)

export default router