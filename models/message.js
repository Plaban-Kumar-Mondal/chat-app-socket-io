const mongoose = require("mongoose");
const { Schema } = mongoose;

// for this simple app our message only contains text field and date
// in future if I add user and authentication then message will contain user _id
const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
