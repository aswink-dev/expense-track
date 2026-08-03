"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "./WelcomeScreen";

export default function WelcomeWrapper({ children }) {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen onComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
