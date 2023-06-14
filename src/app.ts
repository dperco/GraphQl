import express from 'express'
import { buildSchema } from 'type-graphql/dist/utils'
import { ApolloServer } from 'apollo-server-express'
import { PingResolver } from './resolvers/ping'
import { ProductResolver } from './resolvers/ProductResolve'


export async function runServer() {
       const app=express() 
       const server= new ApolloServer({

       schema:await buildSchema({
                     resolvers:[PingResolver, ProductResolver]}),
                     context:({req,res})=>({req,res})
              })  
        await server.start()
        server.applyMiddleware({app,path:'/graphql'})

      return app
}
