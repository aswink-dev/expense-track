"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/login");
      } else {
        setError(data.message || "Unable to create your account");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-6 py-10 dark:bg-neutral-950">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center">

        <Link
          href="/"
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
          Back to Home
        </Link>


        <div
          className="
            rounded-3xl
            bg-[#f7f1e8]
            p-6
            shadow-[10px_10px_25px_#c9c2b8,-10px_-10px_25px_#ffffff]
            sm:p-8
            dark:bg-neutral-900
            dark:shadow-none
          "
        >

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-500
              text-2xl
              text-white
              shadow-lg
            "
          >
            💰
          </div>

          <div className="mt-6">
            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-gray-900
                dark:text-white
              "
            >
              Create your account
            </h1>

            <p
              className="
                mt-2
                text-sm
                leading-relaxed
                text-gray-500
                dark:text-gray-400
              "
            >
              Start tracking your expenses and build better financial habits.
            </p>
          </div>


          {error && (
            <div
              className="
                mt-6
                rounded-2xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-600
                dark:border-red-900/50
                dark:bg-red-950/30
                dark:text-red-400
              "
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div>
              <label
                htmlFor="name"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-300
                "
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                required
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
                htmlFor="email"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-300
                "
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
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
                htmlFor="password"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-300
                "
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                required
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

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-blue-500
                px-5
                py-3.5
                text-sm
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
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p
            className="
              mt-8
              text-center
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="
                font-semibold
                text-blue-500
                transition
                hover:text-blue-600
                hover:underline
                dark:text-blue-400
                dark:hover:text-blue-300
              "
            >
              Sign in
            </Link>
          </p>
        </div>

        <p
          className="
            mt-6
            text-center
            text-xs
            text-gray-400
            dark:text-gray-600
          "
        >
          Your personal finance journey starts here.
        </p>
      </div>
    </main>
  );
}
