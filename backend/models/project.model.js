import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    url_image: {
      type: String,
      required: false,
    },
    url_live: {
      type: String,
      required: true,
    },
    url_code: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // createAt, updateAt
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
