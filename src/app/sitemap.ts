import { MetadataRoute } from "next";
import { getTutorials, getExamples } from "@/lib/db";

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
    tutorialPages = tutorials.map((tutorial) => ({
      url: `${baseUrl}/tutorials/${tutorial.slug}`,
      lastModified: tutorial.updated_at || tutorial.created_at,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to fetch tutorials for sitemap:", error);
  }

  // Dynamic example pages
  let examplePages: MetadataRoute.Sitemap = [];
  try {
    const examples = await getExamples();
    examplePages = examples.map((example) => ({
      url: `${baseUrl}/examples/${example.slug}`,
      lastModified: example.updated_at || example.created_at,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch examples for sitemap:", error);
  }

  return [...staticPages, ...tutorialPages, ...examplePages];
}
