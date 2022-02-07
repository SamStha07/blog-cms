// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_BLOG_CMS_ENDPOINT;

export default async function comments(req, res) {
  console.log('body', req.body);
  const { name, email, slug, comment } = req.body;

  const graphqlClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
    },
  });

  const query = gql`
    mutation createComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphqlClient.request(query, req.body);

    console.log('result', result);

    return res.status(200).json(result);
  } catch (error) {
    console.log('error', error);
    return res.status(500).json(error.message);
  }
}
