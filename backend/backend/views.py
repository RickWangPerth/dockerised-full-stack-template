# /backend/backend/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def send_test_data(request):
    return Response({
        "data": "Hello from django backend"
    })