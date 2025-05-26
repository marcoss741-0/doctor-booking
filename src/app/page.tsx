"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-5">
      <h1>Home Page</h1>
      <Button className="mt-4" onClick={() => alert("Button clicked!")}>
        Click Me
      </Button>
    </div>
  );
}
