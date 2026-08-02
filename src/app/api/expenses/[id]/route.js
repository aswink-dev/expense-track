import connectDB from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request, { params }) {
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

    const { id } = await params;

    const expense = await Expense.findOne({
      _id: id,
      userId: user.id,
    });

    if (!expense) {
      return Response.json(
        {
          success: false,
          message: "Expense not found",
        },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      expense,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
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

    const body = await request.json();

    const expense = await Expense.findOneAndUpdate(
      {
        _id: id,
        userId: user.id,
      },
      body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!expense) {
      return Response.json(
        {
          success: false,
          message: "Expense not found",
        },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
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

    const expense = await Expense.findOneAndDelete({
      _id: id,
      userId: user.id,
    });

    if (!expense) {
      return Response.json(
        {
          success: false,
          message: "Expense not found",
        },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
