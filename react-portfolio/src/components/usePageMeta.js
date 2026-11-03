import { useEffect } from "react";
import { siteUrl } from "../data/site";

export function usePageMeta({ title, description, path = "/" }) {
  useEffect(() => {
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag && description) {
      descriptionTag.setAttribute("content", description);
    }

    const canonical = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);
  }, [title, description, path]);
}
