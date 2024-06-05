# backend/schema.py

import graphene
import users.schema
import blog.schema

class Query(users.schema.Query, blog.schema.BlogQuery, graphene.ObjectType):
    pass

class Mutation(users.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)