from django.utils.deprecation import MiddlewareMixin

class SetJWTTokenCookieMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        token = getattr(request, 'auth_token', None)
        refresh_token = getattr(request, 'refresh_token', None)
        #print(f"SetJWTTokenCookieMiddleware - Token: {token}, Refresh Token: {refresh_token}")  # 调试信息
        
        # # 清除旧的 cookies
        # response.delete_cookie('auth_token')
        # response.delete_cookie('refresh_token')
        
        # 设置新的 cookies
        if token:
            response.set_cookie(
                'auth_token',
                token,
                httponly=True,
                secure=False,
                samesite='Lax'
            )
        
        if refresh_token:
            response.set_cookie(
                'refresh_token',
                refresh_token,
                httponly=True,
                secure=False,
                samesite='Lax'
            )
        
        # 确保将响应对象传递给 GraphQL 上下文
        if hasattr(request, 'graphql_context'):
            request.graphql_context['response'] = response
        
        return response


class JWTAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('auth_token')
        if token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'
            #print(f"Authorization header set: Bearer {token}")  # 调试信息
        #else:
            #print("No token found in cookies")

    def process_response(self, request, response):
        # 确保将响应对象传递给 GraphQL 上下文
        if hasattr(request, 'graphql_context'):
            request.graphql_context['response'] = response
            
        return response
    
