const mongooseDelete = require("mongoose-delete");
const { model, Schema } = require("mongoose");

const PersonSchema = new Schema(
  {
    fullname: { type: String },
    email: { type: String, unique: true, require: true },
    suscriber: {type: Boolean, default: false},
    view: {type: Boolean, default: false},
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    specialist: [{
      type: Schema.Types.ObjectId,
      ref: 'Specialist'
    }],
    organization: [{
      type: Schema.Types.ObjectId,
      ref: 'Organization'
    }], 
    institution: [{
      type: Schema.Types.ObjectId,
      ref: 'Institution'
    }]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

PersonSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = model("Person", PersonSchema);