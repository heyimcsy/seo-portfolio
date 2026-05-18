import { getAllRetrospectives } from "@/lib/content";
import Link from "next/link";

export default function RetrospectivePage() {
  const retrospectives = getAllRetrospectives();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">회고</h1>
      {retrospectives.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
          아직 작성된 회고가 없습니다.
        </div>
      ) : (
        <div className="space-y-3">
          {retrospectives.map((r) => (
            <Link
              key={r.slug}
              href={`/retrospective/${r.slug}`}
              className="group flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="space-y-1.5">
                <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {r.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {r.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-400 whitespace-nowrap flex-shrink-0 ml-4">
                {formatDate(r.date)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${year}.${month}.${day}`;
}
