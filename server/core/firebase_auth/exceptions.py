from rest_framework.exceptions import APIException


class FirebaseAuthException(APIException):
    status_code = 500
    default_detail = 'Firebase Auth Exception'
    default_code = 'firebase_auth'


class TokenNotFound(APIException):
    status_code = 401
    default_detail = 'Credentials not found'
    default_code = 'token_not_found'


class InvalidToken(APIException):
    status_code = 401
    default_detail = 'Invalid Token'
    default_code = 'invalid_token'
