"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/my-portfolio/resume", label: "이력서" },
  { href: "/my-portfolio/portfolio", label: "포트폴리오" },
  { href: "/my-portfolio/retrospective", label: "회고" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 min-w-0">
          <Link href="/my-portfolio/resume" className="text-base font-bold text-gray-900 tracking-tight shrink-0 mr-4">
            Portfolio
          </Link>
          <nav className="flex gap-1 shrink-0">
            {tabs.map((tab) => {
              const isActive =
                pathname === tab.href || pathname.startsWith(tab.href + "/");
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
