"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth.store";

export default function InitAuth() {
  const setAuth = useAuthStore((s) => s.setAuth);
const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return; 
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    console.log(token,user)
    if(!token && !user){
      // redirect to login page
      window.location.href = "/login"
      return;
    }
    if (token && user) {
      setAuth({ token, user: JSON.parse(user) });
    }
     initialized.current = true;
  }, []);

  return null;
}