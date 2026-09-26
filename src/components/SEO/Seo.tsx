import React from "react";
import { Helmet } from "react-helmet";

export const SITE_URL = "https://about.surf";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/upload/profile.jpg`;

interface SeoProps {
  title: string;
  description: string;
  /** path beginning with "/" (e.g. "/portfolio"); used for canonical + og:url */
  path: string;
  /** absolute or root-relative image url */
  image?: string;
  /** "website" (default) or "article" */
  type?: "website" | "article";
  keywords?: string;
  /** any JSON-LD object(s) to embed */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** set true to keep the page out of the index (e.g. 404) */
  noindex?: boolean;
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  keywords,
  jsonLd,
  noindex = false,
}) => {
  const url = `${SITE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content="Ulfat Ibadov" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
