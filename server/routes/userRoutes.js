import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/users",
  protect,
  authorize("admin"),
  getUsers
);

export default router;