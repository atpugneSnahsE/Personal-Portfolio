"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

export default function Chatbot() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          fixed
          bottom-8
          right-8
          z-[9999]
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-emerald-500
          text-black
          shadow-2xl
          press-scale
          cursor-pointer
        "
      >
        {open ? (
          <X size={26} />
        ) : (
          <Bot size={26} />
        )}
      </button>

      {/* Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="
              fixed
              bottom-28
              right-8
              z-[9999]
            "
          >
            <ChatWindow />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}