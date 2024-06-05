import graphene
import graphql_jwt
from django.contrib.auth import get_user_model
from graphene_django.types import DjangoObjectType
from graphql_jwt.shortcuts import create_refresh_token, get_token
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from django.urls import reverse
from django.test import Client

class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)
    token = graphene.String()
    refresh_token = graphene.String()

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()
        token = get_token(user)
        refresh_token = create_refresh_token(user)
        
        info.context.auth_token = token
        info.context.refresh_token = refresh_token

        print(f"CreateUser - Token: {token}, Refresh Token: {refresh_token}")  # 调试信息

        return CreateUser(user=user, token=token, refresh_token=refresh_token)

class Login(graphene.Mutation):
    user = graphene.Field(UserType)
    token = graphene.String()
    refresh_token = graphene.String()
    
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, username, password):
        user = get_user_model().objects.get(username=username)
        if not user.check_password(password):
            raise Exception("Invalid credentials")

        token = get_token(user)
        refresh_token = create_refresh_token(user)
        
        info.context.auth_token = token
        info.context.refresh_token = refresh_token
        
        print(f"Login - Token: {token}, Refresh Token: {refresh_token}")  # 调试信息
        
        return Login(user=user, token=token, refresh_token=refresh_token)

class RefreshToken(graphene.Mutation):
    new_token = graphene.String()
    new_refresh_token = graphene.String()
    user = graphene.Field(UserType)

    class Arguments:
        refresh_token = graphene.String(required=True)

    def mutate(self, info, refresh_token):
        try:
            payload = graphql_jwt.utils.jwt_decode(refresh_token)
            user = get_user_model().objects.get(username=payload['username'])
            new_token = get_token(user)
            new_refresh_token = create_refresh_token(user)
            
            info.context.auth_token = new_token
            info.context.refresh_token = new_refresh_token

            print(f"RefreshToken - New Token: {new_token}, New Refresh Token: {new_refresh_token}")  # 调试信息

            return RefreshToken(new_token=new_token, new_refresh_token=new_refresh_token, user=user)
        except Exception as e:
            raise Exception("Invalid refresh token") from e

class Query(graphene.ObjectType):
    whoami = graphene.Field(UserType)
    users = graphene.List(UserType)

    def resolve_whoami(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Authentication Failure: You must be signed in")
        return user

    @login_required
    def resolve_users(self, info):
        return get_user_model().objects.all()
    
class Logout(graphene.Mutation):
    success = graphene.Boolean()

    def mutate(self, info):
        client = Client()
        response = client.post(reverse('logout'))
        return Logout(success=True)

class Mutation(graphene.ObjectType):
    login = Login.Field()
    refresh_token = RefreshToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    create_user = CreateUser.Field()
    logout = Logout.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
