import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";
import Testimonial from "@/models/Testimonial";
import TourPackage from "@/models/TourPackage";

export async function GET() {
  await connectDB();

  try {
    const totalNews = await News.countDocuments();
    const totalTestimonials = await Testimonial.countDocuments({ status: "active" });
    const totalPackages = await TourPackage.countDocuments();

    return new Response(
      JSON.stringify({ totalNews, totalTestimonials, totalPackages }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch dashboard data" }), {
      status: 500,
    });
  }
}
