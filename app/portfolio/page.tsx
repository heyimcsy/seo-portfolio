import { getAllPortfolios } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";

export default function PortfolioPage() {
  const portfolios = getAllPortfolios();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">포트폴리오</h1>
      {portfolios.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
          아직 등록된 프로젝트가 없습니다.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {portfolios.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-40 bg-gray-100">
                {p.thumbnail ? (
                  <Image src={p.thumbnail} alt={p.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-4xl">
                    📁
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </h2>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                    {p.startDate} – {p.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{p.summary}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded">
                      {tech}
                    </span>
                  ))}
                  {p.techStack.length > 4 && (
                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                      +{p.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
