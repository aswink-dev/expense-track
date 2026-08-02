"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AddExpensePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.amount || !form.category || !form.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Expense added successfully");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to add expense");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] dark:bg-neutral-950 px-6 py-10 ">
      <div className="mx-auto max-w-3xl">
        {/* Back Button */}

        <Link
          href="/dashboard"
          className="
            mb-6
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-xl
            bg-[#f7f1e8]
            px-4
            py-2
            text-sm
            font-semibold
            text-gray-700
            shadow-[5px_5px_12px_#c9c2b8,-5px_-5px_12px_#ffffff]
            transition
            hover:-translate-y-0.5
            dark:bg-neutral-900
            dark:text-gray-300
            dark:shadow-none
          "
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Main Card */}

        <div
          className="
            overflow-hidden
            rounded-3xl
            border-gray-200
            p-6
            bg-[#f7f1e8] dark:bg-neutral-900
            shadow-sm
            sm:p-8
            dark:border-gray-800
            dark:shadow-none
          "
        >
          {/* Header */}

          <div
            className="
              border-gray-100
              px-6
              py-6
              sm:px-8
              dark:border-gray-800
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-green-500
                  text-white
                  shadow-lg
                "
              >
                <Plus size={26} />
              </div>

              <div>
                <h1
                  className="
                text-3xl
                font-black
                tracking-tight
                text-gray-900
                dark:text-white
              "
                >
                  Add Expense
                </h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Record a new expense and keep your finances organized.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}

          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
            {/* Title + Amount */}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Expense Title
                </label>

                <input
                  name="title"
                  placeholder="e.g. Grocery shopping"
                  value={form.title}
                  onChange={handleChange}
                  className="
                     w-full
                  rounded-2xl
                  border
                  border-transparent
                  bg-[#f7f1e8]
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  shadow-[inset_4px_4px_8px_#c9c2b8,inset_-4px_-4px_8px_#ffffff]
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-400
                  dark:bg-neutral-800
                  dark:text-white
                  dark:placeholder:text-gray-500
                  dark:shadow-none
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Amount
                </label>

                <input
                  name="amount"
                  type="number"
                  min="0"
                  placeholder="₹ 0"
                  value={form.amount}
                  onChange={handleChange}
                  className="
                      w-full
                  rounded-2xl
                  border
                  border-transparent
                  bg-[#f7f1e8]
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  shadow-[inset_4px_4px_8px_#c9c2b8,inset_-4px_-4px_8px_#ffffff]
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-400
                  dark:bg-neutral-800
                  dark:text-white
                  dark:placeholder:text-gray-500
                  dark:shadow-none
                  "
                />
              </div>
            </div>

            {/* Category + Date */}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="
                     w-full
                  rounded-2xl
                  border
                  border-transparent
                  bg-[#f7f1e8]
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  shadow-[inset_4px_4px_8px_#c9c2b8,inset_-4px_-4px_8px_#ffffff]
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-400
                  dark:bg-neutral-800
                  dark:text-white
                  dark:placeholder:text-gray-500
                  dark:shadow-none
                  "
                >
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Shopping</option>
                  <option>Bills</option>
                  <option>Health</option>
                  <option>Education</option>
                  <option>Entertainment</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Date
                </label>

                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="
                     w-full
                  rounded-2xl
                  border
                  border-transparent
                  bg-[#f7f1e8]
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  shadow-[inset_4px_4px_8px_#c9c2b8,inset_-4px_-4px_8px_#ffffff]
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-400
                  dark:bg-neutral-800
                  dark:text-white
                  dark:placeholder:text-gray-500
                  dark:shadow-none
                  "
                />
              </div>
            </div>

            {/* Note */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Note
              </label>

              <textarea
                name="note"
                rows={4}
                placeholder="Add a note about this expense..."
                value={form.note}
                onChange={handleChange}
                className="
                    w-full
                  rounded-2xl
                  border
                  border-transparent
                  bg-[#f7f1e8]
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  shadow-[inset_4px_4px_8px_#c9c2b8,inset_-4px_-4px_8px_#ffffff]
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-400
                  dark:bg-neutral-800
                  dark:text-white
                  dark:placeholder:text-gray-500
                  dark:shadow-none
                  "
              />
            </div>

            {/* Buttons */}

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-gray-100
                pt-6
                sm:flex-row
                sm:justify-end
                dark:border-gray-800
              "
            >
              <Link
                href="/dashboard"
                className="
                 rounded-2xl
                  bg-[#f7f1e8]
                  px-6
                  py-3
                  border
                  border-gray-500
                  text-center
                  font-semibold
                  text-gray-700
                  shadow-[5px_5px_12px_#c9c2b8,-5px_-5px_12px_#ffffff]
                  transition
                  hover:-translate-y-0.5
                  hover:text-blue-600
                  dark:bg-neutral-800
                  dark:text-gray-300
                  dark:shadow-none
                  dark:hover:text-blue-400
                "
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-green-500
                  px-7
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:bg-green-600
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <Plus size={18} />

                {loading ? "Adding..." : "Add Expense"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
