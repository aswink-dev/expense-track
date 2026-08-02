"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Loading from "@/components/Loading";

export default function EditExpensePage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchExpense() {
      try {
        const res = await fetch(`/api/expenses/${id}`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!data.success) {
          toast.error(data.message || "Failed to load expense");
          router.push("/dashboard");
          return;
        }

        const expense = data.expense;

        setForm({
          title: expense.title || "",
          amount: expense.amount || "",
          category: expense.category || "Food",
          date: expense.date ? expense.date.split("T")[0] : "",
          note: expense.note || "",
        });
      } catch (error) {

        toast.error("Failed to load expense");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchExpense();
  }, [id, router]);

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
      setSaving(true);

      const res = await fetch(`/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Expense updated successfully");

        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update expense");
      }
    } catch (error) {

      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loading message="Loading expense..." />;
  }

  return (
    <main className="min-h-screenbg-[#f7f1e8] dark:bg-neutral-950 px-6 py-10 ">
      <div className="mx-auto max-w-3xl">

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


        <div
          className="
            rounded-3xl
           bg-[#f7f1e8] dark:bg-neutral-900
            p-6
            shadow-sm
            sm:p-8
             dark:border-gray-800
            dark:shadow-none
          "
        >

          <div className="mb-8">

            <div
              className="
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-blue-500
                text-white
                shadow-lg
              "
            >
              <Pencil size={26} />
            </div>

            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-gray-900
                dark:text-white
              "
            >
              Edit Expense
            </h1>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Update your expense details and keep your finances organized.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid gap-6 sm:grid-cols-2">

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  Expense Title
                </label>

                <input
                  name="title"
                  type="text"
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
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  Amount
                </label>

                <input
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
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

            <div className="grid gap-6 sm:grid-cols-2">

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
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
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
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

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-300
                "
              >
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

            <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:justify-end">

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
                disabled={saving}
                className="
                  rounded-2xl
                  bg-blue-500
                  px-7
                  py-3
                  font-semibold
                  text-white
                  shadow-lg
                  transition
                  hover:-translate-y-0.5
                  hover:bg-blue-600
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {saving ? "Updating..." : "Update Expense"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
