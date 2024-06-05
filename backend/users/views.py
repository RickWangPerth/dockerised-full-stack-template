from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def logout_view(request):
    logout(request)
    response = JsonResponse({'success': True})
    
    # 删除 cookies
    response.delete_cookie('auth_token', path='/', samesite='Lax')
    response.delete_cookie('refresh_token', path='/', samesite='Lax')
    
    return response
