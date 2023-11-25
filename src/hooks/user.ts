import { useEffect, useState } from "react";

export function useUser() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>("");

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      setUsername(username);
    }

    setLoading(false);
  }, []);

  return { loading, username };
}
