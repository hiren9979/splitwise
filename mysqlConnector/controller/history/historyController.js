import express from "express";
import responses from "../../common/response.js";

var router = express.Router();


router.get("/allHistory", async function (req, res) {
    try {
      const loginUserId = req.headers.userId;
      const friendUserId = req.headers.friendUserId;

      const data = {
        loginUserId: loginUserId,
        friendUserId: friendUserId
      }

      const info = await findAllHistory(data);
      if (info.status == 400) {
        res.send(responses.errorOccured(400, info));
      }

      res.send(info);

      res.send(responses.successResponse(200, "Expense added successfully"));
    } catch (error) {}
  });

export default router;