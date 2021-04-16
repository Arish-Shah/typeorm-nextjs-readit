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
  Date: any;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  text: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  voteStatus: Scalars['Int'];
  votes: Scalars['Int'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};


export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: User;
  logout: Scalars['Boolean'];
  joinOrLeave: Scalars['Boolean'];
  createPost: Post;
  deletePost: Scalars['Boolean'];
  editPost: Post;
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
  createSub: Sub;
  editComment: Comment;
  votePost: Scalars['Boolean'];
  voteComment: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationJoinOrLeaveArgs = {
  subName: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
  subName: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type MutationEditPostArgs = {
  input: PostInput;
  postId: Scalars['ID'];
};


export type MutationCreateCommentArgs = {
  postId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationCreateSubArgs = {
  input: SubInput;
};


export type MutationEditCommentArgs = {
  commentId: Scalars['ID'];
  text: Scalars['String'];
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
  comments: PaginatedComments;
  image?: Maybe<Scalars['String']>;
  creator: User;
  creatorId: Scalars['String'];
  sub: Sub;
  subName: Scalars['String'];
  voteStatus: Scalars['Int'];
  votes: Scalars['Int'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
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
  feed: PaginatedPosts;
  sub: Sub;
  post: Post;
};


export type QueryFeedArgs = {
  input: PaginationInput;
};


export type QuerySubArgs = {
  name: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
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
  posts: PaginatedPosts;
  members: Scalars['Int'];
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
  bio?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  posts: PaginatedPosts;
  comments: PaginatedComments;
  createdAt: Scalars['Date'];
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