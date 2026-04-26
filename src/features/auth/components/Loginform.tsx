"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginUser(data);
      console.log(res);
      setAuth(res);
      toast.success("Welcome back 🚀");

    //   router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-[400px]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-lg bg-white/10 border border-white/20 
                   shadow-2xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h1>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-3 mb-3 rounded-lg bg-white/20 text-white 
                     placeholder-gray-300 border border-white/30"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white 
                     placeholder-gray-300 border border-white/30"
        />

        <button
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg text-white font-semibold
                     bg-gradient-to-r from-purple-500 to-indigo-600
                     hover:scale-[1.02] transition"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-300 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-purple-400">
            Signup
          </Link>
        </p>
      </form>
    </motion.div>
  );
}