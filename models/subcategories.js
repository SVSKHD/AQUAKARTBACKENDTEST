import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const AquaSubCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    keywords: {
      type: String,
    },
    category: {
      type: ObjectId,
      ref: "AquaCategory",
    },
  },
  {
    timestamps: true,
  },
);

const AquaSubCategory =
  mongoose.models.AquaSubCategory ||
  mongoose.model("AquaSubCategory", AquaSubCategorySchema);

export default AquaSubCategory;
