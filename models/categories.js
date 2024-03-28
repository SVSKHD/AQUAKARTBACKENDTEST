import mongoose from "mongoose";

const AquaCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    images: [
      {
        publicId: String, // Public ID of the image in Cloudinary
        url: String, // URL of the image in Cloudinary
      },
    ],
    keywords: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const AquaCategory =
  mongoose.models.AquaCategory ||
  mongoose.model("AquaCategory", AquaCategorySchema);

export default AquaCategory;
