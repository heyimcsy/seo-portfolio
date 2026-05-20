"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfileImage({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl flex-shrink-0">
        👤
      </div>
    );
  }

  return (
    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
      <Image
        src={src}
        alt={name}
        fill
        sizes="96px"
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}
