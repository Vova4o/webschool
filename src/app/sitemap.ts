import type { MetadataRoute } from "next";
import { getTutorials } from "@/lib/db";
import { curriculumLessons } from "@/lib/curriculum";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/tutorials`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/examples`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/reference`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const curriculumPages: MetadataRoute.Sitemap = curriculumLessons.map((lesson) => ({
    url: `${baseUrl}/tutorials/${lesson.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let legacyPages: MetadataRoute.Sitemap = [];
  try {
    const tutorials = await getTutorials();
    const curriculumSlugs = new Set(curriculumLessons.map((lesson) => lesson.slug));
    legacyPages = tutorials
      .filter((tutorial) => !curriculumSlugs.has(tutorial.slug))
      .map((tutorial) => ({
        url: `${baseUrl}/tutorials/${tutorial.slug}`,
        lastModified: tutorial.updated_at || tutorial.created_at,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch (error) {
    console.warn("Unable to add database tutorials to sitemap", error);
  }

  return [...staticPages, ...curriculumPages, ...legacyPages];
}
