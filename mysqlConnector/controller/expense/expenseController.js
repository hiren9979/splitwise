import express from "express";
import { addExpense, addSplitExpense } from "../../db/expense.js";
import responses from "../../common/response.js";

var router = express.Router();

router.post("/equally", async function (req, res) {
  try {
    const data = {
      amount: req.body.amount,
      name: req.body.name,
      paidBy: req.body.paidBy,
      owedBy: req.body.owedBy,
      createdBy: req.body.createdBy,
    };
    const amount = data.amount;
    console.log(data);
    const info = await addExpense(data);
    const owedByUsersList = data.owedBy.split(",");
    for (let i = 0; i < owedByUsersList.length; i++) {
      data.owedBy = owedByUsersList[i];
      data.amount = amount / (owedByUsersList.length + 1);
      data.transactionId = info.data.expenseId;
      console.log(data.transactionId);
      const info1 = await addSplitExpense(data);
      if (info1.status == 400) {
        res.send(responses.errorOccured(400, info1));
      }
    }
    res.send(responses.successResponse(200, "Expense added successfully"));
  } catch (error) {}
});

router.post("/unEqually", async function (req, res) {
  try {
    const data = {
      amount: req.body.amount,
      name: req.body.name,
      paidBy: req.body.paidBy,
      owedBy: req.body.owedBy,
      createdBy: req.body.createdBy,
    };
    const owedByUsersList = data.owedBy;

    let userList = "";

    if (data.owedBy.length > 0) {
      for (let i = 0; i < owedByUsersList.length; i++) {
        data.owedBy = owedByUsersList[i].userId;
        data.amount = owedByUsersList[i].amount;
        const info1 = await addSplitExpense(data);
        console.log("add split : ", info1);

        userList += owedByUsersList[i].userId;
        if (i != owedByUsersList.length - 1) {
          userList += ",";
        }

        if (info1.status == 400) {
          res.send(responses.errorOccured(400, info1));
        }
      }
      const info = await addExpense(data);
      if (info.status == 400) {
        res.send(responses.errorOccured(400, info));
      }
    }

    res.send(responses.successResponse(200, "Expense added successfully"));
  } catch (error) {
    console.log(error);
    res.send(responses.errorOccured(400, error));
  }
});

export default router;
