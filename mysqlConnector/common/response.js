const responses = {
  success: {
    status: 200,
    message: "Success",
  },
  created: {
    status: 201,
    message: "Resource created successfully",
  },
  badRequest: {
    status: 400,
    message: "Bad Request",
  },
  unauthorized: {
    status: 401,
    message: "Unauthorized",
  },
  forbidden: {
    status: 403,
    message: "Forbidden",
  },
  notFound: {
    status: 404,
    message: "Resource not found",
  },
  internalServerError: {
    status: 500,
    message: "Internal Server Error",
  },
  tryAgain: {
    status: 500,
    message: "Something went wrong please try again",
  },
  errorOccured: function (status, err) {
    return {
      status: status,
      message: err,
    }
  },
  successResponse: function (status, err) {
    return {
      status: status,
      message: err,
    }
  }
};

export default responses;
