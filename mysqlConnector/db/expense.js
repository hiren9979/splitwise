import { generateV4uuid } from "../common/common.js";
import { executeQuery } from "../common/common.js";
import responses from "../common/response.js";
export async function addExpense(data) {
  try {
    const userList = data.owedBy.join(",");
    console.log(userList);
    console.log("adding expense");
    const query = `INSERT INTO expense (id, amount, name, paidBy, owedBy, notes, createdBy)
                   VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const expenseId = generateV4uuid();
    console.log(expenseId);
    const result = await executeQuery(query, [
      expenseId,
      data.amount,
      data.name,
      data.paidBy,
      userList,
      data.description,
      "f",
    ]);
    console.log("result: " + result);
    if (result && result.affectedRows > 0) {
      console.log("Expense added successfully.");
      return { status: 200, message: "Successfully added expense", data: { expenseId } };
    } else {
      console.error("Failed to add expense.");
      return { status: 400, message: "Failed to add expense" };
    }
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error; // Rethrow the error to be handled by the caller
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
