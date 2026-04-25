"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupUser } from "../services/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signupSchema } from "../schema/authSchema";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignupForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await signupUser(data);
      setAuth(res);
      toast.success("Welcome! 🎉");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[400px]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-lg bg-white/10 border border-white/20 
                   shadow-2xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
        </h1>

        {/* Name */}
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full p-3 rounded-lg bg-white/20 text-white 
                     placeholder-gray-300 border border-white/30 
                     focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
        />
        <p className="text-red-400 text-sm mb-2">{errors.name?.message}</p>

        {/* Email */}
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-white/20 text-white 
                     placeholder-gray-300 border border-white/30 
                     focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
        />
        <p className="text-red-400 text-sm mb-2">{errors.email?.message}</p>

        {/* Password */}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-white/20 text-white 
                     placeholder-gray-300 border border-white/30 
                     focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
        />
        <p className="text-red-400 text-sm mb-4">
          {errors.password?.message}
        </p>

        {/* Button */}
        <button
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg font-semibold text-white
                     bg-gradient-to-r from-purple-500 to-indigo-600
                     hover:scale-[1.02] hover:shadow-lg
                     transition-all duration-200"
        >
          {isSubmitting ? "Creating..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-gray-300 text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </motion.div>
  );
}