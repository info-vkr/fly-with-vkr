import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

// GET — fetch single testimonial
export async function GET(req, { params }) {
  try {
    await connectDB();
    const testimonial = await Testimonial.findById(params.id);

    if (!testimonial) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT — update testimonial
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const data = await req.json();

    const updated = await Testimonial.findByIdAndUpdate(params.id, data, { new: true });

    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE — delete testimonial
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Testimonial.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
