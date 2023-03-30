import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
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
  Date: any;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export type ActivityResult = {
  __typename?: 'ActivityResult';
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  measure_unit: Scalars['String'];
  measure_unit_en?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  result: Scalars['Float'];
  sort: Scalars['Int'];
  updated_at: Scalars['DateTime'];
};

export type ActivityResultInput = {
  id?: InputMaybe<Scalars['Int']>;
  measure_unit?: InputMaybe<Scalars['String']>;
  measure_unit_en?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  result?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type CategoryBelongsTo = {
  connect?: InputMaybe<Scalars['Int']>;
  create?: InputMaybe<NewsCategoryInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type Cluster = {
  __typename?: 'Cluster';
  column_one_name: Scalars['String'];
  column_one_name_en?: Maybe<Scalars['String']>;
  column_one_text: Scalars['String'];
  column_one_text_en?: Maybe<Scalars['String']>;
  column_two_name: Scalars['String'];
  column_two_name_en?: Maybe<Scalars['String']>;
  column_two_text: Scalars['String'];
  column_two_text_en?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  sort: Scalars['Int'];
  updated_at: Scalars['DateTime'];
};

export type ClusterInput = {
  column_one_name?: InputMaybe<Scalars['String']>;
  column_one_name_en?: InputMaybe<Scalars['String']>;
  column_one_text?: InputMaybe<Scalars['String']>;
  column_one_text_en?: InputMaybe<Scalars['String']>;
  column_two_name?: InputMaybe<Scalars['String']>;
  column_two_name_en?: InputMaybe<Scalars['String']>;
  column_two_text?: InputMaybe<Scalars['String']>;
  column_two_text_en?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

/**
 * Конкурсы. Базовая сущность, на основе которой создается проект
 *
 * https://www.figma.com/file/Fz119iA3vsOI9BcSAoqEQG/UGRA?node-id=22%3A392&t=jQzNk4jyD9g3QDdg-0
 */
export type Contest = {
  __typename?: 'Contest';
  created_at: Scalars['DateTime'];
  date?: Maybe<Scalars['Date']>;
  deadline?: Maybe<Scalars['DateTime']>;
  documents?: Maybe<Array<Maybe<Document>>>;
  id: Scalars['Int'];
  linked_documents?: Maybe<Array<Maybe<LinkedDocument>>>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  status?: Maybe<ContestStatus>;
  updated_at: Scalars['DateTime'];
};

export type ContestBelongsTo = {
  connect?: InputMaybe<Scalars['Int']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type ContestInput = {
  date?: InputMaybe<Scalars['Date']>;
  deadline?: InputMaybe<Scalars['DateTime']>;
  deleteDocuments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  id?: InputMaybe<Scalars['Int']>;
  linked_documents?: InputMaybe<LinkedDocumentMorphedByMany>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<ContestStatus>;
  updateDocuments?: InputMaybe<Array<InputMaybe<UpdateDocumentInput>>>;
  uploadDocuments?: InputMaybe<Array<InputMaybe<UploadDocumentInput>>>;
};

/** A paginated list of Contest items. */
export type ContestPaginator = {
  __typename?: 'ContestPaginator';
  /** A list of Contest items. */
  data: Array<Contest>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum ContestStatus {
  Acceptance = 'ACCEPTANCE',
  Completed = 'COMPLETED',
  Expertise = 'EXPERTISE'
}

export type Document = {
  __typename?: 'Document';
  id: Scalars['Int'];
  sort?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  /** Имя файла заданное пользователем */
  user_name?: Maybe<Scalars['String']>;
};

export type DocumentGroup = {
  __typename?: 'DocumentGroup';
  id: Scalars['Int'];
  linked_documents?: Maybe<Array<Maybe<LinkedDocument>>>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  sort: Scalars['Int'];
};

export type DocumentGroupInput = {
  id?: InputMaybe<Scalars['Int']>;
  linked_documents?: InputMaybe<LinkedDocumentMorphedByMany>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type Employee = {
  __typename?: 'Employee';
  additional?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  position_en?: Maybe<Scalars['String']>;
  sort: Scalars['Int'];
  subdivision?: Maybe<Subdivision>;
  updated_at: Scalars['DateTime'];
};

export type EmployeeInput = {
  additional?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  position_en?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  subdivision?: InputMaybe<SubdivisionBelongsTo>;
};

export type Event = {
  __typename?: 'Event';
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  description_en?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<Maybe<Document>>>;
  end?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  image?: Maybe<Image>;
  imageThumbs?: Maybe<Array<Maybe<ImageThumbs>>>;
  imageUrl?: Maybe<Scalars['String']>;
  linked_documents?: Maybe<Array<Maybe<LinkedDocument>>>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  organizers?: Maybe<Array<Maybe<Organizer>>>;
  partners?: Maybe<Array<Maybe<Partner>>>;
  place?: Maybe<Scalars['String']>;
  place_en?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
};

export type EventInput = {
  deleteDocuments?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  description_en?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  linked_documents?: InputMaybe<LinkedDocumentMorphedByMany>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  organizers?: InputMaybe<OrganizerBelongsToMany>;
  partners?: InputMaybe<PartnerBelongsToMany>;
  place?: InputMaybe<Scalars['String']>;
  place_en?: InputMaybe<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  start?: InputMaybe<Scalars['DateTime']>;
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
  alt_en?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
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
  id: Scalars['Int'];
  url?: Maybe<Scalars['String']>;
};

export type ImageThumbs = {
  __typename?: 'ImageThumbs';
  height?: Maybe<Scalars['Int']>;
  method?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

/**
 * Области знаний. Применяются для фильтрации проектов
 *
 * https://www.figma.com/file/Fz119iA3vsOI9BcSAoqEQG/UGRA?node-id=22%3A600&t=nnLdQLBhEJ10FXQM-0
 */
export type KnowledgeField = {
  __typename?: 'KnowledgeField';
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  sort: Scalars['Int'];
};

export type KnowledgeFieldBelongsTo = {
  connect?: InputMaybe<Scalars['Int']>;
  create?: InputMaybe<KnowledgeFieldInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type KnowledgeFieldInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type LikedDocumentPivotInput = {
  id: Scalars['Int'];
  sort?: InputMaybe<Scalars['Int']>;
};

export type LinkedDocument = {
  __typename?: 'LinkedDocument';
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  sort?: Maybe<Scalars['Int']>;
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
  user_name?: Maybe<Scalars['String']>;
  user_name_en?: Maybe<Scalars['String']>;
};

export type LinkedDocumentInput = {
  id?: InputMaybe<Scalars['Int']>;
  published?: InputMaybe<Scalars['Boolean']>;
  upload?: InputMaybe<Scalars['Upload']>;
  /** Имя файла заданное пользователем */
  user_name?: InputMaybe<Scalars['String']>;
  user_name_en?: InputMaybe<Scalars['String']>;
};

export type LinkedDocumentMorphedByMany = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  syncWithoutDetaching?: InputMaybe<Array<InputMaybe<LikedDocumentPivotInput>>>;
};

export type Log = {
  __typename?: 'Log';
  causer?: Maybe<User>;
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  event?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  logProperties?: Maybe<LogProperties>;
  log_name?: Maybe<Scalars['String']>;
  subject_id?: Maybe<Scalars['Int']>;
  subject_type?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

/** A paginated list of Log items. */
export type LogPaginator = {
  __typename?: 'LogPaginator';
  /** A list of Log items. */
  data: Array<Log>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type LogProperties = {
  __typename?: 'LogProperties';
  attributes?: Maybe<Scalars['JSON']>;
  old?: Maybe<Scalars['JSON']>;
};

export type MapObject = {
  __typename?: 'MapObject';
  area?: Maybe<Scalars['Float']>;
  characteristics?: Maybe<Scalars['String']>;
  characteristics_en?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  floors?: Maybe<Scalars['String']>;
  floors_en?: Maybe<Scalars['String']>;
  gross_boma_area?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  learn_more?: Maybe<Scalars['String']>;
  linked_documents?: Maybe<Array<Maybe<LinkedDocument>>>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type MapObjectInput = {
  area?: InputMaybe<Scalars['Float']>;
  characteristics?: InputMaybe<Scalars['String']>;
  characteristics_en?: InputMaybe<Scalars['String']>;
  floors?: InputMaybe<Scalars['String']>;
  floors_en?: InputMaybe<Scalars['String']>;
  gross_boma_area?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Int']>;
  learn_more?: InputMaybe<Scalars['String']>;
  linked_documents?: InputMaybe<LinkedDocumentMorphedByMany>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
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
  deleteActivityResult?: Maybe<ActivityResult>;
  deleteCluster?: Maybe<Cluster>;
  deleteContest?: Maybe<Contest>;
  deleteDocumentGroup?: Maybe<DocumentGroup>;
  deleteEmployee?: Maybe<Employee>;
  deleteEvent?: Maybe<Event>;
  deleteKnowledgeField?: Maybe<KnowledgeField>;
  deleteLinkedDocument?: Maybe<LinkedDocument>;
  deleteMapObject?: Maybe<MapObject>;
  deleteNews?: Maybe<News>;
  deleteNewsCategory?: Maybe<NewsCategory>;
  deleteNewsTag?: Maybe<NewsTag>;
  deleteOrganizer?: Maybe<Organizer>;
  deletePage?: Maybe<Page>;
  deletePartner?: Maybe<Partner>;
  deleteProject?: Maybe<Project>;
  deletePurchase?: Maybe<Purchase>;
  deleteReport?: Maybe<Report>;
  deleteSetting?: Maybe<Setting>;
  deleteStaffControl?: Maybe<StaffControl>;
  deleteSubdivision?: Maybe<Subdivision>;
  /** Нельзя удалить суперпользователя, ID=1 */
  deleteUser?: Maybe<User>;
  deleteVacancy?: Maybe<Vacancy>;
  deleteVideoBroadcast?: Maybe<VideoBroadcast>;
  login: Scalars['String'];
  logout?: Maybe<User>;
  requestPasswordReset: Scalars['String'];
  resetPassword: Scalars['String'];
  sendEmail: Scalars['String'];
  sendResume: Scalars['Boolean'];
  upload?: Maybe<Scalars['String']>;
  upsertActivityResult?: Maybe<ActivityResult>;
  upsertCluster?: Maybe<Cluster>;
  upsertContest?: Maybe<Contest>;
  upsertDocumentGroup?: Maybe<DocumentGroup>;
  upsertEmployee?: Maybe<Employee>;
  upsertEvent?: Maybe<Event>;
  upsertKnowledgeField?: Maybe<KnowledgeField>;
  upsertLinkedDocument?: Maybe<LinkedDocument>;
  upsertMapObject?: Maybe<MapObject>;
  upsertNews?: Maybe<News>;
  upsertNewsCategory?: Maybe<NewsCategory>;
  upsertNewsTag?: Maybe<NewsTag>;
  upsertOrganizer?: Maybe<Organizer>;
  upsertPage?: Maybe<Page>;
  upsertPartner?: Maybe<Partner>;
  upsertProject?: Maybe<Project>;
  upsertPurchase?: Maybe<Purchase>;
  upsertReport?: Maybe<Report>;
  upsertSetting?: Maybe<Setting>;
  upsertStaffControl?: Maybe<StaffControl>;
  upsertSubdivision?: Maybe<Subdivision>;
  upsertUser?: Maybe<User>;
  upsertVacancy?: Maybe<Vacancy>;
  upsertVideoBroadcast?: Maybe<VideoBroadcast>;
};


export type MutationDeleteActivityResultArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteClusterArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteContestArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteDocumentGroupArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteKnowledgeFieldArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteLinkedDocumentArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteMapObjectArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteNewsArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteNewsCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteNewsTagArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteOrganizerArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePageArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePartnerArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePurchaseArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteReportArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSettingArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteStaffControlArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSubdivisionArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteVacancyArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteVideoBroadcastArgs = {
  id: Scalars['Int'];
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


export type MutationSendEmailArgs = {
  email: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
  subject: Scalars['String'];
};


export type MutationSendResumeArgs = {
  email: Scalars['String'];
  files: Array<Scalars['Upload']>;
  name: Scalars['String'];
};


export type MutationUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationUpsertActivityResultArgs = {
  input: ActivityResultInput;
};


export type MutationUpsertClusterArgs = {
  input: ClusterInput;
};


export type MutationUpsertContestArgs = {
  input: ContestInput;
};


export type MutationUpsertDocumentGroupArgs = {
  input: DocumentGroupInput;
};


export type MutationUpsertEmployeeArgs = {
  input: EmployeeInput;
};


export type MutationUpsertEventArgs = {
  input: EventInput;
};


export type MutationUpsertKnowledgeFieldArgs = {
  input: KnowledgeFieldInput;
};


export type MutationUpsertLinkedDocumentArgs = {
  input: LinkedDocumentInput;
};


export type MutationUpsertMapObjectArgs = {
  input: MapObjectInput;
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


export type MutationUpsertPageArgs = {
  input: PageInput;
};


export type MutationUpsertPartnerArgs = {
  input: PartnerInput;
};


export type MutationUpsertProjectArgs = {
  input: ProjectInput;
};


export type MutationUpsertPurchaseArgs = {
  input: PurchaseInput;
};


export type MutationUpsertReportArgs = {
  input: ReportInput;
};


export type MutationUpsertSettingArgs = {
  input: SettingInput;
};


export type MutationUpsertStaffControlArgs = {
  input: StaffControlInput;
};


export type MutationUpsertSubdivisionArgs = {
  input: SubdivisionInput;
};


export type MutationUpsertUserArgs = {
  input: UserInput;
};


export type MutationUpsertVacancyArgs = {
  input: VacancyInput;
};


export type MutationUpsertVideoBroadcastArgs = {
  input: VideoBroadcastInput;
};

export type News = {
  __typename?: 'News';
  category?: Maybe<NewsCategory>;
  category_id?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  content_en?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  description_en?: Maybe<Scalars['String']>;
  gallery?: Maybe<Array<Maybe<GalleryImage>>>;
  galleryThumbs?: Maybe<Array<Maybe<ImageThumbs>>>;
  id: Scalars['Int'];
  image?: Maybe<Image>;
  imageThumbs?: Maybe<Array<Maybe<ImageThumbs>>>;
  imageUrl?: Maybe<Scalars['String']>;
  meta?: Maybe<Meta>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  on_index?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
  published_at?: Maybe<Scalars['DateTime']>;
  seo?: Maybe<Seo>;
  slug: Scalars['String'];
  source?: Maybe<Scalars['String']>;
  source_name?: Maybe<Scalars['String']>;
  source_name_en?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<NewsTag>>>;
  updated_at: Scalars['DateTime'];
};

export type NewsCategory = {
  __typename?: 'NewsCategory';
  id: Scalars['Int'];
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  sort: Scalars['Int'];
};

export type NewsCategoryInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type NewsInput = {
  category?: InputMaybe<CategoryBelongsTo>;
  content?: InputMaybe<Scalars['String']>;
  content_en?: InputMaybe<Scalars['String']>;
  deleteGalleryImages?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  description_en?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  on_index?: InputMaybe<Scalars['Boolean']>;
  published?: InputMaybe<Scalars['Boolean']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<SeoBelongsTo>;
  slug?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
  source_name?: InputMaybe<Scalars['String']>;
  source_name_en?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<TagBelongsToMany>;
  updateGallery?: InputMaybe<Array<InputMaybe<UpdateGalleryInput>>>;
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
  id: Scalars['Int'];
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  sort: Scalars['Int'];
};

export type NewsTagInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
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
  id: Scalars['Int'];
  image?: Maybe<Image>;
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type OrganizerBelongsToMany = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  create?: InputMaybe<Array<InputMaybe<OrganizerInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type OrganizerInput = {
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  uploadImage?: InputMaybe<Scalars['Upload']>;
};

export type Page = {
  __typename?: 'Page';
  children?: Maybe<Array<Maybe<Page>>>;
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  description_en?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<Maybe<Document>>>;
  gallery?: Maybe<Array<Maybe<GalleryImage>>>;
  id: Scalars['Int'];
  image?: Maybe<Image>;
  imageUrl?: Maybe<Scalars['String']>;
  linked_documents?: Maybe<Array<Maybe<LinkedDocument>>>;
  meta?: Maybe<Meta>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  params?: Maybe<Scalars['JSON']>;
  parent?: Maybe<Page>;
  parent_id?: Maybe<Scalars['Int']>;
  seo?: Maybe<Seo>;
  slug: Scalars['String'];
  sort: Scalars['Int'];
  updated_at: Scalars['DateTime'];
};

export type PageBelongsTo = {
  connect?: InputMaybe<Scalars['Int']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
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

export type PageInput = {
  deleteDocuments?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  deleteGalleryImages?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  description_en?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  linked_documents?: InputMaybe<LinkedDocumentMorphedByMany>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  params?: InputMaybe<Scalars['JSON']>;
  parent?: InputMaybe<PageParentBelongsTo>;
  parent_id?: InputMaybe<Scalars['Int']>;
  seo?: InputMaybe<SeoBelongsTo>;
  slug?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  updateDocuments?: InputMaybe<Array<InputMaybe<UpdateDocumentInput>>>;
  updateGallery?: InputMaybe<Array<InputMaybe<UpdateGalleryInput>>>;
  uploadDocuments?: InputMaybe<Array<InputMaybe<UploadDocumentInput>>>;
  uploadGalleryImages?: InputMaybe<Array<InputMaybe<UploadGalleryInput>>>;
  uploadImage?: InputMaybe<Scalars['Upload']>;
};

export type PageParentBelongsTo = {
  connect?: InputMaybe<Scalars['Int']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
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
  id: Scalars['Int'];
  image?: Maybe<Image>;
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type PartnerBelongsToMany = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  create?: InputMaybe<Array<InputMaybe<PartnerInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type PartnerInput = {
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  uploadImage?: InputMaybe<Scalars['Upload']>;
};

/** https://www.figma.com/file/Fz119iA3vsOI9BcSAoqEQG/UGRA?node-id=0%3A1&t=nnLdQLBhEJ10FXQM-0 */
export type Project = {
  __typename?: 'Project';
  /** Аннотация проекта */
  annotation?: Maybe<Scalars['String']>;
  annotation_en?: Maybe<Scalars['String']>;
  contest?: Maybe<Contest>;
  /** Конкурс */
  contest_id?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  /** Срок выполнения */
  deadline?: Maybe<Scalars['String']>;
  /** Код ГРНТИ */
  grnti_number?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  knowledge_field?: Maybe<KnowledgeField>;
  /** Область знаний */
  knowledge_field_id?: Maybe<Scalars['Int']>;
  /** Руководитель */
  leader?: Maybe<Scalars['String']>;
  leader_en?: Maybe<Scalars['String']>;
  /** Звание руководителя */
  leader_rank?: Maybe<Scalars['String']>;
  leader_rank_en?: Maybe<Scalars['String']>;
  meta?: Maybe<Meta>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  /** Номер */
  number: Scalars['String'];
  /** Организация финансирования, регион */
  organization?: Maybe<Scalars['String']>;
  organization_en?: Maybe<Scalars['String']>;
  /** Планируемые результаты */
  plan_results?: Maybe<Scalars['String']>;
  plan_results_en?: Maybe<Scalars['String']>;
  /** Список публикаций по результатам проекта */
  publications?: Maybe<Scalars['String']>;
  publications_en?: Maybe<Scalars['String']>;
  /** Аннотация полученных итоговых результатов */
  result_annotation?: Maybe<Scalars['String']>;
  result_annotation_en?: Maybe<Scalars['String']>;
  /** Возможность практического использования результатов */
  result_usage?: Maybe<Scalars['String']>;
  result_usage_en?: Maybe<Scalars['String']>;
  seo?: Maybe<Seo>;
  slug: Scalars['String'];
  /** Статус */
  status_text?: Maybe<Scalars['String']>;
  status_text_en?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  /** Год проекта */
  year?: Maybe<Scalars['Int']>;
};

export type ProjectInput = {
  annotation?: InputMaybe<Scalars['String']>;
  annotation_en?: InputMaybe<Scalars['String']>;
  contest?: InputMaybe<ContestBelongsTo>;
  contest_id?: InputMaybe<Scalars['Int']>;
  deadline?: InputMaybe<Scalars['String']>;
  grnti_number?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  knowledge_field?: InputMaybe<KnowledgeFieldBelongsTo>;
  knowledge_field_id?: InputMaybe<Scalars['Int']>;
  leader?: InputMaybe<Scalars['String']>;
  leader_en?: InputMaybe<Scalars['String']>;
  leader_rank?: InputMaybe<Scalars['String']>;
  leader_rank_en?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<Scalars['String']>;
  organization_en?: InputMaybe<Scalars['String']>;
  plan_results?: InputMaybe<Scalars['String']>;
  plan_results_en?: InputMaybe<Scalars['String']>;
  publications?: InputMaybe<Scalars['String']>;
  publications_en?: InputMaybe<Scalars['String']>;
  result_annotation?: InputMaybe<Scalars['String']>;
  result_annotation_en?: InputMaybe<Scalars['String']>;
  result_usage?: InputMaybe<Scalars['String']>;
  result_usage_en?: InputMaybe<Scalars['String']>;
  seo?: InputMaybe<SeoBelongsTo>;
  slug?: InputMaybe<Scalars['String']>;
  status_text?: InputMaybe<Scalars['String']>;
  status_text_en?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

/** A paginated list of Project items. */
export type ProjectPaginator = {
  __typename?: 'ProjectPaginator';
  /** A list of Project items. */
  data: Array<Project>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/**
 * Закупки. Выводятся на соответствующей странице
 *
 * https://www.figma.com/file/Fz119iA3vsOI9BcSAoqEQG/UGRA?node-id=39%3A1842&t=XUMjF8DKdEord54I-0
 */
export type Purchase = {
  __typename?: 'Purchase';
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  description_en?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  published: Scalars['Boolean'];
  sort: Scalars['Int'];
  updated_at: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type PurchaseInput = {
  description?: InputMaybe<Scalars['String']>;
  description_en?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['Int']>;
  url?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  activityResultById?: Maybe<ActivityResult>;
  activityResults: Array<ActivityResult>;
  clusterById?: Maybe<Cluster>;
  clusters: Array<Cluster>;
  contestById?: Maybe<Contest>;
  contests?: Maybe<ContestPaginator>;
  documentGroupById?: Maybe<DocumentGroup>;
  documentGroups: Array<DocumentGroup>;
  employeeById?: Maybe<Employee>;
  employees: Array<Employee>;
  eventById?: Maybe<Event>;
  events?: Maybe<EventPaginator>;
  knowledgeFieldById?: Maybe<KnowledgeField>;
  knowledgeFields: Array<KnowledgeField>;
  linkedDocumentById?: Maybe<LinkedDocument>;
  linkedDocuments: Array<LinkedDocument>;
  logById?: Maybe<Log>;
  logs?: Maybe<LogPaginator>;
  mapObjectById?: Maybe<MapObject>;
  mapObjects: Array<MapObject>;
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
  pageById?: Maybe<Page>;
  pageBySlug?: Maybe<Page>;
  pages: Array<Page>;
  partnerById?: Maybe<Partner>;
  partners: Array<Partner>;
  projectById?: Maybe<Project>;
  projectBySlug?: Maybe<Project>;
  projects?: Maybe<ProjectPaginator>;
  purchaseById?: Maybe<Purchase>;
  purchases: Array<Purchase>;
  reportById?: Maybe<Report>;
  reports: Array<Report>;
  search: SearchResult;
  settingById?: Maybe<Setting>;
  settingByName?: Maybe<Setting>;
  settings: Array<Setting>;
  staffControlById?: Maybe<StaffControl>;
  staffControls: Array<StaffControl>;
  subdivisionById?: Maybe<Subdivision>;
  subdivisions: Array<Subdivision>;
  userByEmail?: Maybe<User>;
  userById?: Maybe<User>;
  users?: Maybe<UserPaginator>;
  vacancies: Array<Vacancy>;
  vacancyById?: Maybe<Vacancy>;
  videoBroadcastById?: Maybe<VideoBroadcast>;
  videoBroadcasts: Array<VideoBroadcast>;
};


export type QueryActivityResultByIdArgs = {
  id: Scalars['Int'];
};


export type QueryActivityResultsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryClusterByIdArgs = {
  id: Scalars['Int'];
};


export type QueryClustersArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryContestByIdArgs = {
  id: Scalars['Int'];
};


export type QueryContestsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<ContestStatus>;
};


export type QueryDocumentGroupByIdArgs = {
  id: Scalars['Int'];
};


export type QueryDocumentGroupsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryEmployeeByIdArgs = {
  id: Scalars['Int'];
};


export type QueryEmployeesArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryEventByIdArgs = {
  id: Scalars['Int'];
};


export type QueryEventsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryKnowledgeFieldByIdArgs = {
  id: Scalars['Int'];
};


export type QueryKnowledgeFieldsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryLinkedDocumentByIdArgs = {
  id: Scalars['Int'];
};


export type QueryLinkedDocumentsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryLogByIdArgs = {
  id: Scalars['Int'];
};


export type QueryLogsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryMapObjectByIdArgs = {
  id: Scalars['Int'];
};


export type QueryMapObjectsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryNewsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryNewsByIdArgs = {
  id: Scalars['Int'];
};


export type QueryNewsBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryNewsCategoriesArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryNewsCategoryByIdArgs = {
  id: Scalars['Int'];
};


export type QueryNewsTagByIdArgs = {
  id: Scalars['Int'];
};


export type QueryNewsTagsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryOrganizerByIdArgs = {
  id: Scalars['Int'];
};


export type QueryOrganizersArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryPageByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPageBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryPagesArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryPartnerByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPartnersArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryProjectByIdArgs = {
  id: Scalars['Int'];
};


export type QueryProjectBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryProjectsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<QueryProjectsOrderByRelationOrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryPurchaseByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPurchasesArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryReportByIdArgs = {
  id: Scalars['Int'];
};


export type QueryReportsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QuerySearchArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
};


export type QuerySettingByIdArgs = {
  id: Scalars['Int'];
};


export type QuerySettingByNameArgs = {
  name: Scalars['String'];
};


export type QuerySettingsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryStaffControlByIdArgs = {
  id: Scalars['Int'];
};


export type QueryStaffControlsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QuerySubdivisionByIdArgs = {
  id: Scalars['Int'];
};


export type QuerySubdivisionsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryVacanciesArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};


export type QueryVacancyByIdArgs = {
  id: Scalars['Int'];
};


export type QueryVideoBroadcastByIdArgs = {
  id: Scalars['Int'];
};


export type QueryVideoBroadcastsArgs = {
  filter?: InputMaybe<Array<FilterByClause>>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
};

/** Aggregate specification for Query.projects.orderBy.contest. */
export type QueryProjectsOrderByContest = {
  /** The aggregate function to apply to the column. */
  aggregate: OrderByRelationWithColumnAggregateFunction;
  /** Name of the column to use. */
  column?: InputMaybe<QueryProjectsOrderByContestColumn>;
};

/** Allowed column names for Query.projects.orderBy. */
export enum QueryProjectsOrderByContestColumn {
  Name = 'NAME'
}

/** Order by clause for Query.projects.orderBy. */
export type QueryProjectsOrderByRelationOrderByClause = {
  /** The column that is used for ordering. */
  column?: InputMaybe<Scalars['String']>;
  /** Aggregate specification. */
  contest?: InputMaybe<QueryProjectsOrderByContest>;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

export type Report = {
  __typename?: 'Report';
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  description_en?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  image?: Maybe<Image>;
  imageThumbs?: Maybe<ImageThumbs>;
  imageUrl?: Maybe<Scalars['String']>;
  linked_documents?: Maybe<Array<Maybe<LinkedDocument>>>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  sort: Scalars['Int'];
  updated_at: Scalars['DateTime'];
};

export type ReportInput = {
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  description_en?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  linked_documents?: InputMaybe<LinkedDocumentMorphedByMany>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  uploadImage?: InputMaybe<Scalars['Upload']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  contests: Array<Maybe<Contest>>;
  events: Array<Maybe<Event>>;
  news: Array<Maybe<News>>;
  organizers: Array<Maybe<Organizer>>;
  partners: Array<Maybe<Partner>>;
  projects: Array<Maybe<Project>>;
  purchases: Array<Maybe<Purchase>>;
  reports: Array<Maybe<Report>>;
  vacancies: Array<Maybe<Vacancy>>;
};

export type Seo = {
  __typename?: 'Seo';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type SeoBelongsTo = {
  upsert?: InputMaybe<SeoInput>;
};

export type SeoInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Setting = {
  __typename?: 'Setting';
  id: Scalars['Int'];
  name: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type SettingInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
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

/**
 * Сотрудники органов управления и контроля
 * Выводятся на страницах раздела Органы управления и контроля
 *
 * https://www.figma.com/file/Fz119iA3vsOI9BcSAoqEQG/UGRA?node-id=37%3A1395&t=U0C6Mrr376j97Jtf-1
 */
export type StaffControl = {
  __typename?: 'StaffControl';
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  description_en?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  image?: Maybe<Image>;
  imageThumbs?: Maybe<ImageThumbs>;
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  page: Page;
  page_id?: Maybe<Scalars['Int']>;
  sort: Scalars['Int'];
  updated_at: Scalars['DateTime'];
};

export type StaffControlInput = {
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  description_en?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<PageBelongsTo>;
  page_id?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['Int']>;
  uploadImage?: InputMaybe<Scalars['Upload']>;
};

export type Subdivision = {
  __typename?: 'Subdivision';
  id: Scalars['Int'];
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  sort: Scalars['Int'];
};

export type SubdivisionBelongsTo = {
  connect?: InputMaybe<Scalars['Int']>;
  create?: InputMaybe<SubdivisionInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type SubdivisionInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type TagBelongsToMany = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  create?: InputMaybe<Array<InputMaybe<NewsTagInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
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
  id: Scalars['Int'];
  sort?: InputMaybe<Scalars['Int']>;
  /** Имя файла заданное пользователем */
  user_name?: InputMaybe<Scalars['String']>;
};

export type UpdateGalleryInput = {
  alt?: InputMaybe<Scalars['String']>;
  alt_en?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  sort?: InputMaybe<Scalars['Int']>;
};

export type UploadDocumentInput = {
  sort?: InputMaybe<Scalars['Int']>;
  upload: Scalars['Upload'];
  /** Имя файла заданное пользователем */
  user_name?: InputMaybe<Scalars['String']>;
};

export type UploadGalleryInput = {
  alt?: InputMaybe<Scalars['String']>;
  alt_en?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  upload: Scalars['Upload'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  email_verified_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Vacancy = {
  __typename?: 'Vacancy';
  description?: Maybe<Scalars['String']>;
  description_en?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  published: Scalars['Boolean'];
  sort: Scalars['Int'];
};

export type VacancyInput = {
  description?: InputMaybe<Scalars['String']>;
  description_en?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type VideoBroadcast = {
  __typename?: 'VideoBroadcast';
  id: Scalars['Int'];
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  sort: Scalars['Int'];
  url?: Maybe<Scalars['String']>;
};

export type VideoBroadcastInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_en?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  url?: InputMaybe<Scalars['String']>;
};

export type AllActivityResultsFieldsFragment = { __typename?: 'ActivityResult', id: number, name: string, result: number, measure_unit: string, sort: number, created_at: any };

export type ActivityResultByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ActivityResultByIdQuery = { __typename?: 'Query', activityResultById?: { __typename?: 'ActivityResult', id: number, name: string, result: number, measure_unit: string, sort: number, created_at: any } | null };

export type ActivityResultsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type ActivityResultsQuery = { __typename?: 'Query', activityResults: Array<{ __typename?: 'ActivityResult', id: number, name: string, result: number, measure_unit: string, sort: number, created_at: any }> };

export type CreateActivityResultMutationVariables = Exact<{
  input: ActivityResultInput;
}>;


export type CreateActivityResultMutation = { __typename?: 'Mutation', createActivityResult?: { __typename?: 'ActivityResult', id: number, name: string, result: number, measure_unit: string, sort: number, created_at: any } | null };

export type UpdateActivityResultMutationVariables = Exact<{
  input: ActivityResultInput;
}>;


export type UpdateActivityResultMutation = { __typename?: 'Mutation', upsertActivityResult?: { __typename?: 'ActivityResult', id: number, name: string, result: number, measure_unit: string, sort: number, created_at: any } | null };

export type DeleteActivityResultMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteActivityResultMutation = { __typename?: 'Mutation', deleteActivityResult?: { __typename?: 'ActivityResult', id: number } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'User', id: number } | null };

export type AllVideoBroadcastsFieldsFragment = { __typename?: 'VideoBroadcast', id: number, name: string, sort: number, url?: string | null };

export type VideoBroadcastByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type VideoBroadcastByIdQuery = { __typename?: 'Query', videoBroadcastById?: { __typename?: 'VideoBroadcast', id: number, name: string, sort: number, url?: string | null } | null };

export type VideoBroadcastsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type VideoBroadcastsQuery = { __typename?: 'Query', videoBroadcasts: Array<{ __typename?: 'VideoBroadcast', id: number, name: string, sort: number, url?: string | null }> };

export type CreateVideoBroadcastMutationVariables = Exact<{
  input: VideoBroadcastInput;
}>;


export type CreateVideoBroadcastMutation = { __typename?: 'Mutation', createVideoBroadcast?: { __typename?: 'VideoBroadcast', id: number, name: string, sort: number, url?: string | null } | null };

export type UpdateVideoBroadcastMutationVariables = Exact<{
  input: VideoBroadcastInput;
}>;


export type UpdateVideoBroadcastMutation = { __typename?: 'Mutation', upsertVideoBroadcast?: { __typename?: 'VideoBroadcast', id: number, name: string, sort: number, url?: string | null } | null };

export type DeleteVideoBroadcastMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteVideoBroadcastMutation = { __typename?: 'Mutation', deleteVideoBroadcast?: { __typename?: 'VideoBroadcast', id: number } | null };

export type AllClustersFieldsFragment = { __typename?: 'Cluster', id: number, name: string, column_one_name: string, column_one_text: string, column_two_name: string, column_two_text: string, sort: number, created_at: any, updated_at: any };

export type ClusterByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ClusterByIdQuery = { __typename?: 'Query', clusterById?: { __typename?: 'Cluster', id: number, name: string, column_one_name: string, column_one_text: string, column_two_name: string, column_two_text: string, sort: number, created_at: any, updated_at: any } | null };

export type ClustersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type ClustersQuery = { __typename?: 'Query', clusters: Array<{ __typename?: 'Cluster', id: number, name: string, column_one_name: string, column_one_text: string, column_two_name: string, column_two_text: string, sort: number, created_at: any, updated_at: any }> };

export type CreateClusterMutationVariables = Exact<{
  input: ClusterInput;
}>;


export type CreateClusterMutation = { __typename?: 'Mutation', createCluster?: { __typename?: 'Cluster', id: number, name: string, column_one_name: string, column_one_text: string, column_two_name: string, column_two_text: string, sort: number, created_at: any, updated_at: any } | null };

export type UpdateClusterMutationVariables = Exact<{
  input: ClusterInput;
}>;


export type UpdateClusterMutation = { __typename?: 'Mutation', upsertCluster?: { __typename?: 'Cluster', id: number, name: string, column_one_name: string, column_one_text: string, column_two_name: string, column_two_text: string, sort: number, created_at: any, updated_at: any } | null };

export type DeleteClusterMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteClusterMutation = { __typename?: 'Mutation', deleteCluster?: { __typename?: 'Cluster', id: number } | null };

export type AllContestFieldsFragment = { __typename?: 'Contest', id: number, name: string, name_en?: string | null, number?: number | null, status?: ContestStatus | null, deadline?: any | null, date?: any | null, created_at: any, documents?: Array<{ __typename?: 'Document', id: number, url?: string | null, user_name?: string | null, sort?: number | null } | null> | null };

export type ContestByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ContestByIdQuery = { __typename?: 'Query', contestById?: { __typename?: 'Contest', id: number, name: string, name_en?: string | null, number?: number | null, status?: ContestStatus | null, deadline?: any | null, date?: any | null, created_at: any, documents?: Array<{ __typename?: 'Document', id: number, url?: string | null, user_name?: string | null, sort?: number | null } | null> | null } | null };

export type ContestsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<ContestStatus>;
}>;


export type ContestsQuery = { __typename?: 'Query', contests?: { __typename?: 'ContestPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', lastPage: number, total: number, perPage: number }, data: Array<{ __typename?: 'Contest', id: number, name: string, name_en?: string | null, number?: number | null, status?: ContestStatus | null, deadline?: any | null, date?: any | null, created_at: any, documents?: Array<{ __typename?: 'Document', id: number, url?: string | null, user_name?: string | null, sort?: number | null } | null> | null }> } | null };

export type CreateContestMutationVariables = Exact<{
  input: ContestInput;
}>;


export type CreateContestMutation = { __typename?: 'Mutation', createContest?: { __typename?: 'Contest', id: number, name: string, name_en?: string | null, number?: number | null, status?: ContestStatus | null, deadline?: any | null, date?: any | null, created_at: any, documents?: Array<{ __typename?: 'Document', id: number, url?: string | null, user_name?: string | null, sort?: number | null } | null> | null } | null };

export type UpdateContestMutationVariables = Exact<{
  input: ContestInput;
}>;


export type UpdateContestMutation = { __typename?: 'Mutation', upsertContest?: { __typename?: 'Contest', id: number, name: string, name_en?: string | null, number?: number | null, status?: ContestStatus | null, deadline?: any | null, date?: any | null, created_at: any, documents?: Array<{ __typename?: 'Document', id: number, url?: string | null, user_name?: string | null, sort?: number | null } | null> | null } | null };

export type DeleteContestMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteContestMutation = { __typename?: 'Mutation', deleteContest?: { __typename?: 'Contest', id: number } | null };

export type AllDocumentGroupsFieldsFragment = { __typename?: 'DocumentGroup', id: number, name: string, name_en?: string | null, sort: number, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, sort?: number | null, user_name?: string | null, url: string, created_at: any, published: boolean } | null> | null };

export type DocumentGroupByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DocumentGroupByIdQuery = { __typename?: 'Query', documentGroupById?: { __typename?: 'DocumentGroup', id: number, name: string, name_en?: string | null, sort: number, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, sort?: number | null, user_name?: string | null, url: string, created_at: any, published: boolean } | null> | null } | null };

export type DocumentGroupsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type DocumentGroupsQuery = { __typename?: 'Query', documentGroups: Array<{ __typename?: 'DocumentGroup', id: number, name: string, name_en?: string | null, sort: number, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, sort?: number | null, user_name?: string | null, url: string, created_at: any, published: boolean } | null> | null }> };

export type CreateDocumentGroupMutationVariables = Exact<{
  input: DocumentGroupInput;
}>;


export type CreateDocumentGroupMutation = { __typename?: 'Mutation', createDocumentGroup?: { __typename?: 'DocumentGroup', id: number, name: string, name_en?: string | null, sort: number, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, sort?: number | null, user_name?: string | null, url: string, created_at: any, published: boolean } | null> | null } | null };

export type UpdateDocumentGroupMutationVariables = Exact<{
  input: DocumentGroupInput;
}>;


export type UpdateDocumentGroupMutation = { __typename?: 'Mutation', upsertDocumentGroup?: { __typename?: 'DocumentGroup', id: number, name: string, name_en?: string | null, sort: number, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, sort?: number | null, user_name?: string | null, url: string, created_at: any, published: boolean } | null> | null } | null };

export type UpdateConnectDocumentGroupMutationVariables = Exact<{
  connectInput: DocumentGroupInput;
  disconnectInput: DocumentGroupInput;
}>;


export type UpdateConnectDocumentGroupMutation = { __typename?: 'Mutation', upsertConnect?: { __typename?: 'DocumentGroup', id: number, name: string, name_en?: string | null, sort: number, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, sort?: number | null, user_name?: string | null, url: string, created_at: any, published: boolean } | null> | null } | null, upsertDisconnect?: { __typename?: 'DocumentGroup', id: number, name: string, name_en?: string | null, sort: number, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, sort?: number | null, user_name?: string | null, url: string, created_at: any, published: boolean } | null> | null } | null };

export type DeleteDocumentGroupMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteDocumentGroupMutation = { __typename?: 'Mutation', deleteDocumentGroup?: { __typename?: 'DocumentGroup', id: number } | null };

export type AllEmployeeFieldsFragment = { __typename?: 'Employee', id: number, name: string, email: string, position?: string | null, additional?: string | null, sort: number, created_at: any, updated_at: any, subdivision?: { __typename?: 'Subdivision', id: number, name: string, sort: number } | null };

export type EmployeeByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EmployeeByIdQuery = { __typename?: 'Query', employeeById?: { __typename?: 'Employee', id: number, name: string, email: string, position?: string | null, additional?: string | null, sort: number, created_at: any, updated_at: any, subdivision?: { __typename?: 'Subdivision', id: number, name: string, sort: number } | null } | null };

export type EmployeesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type EmployeesQuery = { __typename?: 'Query', employees: Array<{ __typename?: 'Employee', id: number, name: string, email: string, position?: string | null, additional?: string | null, sort: number, created_at: any, updated_at: any, subdivision?: { __typename?: 'Subdivision', id: number, name: string, sort: number } | null }> };

export type CreateEmployeeMutationVariables = Exact<{
  input: EmployeeInput;
}>;


export type CreateEmployeeMutation = { __typename?: 'Mutation', createEmployee?: { __typename?: 'Employee', id: number, name: string, email: string, position?: string | null, additional?: string | null, sort: number, created_at: any, updated_at: any, subdivision?: { __typename?: 'Subdivision', id: number, name: string, sort: number } | null } | null };

export type UpdateEmployeeMutationVariables = Exact<{
  input: EmployeeInput;
}>;


export type UpdateEmployeeMutation = { __typename?: 'Mutation', upsertEmployee?: { __typename?: 'Employee', id: number, name: string, email: string, position?: string | null, additional?: string | null, sort: number, created_at: any, updated_at: any, subdivision?: { __typename?: 'Subdivision', id: number, name: string, sort: number } | null } | null };

export type UpdateEmployeeSubdivisionMutationVariables = Exact<{
  id: Scalars['Int'];
  subdivisionId: Scalars['Int'];
}>;


export type UpdateEmployeeSubdivisionMutation = { __typename?: 'Mutation', upsertEmployee?: { __typename?: 'Employee', id: number } | null };

export type DeleteEmployeeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEmployeeMutation = { __typename?: 'Mutation', deleteEmployee?: { __typename?: 'Employee', id: number } | null };

export type AllEventsFieldsFragment = { __typename?: 'Event', id: number, name: string, name_en?: string | null, description?: string | null, description_en?: string | null, published?: boolean | null, imageUrl?: string | null, place?: string | null, place_en?: string | null, start?: any | null, end?: any | null, created_at: any, updated_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null, partners?: Array<{ __typename?: 'Partner', id: number, name: string, imageUrl?: string | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null> | null, organizers?: Array<{ __typename?: 'Organizer', id: number, name: string, imageUrl?: string | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null> | null, documents?: Array<{ __typename?: 'Document', id: number, url?: string | null, user_name?: string | null, sort?: number | null } | null> | null };

export type EventByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EventByIdQuery = { __typename?: 'Query', eventById?: { __typename?: 'Event', id: number, name: string, name_en?: string | null, description?: string | null, description_en?: string | null, published?: boolean | null, imageUrl?: string | null, place?: string | null, place_en?: string | null, start?: any | null, end?: any | null, created_at: any, updated_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null, partners?: Array<{ __typename?: 'Partner', id: number, name: string, imageUrl?: string | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null> | null, organizers?: Array<{ __typename?: 'Organizer', id: number, name: string, imageUrl?: string | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null> | null, documents?: Array<{ __typename?: 'Document', id: number, url?: string | null, user_name?: string | null, sort?: number | null } | null> | null } | null };

export type EventsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type EventsQuery = { __typename?: 'Query', events?: { __typename?: 'EventPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', lastPage: number, total: number, perPage: number }, data: Array<{ __typename?: 'Event', id: number, name: string, name_en?: string | null, description?: string | null, description_en?: string | null, published?: boolean | null, imageUrl?: string | null, place?: string | null, place_en?: string | null, start?: any | null, end?: any | null, created_at: any, updated_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null, partners?: Array<{ __typename?: 'Partner', id: number, name: string, imageUrl?: string | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null> | null, organizers?: Array<{ __typename?: 'Organizer', id: number, name: string, imageUrl?: string | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null> | null, documents?: Array<{ __typename?: 'Document', id: number, url?: string | null, user_name?: string | null, sort?: number | null } | null> | null }> } | null };

export type UpdateEventPublishedMutationVariables = Exact<{
  id: Scalars['Int'];
  published: Scalars['Boolean'];
}>;


export type UpdateEventPublishedMutation = { __typename?: 'Mutation', upsertEvent?: { __typename?: 'Event', id: number } | null };

export type CreateEventMutationVariables = Exact<{
  input: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'Event', id: number, name: string, name_en?: string | null, description?: string | null, description_en?: string | null, published?: boolean | null, imageUrl?: string | null, place?: string | null, place_en?: string | null, start?: any | null, end?: any | null, created_at: any, updated_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null, partners?: Array<{ __typename?: 'Partner', id: number, name: string, imageUrl?: string | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null> | null, organizers?: Array<{ __typename?: 'Organizer', id: number, name: string, imageUrl?: string | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null> | null, documents?: Array<{ __typename?: 'Document', id: number, url?: string | null, user_name?: string | null, sort?: number | null } | null> | null } | null };

export type UpdateEventMutationVariables = Exact<{
  input: EventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', upsertEvent?: { __typename?: 'Event', id: number, name: string, name_en?: string | null, description?: string | null, description_en?: string | null, published?: boolean | null, imageUrl?: string | null, place?: string | null, place_en?: string | null, start?: any | null, end?: any | null, created_at: any, updated_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null, partners?: Array<{ __typename?: 'Partner', id: number, name: string, imageUrl?: string | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null> | null, organizers?: Array<{ __typename?: 'Organizer', id: number, name: string, imageUrl?: string | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null> | null, documents?: Array<{ __typename?: 'Document', id: number, url?: string | null, user_name?: string | null, sort?: number | null } | null> | null } | null };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'Event', id: number } | null };

export type AllKnowledgeAreasFieldsFragment = { __typename?: 'KnowledgeField', id?: number | null, name: string, name_en?: string | null, sort: number };

export type KnowledgeFieldByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type KnowledgeFieldByIdQuery = { __typename?: 'Query', knowledgeFieldById?: { __typename?: 'KnowledgeField', id?: number | null, name: string, name_en?: string | null, sort: number } | null };

export type KnowledgeFieldsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
}>;


export type KnowledgeFieldsQuery = { __typename?: 'Query', knowledgeFields: Array<{ __typename?: 'KnowledgeField', id?: number | null, name: string, name_en?: string | null, sort: number }> };

export type CreateKnowledgeFieldMutationVariables = Exact<{
  sort: Scalars['Int'];
  name: Scalars['String'];
  name_en?: InputMaybe<Scalars['String']>;
}>;


export type CreateKnowledgeFieldMutation = { __typename?: 'Mutation', createKnowledgeField?: { __typename?: 'KnowledgeField', id?: number | null, name: string, name_en?: string | null, sort: number } | null };

export type UpdateKnowledgeFieldMutationVariables = Exact<{
  id: Scalars['Int'];
  sort: Scalars['Int'];
  name: Scalars['String'];
  name_en?: InputMaybe<Scalars['String']>;
}>;


export type UpdateKnowledgeFieldMutation = { __typename?: 'Mutation', upsertKnowledgeField?: { __typename?: 'KnowledgeField', id?: number | null, name: string, name_en?: string | null, sort: number } | null };

export type DeleteKnowledgeFieldMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteKnowledgeFieldMutation = { __typename?: 'Mutation', deleteKnowledgeField?: { __typename?: 'KnowledgeField', sort: number, name: string } | null };

export type AllLinkedDocumentFieldsFragment = { __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, user_name_en?: string | null, sort?: number | null, published: boolean, created_at: any };

export type LinkedDocumentByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LinkedDocumentByIdQuery = { __typename?: 'Query', linkedDocumentById?: { __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, user_name_en?: string | null, sort?: number | null, published: boolean, created_at: any } | null };

export type LinkedDocumentsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type LinkedDocumentsQuery = { __typename?: 'Query', linkedDocuments: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, user_name_en?: string | null, sort?: number | null, published: boolean, created_at: any }> };

export type CreateLinkedDocumentMutationVariables = Exact<{
  input: LinkedDocumentInput;
}>;


export type CreateLinkedDocumentMutation = { __typename?: 'Mutation', createLinkedDocument?: { __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, user_name_en?: string | null, sort?: number | null, published: boolean, created_at: any } | null };

export type UpdateLinkedDocumentMutationVariables = Exact<{
  input: LinkedDocumentInput;
}>;


export type UpdateLinkedDocumentMutation = { __typename?: 'Mutation', upsertLinkedDocument?: { __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, user_name_en?: string | null, sort?: number | null, published: boolean, created_at: any } | null };

export type DeleteLinkedDocumentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteLinkedDocumentMutation = { __typename?: 'Mutation', deleteLinkedDocument?: { __typename?: 'LinkedDocument', id: number } | null };

export type AllMapObjectsFieldsFragment = { __typename?: 'MapObject', id: number, name: string, characteristics?: string | null, area?: number | null, gross_boma_area?: number | null, floors?: string | null, learn_more?: string | null, created_at: any, updated_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null };

export type MapObjectByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MapObjectByIdQuery = { __typename?: 'Query', mapObjectById?: { __typename?: 'MapObject', id: number, name: string, characteristics?: string | null, area?: number | null, gross_boma_area?: number | null, floors?: string | null, learn_more?: string | null, created_at: any, updated_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null } | null };

export type MapObjectsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type MapObjectsQuery = { __typename?: 'Query', mapObjects: Array<{ __typename?: 'MapObject', id: number, name: string, characteristics?: string | null, area?: number | null, gross_boma_area?: number | null, floors?: string | null, learn_more?: string | null, created_at: any, updated_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null }> };

export type UpdateMapObjectMutationVariables = Exact<{
  input: MapObjectInput;
}>;


export type UpdateMapObjectMutation = { __typename?: 'Mutation', upsertMapObject?: { __typename?: 'MapObject', id: number, name: string, characteristics?: string | null, area?: number | null, gross_boma_area?: number | null, floors?: string | null, learn_more?: string | null, created_at: any, updated_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null } | null };

export type DeleteMapObjectMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMapObjectMutation = { __typename?: 'Mutation', deleteMapObject?: { __typename?: 'MapObject', id: number } | null };

export type AllNewsFieldsFragment = { __typename?: 'News', id: number, name: string, name_en?: string | null, slug: string, content?: string | null, content_en?: string | null, description?: string | null, description_en?: string | null, imageUrl?: string | null, source?: string | null, source_name?: string | null, source_name_en?: string | null, published?: boolean | null, created_at: any, updated_at: any, published_at?: any | null, on_index?: boolean | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null, gallery?: Array<{ __typename?: 'GalleryImage', id: number, url?: string | null, alt?: string | null, sort?: number | null } | null> | null, category?: { __typename?: 'NewsCategory', id: number, name: string, name_en?: string | null, sort: number } | null, tags?: Array<{ __typename?: 'NewsTag', id: number, name: string, name_en?: string | null, sort: number } | null> | null, seo?: { __typename?: 'Seo', id: number, title?: string | null, description?: string | null } | null, meta?: { __typename?: 'Meta', auto_title: string, auto_description: string } | null };

export type NewsByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type NewsByIdQuery = { __typename?: 'Query', newsById?: { __typename?: 'News', id: number, name: string, name_en?: string | null, slug: string, content?: string | null, content_en?: string | null, description?: string | null, description_en?: string | null, imageUrl?: string | null, source?: string | null, source_name?: string | null, source_name_en?: string | null, published?: boolean | null, created_at: any, updated_at: any, published_at?: any | null, on_index?: boolean | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null, gallery?: Array<{ __typename?: 'GalleryImage', id: number, url?: string | null, alt?: string | null, sort?: number | null } | null> | null, category?: { __typename?: 'NewsCategory', id: number, name: string, name_en?: string | null, sort: number } | null, tags?: Array<{ __typename?: 'NewsTag', id: number, name: string, name_en?: string | null, sort: number } | null> | null, seo?: { __typename?: 'Seo', id: number, title?: string | null, description?: string | null } | null, meta?: { __typename?: 'Meta', auto_title: string, auto_description: string } | null } | null };

export type NewsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type NewsQuery = { __typename?: 'Query', news?: { __typename?: 'NewsPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', lastPage: number, total: number, perPage: number }, data: Array<{ __typename?: 'News', id: number, name: string, name_en?: string | null, slug: string, content?: string | null, content_en?: string | null, description?: string | null, description_en?: string | null, imageUrl?: string | null, source?: string | null, source_name?: string | null, source_name_en?: string | null, published?: boolean | null, created_at: any, updated_at: any, published_at?: any | null, on_index?: boolean | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null, gallery?: Array<{ __typename?: 'GalleryImage', id: number, url?: string | null, alt?: string | null, sort?: number | null } | null> | null, category?: { __typename?: 'NewsCategory', id: number, name: string, name_en?: string | null, sort: number } | null, tags?: Array<{ __typename?: 'NewsTag', id: number, name: string, name_en?: string | null, sort: number } | null> | null, seo?: { __typename?: 'Seo', id: number, title?: string | null, description?: string | null } | null, meta?: { __typename?: 'Meta', auto_title: string, auto_description: string } | null }> } | null };

export type AllNewsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type AllNewsQuery = { __typename?: 'Query', allNewsIds?: { __typename?: 'NewsPaginator', data: Array<{ __typename?: 'News', id: number }> } | null };

export type UpdateOnIndexMutationVariables = Exact<{
  id: Scalars['Int'];
  on_index: Scalars['Boolean'];
}>;


export type UpdateOnIndexMutation = { __typename?: 'Mutation', upsertNews?: { __typename?: 'News', id: number } | null };

export type UpdatePublishedNewsMutationVariables = Exact<{
  id: Scalars['Int'];
  published: Scalars['Boolean'];
}>;


export type UpdatePublishedNewsMutation = { __typename?: 'Mutation', upsertNews?: { __typename?: 'News', id: number } | null };

export type CreateNewsMutationVariables = Exact<{
  input: NewsInput;
}>;


export type CreateNewsMutation = { __typename?: 'Mutation', createNews?: { __typename?: 'News', id: number, name: string, name_en?: string | null, slug: string, content?: string | null, content_en?: string | null, description?: string | null, description_en?: string | null, imageUrl?: string | null, source?: string | null, source_name?: string | null, source_name_en?: string | null, published?: boolean | null, created_at: any, updated_at: any, published_at?: any | null, on_index?: boolean | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null, gallery?: Array<{ __typename?: 'GalleryImage', id: number, url?: string | null, alt?: string | null, sort?: number | null } | null> | null, category?: { __typename?: 'NewsCategory', id: number, name: string, name_en?: string | null, sort: number } | null, tags?: Array<{ __typename?: 'NewsTag', id: number, name: string, name_en?: string | null, sort: number } | null> | null, seo?: { __typename?: 'Seo', id: number, title?: string | null, description?: string | null } | null, meta?: { __typename?: 'Meta', auto_title: string, auto_description: string } | null } | null };

export type UpdateNewsMutationVariables = Exact<{
  input: NewsInput;
}>;


export type UpdateNewsMutation = { __typename?: 'Mutation', upsertNews?: { __typename?: 'News', id: number, name: string, name_en?: string | null, slug: string, content?: string | null, content_en?: string | null, description?: string | null, description_en?: string | null, imageUrl?: string | null, source?: string | null, source_name?: string | null, source_name_en?: string | null, published?: boolean | null, created_at: any, updated_at: any, published_at?: any | null, on_index?: boolean | null, image?: { __typename?: 'Image', id: number, url?: string | null } | null, gallery?: Array<{ __typename?: 'GalleryImage', id: number, url?: string | null, alt?: string | null, sort?: number | null } | null> | null, category?: { __typename?: 'NewsCategory', id: number, name: string, name_en?: string | null, sort: number } | null, tags?: Array<{ __typename?: 'NewsTag', id: number, name: string, name_en?: string | null, sort: number } | null> | null, seo?: { __typename?: 'Seo', id: number, title?: string | null, description?: string | null } | null, meta?: { __typename?: 'Meta', auto_title: string, auto_description: string } | null } | null };

export type DeleteNewsMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteNewsMutation = { __typename?: 'Mutation', deleteNews?: { __typename?: 'News', id: number } | null };

export type AllNewsCategoriesFieldsFragment = { __typename?: 'NewsCategory', id: number, sort: number, name: string, name_en?: string | null };

export type NewsCategoryByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type NewsCategoryByIdQuery = { __typename?: 'Query', newsCategoryById?: { __typename?: 'NewsCategory', id: number, sort: number, name: string, name_en?: string | null } | null };

export type NewsCategoriesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
}>;


export type NewsCategoriesQuery = { __typename?: 'Query', newsCategories: Array<{ __typename?: 'NewsCategory', id: number, sort: number, name: string, name_en?: string | null }> };

export type CreateNewsCategoryMutationVariables = Exact<{
  sort: Scalars['Int'];
  name: Scalars['String'];
  name_en?: InputMaybe<Scalars['String']>;
}>;


export type CreateNewsCategoryMutation = { __typename?: 'Mutation', createNewsCategory?: { __typename?: 'NewsCategory', id: number, sort: number, name: string, name_en?: string | null } | null };

export type UpdateNewsCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
  sort: Scalars['Int'];
  name: Scalars['String'];
  name_en?: InputMaybe<Scalars['String']>;
}>;


export type UpdateNewsCategoryMutation = { __typename?: 'Mutation', upsertNewsCategory?: { __typename?: 'NewsCategory', id: number, sort: number, name: string, name_en?: string | null } | null };

export type DeleteNewsCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteNewsCategoryMutation = { __typename?: 'Mutation', deleteNewsCategory?: { __typename?: 'NewsCategory', sort: number, name: string } | null };

export type AllNewsTagsFieldsFragment = { __typename?: 'NewsTag', id: number, sort: number, name: string, name_en?: string | null };

export type NewsTagByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type NewsTagByIdQuery = { __typename?: 'Query', newsTagById?: { __typename?: 'NewsTag', id: number, sort: number, name: string, name_en?: string | null } | null };

export type NewsTagsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
}>;


export type NewsTagsQuery = { __typename?: 'Query', newsTags: Array<{ __typename?: 'NewsTag', id: number, sort: number, name: string, name_en?: string | null }> };

export type CreateNewsTagMutationVariables = Exact<{
  sort: Scalars['Int'];
  name: Scalars['String'];
  name_en?: InputMaybe<Scalars['String']>;
}>;


export type CreateNewsTagMutation = { __typename?: 'Mutation', createNewsTag?: { __typename?: 'NewsTag', id: number, sort: number, name: string, name_en?: string | null } | null };

export type UpdateNewsTagMutationVariables = Exact<{
  id: Scalars['Int'];
  sort: Scalars['Int'];
  name: Scalars['String'];
  name_en?: InputMaybe<Scalars['String']>;
}>;


export type UpdateNewsTagMutation = { __typename?: 'Mutation', upsertNewsTag?: { __typename?: 'NewsTag', id: number, sort: number, name: string, name_en?: string | null } | null };

export type DeleteNewsTagMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteNewsTagMutation = { __typename?: 'Mutation', deleteNewsTag?: { __typename?: 'NewsTag', sort: number, name: string } | null };

export type AllOrganizerFieldsFragment = { __typename?: 'Organizer', id: number, name: string, name_en?: string | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null };

export type OrganizerByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type OrganizerByIdQuery = { __typename?: 'Query', organizerById?: { __typename?: 'Organizer', id: number, name: string, name_en?: string | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null };

export type OrganizersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
}>;


export type OrganizersQuery = { __typename?: 'Query', organizers: Array<{ __typename?: 'Organizer', id: number, name: string, name_en?: string | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null }> };

export type CreateOrganizerMutationVariables = Exact<{
  input: OrganizerInput;
}>;


export type CreateOrganizerMutation = { __typename?: 'Mutation', createOrganizer?: { __typename?: 'Organizer', id: number, name: string, name_en?: string | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null };

export type UpdateOrganizerMutationVariables = Exact<{
  input: OrganizerInput;
}>;


export type UpdateOrganizerMutation = { __typename?: 'Mutation', upsertOrganizer?: { __typename?: 'Organizer', id: number, name: string, name_en?: string | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null };

export type DeleteOrganizerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteOrganizerMutation = { __typename?: 'Mutation', deleteOrganizer?: { __typename?: 'Organizer', id: number } | null };

export type AllPageFieldsFragment = { __typename?: 'Page', id: number, name: string, slug: string, sort: number, description?: string | null, imageUrl?: string | null, params?: any | null, parent_id?: number | null, created_at: any, updated_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null, seo?: { __typename?: 'Seo', title?: string | null, description?: string | null } | null, meta?: { __typename?: 'Meta', auto_title: string, auto_description: string } | null, children?: Array<{ __typename?: 'Page', id: number } | null> | null, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null, gallery?: Array<{ __typename?: 'GalleryImage', id: number, url?: string | null, alt?: string | null, sort?: number | null } | null> | null };

export type PageByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PageByIdQuery = { __typename?: 'Query', pageById?: { __typename?: 'Page', id: number, name: string, slug: string, sort: number, description?: string | null, imageUrl?: string | null, params?: any | null, parent_id?: number | null, created_at: any, updated_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null, seo?: { __typename?: 'Seo', title?: string | null, description?: string | null } | null, meta?: { __typename?: 'Meta', auto_title: string, auto_description: string } | null, children?: Array<{ __typename?: 'Page', id: number } | null> | null, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null, gallery?: Array<{ __typename?: 'GalleryImage', id: number, url?: string | null, alt?: string | null, sort?: number | null } | null> | null } | null };

export type PageBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type PageBySlugQuery = { __typename?: 'Query', pageBySlug?: { __typename?: 'Page', id: number, name: string, slug: string, sort: number, description?: string | null, imageUrl?: string | null, params?: any | null, parent_id?: number | null, created_at: any, updated_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null, seo?: { __typename?: 'Seo', title?: string | null, description?: string | null } | null, meta?: { __typename?: 'Meta', auto_title: string, auto_description: string } | null, children?: Array<{ __typename?: 'Page', id: number } | null> | null, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null, gallery?: Array<{ __typename?: 'GalleryImage', id: number, url?: string | null, alt?: string | null, sort?: number | null } | null> | null } | null };

export type PagesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type PagesQuery = { __typename?: 'Query', pages: Array<{ __typename?: 'Page', id: number, name: string, description?: string | null, imageUrl?: string | null, slug: string }> };

export type PagesTreeQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type PagesTreeQuery = { __typename?: 'Query', pages: Array<{ __typename?: 'Page', id: number, name: string, parent_id?: number | null, slug: string, sort: number, children?: Array<{ __typename?: 'Page', id: number } | null> | null }> };

export type UpdatePageMutationVariables = Exact<{
  input: PageInput;
}>;


export type UpdatePageMutation = { __typename?: 'Mutation', upsertPage?: { __typename?: 'Page', id: number, name: string, slug: string, sort: number, description?: string | null, imageUrl?: string | null, params?: any | null, parent_id?: number | null, created_at: any, updated_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null, seo?: { __typename?: 'Seo', title?: string | null, description?: string | null } | null, meta?: { __typename?: 'Meta', auto_title: string, auto_description: string } | null, children?: Array<{ __typename?: 'Page', id: number } | null> | null, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null, gallery?: Array<{ __typename?: 'GalleryImage', id: number, url?: string | null, alt?: string | null, sort?: number | null } | null> | null } | null };

export type UpdatePageParentMutationVariables = Exact<{
  id: Scalars['Int'];
  parent_id: Scalars['Int'];
}>;


export type UpdatePageParentMutation = { __typename?: 'Mutation', upsertPage?: { __typename?: 'Page', id: number } | null };

export type AllPartnerFieldsFragment = { __typename?: 'Partner', id: number, name: string, name_en?: string | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null };

export type PartnerByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PartnerByIdQuery = { __typename?: 'Query', partnerById?: { __typename?: 'Partner', id: number, name: string, name_en?: string | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null };

export type PartnersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
}>;


export type PartnersQuery = { __typename?: 'Query', partners: Array<{ __typename?: 'Partner', id: number, name: string, name_en?: string | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null }> };

export type CreatePartnerMutationVariables = Exact<{
  input: PartnerInput;
}>;


export type CreatePartnerMutation = { __typename?: 'Mutation', createPartner?: { __typename?: 'Partner', id: number, name: string, name_en?: string | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null };

export type UpdatePartnerMutationVariables = Exact<{
  input: PartnerInput;
}>;


export type UpdatePartnerMutation = { __typename?: 'Mutation', upsertPartner?: { __typename?: 'Partner', id: number, name: string, name_en?: string | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null };

export type DeletePartnerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePartnerMutation = { __typename?: 'Mutation', deletePartner?: { __typename?: 'Partner', id: number } | null };

export type AllProjectsFieldsFragment = { __typename?: 'Project', id: number, knowledge_field_id?: number | null, contest_id?: number | null, number: string, name: string, name_en?: string | null, slug: string, leader?: string | null, leader_en?: string | null, leader_rank?: string | null, leader_rank_en?: string | null, organization?: string | null, organization_en?: string | null, annotation?: string | null, annotation_en?: string | null, plan_results?: string | null, plan_results_en?: string | null, publications?: string | null, publications_en?: string | null, result_annotation?: string | null, result_annotation_en?: string | null, result_usage?: string | null, result_usage_en?: string | null, year?: number | null, grnti_number?: string | null, status_text?: string | null, status_text_en?: string | null, deadline?: string | null, created_at: any, updated_at: any, knowledge_field?: { __typename?: 'KnowledgeField', id?: number | null, name: string, name_en?: string | null, sort: number } | null, contest?: { __typename?: 'Contest', id: number, name: string, number?: number | null, status?: ContestStatus | null, deadline?: any | null, date?: any | null, created_at: any, updated_at: any } | null, meta?: { __typename?: 'Meta', title: string, description: string, auto_title: string, auto_description: string } | null, seo?: { __typename?: 'Seo', id: number, title?: string | null, description?: string | null } | null };

export type ProjectByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectByIdQuery = { __typename?: 'Query', projectById?: { __typename?: 'Project', id: number, knowledge_field_id?: number | null, contest_id?: number | null, number: string, name: string, name_en?: string | null, slug: string, leader?: string | null, leader_en?: string | null, leader_rank?: string | null, leader_rank_en?: string | null, organization?: string | null, organization_en?: string | null, annotation?: string | null, annotation_en?: string | null, plan_results?: string | null, plan_results_en?: string | null, publications?: string | null, publications_en?: string | null, result_annotation?: string | null, result_annotation_en?: string | null, result_usage?: string | null, result_usage_en?: string | null, year?: number | null, grnti_number?: string | null, status_text?: string | null, status_text_en?: string | null, deadline?: string | null, created_at: any, updated_at: any, knowledge_field?: { __typename?: 'KnowledgeField', id?: number | null, name: string, name_en?: string | null, sort: number } | null, contest?: { __typename?: 'Contest', id: number, name: string, number?: number | null, status?: ContestStatus | null, deadline?: any | null, date?: any | null, created_at: any, updated_at: any } | null, meta?: { __typename?: 'Meta', title: string, description: string, auto_title: string, auto_description: string } | null, seo?: { __typename?: 'Seo', id: number, title?: string | null, description?: string | null } | null } | null };

export type ProjectsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<QueryProjectsOrderByRelationOrderByClause> | QueryProjectsOrderByRelationOrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', lastPage: number, total: number, perPage: number }, data: Array<{ __typename?: 'Project', id: number, knowledge_field_id?: number | null, contest_id?: number | null, number: string, name: string, name_en?: string | null, slug: string, leader?: string | null, leader_en?: string | null, leader_rank?: string | null, leader_rank_en?: string | null, organization?: string | null, organization_en?: string | null, annotation?: string | null, annotation_en?: string | null, plan_results?: string | null, plan_results_en?: string | null, publications?: string | null, publications_en?: string | null, result_annotation?: string | null, result_annotation_en?: string | null, result_usage?: string | null, result_usage_en?: string | null, year?: number | null, grnti_number?: string | null, status_text?: string | null, status_text_en?: string | null, deadline?: string | null, created_at: any, updated_at: any, knowledge_field?: { __typename?: 'KnowledgeField', id?: number | null, name: string, name_en?: string | null, sort: number } | null, contest?: { __typename?: 'Contest', id: number, name: string, number?: number | null, status?: ContestStatus | null, deadline?: any | null, date?: any | null, created_at: any, updated_at: any } | null, meta?: { __typename?: 'Meta', title: string, description: string, auto_title: string, auto_description: string } | null, seo?: { __typename?: 'Seo', id: number, title?: string | null, description?: string | null } | null }> } | null };

export type CreateProjectMutationVariables = Exact<{
  input: ProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id: number, knowledge_field_id?: number | null, contest_id?: number | null, number: string, name: string, name_en?: string | null, slug: string, leader?: string | null, leader_en?: string | null, leader_rank?: string | null, leader_rank_en?: string | null, organization?: string | null, organization_en?: string | null, annotation?: string | null, annotation_en?: string | null, plan_results?: string | null, plan_results_en?: string | null, publications?: string | null, publications_en?: string | null, result_annotation?: string | null, result_annotation_en?: string | null, result_usage?: string | null, result_usage_en?: string | null, year?: number | null, grnti_number?: string | null, status_text?: string | null, status_text_en?: string | null, deadline?: string | null, created_at: any, updated_at: any, knowledge_field?: { __typename?: 'KnowledgeField', id?: number | null, name: string, name_en?: string | null, sort: number } | null, contest?: { __typename?: 'Contest', id: number, name: string, number?: number | null, status?: ContestStatus | null, deadline?: any | null, date?: any | null, created_at: any, updated_at: any } | null, meta?: { __typename?: 'Meta', title: string, description: string, auto_title: string, auto_description: string } | null, seo?: { __typename?: 'Seo', id: number, title?: string | null, description?: string | null } | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  input: ProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', upsertProject?: { __typename?: 'Project', id: number, knowledge_field_id?: number | null, contest_id?: number | null, number: string, name: string, name_en?: string | null, slug: string, leader?: string | null, leader_en?: string | null, leader_rank?: string | null, leader_rank_en?: string | null, organization?: string | null, organization_en?: string | null, annotation?: string | null, annotation_en?: string | null, plan_results?: string | null, plan_results_en?: string | null, publications?: string | null, publications_en?: string | null, result_annotation?: string | null, result_annotation_en?: string | null, result_usage?: string | null, result_usage_en?: string | null, year?: number | null, grnti_number?: string | null, status_text?: string | null, status_text_en?: string | null, deadline?: string | null, created_at: any, updated_at: any, knowledge_field?: { __typename?: 'KnowledgeField', id?: number | null, name: string, name_en?: string | null, sort: number } | null, contest?: { __typename?: 'Contest', id: number, name: string, number?: number | null, status?: ContestStatus | null, deadline?: any | null, date?: any | null, created_at: any, updated_at: any } | null, meta?: { __typename?: 'Meta', title: string, description: string, auto_title: string, auto_description: string } | null, seo?: { __typename?: 'Seo', id: number, title?: string | null, description?: string | null } | null } | null };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'Project', id: number } | null };

export type AllPurchasesFieldsFragment = { __typename?: 'Purchase', id: number, name: string, description?: string | null, url?: string | null, sort: number, published: boolean, created_at: any, updated_at: any };

export type PurchaseByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PurchaseByIdQuery = { __typename?: 'Query', purchaseById?: { __typename?: 'Purchase', id: number, name: string, description?: string | null, url?: string | null, sort: number, published: boolean, created_at: any, updated_at: any } | null };

export type PurchasesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type PurchasesQuery = { __typename?: 'Query', purchases: Array<{ __typename?: 'Purchase', id: number, name: string, description?: string | null, url?: string | null, sort: number, published: boolean, created_at: any, updated_at: any }> };

export type UpdatePurchasePublishedMutationVariables = Exact<{
  id: Scalars['Int'];
  published: Scalars['Boolean'];
}>;


export type UpdatePurchasePublishedMutation = { __typename?: 'Mutation', upsertPurchase?: { __typename?: 'Purchase', id: number } | null };

export type CreatePurchaseMutationVariables = Exact<{
  input: PurchaseInput;
}>;


export type CreatePurchaseMutation = { __typename?: 'Mutation', createPurchase?: { __typename?: 'Purchase', id: number, name: string, description?: string | null, url?: string | null, sort: number, published: boolean, created_at: any, updated_at: any } | null };

export type UpdatePurchaseMutationVariables = Exact<{
  input: PurchaseInput;
}>;


export type UpdatePurchaseMutation = { __typename?: 'Mutation', upsertPurchase?: { __typename?: 'Purchase', id: number, name: string, description?: string | null, url?: string | null, sort: number, published: boolean, created_at: any, updated_at: any } | null };

export type DeletePurchaseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePurchaseMutation = { __typename?: 'Mutation', deletePurchase?: { __typename?: 'Purchase', id: number } | null };

export type AllReportsFieldsFragment = { __typename?: 'Report', id: number, name: string, name_en?: string | null, description?: string | null, description_en?: string | null, sort: number, imageUrl?: string | null, created_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null };

export type ReportByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReportByIdQuery = { __typename?: 'Query', reportById?: { __typename?: 'Report', id: number, name: string, name_en?: string | null, description?: string | null, description_en?: string | null, sort: number, imageUrl?: string | null, created_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null } | null };

export type ReportsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type ReportsQuery = { __typename?: 'Query', reports: Array<{ __typename?: 'Report', id: number, name: string, name_en?: string | null, description?: string | null, description_en?: string | null, sort: number, imageUrl?: string | null, created_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null }> };

export type CreateReportMutationVariables = Exact<{
  input: ReportInput;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', createReport?: { __typename?: 'Report', id: number, name: string, name_en?: string | null, description?: string | null, description_en?: string | null, sort: number, imageUrl?: string | null, created_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null } | null };

export type UpdateReportMutationVariables = Exact<{
  input: ReportInput;
}>;


export type UpdateReportMutation = { __typename?: 'Mutation', upsertReport?: { __typename?: 'Report', id: number, name: string, name_en?: string | null, description?: string | null, description_en?: string | null, sort: number, imageUrl?: string | null, created_at: any, linked_documents?: Array<{ __typename?: 'LinkedDocument', id: number, url: string, user_name?: string | null, sort?: number | null } | null> | null } | null };

export type DeleteReportMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteReportMutation = { __typename?: 'Mutation', deleteReport?: { __typename?: 'Report', id: number } | null };

export type AllSettingsFieldsFragment = { __typename?: 'Setting', id: number, name: string, value?: string | null };

export type SettingByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SettingByIdQuery = { __typename?: 'Query', settingById?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null };

export type SettingByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type SettingByNameQuery = { __typename?: 'Query', settingByName?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null };

export type SettingsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type SettingsQuery = { __typename?: 'Query', settings: Array<{ __typename?: 'Setting', id: number, name: string, value?: string | null }> };

export type UpdateSettingsMutationVariables = Exact<{
  schedule?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emailPress?: InputMaybe<Scalars['String']>;
  send_email_notify?: InputMaybe<Scalars['String']>;
  content_editor?: InputMaybe<Scalars['String']>;
  vk?: InputMaybe<Scalars['String']>;
  facebook?: InputMaybe<Scalars['String']>;
  telegram?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  whatsapp?: InputMaybe<Scalars['String']>;
}>;


export type UpdateSettingsMutation = { __typename?: 'Mutation', phone?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null, email?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null, emailPress?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null, address?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null, schedule?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null, send_email_notify?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null, content_editor?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null, vk?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null, facebook?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null, telegram?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null, instagram?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null, whatsapp?: { __typename?: 'Setting', id: number, name: string, value?: string | null } | null };

export type AllFieldsFragment = { __typename?: 'StaffControl', id: number, name: string, description?: string | null, sort: number, page_id?: number | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null };

export type StaffControlByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type StaffControlByIdQuery = { __typename?: 'Query', staffControlById?: { __typename?: 'StaffControl', id: number, name: string, description?: string | null, sort: number, page_id?: number | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null };

export type StaffControlsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type StaffControlsQuery = { __typename?: 'Query', staffControls: Array<{ __typename?: 'StaffControl', id: number, name: string, description?: string | null, sort: number, page_id?: number | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null }> };

export type CreateStaffControlMutationVariables = Exact<{
  input: StaffControlInput;
}>;


export type CreateStaffControlMutation = { __typename?: 'Mutation', createStaffControl?: { __typename?: 'StaffControl', id: number, name: string, description?: string | null, sort: number, page_id?: number | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null };

export type UpdateStaffControlMutationVariables = Exact<{
  input: StaffControlInput;
}>;


export type UpdateStaffControlMutation = { __typename?: 'Mutation', upsertStaffControl?: { __typename?: 'StaffControl', id: number, name: string, description?: string | null, sort: number, page_id?: number | null, imageUrl?: string | null, created_at: any, image?: { __typename?: 'Image', id: number, url?: string | null } | null } | null };

export type DeleteStaffControlMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteStaffControlMutation = { __typename?: 'Mutation', deleteStaffControl?: { __typename?: 'StaffControl', id: number } | null };

export type StaffControlItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type StaffControlItemsQuery = { __typename?: 'Query', pages: Array<{ __typename?: 'Page', name: string, children?: Array<{ __typename?: 'Page', name: string, id: number } | null> | null }> };

export type AllSubdivisionsFieldsFragment = { __typename?: 'Subdivision', id: number, name: string, sort: number };

export type SubdivisionByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SubdivisionByIdQuery = { __typename?: 'Query', subdivisionById?: { __typename?: 'Subdivision', id: number, name: string, sort: number } | null };

export type SubdivisionsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
}>;


export type SubdivisionsQuery = { __typename?: 'Query', subdivisions: Array<{ __typename?: 'Subdivision', id: number, name: string, sort: number }> };

export type CreateSubdivisionMutationVariables = Exact<{
  sort: Scalars['Int'];
  name: Scalars['String'];
}>;


export type CreateSubdivisionMutation = { __typename?: 'Mutation', createSubdivision?: { __typename?: 'Subdivision', id: number, name: string, sort: number } | null };

export type UpdateSubdivisionMutationVariables = Exact<{
  id: Scalars['Int'];
  sort: Scalars['Int'];
  name: Scalars['String'];
}>;


export type UpdateSubdivisionMutation = { __typename?: 'Mutation', upsertSubdivision?: { __typename?: 'Subdivision', id: number, name: string, sort: number } | null };

export type DeleteSubdivisionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSubdivisionMutation = { __typename?: 'Mutation', deleteSubdivision?: { __typename?: 'Subdivision', sort: number, name: string } | null };

export type UploadMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadMutation = { __typename?: 'Mutation', upload?: string | null };

export type AllUsersFieldsFragment = { __typename?: 'User', id: number, name: string, email: string, email_verified_at?: any | null, created_at: any, updated_at: any };

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserByIdQuery = { __typename?: 'Query', userById?: { __typename?: 'User', id: number, name: string, email: string, email_verified_at?: any | null, created_at: any, updated_at: any } | null };

export type UsersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type UsersQuery = { __typename?: 'Query', users?: { __typename?: 'UserPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', lastPage: number, total: number, perPage: number }, data: Array<{ __typename?: 'User', id: number, name: string, email: string, email_verified_at?: any | null, created_at: any, updated_at: any }> } | null };

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: number, name: string, email: string, email_verified_at?: any | null, created_at: any, updated_at: any } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', upsertUser?: { __typename?: 'User', id: number, name: string, email: string, email_verified_at?: any | null, created_at: any, updated_at: any } | null };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'User', id: number } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, name: string, email: string, email_verified_at?: any | null, created_at: any, updated_at: any } };

export type AllVacanciesFieldsFragment = { __typename?: 'Vacancy', id: number, name: string, description?: string | null, sort: number, published: boolean };

export type VacancyByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type VacancyByIdQuery = { __typename?: 'Query', vacancyById?: { __typename?: 'Vacancy', id: number, name: string, description?: string | null, sort: number, published: boolean } | null };

export type VacanciesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  filter?: InputMaybe<Array<FilterByClause> | FilterByClause>;
}>;


export type VacanciesQuery = { __typename?: 'Query', vacancies: Array<{ __typename?: 'Vacancy', id: number, name: string, description?: string | null, sort: number, published: boolean }> };

export type UpdateVacancyPublishedMutationVariables = Exact<{
  id: Scalars['Int'];
  published: Scalars['Boolean'];
}>;


export type UpdateVacancyPublishedMutation = { __typename?: 'Mutation', upsertVacancy?: { __typename?: 'Vacancy', id: number } | null };

export type CreateVacancyMutationVariables = Exact<{
  input: VacancyInput;
}>;


export type CreateVacancyMutation = { __typename?: 'Mutation', createVacancy?: { __typename?: 'Vacancy', id: number, name: string, description?: string | null, sort: number, published: boolean } | null };

export type UpdateVacancyMutationVariables = Exact<{
  input: VacancyInput;
}>;


export type UpdateVacancyMutation = { __typename?: 'Mutation', upsertVacancy?: { __typename?: 'Vacancy', id: number, name: string, description?: string | null, sort: number, published: boolean } | null };

export type DeleteVacancyMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteVacancyMutation = { __typename?: 'Mutation', deleteVacancy?: { __typename?: 'Vacancy', id: number } | null };

export const AllActivityResultsFieldsFragmentDoc = `
    fragment allActivityResultsFields on ActivityResult {
  id
  name
  result
  measure_unit
  sort
  created_at
}
    `;
export const AllVideoBroadcastsFieldsFragmentDoc = `
    fragment allVideoBroadcastsFields on VideoBroadcast {
  id
  name
  sort
  url
}
    `;
export const AllClustersFieldsFragmentDoc = `
    fragment allClustersFields on Cluster {
  id
  name
  column_one_name
  column_one_text
  column_two_name
  column_two_text
  sort
  created_at
  updated_at
}
    `;
export const AllContestFieldsFragmentDoc = `
    fragment allContestFields on Contest {
  id
  name
  name_en
  number
  status
  deadline
  date
  created_at
  documents {
    id
    url
    user_name
    sort
  }
}
    `;
export const AllDocumentGroupsFieldsFragmentDoc = `
    fragment allDocumentGroupsFields on DocumentGroup {
  id
  name
  name_en
  sort
  linked_documents {
    id
    sort
    user_name
    url
    created_at
    published
  }
}
    `;
export const AllSubdivisionsFieldsFragmentDoc = `
    fragment allSubdivisionsFields on Subdivision {
  id
  name
  sort
}
    `;
export const AllEmployeeFieldsFragmentDoc = `
    fragment allEmployeeFields on Employee {
  id
  name
  email
  position
  additional
  sort
  subdivision {
    ...allSubdivisionsFields
  }
  created_at
  updated_at
}
    ${AllSubdivisionsFieldsFragmentDoc}`;
export const AllEventsFieldsFragmentDoc = `
    fragment allEventsFields on Event {
  id
  name
  name_en
  description
  description_en
  published
  imageUrl
  place
  place_en
  start
  end
  created_at
  updated_at
  linked_documents {
    id
    url
    user_name
    sort
  }
  image {
    id
    url
  }
  partners {
    id
    name
    imageUrl
    image {
      id
      url
    }
  }
  organizers {
    id
    name
    imageUrl
    image {
      id
      url
    }
  }
  documents {
    id
    url
    user_name
    sort
  }
}
    `;
export const AllKnowledgeAreasFieldsFragmentDoc = `
    fragment allKnowledgeAreasFields on KnowledgeField {
  id
  name
  name_en
  sort
}
    `;
export const AllLinkedDocumentFieldsFragmentDoc = `
    fragment allLinkedDocumentFields on LinkedDocument {
  id
  url
  user_name
  user_name_en
  sort
  published
  created_at
}
    `;
export const AllMapObjectsFieldsFragmentDoc = `
    fragment allMapObjectsFields on MapObject {
  id
  name
  characteristics
  area
  gross_boma_area
  floors
  learn_more
  linked_documents {
    id
    url
    user_name
    sort
  }
  created_at
  updated_at
}
    `;
export const AllNewsFieldsFragmentDoc = `
    fragment allNewsFields on News {
  id
  name
  name_en
  slug
  content
  content_en
  description
  description_en
  imageUrl
  source
  source_name
  source_name_en
  published
  image {
    id
    url
  }
  gallery {
    id
    url
    alt
    sort
  }
  category {
    id
    name
    name_en
    sort
  }
  tags {
    id
    name
    name_en
    sort
  }
  seo {
    id
    title
    description
  }
  meta {
    auto_title
    auto_description
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
  name_en
}
    `;
export const AllNewsTagsFieldsFragmentDoc = `
    fragment allNewsTagsFields on NewsTag {
  id
  sort
  name
  name_en
}
    `;
export const AllOrganizerFieldsFragmentDoc = `
    fragment allOrganizerFields on Organizer {
  id
  name
  name_en
  imageUrl
  image {
    id
    url
  }
  created_at
}
    `;
export const AllPageFieldsFragmentDoc = `
    fragment allPageFields on Page {
  id
  name
  slug
  sort
  description
  imageUrl
  image {
    id
    url
  }
  seo {
    title
    description
  }
  meta {
    auto_title
    auto_description
  }
  params
  children {
    id
  }
  linked_documents {
    id
    url
    user_name
    sort
  }
  parent_id
  created_at
  updated_at
  gallery {
    id
    url
    alt
    sort
  }
}
    `;
export const AllPartnerFieldsFragmentDoc = `
    fragment allPartnerFields on Partner {
  id
  name
  name_en
  imageUrl
  image {
    id
    url
  }
  created_at
}
    `;
export const AllProjectsFieldsFragmentDoc = `
    fragment allProjectsFields on Project {
  id
  knowledge_field_id
  knowledge_field {
    id
    name
    name_en
    sort
  }
  contest_id
  contest {
    id
    name
    number
    status
    deadline
    date
    created_at
    updated_at
  }
  number
  name
  name_en
  slug
  leader
  leader_en
  leader_rank
  leader_rank_en
  organization
  organization_en
  annotation
  annotation_en
  plan_results
  plan_results_en
  publications
  publications_en
  result_annotation
  result_annotation_en
  result_usage
  result_usage_en
  year
  grnti_number
  status_text
  status_text_en
  deadline
  meta {
    title
    description
    auto_title
    auto_description
  }
  seo {
    id
    title
    description
  }
  created_at
  updated_at
}
    `;
export const AllPurchasesFieldsFragmentDoc = `
    fragment allPurchasesFields on Purchase {
  id
  name
  description
  url
  sort
  published
  created_at
  updated_at
}
    `;
export const AllReportsFieldsFragmentDoc = `
    fragment allReportsFields on Report {
  id
  name
  name_en
  description
  description_en
  sort
  imageUrl
  linked_documents {
    id
    url
    user_name
    sort
  }
  created_at
}
    `;
export const AllSettingsFieldsFragmentDoc = `
    fragment allSettingsFields on Setting {
  id
  name
  value
}
    `;
export const AllFieldsFragmentDoc = `
    fragment allFields on StaffControl {
  id
  name
  description
  sort
  page_id
  imageUrl
  image {
    id
    url
  }
  created_at
}
    `;
export const AllUsersFieldsFragmentDoc = `
    fragment allUsersFields on User {
  id
  name
  email
  email_verified_at
  created_at
  updated_at
}
    `;
export const AllVacanciesFieldsFragmentDoc = `
    fragment allVacanciesFields on Vacancy {
  id
  name
  description
  sort
  published
}
    `;
export const ActivityResultByIdDocument = `
    query activityResultById($id: Int!) {
  activityResultById(id: $id) {
    ...allActivityResultsFields
  }
}
    ${AllActivityResultsFieldsFragmentDoc}`;
export const useActivityResultByIdQuery = <
      TData = ActivityResultByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ActivityResultByIdQueryVariables,
      options?: UseQueryOptions<ActivityResultByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ActivityResultByIdQuery, TError, TData>(
      ['activityResultById', variables],
      fetcher<ActivityResultByIdQuery, ActivityResultByIdQueryVariables>(client, ActivityResultByIdDocument, variables, headers),
      options
    );
export const ActivityResultsDocument = `
    query activityResults($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  activityResults(orderBy: $orderBy, filter: $filter) {
    ...allActivityResultsFields
  }
}
    ${AllActivityResultsFieldsFragmentDoc}`;
export const useActivityResultsQuery = <
      TData = ActivityResultsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ActivityResultsQueryVariables,
      options?: UseQueryOptions<ActivityResultsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ActivityResultsQuery, TError, TData>(
      variables === undefined ? ['activityResults'] : ['activityResults', variables],
      fetcher<ActivityResultsQuery, ActivityResultsQueryVariables>(client, ActivityResultsDocument, variables, headers),
      options
    );
export const CreateActivityResultDocument = `
    mutation createActivityResult($input: ActivityResultInput!) {
  createActivityResult: upsertActivityResult(input: $input) {
    ...allActivityResultsFields
  }
}
    ${AllActivityResultsFieldsFragmentDoc}`;
export const useCreateActivityResultMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateActivityResultMutation, TError, CreateActivityResultMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateActivityResultMutation, TError, CreateActivityResultMutationVariables, TContext>(
      ['createActivityResult'],
      (variables?: CreateActivityResultMutationVariables) => fetcher<CreateActivityResultMutation, CreateActivityResultMutationVariables>(client, CreateActivityResultDocument, variables, headers)(),
      options
    );
export const UpdateActivityResultDocument = `
    mutation updateActivityResult($input: ActivityResultInput!) {
  upsertActivityResult(input: $input) {
    ...allActivityResultsFields
  }
}
    ${AllActivityResultsFieldsFragmentDoc}`;
export const useUpdateActivityResultMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateActivityResultMutation, TError, UpdateActivityResultMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateActivityResultMutation, TError, UpdateActivityResultMutationVariables, TContext>(
      ['updateActivityResult'],
      (variables?: UpdateActivityResultMutationVariables) => fetcher<UpdateActivityResultMutation, UpdateActivityResultMutationVariables>(client, UpdateActivityResultDocument, variables, headers)(),
      options
    );
export const DeleteActivityResultDocument = `
    mutation deleteActivityResult($id: Int!) {
  deleteActivityResult(id: $id) {
    id
  }
}
    `;
export const useDeleteActivityResultMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteActivityResultMutation, TError, DeleteActivityResultMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteActivityResultMutation, TError, DeleteActivityResultMutationVariables, TContext>(
      ['deleteActivityResult'],
      (variables?: DeleteActivityResultMutationVariables) => fetcher<DeleteActivityResultMutation, DeleteActivityResultMutationVariables>(client, DeleteActivityResultDocument, variables, headers)(),
      options
    );
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
export const VideoBroadcastByIdDocument = `
    query videoBroadcastById($id: Int!) {
  videoBroadcastById(id: $id) {
    ...allVideoBroadcastsFields
  }
}
    ${AllVideoBroadcastsFieldsFragmentDoc}`;
export const useVideoBroadcastByIdQuery = <
      TData = VideoBroadcastByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: VideoBroadcastByIdQueryVariables,
      options?: UseQueryOptions<VideoBroadcastByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<VideoBroadcastByIdQuery, TError, TData>(
      ['videoBroadcastById', variables],
      fetcher<VideoBroadcastByIdQuery, VideoBroadcastByIdQueryVariables>(client, VideoBroadcastByIdDocument, variables, headers),
      options
    );
export const VideoBroadcastsDocument = `
    query videoBroadcasts($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  videoBroadcasts(orderBy: $orderBy, filter: $filter) {
    ...allVideoBroadcastsFields
  }
}
    ${AllVideoBroadcastsFieldsFragmentDoc}`;
export const useVideoBroadcastsQuery = <
      TData = VideoBroadcastsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: VideoBroadcastsQueryVariables,
      options?: UseQueryOptions<VideoBroadcastsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<VideoBroadcastsQuery, TError, TData>(
      variables === undefined ? ['videoBroadcasts'] : ['videoBroadcasts', variables],
      fetcher<VideoBroadcastsQuery, VideoBroadcastsQueryVariables>(client, VideoBroadcastsDocument, variables, headers),
      options
    );
export const CreateVideoBroadcastDocument = `
    mutation createVideoBroadcast($input: VideoBroadcastInput!) {
  createVideoBroadcast: upsertVideoBroadcast(input: $input) {
    ...allVideoBroadcastsFields
  }
}
    ${AllVideoBroadcastsFieldsFragmentDoc}`;
export const useCreateVideoBroadcastMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateVideoBroadcastMutation, TError, CreateVideoBroadcastMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateVideoBroadcastMutation, TError, CreateVideoBroadcastMutationVariables, TContext>(
      ['createVideoBroadcast'],
      (variables?: CreateVideoBroadcastMutationVariables) => fetcher<CreateVideoBroadcastMutation, CreateVideoBroadcastMutationVariables>(client, CreateVideoBroadcastDocument, variables, headers)(),
      options
    );
export const UpdateVideoBroadcastDocument = `
    mutation updateVideoBroadcast($input: VideoBroadcastInput!) {
  upsertVideoBroadcast(input: $input) {
    ...allVideoBroadcastsFields
  }
}
    ${AllVideoBroadcastsFieldsFragmentDoc}`;
export const useUpdateVideoBroadcastMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateVideoBroadcastMutation, TError, UpdateVideoBroadcastMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateVideoBroadcastMutation, TError, UpdateVideoBroadcastMutationVariables, TContext>(
      ['updateVideoBroadcast'],
      (variables?: UpdateVideoBroadcastMutationVariables) => fetcher<UpdateVideoBroadcastMutation, UpdateVideoBroadcastMutationVariables>(client, UpdateVideoBroadcastDocument, variables, headers)(),
      options
    );
export const DeleteVideoBroadcastDocument = `
    mutation deleteVideoBroadcast($id: Int!) {
  deleteVideoBroadcast(id: $id) {
    id
  }
}
    `;
export const useDeleteVideoBroadcastMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteVideoBroadcastMutation, TError, DeleteVideoBroadcastMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteVideoBroadcastMutation, TError, DeleteVideoBroadcastMutationVariables, TContext>(
      ['deleteVideoBroadcast'],
      (variables?: DeleteVideoBroadcastMutationVariables) => fetcher<DeleteVideoBroadcastMutation, DeleteVideoBroadcastMutationVariables>(client, DeleteVideoBroadcastDocument, variables, headers)(),
      options
    );
export const ClusterByIdDocument = `
    query clusterById($id: Int!) {
  clusterById(id: $id) {
    ...allClustersFields
  }
}
    ${AllClustersFieldsFragmentDoc}`;
export const useClusterByIdQuery = <
      TData = ClusterByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ClusterByIdQueryVariables,
      options?: UseQueryOptions<ClusterByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ClusterByIdQuery, TError, TData>(
      ['clusterById', variables],
      fetcher<ClusterByIdQuery, ClusterByIdQueryVariables>(client, ClusterByIdDocument, variables, headers),
      options
    );
export const ClustersDocument = `
    query clusters($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  clusters(orderBy: $orderBy, filter: $filter) {
    ...allClustersFields
  }
}
    ${AllClustersFieldsFragmentDoc}`;
export const useClustersQuery = <
      TData = ClustersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ClustersQueryVariables,
      options?: UseQueryOptions<ClustersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ClustersQuery, TError, TData>(
      variables === undefined ? ['clusters'] : ['clusters', variables],
      fetcher<ClustersQuery, ClustersQueryVariables>(client, ClustersDocument, variables, headers),
      options
    );
export const CreateClusterDocument = `
    mutation createCluster($input: ClusterInput!) {
  createCluster: upsertCluster(input: $input) {
    ...allClustersFields
  }
}
    ${AllClustersFieldsFragmentDoc}`;
export const useCreateClusterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateClusterMutation, TError, CreateClusterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateClusterMutation, TError, CreateClusterMutationVariables, TContext>(
      ['createCluster'],
      (variables?: CreateClusterMutationVariables) => fetcher<CreateClusterMutation, CreateClusterMutationVariables>(client, CreateClusterDocument, variables, headers)(),
      options
    );
export const UpdateClusterDocument = `
    mutation updateCluster($input: ClusterInput!) {
  upsertCluster(input: $input) {
    ...allClustersFields
  }
}
    ${AllClustersFieldsFragmentDoc}`;
export const useUpdateClusterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateClusterMutation, TError, UpdateClusterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateClusterMutation, TError, UpdateClusterMutationVariables, TContext>(
      ['updateCluster'],
      (variables?: UpdateClusterMutationVariables) => fetcher<UpdateClusterMutation, UpdateClusterMutationVariables>(client, UpdateClusterDocument, variables, headers)(),
      options
    );
export const DeleteClusterDocument = `
    mutation deleteCluster($id: Int!) {
  deleteCluster(id: $id) {
    id
  }
}
    `;
export const useDeleteClusterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteClusterMutation, TError, DeleteClusterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteClusterMutation, TError, DeleteClusterMutationVariables, TContext>(
      ['deleteCluster'],
      (variables?: DeleteClusterMutationVariables) => fetcher<DeleteClusterMutation, DeleteClusterMutationVariables>(client, DeleteClusterDocument, variables, headers)(),
      options
    );
export const ContestByIdDocument = `
    query contestById($id: Int!) {
  contestById(id: $id) {
    ...allContestFields
  }
}
    ${AllContestFieldsFragmentDoc}`;
export const useContestByIdQuery = <
      TData = ContestByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ContestByIdQueryVariables,
      options?: UseQueryOptions<ContestByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ContestByIdQuery, TError, TData>(
      ['contestById', variables],
      fetcher<ContestByIdQuery, ContestByIdQueryVariables>(client, ContestByIdDocument, variables, headers),
      options
    );
export const ContestsDocument = `
    query contests($orderBy: [OrderByClause!], $filter: [FilterByClause!], $first: Int = 30, $page: Int, $status: ContestStatus) {
  contests(
    orderBy: $orderBy
    filter: $filter
    first: $first
    page: $page
    status: $status
  ) {
    paginatorInfo {
      lastPage
      total
      perPage
    }
    data {
      ...allContestFields
    }
  }
}
    ${AllContestFieldsFragmentDoc}`;
export const useContestsQuery = <
      TData = ContestsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ContestsQueryVariables,
      options?: UseQueryOptions<ContestsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ContestsQuery, TError, TData>(
      variables === undefined ? ['contests'] : ['contests', variables],
      fetcher<ContestsQuery, ContestsQueryVariables>(client, ContestsDocument, variables, headers),
      options
    );
export const CreateContestDocument = `
    mutation createContest($input: ContestInput!) {
  createContest: upsertContest(input: $input) {
    ...allContestFields
  }
}
    ${AllContestFieldsFragmentDoc}`;
export const useCreateContestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateContestMutation, TError, CreateContestMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateContestMutation, TError, CreateContestMutationVariables, TContext>(
      ['createContest'],
      (variables?: CreateContestMutationVariables) => fetcher<CreateContestMutation, CreateContestMutationVariables>(client, CreateContestDocument, variables, headers)(),
      options
    );
export const UpdateContestDocument = `
    mutation updateContest($input: ContestInput!) {
  upsertContest(input: $input) {
    ...allContestFields
  }
}
    ${AllContestFieldsFragmentDoc}`;
export const useUpdateContestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateContestMutation, TError, UpdateContestMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateContestMutation, TError, UpdateContestMutationVariables, TContext>(
      ['updateContest'],
      (variables?: UpdateContestMutationVariables) => fetcher<UpdateContestMutation, UpdateContestMutationVariables>(client, UpdateContestDocument, variables, headers)(),
      options
    );
export const DeleteContestDocument = `
    mutation deleteContest($id: Int!) {
  deleteContest(id: $id) {
    id
  }
}
    `;
export const useDeleteContestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteContestMutation, TError, DeleteContestMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteContestMutation, TError, DeleteContestMutationVariables, TContext>(
      ['deleteContest'],
      (variables?: DeleteContestMutationVariables) => fetcher<DeleteContestMutation, DeleteContestMutationVariables>(client, DeleteContestDocument, variables, headers)(),
      options
    );
export const DocumentGroupByIdDocument = `
    query documentGroupById($id: Int!) {
  documentGroupById(id: $id) {
    ...allDocumentGroupsFields
  }
}
    ${AllDocumentGroupsFieldsFragmentDoc}`;
export const useDocumentGroupByIdQuery = <
      TData = DocumentGroupByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: DocumentGroupByIdQueryVariables,
      options?: UseQueryOptions<DocumentGroupByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<DocumentGroupByIdQuery, TError, TData>(
      ['documentGroupById', variables],
      fetcher<DocumentGroupByIdQuery, DocumentGroupByIdQueryVariables>(client, DocumentGroupByIdDocument, variables, headers),
      options
    );
export const DocumentGroupsDocument = `
    query documentGroups($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  documentGroups(orderBy: $orderBy, filter: $filter) {
    ...allDocumentGroupsFields
  }
}
    ${AllDocumentGroupsFieldsFragmentDoc}`;
export const useDocumentGroupsQuery = <
      TData = DocumentGroupsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: DocumentGroupsQueryVariables,
      options?: UseQueryOptions<DocumentGroupsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<DocumentGroupsQuery, TError, TData>(
      variables === undefined ? ['documentGroups'] : ['documentGroups', variables],
      fetcher<DocumentGroupsQuery, DocumentGroupsQueryVariables>(client, DocumentGroupsDocument, variables, headers),
      options
    );
export const CreateDocumentGroupDocument = `
    mutation createDocumentGroup($input: DocumentGroupInput!) {
  createDocumentGroup: upsertDocumentGroup(input: $input) {
    ...allDocumentGroupsFields
  }
}
    ${AllDocumentGroupsFieldsFragmentDoc}`;
export const useCreateDocumentGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateDocumentGroupMutation, TError, CreateDocumentGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateDocumentGroupMutation, TError, CreateDocumentGroupMutationVariables, TContext>(
      ['createDocumentGroup'],
      (variables?: CreateDocumentGroupMutationVariables) => fetcher<CreateDocumentGroupMutation, CreateDocumentGroupMutationVariables>(client, CreateDocumentGroupDocument, variables, headers)(),
      options
    );
export const UpdateDocumentGroupDocument = `
    mutation updateDocumentGroup($input: DocumentGroupInput!) {
  upsertDocumentGroup(input: $input) {
    ...allDocumentGroupsFields
  }
}
    ${AllDocumentGroupsFieldsFragmentDoc}`;
export const useUpdateDocumentGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateDocumentGroupMutation, TError, UpdateDocumentGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateDocumentGroupMutation, TError, UpdateDocumentGroupMutationVariables, TContext>(
      ['updateDocumentGroup'],
      (variables?: UpdateDocumentGroupMutationVariables) => fetcher<UpdateDocumentGroupMutation, UpdateDocumentGroupMutationVariables>(client, UpdateDocumentGroupDocument, variables, headers)(),
      options
    );
export const UpdateConnectDocumentGroupDocument = `
    mutation UpdateConnectDocumentGroup($connectInput: DocumentGroupInput!, $disconnectInput: DocumentGroupInput!) {
  upsertConnect: upsertDocumentGroup(input: $connectInput) {
    ...allDocumentGroupsFields
  }
  upsertDisconnect: upsertDocumentGroup(input: $disconnectInput) {
    ...allDocumentGroupsFields
  }
}
    ${AllDocumentGroupsFieldsFragmentDoc}`;
export const useUpdateConnectDocumentGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateConnectDocumentGroupMutation, TError, UpdateConnectDocumentGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateConnectDocumentGroupMutation, TError, UpdateConnectDocumentGroupMutationVariables, TContext>(
      ['UpdateConnectDocumentGroup'],
      (variables?: UpdateConnectDocumentGroupMutationVariables) => fetcher<UpdateConnectDocumentGroupMutation, UpdateConnectDocumentGroupMutationVariables>(client, UpdateConnectDocumentGroupDocument, variables, headers)(),
      options
    );
export const DeleteDocumentGroupDocument = `
    mutation deleteDocumentGroup($id: Int!) {
  deleteDocumentGroup(id: $id) {
    id
  }
}
    `;
export const useDeleteDocumentGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteDocumentGroupMutation, TError, DeleteDocumentGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteDocumentGroupMutation, TError, DeleteDocumentGroupMutationVariables, TContext>(
      ['deleteDocumentGroup'],
      (variables?: DeleteDocumentGroupMutationVariables) => fetcher<DeleteDocumentGroupMutation, DeleteDocumentGroupMutationVariables>(client, DeleteDocumentGroupDocument, variables, headers)(),
      options
    );
export const EmployeeByIdDocument = `
    query employeeById($id: Int!) {
  employeeById(id: $id) {
    ...allEmployeeFields
  }
}
    ${AllEmployeeFieldsFragmentDoc}`;
export const useEmployeeByIdQuery = <
      TData = EmployeeByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: EmployeeByIdQueryVariables,
      options?: UseQueryOptions<EmployeeByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<EmployeeByIdQuery, TError, TData>(
      ['employeeById', variables],
      fetcher<EmployeeByIdQuery, EmployeeByIdQueryVariables>(client, EmployeeByIdDocument, variables, headers),
      options
    );
export const EmployeesDocument = `
    query employees($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  employees(orderBy: $orderBy, filter: $filter) {
    ...allEmployeeFields
  }
}
    ${AllEmployeeFieldsFragmentDoc}`;
export const useEmployeesQuery = <
      TData = EmployeesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: EmployeesQueryVariables,
      options?: UseQueryOptions<EmployeesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<EmployeesQuery, TError, TData>(
      variables === undefined ? ['employees'] : ['employees', variables],
      fetcher<EmployeesQuery, EmployeesQueryVariables>(client, EmployeesDocument, variables, headers),
      options
    );
export const CreateEmployeeDocument = `
    mutation createEmployee($input: EmployeeInput!) {
  createEmployee: upsertEmployee(input: $input) {
    ...allEmployeeFields
  }
}
    ${AllEmployeeFieldsFragmentDoc}`;
export const useCreateEmployeeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateEmployeeMutation, TError, CreateEmployeeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateEmployeeMutation, TError, CreateEmployeeMutationVariables, TContext>(
      ['createEmployee'],
      (variables?: CreateEmployeeMutationVariables) => fetcher<CreateEmployeeMutation, CreateEmployeeMutationVariables>(client, CreateEmployeeDocument, variables, headers)(),
      options
    );
export const UpdateEmployeeDocument = `
    mutation updateEmployee($input: EmployeeInput!) {
  upsertEmployee(input: $input) {
    ...allEmployeeFields
  }
}
    ${AllEmployeeFieldsFragmentDoc}`;
export const useUpdateEmployeeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateEmployeeMutation, TError, UpdateEmployeeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateEmployeeMutation, TError, UpdateEmployeeMutationVariables, TContext>(
      ['updateEmployee'],
      (variables?: UpdateEmployeeMutationVariables) => fetcher<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>(client, UpdateEmployeeDocument, variables, headers)(),
      options
    );
export const UpdateEmployeeSubdivisionDocument = `
    mutation UpdateEmployeeSubdivision($id: Int!, $subdivisionId: Int!) {
  upsertEmployee(input: {id: $id, subdivision: {connect: $subdivisionId}}) {
    id
  }
}
    `;
export const useUpdateEmployeeSubdivisionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateEmployeeSubdivisionMutation, TError, UpdateEmployeeSubdivisionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateEmployeeSubdivisionMutation, TError, UpdateEmployeeSubdivisionMutationVariables, TContext>(
      ['UpdateEmployeeSubdivision'],
      (variables?: UpdateEmployeeSubdivisionMutationVariables) => fetcher<UpdateEmployeeSubdivisionMutation, UpdateEmployeeSubdivisionMutationVariables>(client, UpdateEmployeeSubdivisionDocument, variables, headers)(),
      options
    );
export const DeleteEmployeeDocument = `
    mutation deleteEmployee($id: Int!) {
  deleteEmployee(id: $id) {
    id
  }
}
    `;
export const useDeleteEmployeeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteEmployeeMutation, TError, DeleteEmployeeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteEmployeeMutation, TError, DeleteEmployeeMutationVariables, TContext>(
      ['deleteEmployee'],
      (variables?: DeleteEmployeeMutationVariables) => fetcher<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>(client, DeleteEmployeeDocument, variables, headers)(),
      options
    );
export const EventByIdDocument = `
    query eventById($id: Int!) {
  eventById(id: $id) {
    ...allEventsFields
  }
}
    ${AllEventsFieldsFragmentDoc}`;
export const useEventByIdQuery = <
      TData = EventByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: EventByIdQueryVariables,
      options?: UseQueryOptions<EventByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<EventByIdQuery, TError, TData>(
      ['eventById', variables],
      fetcher<EventByIdQuery, EventByIdQueryVariables>(client, EventByIdDocument, variables, headers),
      options
    );
export const EventsDocument = `
    query events($orderBy: [OrderByClause!], $filter: [FilterByClause!], $first: Int = 30, $page: Int) {
  events(orderBy: $orderBy, filter: $filter, first: $first, page: $page) {
    paginatorInfo {
      lastPage
      total
      perPage
    }
    data {
      ...allEventsFields
    }
  }
}
    ${AllEventsFieldsFragmentDoc}`;
export const useEventsQuery = <
      TData = EventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: EventsQueryVariables,
      options?: UseQueryOptions<EventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<EventsQuery, TError, TData>(
      variables === undefined ? ['events'] : ['events', variables],
      fetcher<EventsQuery, EventsQueryVariables>(client, EventsDocument, variables, headers),
      options
    );
export const UpdateEventPublishedDocument = `
    mutation UpdateEventPublished($id: Int!, $published: Boolean!) {
  upsertEvent(input: {id: $id, published: $published}) {
    id
  }
}
    `;
export const useUpdateEventPublishedMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateEventPublishedMutation, TError, UpdateEventPublishedMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateEventPublishedMutation, TError, UpdateEventPublishedMutationVariables, TContext>(
      ['UpdateEventPublished'],
      (variables?: UpdateEventPublishedMutationVariables) => fetcher<UpdateEventPublishedMutation, UpdateEventPublishedMutationVariables>(client, UpdateEventPublishedDocument, variables, headers)(),
      options
    );
export const CreateEventDocument = `
    mutation createEvent($input: EventInput!) {
  createEvent: upsertEvent(input: $input) {
    ...allEventsFields
  }
}
    ${AllEventsFieldsFragmentDoc}`;
export const useCreateEventMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateEventMutation, TError, CreateEventMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateEventMutation, TError, CreateEventMutationVariables, TContext>(
      ['createEvent'],
      (variables?: CreateEventMutationVariables) => fetcher<CreateEventMutation, CreateEventMutationVariables>(client, CreateEventDocument, variables, headers)(),
      options
    );
export const UpdateEventDocument = `
    mutation updateEvent($input: EventInput!) {
  upsertEvent(input: $input) {
    ...allEventsFields
  }
}
    ${AllEventsFieldsFragmentDoc}`;
export const useUpdateEventMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateEventMutation, TError, UpdateEventMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateEventMutation, TError, UpdateEventMutationVariables, TContext>(
      ['updateEvent'],
      (variables?: UpdateEventMutationVariables) => fetcher<UpdateEventMutation, UpdateEventMutationVariables>(client, UpdateEventDocument, variables, headers)(),
      options
    );
export const DeleteEventDocument = `
    mutation deleteEvent($id: Int!) {
  deleteEvent(id: $id) {
    id
  }
}
    `;
export const useDeleteEventMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteEventMutation, TError, DeleteEventMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteEventMutation, TError, DeleteEventMutationVariables, TContext>(
      ['deleteEvent'],
      (variables?: DeleteEventMutationVariables) => fetcher<DeleteEventMutation, DeleteEventMutationVariables>(client, DeleteEventDocument, variables, headers)(),
      options
    );
export const KnowledgeFieldByIdDocument = `
    query knowledgeFieldById($id: Int!) {
  knowledgeFieldById(id: $id) {
    ...allKnowledgeAreasFields
  }
}
    ${AllKnowledgeAreasFieldsFragmentDoc}`;
export const useKnowledgeFieldByIdQuery = <
      TData = KnowledgeFieldByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: KnowledgeFieldByIdQueryVariables,
      options?: UseQueryOptions<KnowledgeFieldByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<KnowledgeFieldByIdQuery, TError, TData>(
      ['knowledgeFieldById', variables],
      fetcher<KnowledgeFieldByIdQuery, KnowledgeFieldByIdQueryVariables>(client, KnowledgeFieldByIdDocument, variables, headers),
      options
    );
export const KnowledgeFieldsDocument = `
    query knowledgeFields($orderBy: [OrderByClause!]) {
  knowledgeFields(orderBy: $orderBy) {
    ...allKnowledgeAreasFields
  }
}
    ${AllKnowledgeAreasFieldsFragmentDoc}`;
export const useKnowledgeFieldsQuery = <
      TData = KnowledgeFieldsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: KnowledgeFieldsQueryVariables,
      options?: UseQueryOptions<KnowledgeFieldsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<KnowledgeFieldsQuery, TError, TData>(
      variables === undefined ? ['knowledgeFields'] : ['knowledgeFields', variables],
      fetcher<KnowledgeFieldsQuery, KnowledgeFieldsQueryVariables>(client, KnowledgeFieldsDocument, variables, headers),
      options
    );
export const CreateKnowledgeFieldDocument = `
    mutation createKnowledgeField($sort: Int!, $name: String!, $name_en: String) {
  createKnowledgeField: upsertKnowledgeField(
    input: {sort: $sort, name: $name, name_en: $name_en}
  ) {
    ...allKnowledgeAreasFields
  }
}
    ${AllKnowledgeAreasFieldsFragmentDoc}`;
export const useCreateKnowledgeFieldMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateKnowledgeFieldMutation, TError, CreateKnowledgeFieldMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateKnowledgeFieldMutation, TError, CreateKnowledgeFieldMutationVariables, TContext>(
      ['createKnowledgeField'],
      (variables?: CreateKnowledgeFieldMutationVariables) => fetcher<CreateKnowledgeFieldMutation, CreateKnowledgeFieldMutationVariables>(client, CreateKnowledgeFieldDocument, variables, headers)(),
      options
    );
export const UpdateKnowledgeFieldDocument = `
    mutation updateKnowledgeField($id: Int!, $sort: Int!, $name: String!, $name_en: String) {
  upsertKnowledgeField(
    input: {id: $id, sort: $sort, name: $name, name_en: $name_en}
  ) {
    ...allKnowledgeAreasFields
  }
}
    ${AllKnowledgeAreasFieldsFragmentDoc}`;
export const useUpdateKnowledgeFieldMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateKnowledgeFieldMutation, TError, UpdateKnowledgeFieldMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateKnowledgeFieldMutation, TError, UpdateKnowledgeFieldMutationVariables, TContext>(
      ['updateKnowledgeField'],
      (variables?: UpdateKnowledgeFieldMutationVariables) => fetcher<UpdateKnowledgeFieldMutation, UpdateKnowledgeFieldMutationVariables>(client, UpdateKnowledgeFieldDocument, variables, headers)(),
      options
    );
export const DeleteKnowledgeFieldDocument = `
    mutation deleteKnowledgeField($id: Int!) {
  deleteKnowledgeField(id: $id) {
    sort
    name
  }
}
    `;
export const useDeleteKnowledgeFieldMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteKnowledgeFieldMutation, TError, DeleteKnowledgeFieldMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteKnowledgeFieldMutation, TError, DeleteKnowledgeFieldMutationVariables, TContext>(
      ['deleteKnowledgeField'],
      (variables?: DeleteKnowledgeFieldMutationVariables) => fetcher<DeleteKnowledgeFieldMutation, DeleteKnowledgeFieldMutationVariables>(client, DeleteKnowledgeFieldDocument, variables, headers)(),
      options
    );
export const LinkedDocumentByIdDocument = `
    query linkedDocumentById($id: Int!) {
  linkedDocumentById(id: $id) {
    ...allLinkedDocumentFields
  }
}
    ${AllLinkedDocumentFieldsFragmentDoc}`;
export const useLinkedDocumentByIdQuery = <
      TData = LinkedDocumentByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: LinkedDocumentByIdQueryVariables,
      options?: UseQueryOptions<LinkedDocumentByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LinkedDocumentByIdQuery, TError, TData>(
      ['linkedDocumentById', variables],
      fetcher<LinkedDocumentByIdQuery, LinkedDocumentByIdQueryVariables>(client, LinkedDocumentByIdDocument, variables, headers),
      options
    );
export const LinkedDocumentsDocument = `
    query linkedDocuments($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  linkedDocuments(orderBy: $orderBy, filter: $filter) {
    ...allLinkedDocumentFields
  }
}
    ${AllLinkedDocumentFieldsFragmentDoc}`;
export const useLinkedDocumentsQuery = <
      TData = LinkedDocumentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: LinkedDocumentsQueryVariables,
      options?: UseQueryOptions<LinkedDocumentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LinkedDocumentsQuery, TError, TData>(
      variables === undefined ? ['linkedDocuments'] : ['linkedDocuments', variables],
      fetcher<LinkedDocumentsQuery, LinkedDocumentsQueryVariables>(client, LinkedDocumentsDocument, variables, headers),
      options
    );
export const CreateLinkedDocumentDocument = `
    mutation createLinkedDocument($input: LinkedDocumentInput!) {
  createLinkedDocument: upsertLinkedDocument(input: $input) {
    ...allLinkedDocumentFields
  }
}
    ${AllLinkedDocumentFieldsFragmentDoc}`;
export const useCreateLinkedDocumentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateLinkedDocumentMutation, TError, CreateLinkedDocumentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateLinkedDocumentMutation, TError, CreateLinkedDocumentMutationVariables, TContext>(
      ['createLinkedDocument'],
      (variables?: CreateLinkedDocumentMutationVariables) => fetcher<CreateLinkedDocumentMutation, CreateLinkedDocumentMutationVariables>(client, CreateLinkedDocumentDocument, variables, headers)(),
      options
    );
export const UpdateLinkedDocumentDocument = `
    mutation updateLinkedDocument($input: LinkedDocumentInput!) {
  upsertLinkedDocument(input: $input) {
    ...allLinkedDocumentFields
  }
}
    ${AllLinkedDocumentFieldsFragmentDoc}`;
export const useUpdateLinkedDocumentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateLinkedDocumentMutation, TError, UpdateLinkedDocumentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateLinkedDocumentMutation, TError, UpdateLinkedDocumentMutationVariables, TContext>(
      ['updateLinkedDocument'],
      (variables?: UpdateLinkedDocumentMutationVariables) => fetcher<UpdateLinkedDocumentMutation, UpdateLinkedDocumentMutationVariables>(client, UpdateLinkedDocumentDocument, variables, headers)(),
      options
    );
export const DeleteLinkedDocumentDocument = `
    mutation deleteLinkedDocument($id: Int!) {
  deleteLinkedDocument(id: $id) {
    id
  }
}
    `;
export const useDeleteLinkedDocumentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteLinkedDocumentMutation, TError, DeleteLinkedDocumentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteLinkedDocumentMutation, TError, DeleteLinkedDocumentMutationVariables, TContext>(
      ['deleteLinkedDocument'],
      (variables?: DeleteLinkedDocumentMutationVariables) => fetcher<DeleteLinkedDocumentMutation, DeleteLinkedDocumentMutationVariables>(client, DeleteLinkedDocumentDocument, variables, headers)(),
      options
    );
export const MapObjectByIdDocument = `
    query mapObjectById($id: Int!) {
  mapObjectById(id: $id) {
    ...allMapObjectsFields
  }
}
    ${AllMapObjectsFieldsFragmentDoc}`;
export const useMapObjectByIdQuery = <
      TData = MapObjectByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: MapObjectByIdQueryVariables,
      options?: UseQueryOptions<MapObjectByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MapObjectByIdQuery, TError, TData>(
      ['mapObjectById', variables],
      fetcher<MapObjectByIdQuery, MapObjectByIdQueryVariables>(client, MapObjectByIdDocument, variables, headers),
      options
    );
export const MapObjectsDocument = `
    query mapObjects($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  mapObjects(orderBy: $orderBy, filter: $filter) {
    ...allMapObjectsFields
  }
}
    ${AllMapObjectsFieldsFragmentDoc}`;
export const useMapObjectsQuery = <
      TData = MapObjectsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MapObjectsQueryVariables,
      options?: UseQueryOptions<MapObjectsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MapObjectsQuery, TError, TData>(
      variables === undefined ? ['mapObjects'] : ['mapObjects', variables],
      fetcher<MapObjectsQuery, MapObjectsQueryVariables>(client, MapObjectsDocument, variables, headers),
      options
    );
export const UpdateMapObjectDocument = `
    mutation updateMapObject($input: MapObjectInput!) {
  upsertMapObject(input: $input) {
    ...allMapObjectsFields
  }
}
    ${AllMapObjectsFieldsFragmentDoc}`;
export const useUpdateMapObjectMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateMapObjectMutation, TError, UpdateMapObjectMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateMapObjectMutation, TError, UpdateMapObjectMutationVariables, TContext>(
      ['updateMapObject'],
      (variables?: UpdateMapObjectMutationVariables) => fetcher<UpdateMapObjectMutation, UpdateMapObjectMutationVariables>(client, UpdateMapObjectDocument, variables, headers)(),
      options
    );
export const DeleteMapObjectDocument = `
    mutation deleteMapObject($id: Int!) {
  deleteMapObject(id: $id) {
    id
  }
}
    `;
export const useDeleteMapObjectMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteMapObjectMutation, TError, DeleteMapObjectMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteMapObjectMutation, TError, DeleteMapObjectMutationVariables, TContext>(
      ['deleteMapObject'],
      (variables?: DeleteMapObjectMutationVariables) => fetcher<DeleteMapObjectMutation, DeleteMapObjectMutationVariables>(client, DeleteMapObjectDocument, variables, headers)(),
      options
    );
export const NewsByIdDocument = `
    query newsById($id: Int!) {
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
export const AllNewsDocument = `
    query allNews($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  allNewsIds: news(orderBy: $orderBy, filter: $filter, first: 9999, page: 1) {
    data {
      id
    }
  }
}
    `;
export const useAllNewsQuery = <
      TData = AllNewsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AllNewsQueryVariables,
      options?: UseQueryOptions<AllNewsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AllNewsQuery, TError, TData>(
      variables === undefined ? ['allNews'] : ['allNews', variables],
      fetcher<AllNewsQuery, AllNewsQueryVariables>(client, AllNewsDocument, variables, headers),
      options
    );
export const UpdateOnIndexDocument = `
    mutation UpdateOnIndex($id: Int!, $on_index: Boolean!) {
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
export const UpdatePublishedNewsDocument = `
    mutation UpdatePublishedNews($id: Int!, $published: Boolean!) {
  upsertNews(input: {id: $id, published: $published}) {
    id
  }
}
    `;
export const useUpdatePublishedNewsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePublishedNewsMutation, TError, UpdatePublishedNewsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePublishedNewsMutation, TError, UpdatePublishedNewsMutationVariables, TContext>(
      ['UpdatePublishedNews'],
      (variables?: UpdatePublishedNewsMutationVariables) => fetcher<UpdatePublishedNewsMutation, UpdatePublishedNewsMutationVariables>(client, UpdatePublishedNewsDocument, variables, headers)(),
      options
    );
export const CreateNewsDocument = `
    mutation createNews($input: NewsInput!) {
  createNews: upsertNews(input: $input) {
    ...allNewsFields
  }
}
    ${AllNewsFieldsFragmentDoc}`;
export const useCreateNewsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateNewsMutation, TError, CreateNewsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateNewsMutation, TError, CreateNewsMutationVariables, TContext>(
      ['createNews'],
      (variables?: CreateNewsMutationVariables) => fetcher<CreateNewsMutation, CreateNewsMutationVariables>(client, CreateNewsDocument, variables, headers)(),
      options
    );
export const UpdateNewsDocument = `
    mutation updateNews($input: NewsInput!) {
  upsertNews(input: $input) {
    ...allNewsFields
  }
}
    ${AllNewsFieldsFragmentDoc}`;
export const useUpdateNewsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateNewsMutation, TError, UpdateNewsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateNewsMutation, TError, UpdateNewsMutationVariables, TContext>(
      ['updateNews'],
      (variables?: UpdateNewsMutationVariables) => fetcher<UpdateNewsMutation, UpdateNewsMutationVariables>(client, UpdateNewsDocument, variables, headers)(),
      options
    );
export const DeleteNewsDocument = `
    mutation deleteNews($id: Int!) {
  deleteNews(id: $id) {
    id
  }
}
    `;
export const useDeleteNewsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteNewsMutation, TError, DeleteNewsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteNewsMutation, TError, DeleteNewsMutationVariables, TContext>(
      ['deleteNews'],
      (variables?: DeleteNewsMutationVariables) => fetcher<DeleteNewsMutation, DeleteNewsMutationVariables>(client, DeleteNewsDocument, variables, headers)(),
      options
    );
export const NewsCategoryByIdDocument = `
    query newsCategoryById($id: Int!) {
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
export const CreateNewsCategoryDocument = `
    mutation createNewsCategory($sort: Int!, $name: String!, $name_en: String) {
  createNewsCategory: upsertNewsCategory(
    input: {sort: $sort, name: $name, name_en: $name_en}
  ) {
    ...allNewsCategoriesFields
  }
}
    ${AllNewsCategoriesFieldsFragmentDoc}`;
export const useCreateNewsCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateNewsCategoryMutation, TError, CreateNewsCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateNewsCategoryMutation, TError, CreateNewsCategoryMutationVariables, TContext>(
      ['createNewsCategory'],
      (variables?: CreateNewsCategoryMutationVariables) => fetcher<CreateNewsCategoryMutation, CreateNewsCategoryMutationVariables>(client, CreateNewsCategoryDocument, variables, headers)(),
      options
    );
export const UpdateNewsCategoryDocument = `
    mutation updateNewsCategory($id: Int!, $sort: Int!, $name: String!, $name_en: String) {
  upsertNewsCategory(
    input: {id: $id, sort: $sort, name: $name, name_en: $name_en}
  ) {
    ...allNewsCategoriesFields
  }
}
    ${AllNewsCategoriesFieldsFragmentDoc}`;
export const useUpdateNewsCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateNewsCategoryMutation, TError, UpdateNewsCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateNewsCategoryMutation, TError, UpdateNewsCategoryMutationVariables, TContext>(
      ['updateNewsCategory'],
      (variables?: UpdateNewsCategoryMutationVariables) => fetcher<UpdateNewsCategoryMutation, UpdateNewsCategoryMutationVariables>(client, UpdateNewsCategoryDocument, variables, headers)(),
      options
    );
export const DeleteNewsCategoryDocument = `
    mutation deleteNewsCategory($id: Int!) {
  deleteNewsCategory(id: $id) {
    sort
    name
  }
}
    `;
export const useDeleteNewsCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteNewsCategoryMutation, TError, DeleteNewsCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteNewsCategoryMutation, TError, DeleteNewsCategoryMutationVariables, TContext>(
      ['deleteNewsCategory'],
      (variables?: DeleteNewsCategoryMutationVariables) => fetcher<DeleteNewsCategoryMutation, DeleteNewsCategoryMutationVariables>(client, DeleteNewsCategoryDocument, variables, headers)(),
      options
    );
export const NewsTagByIdDocument = `
    query newsTagById($id: Int!) {
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
export const CreateNewsTagDocument = `
    mutation createNewsTag($sort: Int!, $name: String!, $name_en: String) {
  createNewsTag: upsertNewsTag(
    input: {sort: $sort, name: $name, name_en: $name_en}
  ) {
    ...allNewsTagsFields
  }
}
    ${AllNewsTagsFieldsFragmentDoc}`;
export const useCreateNewsTagMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateNewsTagMutation, TError, CreateNewsTagMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateNewsTagMutation, TError, CreateNewsTagMutationVariables, TContext>(
      ['createNewsTag'],
      (variables?: CreateNewsTagMutationVariables) => fetcher<CreateNewsTagMutation, CreateNewsTagMutationVariables>(client, CreateNewsTagDocument, variables, headers)(),
      options
    );
export const UpdateNewsTagDocument = `
    mutation updateNewsTag($id: Int!, $sort: Int!, $name: String!, $name_en: String) {
  upsertNewsTag(input: {id: $id, sort: $sort, name: $name, name_en: $name_en}) {
    ...allNewsTagsFields
  }
}
    ${AllNewsTagsFieldsFragmentDoc}`;
export const useUpdateNewsTagMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateNewsTagMutation, TError, UpdateNewsTagMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateNewsTagMutation, TError, UpdateNewsTagMutationVariables, TContext>(
      ['updateNewsTag'],
      (variables?: UpdateNewsTagMutationVariables) => fetcher<UpdateNewsTagMutation, UpdateNewsTagMutationVariables>(client, UpdateNewsTagDocument, variables, headers)(),
      options
    );
export const DeleteNewsTagDocument = `
    mutation deleteNewsTag($id: Int!) {
  deleteNewsTag(id: $id) {
    sort
    name
  }
}
    `;
export const useDeleteNewsTagMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteNewsTagMutation, TError, DeleteNewsTagMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteNewsTagMutation, TError, DeleteNewsTagMutationVariables, TContext>(
      ['deleteNewsTag'],
      (variables?: DeleteNewsTagMutationVariables) => fetcher<DeleteNewsTagMutation, DeleteNewsTagMutationVariables>(client, DeleteNewsTagDocument, variables, headers)(),
      options
    );
export const OrganizerByIdDocument = `
    query organizerById($id: Int!) {
  organizerById(id: $id) {
    ...allOrganizerFields
  }
}
    ${AllOrganizerFieldsFragmentDoc}`;
export const useOrganizerByIdQuery = <
      TData = OrganizerByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: OrganizerByIdQueryVariables,
      options?: UseQueryOptions<OrganizerByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<OrganizerByIdQuery, TError, TData>(
      ['organizerById', variables],
      fetcher<OrganizerByIdQuery, OrganizerByIdQueryVariables>(client, OrganizerByIdDocument, variables, headers),
      options
    );
export const OrganizersDocument = `
    query organizers($orderBy: [OrderByClause!]) {
  organizers(orderBy: $orderBy) {
    ...allOrganizerFields
  }
}
    ${AllOrganizerFieldsFragmentDoc}`;
export const useOrganizersQuery = <
      TData = OrganizersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: OrganizersQueryVariables,
      options?: UseQueryOptions<OrganizersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<OrganizersQuery, TError, TData>(
      variables === undefined ? ['organizers'] : ['organizers', variables],
      fetcher<OrganizersQuery, OrganizersQueryVariables>(client, OrganizersDocument, variables, headers),
      options
    );
export const CreateOrganizerDocument = `
    mutation createOrganizer($input: OrganizerInput!) {
  createOrganizer: upsertOrganizer(input: $input) {
    ...allOrganizerFields
  }
}
    ${AllOrganizerFieldsFragmentDoc}`;
export const useCreateOrganizerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateOrganizerMutation, TError, CreateOrganizerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateOrganizerMutation, TError, CreateOrganizerMutationVariables, TContext>(
      ['createOrganizer'],
      (variables?: CreateOrganizerMutationVariables) => fetcher<CreateOrganizerMutation, CreateOrganizerMutationVariables>(client, CreateOrganizerDocument, variables, headers)(),
      options
    );
export const UpdateOrganizerDocument = `
    mutation updateOrganizer($input: OrganizerInput!) {
  upsertOrganizer(input: $input) {
    ...allOrganizerFields
  }
}
    ${AllOrganizerFieldsFragmentDoc}`;
export const useUpdateOrganizerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateOrganizerMutation, TError, UpdateOrganizerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateOrganizerMutation, TError, UpdateOrganizerMutationVariables, TContext>(
      ['updateOrganizer'],
      (variables?: UpdateOrganizerMutationVariables) => fetcher<UpdateOrganizerMutation, UpdateOrganizerMutationVariables>(client, UpdateOrganizerDocument, variables, headers)(),
      options
    );
export const DeleteOrganizerDocument = `
    mutation deleteOrganizer($id: Int!) {
  deleteOrganizer(id: $id) {
    id
  }
}
    `;
export const useDeleteOrganizerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteOrganizerMutation, TError, DeleteOrganizerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteOrganizerMutation, TError, DeleteOrganizerMutationVariables, TContext>(
      ['deleteOrganizer'],
      (variables?: DeleteOrganizerMutationVariables) => fetcher<DeleteOrganizerMutation, DeleteOrganizerMutationVariables>(client, DeleteOrganizerDocument, variables, headers)(),
      options
    );
export const PageByIdDocument = `
    query pageById($id: Int!) {
  pageById(id: $id) {
    ...allPageFields
  }
}
    ${AllPageFieldsFragmentDoc}`;
export const usePageByIdQuery = <
      TData = PageByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PageByIdQueryVariables,
      options?: UseQueryOptions<PageByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PageByIdQuery, TError, TData>(
      ['pageById', variables],
      fetcher<PageByIdQuery, PageByIdQueryVariables>(client, PageByIdDocument, variables, headers),
      options
    );
export const PageBySlugDocument = `
    query pageBySlug($slug: String!) {
  pageBySlug(slug: $slug) {
    ...allPageFields
  }
}
    ${AllPageFieldsFragmentDoc}`;
export const usePageBySlugQuery = <
      TData = PageBySlugQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PageBySlugQueryVariables,
      options?: UseQueryOptions<PageBySlugQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PageBySlugQuery, TError, TData>(
      ['pageBySlug', variables],
      fetcher<PageBySlugQuery, PageBySlugQueryVariables>(client, PageBySlugDocument, variables, headers),
      options
    );
export const PagesDocument = `
    query pages($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  pages(orderBy: $orderBy, filter: $filter) {
    id
    name
    description
    imageUrl
    slug
  }
}
    `;
export const usePagesQuery = <
      TData = PagesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PagesQueryVariables,
      options?: UseQueryOptions<PagesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PagesQuery, TError, TData>(
      variables === undefined ? ['pages'] : ['pages', variables],
      fetcher<PagesQuery, PagesQueryVariables>(client, PagesDocument, variables, headers),
      options
    );
export const PagesTreeDocument = `
    query pagesTree($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  pages(orderBy: $orderBy, filter: $filter) {
    id
    name
    parent_id
    slug
    sort
    children {
      id
    }
  }
}
    `;
export const usePagesTreeQuery = <
      TData = PagesTreeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PagesTreeQueryVariables,
      options?: UseQueryOptions<PagesTreeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PagesTreeQuery, TError, TData>(
      variables === undefined ? ['pagesTree'] : ['pagesTree', variables],
      fetcher<PagesTreeQuery, PagesTreeQueryVariables>(client, PagesTreeDocument, variables, headers),
      options
    );
export const UpdatePageDocument = `
    mutation updatePage($input: PageInput!) {
  upsertPage(input: $input) {
    ...allPageFields
  }
}
    ${AllPageFieldsFragmentDoc}`;
export const useUpdatePageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePageMutation, TError, UpdatePageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePageMutation, TError, UpdatePageMutationVariables, TContext>(
      ['updatePage'],
      (variables?: UpdatePageMutationVariables) => fetcher<UpdatePageMutation, UpdatePageMutationVariables>(client, UpdatePageDocument, variables, headers)(),
      options
    );
export const UpdatePageParentDocument = `
    mutation updatePageParent($id: Int!, $parent_id: Int!) {
  upsertPage(input: {id: $id, parent_id: $parent_id}) {
    id
  }
}
    `;
export const useUpdatePageParentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePageParentMutation, TError, UpdatePageParentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePageParentMutation, TError, UpdatePageParentMutationVariables, TContext>(
      ['updatePageParent'],
      (variables?: UpdatePageParentMutationVariables) => fetcher<UpdatePageParentMutation, UpdatePageParentMutationVariables>(client, UpdatePageParentDocument, variables, headers)(),
      options
    );
export const PartnerByIdDocument = `
    query partnerById($id: Int!) {
  partnerById(id: $id) {
    ...allPartnerFields
  }
}
    ${AllPartnerFieldsFragmentDoc}`;
export const usePartnerByIdQuery = <
      TData = PartnerByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PartnerByIdQueryVariables,
      options?: UseQueryOptions<PartnerByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PartnerByIdQuery, TError, TData>(
      ['partnerById', variables],
      fetcher<PartnerByIdQuery, PartnerByIdQueryVariables>(client, PartnerByIdDocument, variables, headers),
      options
    );
export const PartnersDocument = `
    query partners($orderBy: [OrderByClause!]) {
  partners(orderBy: $orderBy) {
    ...allPartnerFields
  }
}
    ${AllPartnerFieldsFragmentDoc}`;
export const usePartnersQuery = <
      TData = PartnersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PartnersQueryVariables,
      options?: UseQueryOptions<PartnersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PartnersQuery, TError, TData>(
      variables === undefined ? ['partners'] : ['partners', variables],
      fetcher<PartnersQuery, PartnersQueryVariables>(client, PartnersDocument, variables, headers),
      options
    );
export const CreatePartnerDocument = `
    mutation createPartner($input: PartnerInput!) {
  createPartner: upsertPartner(input: $input) {
    ...allPartnerFields
  }
}
    ${AllPartnerFieldsFragmentDoc}`;
export const useCreatePartnerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePartnerMutation, TError, CreatePartnerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePartnerMutation, TError, CreatePartnerMutationVariables, TContext>(
      ['createPartner'],
      (variables?: CreatePartnerMutationVariables) => fetcher<CreatePartnerMutation, CreatePartnerMutationVariables>(client, CreatePartnerDocument, variables, headers)(),
      options
    );
export const UpdatePartnerDocument = `
    mutation updatePartner($input: PartnerInput!) {
  upsertPartner(input: $input) {
    ...allPartnerFields
  }
}
    ${AllPartnerFieldsFragmentDoc}`;
export const useUpdatePartnerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePartnerMutation, TError, UpdatePartnerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePartnerMutation, TError, UpdatePartnerMutationVariables, TContext>(
      ['updatePartner'],
      (variables?: UpdatePartnerMutationVariables) => fetcher<UpdatePartnerMutation, UpdatePartnerMutationVariables>(client, UpdatePartnerDocument, variables, headers)(),
      options
    );
export const DeletePartnerDocument = `
    mutation deletePartner($id: Int!) {
  deletePartner(id: $id) {
    id
  }
}
    `;
export const useDeletePartnerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePartnerMutation, TError, DeletePartnerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePartnerMutation, TError, DeletePartnerMutationVariables, TContext>(
      ['deletePartner'],
      (variables?: DeletePartnerMutationVariables) => fetcher<DeletePartnerMutation, DeletePartnerMutationVariables>(client, DeletePartnerDocument, variables, headers)(),
      options
    );
export const ProjectByIdDocument = `
    query projectById($id: Int!) {
  projectById(id: $id) {
    ...allProjectsFields
  }
}
    ${AllProjectsFieldsFragmentDoc}`;
export const useProjectByIdQuery = <
      TData = ProjectByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ProjectByIdQueryVariables,
      options?: UseQueryOptions<ProjectByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProjectByIdQuery, TError, TData>(
      ['projectById', variables],
      fetcher<ProjectByIdQuery, ProjectByIdQueryVariables>(client, ProjectByIdDocument, variables, headers),
      options
    );
export const ProjectsDocument = `
    query projects($orderBy: [QueryProjectsOrderByRelationOrderByClause!], $filter: [FilterByClause!], $first: Int = 30, $page: Int) {
  projects(orderBy: $orderBy, filter: $filter, first: $first, page: $page) {
    paginatorInfo {
      lastPage
      total
      perPage
    }
    data {
      ...allProjectsFields
    }
  }
}
    ${AllProjectsFieldsFragmentDoc}`;
export const useProjectsQuery = <
      TData = ProjectsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ProjectsQueryVariables,
      options?: UseQueryOptions<ProjectsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProjectsQuery, TError, TData>(
      variables === undefined ? ['projects'] : ['projects', variables],
      fetcher<ProjectsQuery, ProjectsQueryVariables>(client, ProjectsDocument, variables, headers),
      options
    );
export const CreateProjectDocument = `
    mutation createProject($input: ProjectInput!) {
  createProject: upsertProject(input: $input) {
    ...allProjectsFields
  }
}
    ${AllProjectsFieldsFragmentDoc}`;
export const useCreateProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateProjectMutation, TError, CreateProjectMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateProjectMutation, TError, CreateProjectMutationVariables, TContext>(
      ['createProject'],
      (variables?: CreateProjectMutationVariables) => fetcher<CreateProjectMutation, CreateProjectMutationVariables>(client, CreateProjectDocument, variables, headers)(),
      options
    );
export const UpdateProjectDocument = `
    mutation updateProject($input: ProjectInput!) {
  upsertProject(input: $input) {
    ...allProjectsFields
  }
}
    ${AllProjectsFieldsFragmentDoc}`;
export const useUpdateProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateProjectMutation, TError, UpdateProjectMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateProjectMutation, TError, UpdateProjectMutationVariables, TContext>(
      ['updateProject'],
      (variables?: UpdateProjectMutationVariables) => fetcher<UpdateProjectMutation, UpdateProjectMutationVariables>(client, UpdateProjectDocument, variables, headers)(),
      options
    );
export const DeleteProjectDocument = `
    mutation deleteProject($id: Int!) {
  deleteProject(id: $id) {
    id
  }
}
    `;
export const useDeleteProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteProjectMutation, TError, DeleteProjectMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteProjectMutation, TError, DeleteProjectMutationVariables, TContext>(
      ['deleteProject'],
      (variables?: DeleteProjectMutationVariables) => fetcher<DeleteProjectMutation, DeleteProjectMutationVariables>(client, DeleteProjectDocument, variables, headers)(),
      options
    );
export const PurchaseByIdDocument = `
    query purchaseById($id: Int!) {
  purchaseById(id: $id) {
    ...allPurchasesFields
  }
}
    ${AllPurchasesFieldsFragmentDoc}`;
export const usePurchaseByIdQuery = <
      TData = PurchaseByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PurchaseByIdQueryVariables,
      options?: UseQueryOptions<PurchaseByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PurchaseByIdQuery, TError, TData>(
      ['purchaseById', variables],
      fetcher<PurchaseByIdQuery, PurchaseByIdQueryVariables>(client, PurchaseByIdDocument, variables, headers),
      options
    );
export const PurchasesDocument = `
    query purchases($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  purchases(orderBy: $orderBy, filter: $filter) {
    ...allPurchasesFields
  }
}
    ${AllPurchasesFieldsFragmentDoc}`;
export const usePurchasesQuery = <
      TData = PurchasesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PurchasesQueryVariables,
      options?: UseQueryOptions<PurchasesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PurchasesQuery, TError, TData>(
      variables === undefined ? ['purchases'] : ['purchases', variables],
      fetcher<PurchasesQuery, PurchasesQueryVariables>(client, PurchasesDocument, variables, headers),
      options
    );
export const UpdatePurchasePublishedDocument = `
    mutation updatePurchasePublished($id: Int!, $published: Boolean!) {
  upsertPurchase(input: {id: $id, published: $published}) {
    id
  }
}
    `;
export const useUpdatePurchasePublishedMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePurchasePublishedMutation, TError, UpdatePurchasePublishedMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePurchasePublishedMutation, TError, UpdatePurchasePublishedMutationVariables, TContext>(
      ['updatePurchasePublished'],
      (variables?: UpdatePurchasePublishedMutationVariables) => fetcher<UpdatePurchasePublishedMutation, UpdatePurchasePublishedMutationVariables>(client, UpdatePurchasePublishedDocument, variables, headers)(),
      options
    );
export const CreatePurchaseDocument = `
    mutation createPurchase($input: PurchaseInput!) {
  createPurchase: upsertPurchase(input: $input) {
    ...allPurchasesFields
  }
}
    ${AllPurchasesFieldsFragmentDoc}`;
export const useCreatePurchaseMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePurchaseMutation, TError, CreatePurchaseMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePurchaseMutation, TError, CreatePurchaseMutationVariables, TContext>(
      ['createPurchase'],
      (variables?: CreatePurchaseMutationVariables) => fetcher<CreatePurchaseMutation, CreatePurchaseMutationVariables>(client, CreatePurchaseDocument, variables, headers)(),
      options
    );
export const UpdatePurchaseDocument = `
    mutation updatePurchase($input: PurchaseInput!) {
  upsertPurchase(input: $input) {
    ...allPurchasesFields
  }
}
    ${AllPurchasesFieldsFragmentDoc}`;
export const useUpdatePurchaseMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePurchaseMutation, TError, UpdatePurchaseMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePurchaseMutation, TError, UpdatePurchaseMutationVariables, TContext>(
      ['updatePurchase'],
      (variables?: UpdatePurchaseMutationVariables) => fetcher<UpdatePurchaseMutation, UpdatePurchaseMutationVariables>(client, UpdatePurchaseDocument, variables, headers)(),
      options
    );
export const DeletePurchaseDocument = `
    mutation deletePurchase($id: Int!) {
  deletePurchase(id: $id) {
    id
  }
}
    `;
export const useDeletePurchaseMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePurchaseMutation, TError, DeletePurchaseMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePurchaseMutation, TError, DeletePurchaseMutationVariables, TContext>(
      ['deletePurchase'],
      (variables?: DeletePurchaseMutationVariables) => fetcher<DeletePurchaseMutation, DeletePurchaseMutationVariables>(client, DeletePurchaseDocument, variables, headers)(),
      options
    );
export const ReportByIdDocument = `
    query reportById($id: Int!) {
  reportById(id: $id) {
    ...allReportsFields
  }
}
    ${AllReportsFieldsFragmentDoc}`;
export const useReportByIdQuery = <
      TData = ReportByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ReportByIdQueryVariables,
      options?: UseQueryOptions<ReportByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ReportByIdQuery, TError, TData>(
      ['reportById', variables],
      fetcher<ReportByIdQuery, ReportByIdQueryVariables>(client, ReportByIdDocument, variables, headers),
      options
    );
export const ReportsDocument = `
    query reports($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  reports(orderBy: $orderBy, filter: $filter) {
    ...allReportsFields
  }
}
    ${AllReportsFieldsFragmentDoc}`;
export const useReportsQuery = <
      TData = ReportsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ReportsQueryVariables,
      options?: UseQueryOptions<ReportsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ReportsQuery, TError, TData>(
      variables === undefined ? ['reports'] : ['reports', variables],
      fetcher<ReportsQuery, ReportsQueryVariables>(client, ReportsDocument, variables, headers),
      options
    );
export const CreateReportDocument = `
    mutation createReport($input: ReportInput!) {
  createReport: upsertReport(input: $input) {
    ...allReportsFields
  }
}
    ${AllReportsFieldsFragmentDoc}`;
export const useCreateReportMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateReportMutation, TError, CreateReportMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateReportMutation, TError, CreateReportMutationVariables, TContext>(
      ['createReport'],
      (variables?: CreateReportMutationVariables) => fetcher<CreateReportMutation, CreateReportMutationVariables>(client, CreateReportDocument, variables, headers)(),
      options
    );
export const UpdateReportDocument = `
    mutation updateReport($input: ReportInput!) {
  upsertReport(input: $input) {
    ...allReportsFields
  }
}
    ${AllReportsFieldsFragmentDoc}`;
export const useUpdateReportMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateReportMutation, TError, UpdateReportMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateReportMutation, TError, UpdateReportMutationVariables, TContext>(
      ['updateReport'],
      (variables?: UpdateReportMutationVariables) => fetcher<UpdateReportMutation, UpdateReportMutationVariables>(client, UpdateReportDocument, variables, headers)(),
      options
    );
export const DeleteReportDocument = `
    mutation deleteReport($id: Int!) {
  deleteReport(id: $id) {
    id
  }
}
    `;
export const useDeleteReportMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteReportMutation, TError, DeleteReportMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteReportMutation, TError, DeleteReportMutationVariables, TContext>(
      ['deleteReport'],
      (variables?: DeleteReportMutationVariables) => fetcher<DeleteReportMutation, DeleteReportMutationVariables>(client, DeleteReportDocument, variables, headers)(),
      options
    );
export const SettingByIdDocument = `
    query settingById($id: Int!) {
  settingById(id: $id) {
    ...allSettingsFields
  }
}
    ${AllSettingsFieldsFragmentDoc}`;
export const useSettingByIdQuery = <
      TData = SettingByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SettingByIdQueryVariables,
      options?: UseQueryOptions<SettingByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SettingByIdQuery, TError, TData>(
      ['settingById', variables],
      fetcher<SettingByIdQuery, SettingByIdQueryVariables>(client, SettingByIdDocument, variables, headers),
      options
    );
export const SettingByNameDocument = `
    query settingByName($name: String!) {
  settingByName(name: $name) {
    ...allSettingsFields
  }
}
    ${AllSettingsFieldsFragmentDoc}`;
export const useSettingByNameQuery = <
      TData = SettingByNameQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SettingByNameQueryVariables,
      options?: UseQueryOptions<SettingByNameQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SettingByNameQuery, TError, TData>(
      ['settingByName', variables],
      fetcher<SettingByNameQuery, SettingByNameQueryVariables>(client, SettingByNameDocument, variables, headers),
      options
    );
export const SettingsDocument = `
    query settings($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  settings(orderBy: $orderBy, filter: $filter) {
    ...allSettingsFields
  }
}
    ${AllSettingsFieldsFragmentDoc}`;
export const useSettingsQuery = <
      TData = SettingsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: SettingsQueryVariables,
      options?: UseQueryOptions<SettingsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SettingsQuery, TError, TData>(
      variables === undefined ? ['settings'] : ['settings', variables],
      fetcher<SettingsQuery, SettingsQueryVariables>(client, SettingsDocument, variables, headers),
      options
    );
export const UpdateSettingsDocument = `
    mutation updateSettings($schedule: String, $phone: String, $address: String, $email: String, $emailPress: String, $send_email_notify: String, $content_editor: String, $vk: String, $facebook: String, $telegram: String, $instagram: String, $whatsapp: String) {
  phone: upsertSetting(input: {id: 1, name: "phone", value: $phone}) {
    ...allSettingsFields
  }
  email: upsertSetting(input: {id: 2, name: "email", value: $email}) {
    ...allSettingsFields
  }
  emailPress: upsertSetting(
    input: {id: 3, name: "emailPress", value: $emailPress}
  ) {
    ...allSettingsFields
  }
  address: upsertSetting(input: {id: 4, name: "address", value: $address}) {
    ...allSettingsFields
  }
  schedule: upsertSetting(input: {id: 5, name: "schedule", value: $schedule}) {
    ...allSettingsFields
  }
  send_email_notify: upsertSetting(
    input: {id: 6, name: "send_email_notify", value: $send_email_notify}
  ) {
    ...allSettingsFields
  }
  content_editor: upsertSetting(
    input: {id: 7, name: "content_editor", value: $content_editor}
  ) {
    ...allSettingsFields
  }
  vk: upsertSetting(input: {id: 8, name: "vk", value: $vk}) {
    ...allSettingsFields
  }
  facebook: upsertSetting(input: {id: 9, name: "facebook", value: $facebook}) {
    ...allSettingsFields
  }
  telegram: upsertSetting(input: {id: 10, name: "telegram", value: $telegram}) {
    ...allSettingsFields
  }
  instagram: upsertSetting(input: {id: 11, name: "instagram", value: $instagram}) {
    ...allSettingsFields
  }
  whatsapp: upsertSetting(input: {id: 12, name: "whatsapp", value: $whatsapp}) {
    ...allSettingsFields
  }
}
    ${AllSettingsFieldsFragmentDoc}`;
export const useUpdateSettingsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateSettingsMutation, TError, UpdateSettingsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateSettingsMutation, TError, UpdateSettingsMutationVariables, TContext>(
      ['updateSettings'],
      (variables?: UpdateSettingsMutationVariables) => fetcher<UpdateSettingsMutation, UpdateSettingsMutationVariables>(client, UpdateSettingsDocument, variables, headers)(),
      options
    );
export const StaffControlByIdDocument = `
    query staffControlById($id: Int!) {
  staffControlById(id: $id) {
    ...allFields
  }
}
    ${AllFieldsFragmentDoc}`;
export const useStaffControlByIdQuery = <
      TData = StaffControlByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: StaffControlByIdQueryVariables,
      options?: UseQueryOptions<StaffControlByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<StaffControlByIdQuery, TError, TData>(
      ['staffControlById', variables],
      fetcher<StaffControlByIdQuery, StaffControlByIdQueryVariables>(client, StaffControlByIdDocument, variables, headers),
      options
    );
export const StaffControlsDocument = `
    query staffControls($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  staffControls(orderBy: $orderBy, filter: $filter) {
    ...allFields
  }
}
    ${AllFieldsFragmentDoc}`;
export const useStaffControlsQuery = <
      TData = StaffControlsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: StaffControlsQueryVariables,
      options?: UseQueryOptions<StaffControlsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<StaffControlsQuery, TError, TData>(
      variables === undefined ? ['staffControls'] : ['staffControls', variables],
      fetcher<StaffControlsQuery, StaffControlsQueryVariables>(client, StaffControlsDocument, variables, headers),
      options
    );
export const CreateStaffControlDocument = `
    mutation createStaffControl($input: StaffControlInput!) {
  createStaffControl: upsertStaffControl(input: $input) {
    ...allFields
  }
}
    ${AllFieldsFragmentDoc}`;
export const useCreateStaffControlMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateStaffControlMutation, TError, CreateStaffControlMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateStaffControlMutation, TError, CreateStaffControlMutationVariables, TContext>(
      ['createStaffControl'],
      (variables?: CreateStaffControlMutationVariables) => fetcher<CreateStaffControlMutation, CreateStaffControlMutationVariables>(client, CreateStaffControlDocument, variables, headers)(),
      options
    );
export const UpdateStaffControlDocument = `
    mutation updateStaffControl($input: StaffControlInput!) {
  upsertStaffControl(input: $input) {
    ...allFields
  }
}
    ${AllFieldsFragmentDoc}`;
export const useUpdateStaffControlMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateStaffControlMutation, TError, UpdateStaffControlMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateStaffControlMutation, TError, UpdateStaffControlMutationVariables, TContext>(
      ['updateStaffControl'],
      (variables?: UpdateStaffControlMutationVariables) => fetcher<UpdateStaffControlMutation, UpdateStaffControlMutationVariables>(client, UpdateStaffControlDocument, variables, headers)(),
      options
    );
export const DeleteStaffControlDocument = `
    mutation deleteStaffControl($id: Int!) {
  deleteStaffControl(id: $id) {
    id
  }
}
    `;
export const useDeleteStaffControlMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteStaffControlMutation, TError, DeleteStaffControlMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteStaffControlMutation, TError, DeleteStaffControlMutationVariables, TContext>(
      ['deleteStaffControl'],
      (variables?: DeleteStaffControlMutationVariables) => fetcher<DeleteStaffControlMutation, DeleteStaffControlMutationVariables>(client, DeleteStaffControlDocument, variables, headers)(),
      options
    );
export const StaffControlItemsDocument = `
    query staffControlItems {
  pages(filter: [{column: "slug", value: "control"}]) {
    name
    children {
      name
      id
    }
  }
}
    `;
export const useStaffControlItemsQuery = <
      TData = StaffControlItemsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: StaffControlItemsQueryVariables,
      options?: UseQueryOptions<StaffControlItemsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<StaffControlItemsQuery, TError, TData>(
      variables === undefined ? ['staffControlItems'] : ['staffControlItems', variables],
      fetcher<StaffControlItemsQuery, StaffControlItemsQueryVariables>(client, StaffControlItemsDocument, variables, headers),
      options
    );
export const SubdivisionByIdDocument = `
    query subdivisionById($id: Int!) {
  subdivisionById(id: $id) {
    ...allSubdivisionsFields
  }
}
    ${AllSubdivisionsFieldsFragmentDoc}`;
export const useSubdivisionByIdQuery = <
      TData = SubdivisionByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SubdivisionByIdQueryVariables,
      options?: UseQueryOptions<SubdivisionByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SubdivisionByIdQuery, TError, TData>(
      ['subdivisionById', variables],
      fetcher<SubdivisionByIdQuery, SubdivisionByIdQueryVariables>(client, SubdivisionByIdDocument, variables, headers),
      options
    );
export const SubdivisionsDocument = `
    query subdivisions($orderBy: [OrderByClause!]) {
  subdivisions(orderBy: $orderBy) {
    ...allSubdivisionsFields
  }
}
    ${AllSubdivisionsFieldsFragmentDoc}`;
export const useSubdivisionsQuery = <
      TData = SubdivisionsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: SubdivisionsQueryVariables,
      options?: UseQueryOptions<SubdivisionsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SubdivisionsQuery, TError, TData>(
      variables === undefined ? ['subdivisions'] : ['subdivisions', variables],
      fetcher<SubdivisionsQuery, SubdivisionsQueryVariables>(client, SubdivisionsDocument, variables, headers),
      options
    );
export const CreateSubdivisionDocument = `
    mutation createSubdivision($sort: Int!, $name: String!) {
  createSubdivision: upsertSubdivision(input: {sort: $sort, name: $name}) {
    ...allSubdivisionsFields
  }
}
    ${AllSubdivisionsFieldsFragmentDoc}`;
export const useCreateSubdivisionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateSubdivisionMutation, TError, CreateSubdivisionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateSubdivisionMutation, TError, CreateSubdivisionMutationVariables, TContext>(
      ['createSubdivision'],
      (variables?: CreateSubdivisionMutationVariables) => fetcher<CreateSubdivisionMutation, CreateSubdivisionMutationVariables>(client, CreateSubdivisionDocument, variables, headers)(),
      options
    );
export const UpdateSubdivisionDocument = `
    mutation updateSubdivision($id: Int!, $sort: Int!, $name: String!) {
  upsertSubdivision(input: {id: $id, sort: $sort, name: $name}) {
    ...allSubdivisionsFields
  }
}
    ${AllSubdivisionsFieldsFragmentDoc}`;
export const useUpdateSubdivisionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateSubdivisionMutation, TError, UpdateSubdivisionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateSubdivisionMutation, TError, UpdateSubdivisionMutationVariables, TContext>(
      ['updateSubdivision'],
      (variables?: UpdateSubdivisionMutationVariables) => fetcher<UpdateSubdivisionMutation, UpdateSubdivisionMutationVariables>(client, UpdateSubdivisionDocument, variables, headers)(),
      options
    );
export const DeleteSubdivisionDocument = `
    mutation deleteSubdivision($id: Int!) {
  deleteSubdivision(id: $id) {
    sort
    name
  }
}
    `;
export const useDeleteSubdivisionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteSubdivisionMutation, TError, DeleteSubdivisionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteSubdivisionMutation, TError, DeleteSubdivisionMutationVariables, TContext>(
      ['deleteSubdivision'],
      (variables?: DeleteSubdivisionMutationVariables) => fetcher<DeleteSubdivisionMutation, DeleteSubdivisionMutationVariables>(client, DeleteSubdivisionDocument, variables, headers)(),
      options
    );
export const UploadDocument = `
    mutation upload($file: Upload!) {
  upload(file: $file)
}
    `;
export const useUploadMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UploadMutation, TError, UploadMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UploadMutation, TError, UploadMutationVariables, TContext>(
      ['upload'],
      (variables?: UploadMutationVariables) => fetcher<UploadMutation, UploadMutationVariables>(client, UploadDocument, variables, headers)(),
      options
    );
export const UserByIdDocument = `
    query userById($id: Int!) {
  userById(id: $id) {
    ...allUsersFields
  }
}
    ${AllUsersFieldsFragmentDoc}`;
export const useUserByIdQuery = <
      TData = UserByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: UserByIdQueryVariables,
      options?: UseQueryOptions<UserByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserByIdQuery, TError, TData>(
      ['userById', variables],
      fetcher<UserByIdQuery, UserByIdQueryVariables>(client, UserByIdDocument, variables, headers),
      options
    );
export const UsersDocument = `
    query users($orderBy: [OrderByClause!], $filter: [FilterByClause!], $first: Int = 30, $page: Int) {
  users(orderBy: $orderBy, filter: $filter, first: $first, page: $page) {
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
export const CreateUserDocument = `
    mutation createUser($input: UserInput!) {
  createUser: upsertUser(input: $input) {
    ...allUsersFields
  }
}
    ${AllUsersFieldsFragmentDoc}`;
export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['createUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(client, CreateUserDocument, variables, headers)(),
      options
    );
export const UpdateUserDocument = `
    mutation updateUser($input: UserInput!) {
  upsertUser(input: $input) {
    ...allUsersFields
  }
}
    ${AllUsersFieldsFragmentDoc}`;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['updateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers)(),
      options
    );
export const DeleteUserDocument = `
    mutation deleteUser($id: Int!) {
  deleteUser(id: $id) {
    id
  }
}
    `;
export const useDeleteUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>(
      ['deleteUser'],
      (variables?: DeleteUserMutationVariables) => fetcher<DeleteUserMutation, DeleteUserMutationVariables>(client, DeleteUserDocument, variables, headers)(),
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
export const VacancyByIdDocument = `
    query vacancyById($id: Int!) {
  vacancyById(id: $id) {
    ...allVacanciesFields
  }
}
    ${AllVacanciesFieldsFragmentDoc}`;
export const useVacancyByIdQuery = <
      TData = VacancyByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: VacancyByIdQueryVariables,
      options?: UseQueryOptions<VacancyByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<VacancyByIdQuery, TError, TData>(
      ['vacancyById', variables],
      fetcher<VacancyByIdQuery, VacancyByIdQueryVariables>(client, VacancyByIdDocument, variables, headers),
      options
    );
export const VacanciesDocument = `
    query vacancies($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
  vacancies(orderBy: $orderBy, filter: $filter) {
    ...allVacanciesFields
  }
}
    ${AllVacanciesFieldsFragmentDoc}`;
export const useVacanciesQuery = <
      TData = VacanciesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: VacanciesQueryVariables,
      options?: UseQueryOptions<VacanciesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<VacanciesQuery, TError, TData>(
      variables === undefined ? ['vacancies'] : ['vacancies', variables],
      fetcher<VacanciesQuery, VacanciesQueryVariables>(client, VacanciesDocument, variables, headers),
      options
    );
export const UpdateVacancyPublishedDocument = `
    mutation UpdateVacancyPublished($id: Int!, $published: Boolean!) {
  upsertVacancy(input: {id: $id, published: $published}) {
    id
  }
}
    `;
export const useUpdateVacancyPublishedMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateVacancyPublishedMutation, TError, UpdateVacancyPublishedMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateVacancyPublishedMutation, TError, UpdateVacancyPublishedMutationVariables, TContext>(
      ['UpdateVacancyPublished'],
      (variables?: UpdateVacancyPublishedMutationVariables) => fetcher<UpdateVacancyPublishedMutation, UpdateVacancyPublishedMutationVariables>(client, UpdateVacancyPublishedDocument, variables, headers)(),
      options
    );
export const CreateVacancyDocument = `
    mutation createVacancy($input: VacancyInput!) {
  createVacancy: upsertVacancy(input: $input) {
    ...allVacanciesFields
  }
}
    ${AllVacanciesFieldsFragmentDoc}`;
export const useCreateVacancyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateVacancyMutation, TError, CreateVacancyMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateVacancyMutation, TError, CreateVacancyMutationVariables, TContext>(
      ['createVacancy'],
      (variables?: CreateVacancyMutationVariables) => fetcher<CreateVacancyMutation, CreateVacancyMutationVariables>(client, CreateVacancyDocument, variables, headers)(),
      options
    );
export const UpdateVacancyDocument = `
    mutation updateVacancy($input: VacancyInput!) {
  upsertVacancy(input: $input) {
    ...allVacanciesFields
  }
}
    ${AllVacanciesFieldsFragmentDoc}`;
export const useUpdateVacancyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateVacancyMutation, TError, UpdateVacancyMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateVacancyMutation, TError, UpdateVacancyMutationVariables, TContext>(
      ['updateVacancy'],
      (variables?: UpdateVacancyMutationVariables) => fetcher<UpdateVacancyMutation, UpdateVacancyMutationVariables>(client, UpdateVacancyDocument, variables, headers)(),
      options
    );
export const DeleteVacancyDocument = `
    mutation deleteVacancy($id: Int!) {
  deleteVacancy(id: $id) {
    id
  }
}
    `;
export const useDeleteVacancyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteVacancyMutation, TError, DeleteVacancyMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteVacancyMutation, TError, DeleteVacancyMutationVariables, TContext>(
      ['deleteVacancy'],
      (variables?: DeleteVacancyMutationVariables) => fetcher<DeleteVacancyMutation, DeleteVacancyMutationVariables>(client, DeleteVacancyDocument, variables, headers)(),
      options
    );