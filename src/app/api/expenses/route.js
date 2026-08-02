import connectDB from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
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

    const { title, amount, category, date, note } = await request.json();

    if (!title || !amount || !category || !date) {
      return Response.json(
        {
          success: false,
          message: "All required fields must be filled",
        },
        {
          status: 400,
        },
      );
    }

    const expense = await Expense.create({
      title,
      amount: Number(amount),
      category,
      date,
      note,
      userId: user.id,
    });

    return Response.json(
      {
        success: true,
        message: "Expense created successfully",
        expense,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Create expense error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create expense",
      },
      {
        status: 500,
      },
    );
  }
}
export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const expenses = await Expense.find({
      userId: user.id,
    }).sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
