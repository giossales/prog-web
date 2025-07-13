import { Router } from "express";
import mainController from "../controllers/main.controller";
import majorController from "../controllers/major.controller";
import userController from "../controllers/user.controller";
import scoreController from '../controllers/score.controller';
import { checkAuth } from '../middleware/checkAuth';

const router = Router();

router.get("/", checkAuth, mainController.index);
router.get("/about", mainController.about);
router.get("/bem-vindo/:nome", mainController.welcome);
router.get("/lorem/:num", mainController.lorem);
router.get("/cookie", mainController.testeCookie);
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4);
router.get("/ranking", mainController.ranking);

// rotas do major controller
router.get("/majors/", majorController.index);
router.all("/majors/create", majorController.create);
router.get("/majors/read/:id", majorController.read);
router.all("/majors/update/:id", majorController.update);
router.post('/majors/remove/:id', majorController.remove);

// rotas do user controller
router.get("/users/", userController.index);
router.all("/users/create", userController.create);
router.get("/users/read/:id", userController.read);
router.all("/users/update/:id", userController.update);
router.post("/users/remove/:id", userController.remove);

router.all('/login', userController.login);
router.get('/logout', userController.logout);
router.all('/users/change-password/:id', userController.changePassword);

router.post('/scores', checkAuth, scoreController.createScore);

export default router;
