// app/api/testimonials/route.js
import Testimonial from "@/models/Testimonial";
import { connectDB } from "@/lib/mongodb";

export async function GET(req) {
  await connectDB();

  try {
    // Get latest 4 active testimonials, sorted by createdAt descending
    const testimonials = await Testimonial.find({ status: "active" })
      .sort({ createdAt: -1 })
      .limit(4);

    return new Response(JSON.stringify({ success: true, testimonials }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}
