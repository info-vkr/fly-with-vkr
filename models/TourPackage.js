import mongoose from "mongoose";

const TourPackageSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["inbound", "outbound"],
      required: true,
    },
    district: {
      type: String,
      required: function () {
        return this.category === "inbound";
      },
    },
    region: {
      type: String,
      required: function () {
        return this.category === "outbound";
      },
    },
    attractions: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        image: {
          type: String, // Cloudinary image URL
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "tour_packages" }
);

export default mongoose.models.TourPackage ||
  mongoose.model("TourPackage", TourPackageSchema);
