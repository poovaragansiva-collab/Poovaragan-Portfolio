"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

function getOrCreateSessionId() {
  if (typeof window === "undefined") return "";
  const key = "portfolio_chat_session_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[70] h-14 w-14 rounded-full bg-accent shadow-glow flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot size={22} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="AI assistant chat"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[65] bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[560px] glass-strong rounded-2xl overflow-hidden flex flex-col
                       sm:bottom-24 sm:right-6
                       max-sm:inset-4 max-sm:bottom-24 max-sm:w-auto max-sm:max-w-none max-sm:h-auto"
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
              <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Portfolio Assistant</p>
                <p className="text-xs text-success flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online
                </p>
              </div>
            </div>

            <div className="flex-1 min-h-0">
              {sessionId && <ChatWindow sessionId={sessionId} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
