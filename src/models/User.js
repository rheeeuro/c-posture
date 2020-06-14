import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  naverId: Number,
  githubId: Number,
  exerciseRecords: [
    {
      type: mongoose.Types.ObjectId,
      ref: "ExerciseRecord",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;