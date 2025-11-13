import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function GET() {
  try {
    await connectDB();

    const news = await News.find().sort({ createdAt: -1 });

    return NextResponse.json({ news, total: news.length });
  } catch (error) {
    console.error("❌ Admin error fetching news:", error);
    return NextResponse.json({ error: "Failed to fetch admin news" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const newNews = await News.create(data);
    return NextResponse.json({ news: newNews }, { status: 201 });
  } catch (err) {
    console.error("❌ News insert error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}