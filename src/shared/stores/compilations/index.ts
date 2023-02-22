import { create } from "zustand";
import { NewsPageRoute } from "~/shared/routes";
import { useNewsCategoriesQuery, useNewsTagsQuery } from "~/generated/graphql";

export type Compilations = {
  id: number;
  title: string;
  heading: string;
  whereUseLink: { title: string; href: string };
};

const compilations: Compilations[] = [
  {
    id: 1,
    title: "news_categories",
    heading: "News categories",
    whereUseLink: { title: "News", href: NewsPageRoute }
  },
  {
    id: 2,
    title: "news_tags",
    heading: "News tags",
    whereUseLink: { title: "News", href: NewsPageRoute }
  }
];

const compilationsHooks = [
  {
    fetchHook: useNewsCategoriesQuery,
    key: "newsCategories"
  },
  {
    fetchHook: useNewsTagsQuery,
    key: "newsTags"
  }
];

export type CompilationsState = {
  compilations: Compilations[];
  compilationsHooks: typeof compilationsHooks;
};

export const useCompilationsStore = create<CompilationsState>(
  (): CompilationsState => ({
    compilations,
    compilationsHooks
  })
);
