import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ success: true, message: "✅ Connected to MongoDB" });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
