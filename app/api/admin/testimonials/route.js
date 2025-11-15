import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

// GET — fetch all testimonials
export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST — add new testimonial
export async function POST(req) {
  try {
    await connectDB();
    const { name, message, status } = await req.json();

    if (!name || !message) {
      return NextResponse.json(
        { success: false, message: "Name and Message required" },
        { status: 400 }
      );
    }

    const newTestimonial = await Testimonial.create({ name, message, status });

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
