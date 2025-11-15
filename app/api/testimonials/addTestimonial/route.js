import Testimonial from "@/models/Testimonial";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  await connectDB();

  try {
    const { name, message } = await req.json();

    if (!name || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "Name and message are required." }),
        { status: 400 }
      );
    }

    const newTestimonial = await Testimonial.create({
      name,
      message,
      status: "inactive", // default status
    });

    return new Response(
      JSON.stringify({ success: true, testimonial: newTestimonial }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to submit testimonial." }),
      { status: 500 }
    );
  }
}
