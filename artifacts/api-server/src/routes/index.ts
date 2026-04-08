import { Router, type IRouter } from "express";
import healthRouter from "./health";
import teamsRouter from "./teams";
import playersRouter from "./players";
import standingsRouter from "./standings";
import gamesRouter from "./games";
import announcementsRouter from "./announcements";
import statsRouter from "./stats";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(teamsRouter);
router.use(playersRouter);
router.use(standingsRouter);
router.use(gamesRouter);
router.use(announcementsRouter);
router.use(statsRouter);
router.use(adminRouter);

export default router;
