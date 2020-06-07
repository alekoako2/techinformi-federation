import { ApolloServer } from 'apollo-server-express'
import { ApolloGateway } from '@apollo/gateway'

import express from 'express'

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'prisma', url: 'http://techinformiPrismaApi:4001/graphql' },
    {
      name: 'researchProjects',
      url: 'http://techinformiResearchProjectsApi:4002/graphql',
    },
    // { name: 'pageContents', url: 'http://localhost:4003/graphql' }
  ],
})

const server = new ApolloServer({
  gateway,
  subscriptions: false,
})

const app = express()

server.applyMiddleware({
  app,
  cors: true,
  path: '/graphql',
})

app.listen({ port: 4000 }, () =>
  console.log(
    `🚀 Apollo Federation Server ready at http://localhost:4000${server.graphqlPath}`
  )
)
