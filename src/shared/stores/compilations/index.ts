import { create } from "zustand";
import { EmployeesPage, NewsPageRoute, ProjectsPageRoute } from "~/shared/routes";
import {
  useUpdateNewsTagMutation,
  useCreateNewsTagMutation,
  useNewsCategoriesQuery,
  useNewsTagsQuery,
  useCreateNewsCategoryMutation,
  useDeleteNewsTagMutation,
  useDeleteNewsCategoryMutation,
  useUpdateNewsCategoryMutation,
  useSubdivisionsQuery,
  useCreateSubdivisionMutation,
  useUpdateSubdivisionMutation,
  useDeleteSubdivisionMutation,
  useKnowledgeFieldsQuery,
  useCreateKnowledgeFieldMutation,
  useUpdateKnowledgeFieldMutation,
  useDeleteKnowledgeFieldMutation
} from "~/generated/graphql";

export type Compilations = {
  id: number;
  title: string;
  heading: string;
  whereUseLink: { title: string; href: string };
  langExist?: boolean;
};

const compilations: Compilations[] = [
  {
    id: 1,
    title: "news_categories",
    heading: "News categories",
    whereUseLink: { title: "News", href: NewsPageRoute },
    langExist: true
  },
  {
    id: 2,
    title: "news_tags",
    heading: "News tags",
    whereUseLink: { title: "News", href: NewsPageRoute },
    langExist: true
  },
  {
    id: 3,
    title: "subdivisions",
    heading: "Subdivisions",
    whereUseLink: { title: "Employees", href: EmployeesPage },
    langExist: true
  },
  {
    id: 4,
    title: "knowledgeFields",
    heading: "Knowledge fields",
    whereUseLink: { title: "Projects", href: ProjectsPageRoute },
    langExist: true
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
      key: "createNewsCategory"
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
      key: "createNewsTag"
    },
    update: {
      hook: useUpdateNewsTagMutation,
      key: "upsertNewsTag"
    },
    remove: {
      hook: useDeleteNewsTagMutation,
      key: "deleteNewsTag"
    }
  },
  {
    get: {
      hook: useSubdivisionsQuery,
      key: "subdivisions"
    },
    create: {
      hook: useCreateSubdivisionMutation,
      key: "createSubdivision"
    },
    update: {
      hook: useUpdateSubdivisionMutation,
      key: "upsertSubdivision"
    },
    remove: {
      hook: useDeleteSubdivisionMutation,
      key: "deleteSubdivision"
    }
  },
  {
    get: {
      hook: useKnowledgeFieldsQuery,
      key: "knowledgeFields"
    },
    create: {
      hook: useCreateKnowledgeFieldMutation,
      key: "createKnowledgeField"
    },
    update: {
      hook: useUpdateKnowledgeFieldMutation,
      key: "upsertKnowledgeField"
    },
    remove: {
      hook: useDeleteKnowledgeFieldMutation,
      key: "deleteKnowledgeField"
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
