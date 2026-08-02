import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be greater than 0"],
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Travel",
        "Shopping",
        "Entertainment",
        "Bills",
        "Health",
        "Education",
        "Salary",
        "Investment",
        "Other",
      ],
    },

    date: {
      type: Date,
      default: Date.now,
    },

    note: {
      type: String,
      default: "",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema);
