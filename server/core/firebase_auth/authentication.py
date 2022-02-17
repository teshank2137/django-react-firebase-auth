import os

import firebase_admin
from django.contrib.auth import get_user_model
from firebase_admin import auth, credentials
from rest_framework.authentication import BaseAuthentication
from .exceptions import FirebaseAuthException, InvalidToken, TokenNotFound
cred = credentials.Certificate(os.path.join(
    os.path.dirname(__file__), 'secrets/firebaseconfig.json'))

app = firebase_admin.initialize_app(cred)


class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')

        if not auth_header:
            raise TokenNotFound()

        token = auth_header.split(' ').pop()
        try:
            decoded_token = auth.verify_id_token(token)
            pass
        except Exception:
            raise InvalidToken()

        try:
            uid = decoded_token.get('uid')
        except:
            raise FirebaseAuthException()

        # get user model
        User = get_user_model()
        try:
            user, created = User.objects.get_or_create(username=uid)
            pass
        except Exception as e:
            print('this is problem', e)
            return None
        return (user, None)
