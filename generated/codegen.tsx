import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  text: Scalars['String'];
  postId: Scalars['String'];
  creatorId: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  creator: User;
  post: Post;
  votes: Scalars['Int'];
  voteStatus: Scalars['Int'];
};


export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: User;
  logout: Scalars['Boolean'];
  createSub: Sub;
  joinOrLeave: Scalars['Boolean'];
  createPost: Post;
  editPost: Post;
  deletePost: Scalars['Boolean'];
  createComment: Comment;
  editComment: Comment;
  deleteComment: Scalars['Boolean'];
  votePost: Scalars['Boolean'];
  voteComment: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateSubArgs = {
  input: SubInput;
};


export type MutationJoinOrLeaveArgs = {
  subName: Scalars['String'];
};


export type MutationCreatePostArgs = {
  subName: Scalars['String'];
  input: PostInput;
};


export type MutationEditPostArgs = {
  postId: Scalars['ID'];
  input: PostInput;
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type MutationCreateCommentArgs = {
  postId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationEditCommentArgs = {
  commentId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationVotePostArgs = {
  postId: Scalars['ID'];
  value: Scalars['Int'];
};


export type MutationVoteCommentArgs = {
  commentId: Scalars['ID'];
  value: Scalars['Int'];
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  comments: Array<Comment>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type PaginationInput = {
  take: Scalars['Int'];
  cursor?: Maybe<Scalars['ID']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  creatorId: Scalars['String'];
  subName: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  creator: User;
  sub: Sub;
  votes: Scalars['Int'];
  comments: PaginatedComments;
  voteStatus: Scalars['Int'];
};


export type PostCommentsArgs = {
  input: PaginationInput;
};

export type PostInput = {
  title: Scalars['String'];
  body: Scalars['String'];
  image?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  sub: Sub;
  post: Post;
  feed: PaginatedPosts;
};


export type QuerySubArgs = {
  name: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryFeedArgs = {
  input: PaginationInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Sub = {
  __typename?: 'Sub';
  name: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  members: Scalars['Int'];
  posts: PaginatedPosts;
};


export type SubPostsArgs = {
  input: PaginationInput;
};

export type SubInput = {
  name: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  username: Scalars['String'];
  createdAt: Scalars['Date'];
  posts: PaginatedPosts;
  comments: PaginatedComments;
};


export type UserPostsArgs = {
  input: PaginationInput;
};


export type UserCommentsArgs = {
  input: PaginationInput;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);


export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;