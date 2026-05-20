
import { notFound } from "next/navigation";
import Link from "next/link";

import Image from "next/image";
import TiptapViewer from "@/components/retrospective/TiptapViewer";
import {getAllRetrospectives, getRetrospectiveBySlug} from "@/lib/content";

export async function generateStaticParams() {
  const retrospectives = getAllRetrospectives();
  return retrospectives.map((r) => ({ slug: r.slug }));
}

export default async function RetrospectiveDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const retro = getRetrospectiveBySlug(slug);
  if (!retro) notFound();

  return (
    <div className="space-y-6">
      <Link href="/retrospective" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
        ← 목록으로
      </Link>

      <article className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-5">
        <header className="space-y-3 pb-4 border-b border-gray-100">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{retro.title}</h1>
            <span className="text-sm text-gray-400">{formatDate(retro.date)}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {retro.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <TiptapViewer content={retro.content} />
      </article>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${year}.${month}.${day}`;
}
