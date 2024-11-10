import React, { createContext, useContext, useState } from "react";

type SmoothScrollContextType = {
  isSmoothScrollEnabled: boolean;
  toggleSmoothScroll: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(
  undefined
);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSmoothScrollEnabled, setIsSmoothScrollEnabled] = useState(true);

  const toggleSmoothScroll = () => {
    setIsSmoothScrollEnabled((prev) => !prev);
  };

  return (
    <SmoothScrollContext.Provider
      value={{ isSmoothScrollEnabled, toggleSmoothScroll }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (context === undefined) {
    throw new Error(
      "useSmoothScroll must be used within a SmoothScrollProvider"
    );
  }
  return context;
}
