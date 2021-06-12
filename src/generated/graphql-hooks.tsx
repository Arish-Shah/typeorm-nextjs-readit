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


export type Mutation = {
  __typename?: 'Mutation';
  createOrUpdateSub: Sub;
  createPost: Post;
  editPost: Post;
  deletePost: Scalars['Boolean'];
};


export type MutationCreateOrUpdateSubArgs = {
  input: SubInput;
};


export type MutationCreatePostArgs = {
  input: PostInput;
  subName: Scalars['ID'];
};


export type MutationEditPostArgs = {
  id: Scalars['ID'];
  input: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};

export type PaginationInput = {
  cursor: Scalars['ID'];
  take: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  postType: PostType;
  subName: Scalars['String'];
  creatorId: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  sub: Sub;
  creator: User;
};

export type PostInput = {
  title: Scalars['String'];
  body: Scalars['String'];
  postType: PostType;
};

export enum PostType {
  Text = 'TEXT',
  Link = 'LINK',
  Image = 'IMAGE'
}

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};

export type Sub = {
  __typename?: 'Sub';
  name: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
};

export type SubInput = {
  name: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type RegularPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'body' | 'postType'>
  & { sub: (
    { __typename?: 'Sub' }
    & Pick<Sub, 'name' | 'createdAt'>
  ), creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'createdAt'>
  ) }
);

export type RegularSubFragment = (
  { __typename?: 'Sub' }
  & Pick<Sub, 'name' | 'title' | 'description' | 'image' | 'banner' | 'createdAt'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id'>
);

export type CreateOrUpdateSubMutationVariables = Exact<{
  input: SubInput;
}>;


export type CreateOrUpdateSubMutation = (
  { __typename?: 'Mutation' }
  & { createOrUpdateSub: (
    { __typename?: 'Sub' }
    & RegularSubFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
  subName: Scalars['ID'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & RegularPostFragment
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type EditPostMutationVariables = Exact<{
  id: Scalars['ID'];
  input: PostInput;
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & { editPost: (
    { __typename?: 'Post' }
    & RegularPostFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  title
  body
  postType
  sub {
    name
    createdAt
  }
  creator {
    id
    createdAt
  }
}
    `;
export const RegularSubFragmentDoc = gql`
    fragment RegularSub on Sub {
  name
  title
  description
  image
  banner
  createdAt
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
}
    `;
export const CreateOrUpdateSubDocument = gql`
    mutation CreateOrUpdateSub($input: SubInput!) {
  createOrUpdateSub(input: $input) {
    ...RegularSub
  }
}
    ${RegularSubFragmentDoc}`;
export type CreateOrUpdateSubMutationFn = Apollo.MutationFunction<CreateOrUpdateSubMutation, CreateOrUpdateSubMutationVariables>;

/**
 * __useCreateOrUpdateSubMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateSubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateSubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateSubMutation, { data, loading, error }] = useCreateOrUpdateSubMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateSubMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateSubMutation, CreateOrUpdateSubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateSubMutation, CreateOrUpdateSubMutationVariables>(CreateOrUpdateSubDocument, options);
      }
export type CreateOrUpdateSubMutationHookResult = ReturnType<typeof useCreateOrUpdateSubMutation>;
export type CreateOrUpdateSubMutationResult = Apollo.MutationResult<CreateOrUpdateSubMutation>;
export type CreateOrUpdateSubMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateSubMutation, CreateOrUpdateSubMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!, $subName: ID!) {
  createPost(input: $input, subName: $subName) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *      subName: // value for 'subName'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($id: ID!, $input: PostInput!) {
  editPost(id: $id, input: $input) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
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