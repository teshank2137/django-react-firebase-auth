from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from firebase_admin import auth
from django.contrib.auth import get_user_model
# Create your views here.


class HelloView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return Response({'message': 'Hello, World!'})


class AuthenticatedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'You Are Authenticated', 'user': request.user.username})


class RegisterUser(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        User = get_user_model()
        user = User.objects.get(username=request.user.username)
        firebase_data = auth.get_user(user.username)
        user.email = firebase_data.email
        user.save()
        return Response({'message': 'User Registered'})
