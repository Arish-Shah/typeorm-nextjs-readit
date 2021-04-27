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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  text: Scalars['String'];
  post?: Maybe<Post>;
  postId: Scalars['ID'];
  creator?: Maybe<User>;
  creatorId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  votes: Scalars['Int'];
  voteStatus: Scalars['Int'];
};


export type Mutation = {
  __typename?: 'Mutation';
  login: User;
  register: User;
  logout: Scalars['Boolean'];
  createSub: Sub;
  joinOrLeave: Scalars['Boolean'];
  createPost: Post;
  editPost: Post;
  deletePost: Scalars['Boolean'];
  createComment: Comment;
  editComment: Comment;
  deleteComment: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationCreateSubArgs = {
  input: SubInput;
};


export type MutationJoinOrLeaveArgs = {
  subName: Scalars['String'];
};


export type MutationCreatePostArgs = {
  subName: Scalars['ID'];
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
  text: Scalars['String'];
  postId: Scalars['ID'];
};


export type MutationEditCommentArgs = {
  text: Scalars['String'];
  commentId: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
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
  body?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  creator?: Maybe<User>;
  creatorId: Scalars['ID'];
  sub?: Maybe<Sub>;
  subName: Scalars['ID'];
  comments: PaginatedComments;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  votes: Scalars['Int'];
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
  recommended: Array<Sub>;
  sub: Sub;
  post: Post;
  feed: PaginatedPosts;
};


export type QuerySubArgs = {
  name: Scalars['ID'];
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
  posts: PaginatedPosts;
  createdAt: Scalars['DateTime'];
  isSubbed: Scalars['Boolean'];
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
  createdAt: Scalars['DateTime'];
  karma: Scalars['Int'];
};


export type UserPostsArgs = {
  input: PaginationInput;
};


export type UserCommentsArgs = {
  input: PaginationInput;
};

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type FeedQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type FeedQuery = (
  { __typename?: 'Query' }
  & { feed: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'body' | 'votes' | 'voteStatus' | 'createdAt'>
      & { creator?: Maybe<(
        { __typename?: 'User' }
        & RegularUserFragment
      )> }
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const FeedDocument = gql`
    query Feed($input: PaginationInput!) {
  feed(input: $input) {
    posts {
      id
      title
      body
      votes
      voteStatus
      creator {
        ...RegularUser
      }
      createdAt
    }
    hasMore
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFeedQuery(baseOptions: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

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