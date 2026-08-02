import { getCurrentUser } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  const tokenUser = await getCurrentUser();

  if (!tokenUser) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const user = await User.findById(tokenUser.id).select("-password");

  return Response.json({
    success: true,

    user,
  });
}
