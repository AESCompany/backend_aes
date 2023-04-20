const { Schema, model } = require("mongoose");

const Permission = new Schema(
  {
    name: { type: String, require: true, unique: true },

    /*  roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId,
    }] */
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("Permission", Permission);
