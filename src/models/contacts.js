import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ["work", "home", "personal"],
      required: true,
      default: "personal",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const contactsModel = mongoose.model("Contact", contactSchema);

export default contactsModel;

// import mongoose from "mongoose";

// const contactSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     email: { type: String, required: false },
//     isFavourite: { type: Boolean, default: false },
//     contactType: {
//       type: String,
//       enum: ["work", "home", "personal"],
//       required: true,
//       default: "personal",
//       ref: "User",
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       transform: (doc, ret) => {
//         delete ret.__v;
//         return ret;
//       },
//     },
//   }
// );

// const contactsModel = mongoose.model("contact", contactSchema);

// export default contactsModel;
