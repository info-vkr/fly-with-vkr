// /app/api/news/route.js
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 0; // if 0, return all

    // Sort newest first
    const query = News.find().sort({ createdAt: -1 });

    // Apply pagination or simple limit
    let news, totalPages;

    if (limit > 0 && !searchParams.has("page")) {
      // ✅ Case: Home page wants latest 3 (no pagination)
      news = await query.limit(limit);
      totalPages = 1;
    } else {
      // ✅ Case: News page (pagination)
      const totalNews = await News.countDocuments();
      totalPages = Math.ceil(totalNews / limit);
      const skip = (page - 1) * limit;
      news = await query.skip(skip).limit(limit);
    }

    return Response.json({ news, totalPages });
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    return Response.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
