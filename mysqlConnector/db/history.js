import { generateV4uuid } from "../common/common.js";
import { executeQuery } from "../common/common.js";
import responses from "../common/response.js";
export async function findAllHistory(data) {
  try {
    const query = ``;
    const result = await executeQuery(query, [
      data.loginUserId,
      data.friendUserId,
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
