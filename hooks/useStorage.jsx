import { useState, useEffect } from "react";

export default function useStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const prevState = localStorage.getItem(key);
    if (prevState) {
      return JSON.parse(prevState);
    } else {
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const setStorageState = (newState) => {
    setState(newState);
    localStorage.setItem(key, JSON.stringify(newState));
  };

  return [state, setStorageState];
}
