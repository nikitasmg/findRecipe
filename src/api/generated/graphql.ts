export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type FilterByClause = {
  column: Scalars['String'];
  value: Scalars['String'];
};

/**
 * адрес изображения (оригинал), для адаптивных изображений необходимо заменить разрешение на webp и
 * использовать для различных разрешений испроьзовать суффикс у имени файла:
 * url - http://.../file_name.png
 * webp - http://.../file_name.webp
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

export type Mutation = {
  __typename?: 'Mutation';
  deleteNews?: Maybe<News>;
  deleteNewsCategory?: Maybe<NewsCategory>;
  login: Scalars['String'];
  logout?: Maybe<User>;
  /** Для тестирования, потом убрать */
  upload?: Maybe<Scalars['String']>;
  upsertNews?: Maybe<News>;
  upsertNewsCategory?: Maybe<NewsCategory>;
};


export type MutationDeleteNewsArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNewsCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationUpsertNewsArgs = {
  input: NewsInput;
};


export type MutationUpsertNewsCategoryArgs = {
  input: NewsCategoryInput;
};

export type News = {
  __typename?: 'News';
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  imageThumbs?: Maybe<Array<Maybe<ImageThumbs>>>;
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
  slug: Scalars['String'];
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
  content?: InputMaybe<Scalars['String']>;
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  published_at?: InputMaybe<Scalars['DateTime']>;
  slug?: InputMaybe<Scalars['String']>;
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

export type Query = {
  __typename?: 'Query';
  me: User;
  news?: Maybe<NewsPaginator>;
  newsById?: Maybe<News>;
  newsBySlug?: Maybe<News>;
  newsCategories: Array<NewsCategory>;
  newsCategoryById?: Maybe<NewsCategory>;
  user?: Maybe<User>;
  users?: Maybe<UserPaginator>;
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


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
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

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

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
