import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type CategoryBelongsTo = {
  connect?: InputMaybe<Scalars['ID']>;
  create?: InputMaybe<NewsCategoryInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type Document = {
  __typename?: 'Document';
  id?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  user_name?: Maybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<Maybe<Document>>>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  imageThumbs?: Maybe<Array<Maybe<ImageThumbs>>>;
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  organizers?: Maybe<Array<Maybe<Organizer>>>;
  partners?: Maybe<Array<Maybe<Partner>>>;
  published?: Maybe<Scalars['Boolean']>;
  updated_at: Scalars['DateTime'];
};

export type EventInput = {
  deleteDocuments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  organizers?: InputMaybe<OrganizerBelongsToMany>;
  partners?: InputMaybe<PartnerBelongsToMany>;
  published?: InputMaybe<Scalars['Boolean']>;
  updateDocuments?: InputMaybe<Array<InputMaybe<UpdateDocumentInput>>>;
  uploadDocuments?: InputMaybe<Array<InputMaybe<UploadDocumentInput>>>;
  uploadImage?: InputMaybe<Scalars['Upload']>;
};

/** A paginated list of Event items. */
export type EventPaginator = {
  __typename?: 'EventPaginator';
  /** A list of Event items. */
  data: Array<Event>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type FilterByClause = {
  column: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type GalleryImage = {
  __typename?: 'GalleryImage';
  alt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

/**
 * адрес изображения (оригинал), для адаптивных изображений необходимо заменить разрешение на webp и
 * использовать для различных разрешений испроьзовать суффикс у имени файла:
 * url - http://.../file_name.png
 * thumb - http://.../file_name-thumb.webp
 *
 * получить список гененрируемых разрешений, запросом у родительско сущности поля imageThumbs
 */
export type Image = {
  __typename?: 'Image';
  id?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
};

export type ImageThumbs = {
  __typename?: 'ImageThumbs';
  height?: Maybe<Scalars['Int']>;
  method?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type Meta = {
  __typename?: 'Meta';
  auto_description: Scalars['String'];
  auto_title: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteEvent?: Maybe<Event>;
  deleteNews?: Maybe<News>;
  deleteNewsCategory?: Maybe<NewsCategory>;
  deleteNewsTag?: Maybe<NewsTag>;
  deleteOrganizer?: Maybe<Organizer>;
  deletePartner?: Maybe<Partner>;
  deleteSetting?: Maybe<Setting>;
  login: Scalars['String'];
  logout?: Maybe<User>;
  requestPasswordReset: Scalars['String'];
  resetPassword: Scalars['String'];
  /** Для тестирования, потом убрать */
  upload?: Maybe<Scalars['String']>;
  upsertEvent?: Maybe<Event>;
  upsertNews?: Maybe<News>;
  upsertNewsCategory?: Maybe<NewsCategory>;
  upsertNewsTag?: Maybe<NewsTag>;
  upsertOrganizer?: Maybe<Organizer>;
  upsertPartner?: Maybe<Partner>;
  upsertSetting?: Maybe<Setting>;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNewsArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNewsCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNewsTagArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteOrganizerArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePartnerArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSettingArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationUpsertEventArgs = {
  input: EventInput;
};


export type MutationUpsertNewsArgs = {
  input: NewsInput;
};


export type MutationUpsertNewsCategoryArgs = {
  input: NewsCategoryInput;
};


export type MutationUpsertNewsTagArgs = {
  input: NewsTagInput;
};


export type MutationUpsertOrganizerArgs = {
  input: OrganizerInput;
};


export type MutationUpsertPartnerArgs = {
  input: PartnerInput;
};


export type MutationUpsertSettingArgs = {
  input: SettingInput;
};

export type News = {
  __typename?: 'News';
  category?: Maybe<NewsCategory>;
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<Maybe<Document>>>;
  gallery?: Maybe<Array<Maybe<GalleryImage>>>;
  galleryThumbs?: Maybe<Array<Maybe<ImageThumbs>>>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  imageThumbs?: Maybe<Array<Maybe<ImageThumbs>>>;
  imageUrl?: Maybe<Scalars['String']>;
  meta?: Maybe<Meta>;
  name: Scalars['String'];
  on_index?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
  published_at?: Maybe<Scalars['DateTime']>;
  seo?: Maybe<Seo>;
  slug: Scalars['String'];
  source?: Maybe<Scalars['String']>;
  source_name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<NewsTag>>>;
  updated_at: Scalars['DateTime'];
};

export type NewsCategory = {
  __typename?: 'NewsCategory';
  id: Scalars['ID'];
  name: Scalars['String'];
  sort: Scalars['Int'];
};

export type NewsCategoryInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type NewsInput = {
  category?: InputMaybe<CategoryBelongsTo>;
  content?: InputMaybe<Scalars['String']>;
  deleteDocuments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  deleteGalleryImages?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  on_index?: InputMaybe<Scalars['Boolean']>;
  published?: InputMaybe<Scalars['Boolean']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<SeoBelongsTo>;
  slug?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
  source_name?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<TagBelongsToMany>;
  updateDocuments?: InputMaybe<Array<InputMaybe<UpdateDocumentInput>>>;
  updateGallery?: InputMaybe<Array<InputMaybe<UpdateGalleryInput>>>;
  uploadDocuments?: InputMaybe<Array<InputMaybe<UploadDocumentInput>>>;
  uploadGalleryImages?: InputMaybe<Array<InputMaybe<UploadGalleryInput>>>;
  uploadImage?: InputMaybe<Scalars['Upload']>;
};

/** A paginated list of News items. */
export type NewsPaginator = {
  __typename?: 'NewsPaginator';
  /** A list of News items. */
  data: Array<News>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type NewsTag = {
  __typename?: 'NewsTag';
  id: Scalars['ID'];
  name: Scalars['String'];
  sort: Scalars['Int'];
};

export type NewsTagInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

export type Organizer = {
  __typename?: 'Organizer';
  created_at: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Image>;
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type OrganizerBelongsToMany = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  create?: InputMaybe<Array<InputMaybe<OrganizerInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type OrganizerInput = {
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  uploadImage?: InputMaybe<Scalars['Upload']>;
};

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

export type Partner = {
  __typename?: 'Partner';
  created_at: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Image>;
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type PartnerBelongsToMany = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  create?: InputMaybe<Array<InputMaybe<PartnerInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type PartnerInput = {
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  uploadImage?: InputMaybe<Scalars['Upload']>;
};

export type Query = {
  __typename?: 'Query';
  eventById?: Maybe<Event>;
  eventBySlug?: Maybe<Event>;
  events?: Maybe<EventPaginator>;
  me: User;
  news?: Maybe<NewsPaginator>;
  newsById?: Maybe<News>;
  newsBySlug?: Maybe<News>;
  newsCategories: Array<NewsCategory>;
  newsCategoryById?: Maybe<NewsCategory>;
  newsTagById?: Maybe<NewsTag>;
  newsTags: Array<NewsTag>;
  organizerById?: Maybe<Organizer>;
  organizers: Array<Organizer>;
  partnerById?: Maybe<Partner>;
  patners: Array<Partner>;
  settingById?: Maybe<Setting>;
  settingByName?: Maybe<Setting>;
  settings: Array<Setting>;
  user?: Maybe<User>;
  users?: Maybe<UserPaginator>;
};


export type QueryEventByIdArgs = {
  id: Scalars['ID'];
};


export type QueryEventBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryEventsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryNewsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryNewsByIdArgs = {
  id: Scalars['ID'];
};


export type QueryNewsBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryNewsCategoriesArgs = {
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryNewsCategoryByIdArgs = {
  id: Scalars['ID'];
};


export type QueryNewsTagByIdArgs = {
  id: Scalars['ID'];
};


export type QueryNewsTagsArgs = {
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryOrganizerByIdArgs = {
  id: Scalars['ID'];
};


export type QueryOrganizersArgs = {
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryPartnerByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPatnersArgs = {
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QuerySettingByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySettingByNameArgs = {
  name: Scalars['String'];
};


export type QuerySettingsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type Seo = {
  __typename?: 'Seo';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type SeoBelongsTo = {
  upsert?: InputMaybe<SeoInput>;
};

export type SeoInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Setting = {
  __typename?: 'Setting';
  id: Scalars['ID'];
  name: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type SettingInput = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export type TagBelongsToMany = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  create?: InputMaybe<Array<InputMaybe<NewsTagInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type UpdateDocumentInput = {
  id: Scalars['ID'];
  sort?: InputMaybe<Scalars['Int']>;
  upload: Scalars['Upload'];
  user_name?: InputMaybe<Scalars['String']>;
};

export type UpdateGalleryInput = {
  alt?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  sort?: InputMaybe<Scalars['Int']>;
};

export type UploadDocumentInput = {
  sort?: InputMaybe<Scalars['Int']>;
  upload: Scalars['Upload'];
  user_name?: InputMaybe<Scalars['String']>;
};

export type UploadGalleryInput = {
  alt?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  upload: Scalars['Upload'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  email_verified_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  role: Scalars['Int'];
  updated_at: Scalars['DateTime'];
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'User', id: string } | null };

export type AllNewsFieldsFragment = { __typename?: 'News', id: string, name: string, slug: string, content?: string | null, description?: string | null, imageUrl?: string | null, source?: string | null, source_name?: string | null, published?: boolean | null, created_at: any, updated_at: any, published_at?: any | null, on_index?: boolean | null, image?: { __typename?: 'Image', id?: string | null, url?: string | null } | null, gallery?: Array<{ __typename?: 'GalleryImage', id?: string | null, url?: string | null } | null> | null, category?: { __typename?: 'NewsCategory', id: string, name: string, sort: number } | null, tags?: Array<{ __typename?: 'NewsTag', id: string, name: string, sort: number } | null> | null, seo?: { __typename?: 'Seo', id: string, title?: string | null, description?: string | null } | null };

export type NewsByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NewsByIdQuery = { __typename?: 'Query', newsById?: { __typename?: 'News', id: string, name: string, slug: string, content?: string | null, description?: string | null, imageUrl?: string | null, source?: string | null, source_name?: string | null, published?: boolean | null, created_at: any, updated_at: any, published_at?: any | null, on_index?: boolean | null, image?: { __typename?: 'Image', id?: string | null, url?: string | null } | null, gallery?: Array<{ __typename?: 'GalleryImage', id?: string | null, url?: string | null } | null> | null, category?: { __typename?: 'NewsCategory', id: string, name: string, sort: number } | null, tags?: Array<{ __typename?: 'NewsTag', id: string, name: string, sort: number } | null> | null, seo?: { __typename?: 'Seo', id: string, title?: string | null, description?: string | null } | null } | null };

export type NewsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type NewsQuery = { __typename?: 'Query', news?: { __typename?: 'NewsPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', lastPage: number, total: number, perPage: number }, data: Array<{ __typename?: 'News', id: string, name: string, slug: string, content?: string | null, description?: string | null, imageUrl?: string | null, source?: string | null, source_name?: string | null, published?: boolean | null, created_at: any, updated_at: any, published_at?: any | null, on_index?: boolean | null, image?: { __typename?: 'Image', id?: string | null, url?: string | null } | null, gallery?: Array<{ __typename?: 'GalleryImage', id?: string | null, url?: string | null } | null> | null, category?: { __typename?: 'NewsCategory', id: string, name: string, sort: number } | null, tags?: Array<{ __typename?: 'NewsTag', id: string, name: string, sort: number } | null> | null, seo?: { __typename?: 'Seo', id: string, title?: string | null, description?: string | null } | null }> } | null };

export type UpdateOnIndexMutationVariables = Exact<{
  id: Scalars['ID'];
  on_index: Scalars['Boolean'];
}>;


export type UpdateOnIndexMutation = { __typename?: 'Mutation', upsertNews?: { __typename?: 'News', id: string } | null };

export type AllNewsCategoriesFieldsFragment = { __typename?: 'NewsCategory', id: string, sort: number, name: string };

export type NewsCategoryByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NewsCategoryByIdQuery = { __typename?: 'Query', newsCategoryById?: { __typename?: 'NewsCategory', id: string, sort: number, name: string } | null };

export type NewsCategoriesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
}>;


export type NewsCategoriesQuery = { __typename?: 'Query', newsCategories: Array<{ __typename?: 'NewsCategory', id: string, sort: number, name: string }> };

export type AllNewsTagsFieldsFragment = { __typename?: 'NewsTag', id: string, sort: number, name: string };

export type NewsTagByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NewsTagByIdQuery = { __typename?: 'Query', newsTagById?: { __typename?: 'NewsTag', id: string, sort: number, name: string } | null };

export type NewsTagsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
}>;


export type NewsTagsQuery = { __typename?: 'Query', newsTags: Array<{ __typename?: 'NewsTag', id: string, sort: number, name: string }> };

export type AllUsersFieldsFragment = { __typename?: 'User', id: string, role: number, name: string, email: string, email_verified_at?: any | null };

export type UsersQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type UsersQuery = { __typename?: 'Query', users?: { __typename?: 'UserPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', lastPage: number, total: number, perPage: number }, data: Array<{ __typename?: 'User', id: string, role: number, name: string, email: string, email_verified_at?: any | null }> } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, role: number, name: string, email: string, email_verified_at?: any | null } };

export const AllNewsFieldsFragmentDoc = `
    fragment allNewsFields on News {
  id
  name
  slug
  content
  description
  imageUrl
  source
  source_name
  published
  image {
    id
    url
  }
  gallery {
    id
    url
  }
  category {
    id
    name
    sort
  }
  tags {
    id
    name
    sort
  }
  seo {
    id
    title
    description
  }
  created_at
  updated_at
  published_at
  on_index
}
    `;
export const AllNewsCategoriesFieldsFragmentDoc = `
    fragment allNewsCategoriesFields on NewsCategory {
  id
  sort
  name
}
    `;
export const AllNewsTagsFieldsFragmentDoc = `
    fragment allNewsTagsFields on NewsTag {
  id
  sort
  name
}
    `;
export const AllUsersFieldsFragmentDoc = `
    fragment allUsersFields on User {
  id
  role
  name
  email
  email_verified_at
}
    `;
export const LoginDocument = `
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
export const LogoutDocument = `
    mutation Logout {
  logout {
    id
  }
}
    `;
export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      ['Logout'],
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers)(),
      options
    );
export const NewsByIdDocument = `
    query newsById($id: ID!) {
  newsById(id: $id) {
    ...allNewsFields
  }
}
    ${AllNewsFieldsFragmentDoc}`;
export const useNewsByIdQuery = <
      TData = NewsByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: NewsByIdQueryVariables,
      options?: UseQueryOptions<NewsByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NewsByIdQuery, TError, TData>(
      ['newsById', variables],
      fetcher<NewsByIdQuery, NewsByIdQueryVariables>(client, NewsByIdDocument, variables, headers),
      options
    );
export const NewsDocument = `
    query news($orderBy: [OrderByClause!], $filter: [FilterByClause!], $first: Int = 30, $page: Int) {
  news(orderBy: $orderBy, filter: $filter, first: $first, page: $page) {
    paginatorInfo {
      lastPage
      total
      perPage
    }
    data {
      ...allNewsFields
    }
  }
}
    ${AllNewsFieldsFragmentDoc}`;
export const useNewsQuery = <
      TData = NewsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: NewsQueryVariables,
      options?: UseQueryOptions<NewsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NewsQuery, TError, TData>(
      variables === undefined ? ['news'] : ['news', variables],
      fetcher<NewsQuery, NewsQueryVariables>(client, NewsDocument, variables, headers),
      options
    );
export const UpdateOnIndexDocument = `
    mutation UpdateOnIndex($id: ID!, $on_index: Boolean!) {
  upsertNews(input: {id: $id, on_index: $on_index}) {
    id
  }
}
    `;
export const useUpdateOnIndexMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateOnIndexMutation, TError, UpdateOnIndexMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateOnIndexMutation, TError, UpdateOnIndexMutationVariables, TContext>(
      ['UpdateOnIndex'],
      (variables?: UpdateOnIndexMutationVariables) => fetcher<UpdateOnIndexMutation, UpdateOnIndexMutationVariables>(client, UpdateOnIndexDocument, variables, headers)(),
      options
    );
export const NewsCategoryByIdDocument = `
    query newsCategoryById($id: ID!) {
  newsCategoryById(id: $id) {
    ...allNewsCategoriesFields
  }
}
    ${AllNewsCategoriesFieldsFragmentDoc}`;
export const useNewsCategoryByIdQuery = <
      TData = NewsCategoryByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: NewsCategoryByIdQueryVariables,
      options?: UseQueryOptions<NewsCategoryByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NewsCategoryByIdQuery, TError, TData>(
      ['newsCategoryById', variables],
      fetcher<NewsCategoryByIdQuery, NewsCategoryByIdQueryVariables>(client, NewsCategoryByIdDocument, variables, headers),
      options
    );
export const NewsCategoriesDocument = `
    query newsCategories($orderBy: [OrderByClause!]) {
  newsCategories(orderBy: $orderBy) {
    ...allNewsCategoriesFields
  }
}
    ${AllNewsCategoriesFieldsFragmentDoc}`;
export const useNewsCategoriesQuery = <
      TData = NewsCategoriesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: NewsCategoriesQueryVariables,
      options?: UseQueryOptions<NewsCategoriesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NewsCategoriesQuery, TError, TData>(
      variables === undefined ? ['newsCategories'] : ['newsCategories', variables],
      fetcher<NewsCategoriesQuery, NewsCategoriesQueryVariables>(client, NewsCategoriesDocument, variables, headers),
      options
    );
export const NewsTagByIdDocument = `
    query newsTagById($id: ID!) {
  newsTagById(id: $id) {
    ...allNewsTagsFields
  }
}
    ${AllNewsTagsFieldsFragmentDoc}`;
export const useNewsTagByIdQuery = <
      TData = NewsTagByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: NewsTagByIdQueryVariables,
      options?: UseQueryOptions<NewsTagByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NewsTagByIdQuery, TError, TData>(
      ['newsTagById', variables],
      fetcher<NewsTagByIdQuery, NewsTagByIdQueryVariables>(client, NewsTagByIdDocument, variables, headers),
      options
    );
export const NewsTagsDocument = `
    query newsTags($orderBy: [OrderByClause!]) {
  newsTags(orderBy: $orderBy) {
    ...allNewsTagsFields
  }
}
    ${AllNewsTagsFieldsFragmentDoc}`;
export const useNewsTagsQuery = <
      TData = NewsTagsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: NewsTagsQueryVariables,
      options?: UseQueryOptions<NewsTagsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NewsTagsQuery, TError, TData>(
      variables === undefined ? ['newsTags'] : ['newsTags', variables],
      fetcher<NewsTagsQuery, NewsTagsQueryVariables>(client, NewsTagsDocument, variables, headers),
      options
    );
export const UsersDocument = `
    query users($name: String, $first: Int = 10, $page: Int) {
  users(name: $name, first: $first, page: $page) {
    paginatorInfo {
      lastPage
      total
      perPage
    }
    data {
      ...allUsersFields
    }
  }
}
    ${AllUsersFieldsFragmentDoc}`;
export const useUsersQuery = <
      TData = UsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UsersQueryVariables,
      options?: UseQueryOptions<UsersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UsersQuery, TError, TData>(
      variables === undefined ? ['users'] : ['users', variables],
      fetcher<UsersQuery, UsersQueryVariables>(client, UsersDocument, variables, headers),
      options
    );
export const MeDocument = `
    query me {
  me {
    ...allUsersFields
  }
}
    ${AllUsersFieldsFragmentDoc}`;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['me'] : ['me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );