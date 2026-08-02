import connectDB from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { getCurrentUser } from "@/lib/auth";

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
        {
          status: 401,
        },
      );
    }

    const expenses = await Expense.find({
      userId: user.id,
    }).lean();

    const total = expenses.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );

    const count = expenses.length;

    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyExpenses = expenses.filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    const monthly = monthlyExpenses.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );

    // Category totals
    const categories = {};

    expenses.forEach((expense) => {
      const category = expense.category || "Other";

      categories[category] =
        (categories[category] || 0) + Number(expense.amount || 0);
    });

    // Top spending category
    let topCategory = "None";

    if (Object.keys(categories).length > 0) {
      topCategory = Object.keys(categories).reduce((a, b) =>
        categories[a] > categories[b] ? a : b,
      );
    }

    // Monthly spending
    const monthlyData = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);

      const month = date.toLocaleString("default", {
        month: "short",
      });

      monthlyData[month] =
        (monthlyData[month] || 0) + Number(expense.amount || 0);
    });

    return Response.json({
      success: true,

      stats: {
        total,
        count,
        monthly,
        topCategory,

        categories: Object.entries(categories).map(([name, value]) => ({
          name,
          value,
        })),

        monthlyData: Object.entries(monthlyData).map(([month, amount]) => ({
          month,
          amount,
        })),
      },
    });
  } catch (error) {
    console.error("Stats API error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to load expense statistics",
      },
      {
        status: 500,
      },
    );
  }
}
