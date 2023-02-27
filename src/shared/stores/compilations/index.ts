import { create } from "zustand";
import { NewsPageRoute } from "~/shared/routes";
import {
  useUpdateNewsTagMutation,
  useCreateNewsTagMutation,
  useNewsCategoriesQuery,
  useNewsTagsQuery,
  useCreateNewsCategoryMutation,
  useDeleteNewsTagMutation,
  useDeleteNewsCategoryMutation,
  useUpdateNewsCategoryMutation
} from "~/generated/graphql";

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
    get: {
      hook: useNewsCategoriesQuery,
      key: "newsCategories"
    },
    create: {
      hook: useCreateNewsCategoryMutation,
      key: "upsertNewsCategory"
    },
    update: {
      hook: useUpdateNewsCategoryMutation,
      key: "upsertNewsCategory"
    },
    remove: {
      hook: useDeleteNewsCategoryMutation,
      key: "deleteNewsCategory"
    }
  },
  {
    get: {
      hook: useNewsTagsQuery,
      key: "newsTags"
    },
    create: {
      hook: useCreateNewsTagMutation,
      key: "upsertNewsTag"
    },
    update: {
      hook: useUpdateNewsTagMutation,
      key: "upsertNewsTag"
    },
    remove: {
      hook: useDeleteNewsTagMutation,
      key: "deleteNewsTag"
    }
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
