import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { defaultContent } from "../data/defaultContent";

const ContentContext = createContext(defaultContent);

function mergeContent(content) {
  return {
    ...defaultContent,
    ...content,
    siteSettings: { ...defaultContent.siteSettings, ...(content?.siteSettings || {}) },
    navigation: { ...defaultContent.navigation, ...(content?.navigation || {}) },
    pages: { ...defaultContent.pages, ...(content?.pages || {}) },
    services: content?.services?.length ? content.services : defaultContent.services,
    portfolio: content?.portfolio?.length ? content.portfolio : defaultContent.portfolio,
    clients: content?.clients?.length ? content.clients : defaultContent.clients,
    stats: content?.stats?.length ? content.stats : defaultContent.stats,
  };
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api
      .getBootstrap()
      .then((data) => {
        if (active) setContent(mergeContent(data));
      })
      .catch(() => {
        if (active) setContent(defaultContent);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ ...content, loading, setContent }), [content, loading]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

export function usePage(slug) {
  const content = useContent();
  return content.pages?.[slug] || defaultContent.pages[slug];
}
