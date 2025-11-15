import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Email and password required" }), { status: 400 });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = new Response(
      JSON.stringify({ message: "Login successful" }),
      { status: 200 }
    );

    response.headers.append(
      "Set-Cookie",
      `adminToken=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`
    );

    return response;

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
