"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#ffffff",
          color: "#1d271f",
          border: "1px solid #e1e8e1",
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
          fontFamily: "'Hind Siliguri', sans-serif",
          fontSize: "15px",
        },
        success: {
          iconTheme: {
            primary: "#05893e",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#d03739",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
