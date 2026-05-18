import fs from "fs";
import path from "path";
import type { Resume, Portfolio, Retrospective } from "@/types";

const contentDir = path.join(process.cwd(), "content");

export function getResume(): Resume {
  const filePath = path.join(contentDir, "resume.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Resume;
}

export function getAllPortfolios(): Portfolio[] {
  const dir = path.join(contentDir, "portfolio");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      return JSON.parse(raw) as Portfolio;
    })
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
}

export function getPortfolioBySlug(slug: string): Portfolio | null {
  const filePath = path.join(contentDir, "portfolio", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Portfolio;
}

export function getAllRetrospectives(): Omit<Retrospective, "content">[] {
  const dir = path.join(contentDir, "retrospective");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const data = JSON.parse(raw) as Retrospective;
      const { content: _, ...meta } = data;
      return meta;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getRetrospectiveBySlug(slug: string): Retrospective | null {
  const filePath = path.join(contentDir, "retrospective", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Retrospective;
}
