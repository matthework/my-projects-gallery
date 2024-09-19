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
      required: false,
    },
    url_code: {
      type: String,
      required: false,
    },
    index: {
      type: Number,
      required: false,
    },
    show: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true, // createAt, updateAt
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
