import { MetadataRoute } from "next";
import { getTutorials } from "@/lib/db";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://school.vova4o.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/tutorials`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/examples`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reference`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic tutorial pages
  let tutorialPages: MetadataRoute.Sitemap = [];
  try {
    const tutorials = await getTutorials();
    if (tutorials && tutorials.length) {
      tutorialPages = tutorials.map((tutorial) => ({
        url: `${baseUrl}/tutorials/${tutorial.slug}`,
        lastModified: tutorial.updated_at || tutorial.created_at,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    } else {
      throw new Error("no tutorials from DB");
    }
  } catch (error) {
    console.warn(
      "DB tutorials fetch failed, falling back to API fetch:",
      error
    );
    try {
      const apiBase = process.env.NEXTAUTH_URL || baseUrl;
      const res = await fetch(`${apiBase}/api/tutorials`);
      if (res.ok) {
        const tutorials = await res.json();
        tutorialPages = tutorials.map((tutorial: any) => ({
          url: `${baseUrl}/tutorials/${tutorial.slug}`,
          lastModified: tutorial.updated_at || tutorial.created_at,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }));
      } else {
        console.error("Fallback API tutorials fetch failed:", res.status);
      }
    } catch (apiErr) {
      console.error("Failed to fetch tutorials from API fallback:", apiErr);
    }
  }

  return [...staticPages, ...tutorialPages];
}
