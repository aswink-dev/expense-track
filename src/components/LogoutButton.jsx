"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Logged out successfully");
        router.push("/login");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <button
      onClick={logout}
      className="
        rounded-xl
        bg-[#f7f1e8]
        px-5
        py-3
        font-semibold
        text-gray-700
        shadow-[6px_6px_12px_#c9c2b8,-6px_-6px_12px_#ffffff]
        transition
        hover:-translate-y-0.5
        hover:text-red-600
        active:translate-y-0
        active:shadow-[inset_4px_4px_8px_#c9c2b8,inset_-4px_-4px_8px_#ffffff]
      "
    >
      Logout
    </button>
  );
}
