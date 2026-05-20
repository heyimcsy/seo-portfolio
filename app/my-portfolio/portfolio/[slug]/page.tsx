import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {getAllPortfolios, getPortfolioBySlug} from "@/lib/content";
import {PortfolioSection} from "@/types";

export async function generateStaticParams() {
  const portfolios = getAllPortfolios();
  return portfolios.map((p) => ({ slug: p.slug }));
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const portfolio = getPortfolioBySlug(slug);
  if (!portfolio) notFound();

  return (
    <div className="space-y-6">
      <Link href="/my-portfolio/portfolio" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
        ← 목록으로
      </Link>

      <article className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6">
        <header className="space-y-3 pb-4 border-b border-gray-100">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">{portfolio.title}</h1>
              <span className="px-2 py-0.5 text-md font-medium border border-green-300 bg-green-50 text-green-600 rounded-md">{portfolio.side}</span>
            </div>
            <span className="text-sm text-gray-400">
              {portfolio.startDate} – {portfolio.endDate}
            </span>
          </div>
          <p className="text-gray-600">{portfolio.summary}</p>
          <Image src={portfolio.thumbnail} alt={'이미지'} height={200} width={600} />
          <div className="flex flex-wrap gap-2">
            {portfolio.techStack.map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {portfolio.links.github && (
              <a href={portfolio.links.github} target="_blank" rel="noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2">
                GitHub →
              </a>
            )}
            {portfolio.links.demo && (
              <a href={portfolio.links.demo} target="_blank" rel="noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2">
                Demo →
              </a>
            )}
          </div>
        </header>

        <div className="space-y-6">
          {portfolio.sections.map((section: PortfolioSection, i: number) => (
            <div key={i} className="space-y-2">
              <h2 className="text-base font-semibold text-gray-900">{section.title}</h2>
              {section.content && (
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
              )}
              {section.items && (
                <ul className="space-y-1.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
