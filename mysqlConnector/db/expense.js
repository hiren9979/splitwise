import { generateV4uuid } from "../common/common.js";
import { executeQuery } from "../common/common.js";
import responses from "../common/response.js";
export async function addExpense(data) {
  try {
    const query = `INSERT INTO expense (id, amount, name, paidBy, owedBy, createdBy) VALUES (?, ?, ?, ?, ?, ?);`;
    const expenseId = generateV4uuid();
    const result = await executeQuery(query, [
      expenseId,
      data.amount,
      data.name,
      data.paidBy,
      data.owedBy,
      data.createdBy,
    ]);
    if (result) {
      return { status: 200, Message: "successfull", data: { expenseId } };
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}

export async function addSplitExpense(data) {
  try {
    const query = `INSERT INTO splitexpense (id, paidBy, owedBy,  amount, transactionId, createdBy) VALUES (?, ?, ?, ?, ?, ?);`;
    const result = await executeQuery(query, [
      generateV4uuid(),
      data.paidBy,
      data.owedBy,
      data.amount,
      data.transactionId,
      data.createdBy,
    ]);
    if (result) {
      return result;
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}
