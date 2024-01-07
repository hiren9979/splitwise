// models/responseModel.js
class ResponseModel {
    constructor(success, data, message, status) {
      this.success = success;
      this.data = data;
      this.message = message;
      this.status = status;
    }
  }
  
  module.exports = ResponseModel;
  