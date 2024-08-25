import { useEffect, useState } from "react";

export function useCSR() {
  const [isCSR, setCSR] = useState(false);

  useEffect(() => {
    setCSR(true);
  }, []);

  return isCSR;
}
