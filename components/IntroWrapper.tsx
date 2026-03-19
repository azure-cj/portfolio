"use client";

import { useState } from "react";
import IntroAnimation from "@/components/IntroAnimation";

export default function IntroWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [done, setDone] = useState(false);

  return (
    <>
      {!done && <IntroAnimation onDismiss={() => setDone(true)} />}
      <div style={{ opacity: done ? 1 : 0, transition: "opacity 0.5s ease" }}>
        {children}
      </div>
    </>
  );
}
