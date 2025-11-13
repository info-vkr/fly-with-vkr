// app/api/admin/news/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const news = await News.findById(params.id).lean();
    if (!news) return NextResponse.json({ error: "News not found" }, { status: 404 });
    return NextResponse.json({ news });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const data = await req.json();
    const updatedNews = await News.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedNews) return NextResponse.json({ error: "News not found" }, { status: 404 });
    return NextResponse.json({ news: updatedNews });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const news = await News.findByIdAndDelete(params.id);
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "News deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
