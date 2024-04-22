"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:3000/users/b0d6a21e-5cb7-44a8-b721-05378088c3c", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then(console.log);
  }, []);
  console.log("Home");
  return <></>;
}
