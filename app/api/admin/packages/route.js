import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TourPackage from "@/models/TourPackage";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const area = searchParams.get("area"); // can be district or region

  const query = {};
  if (category) query.category = category;
  if (area) {
    if (category === "inbound") query.district = area;
    if (category === "outbound") query.region = area;
  }

  const packages = await TourPackage.find(query).sort({ createdAt: -1 });
  return NextResponse.json(packages);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const newPackage = await TourPackage.create(data);
  return NextResponse.json(newPackage, { status: 201 });
}
