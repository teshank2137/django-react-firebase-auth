<div style="display:flex; align-items:center">
<img src="https://static.djangoproject.com/img/logos/django-logo-negative.png" style="height:50px">
<img src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-built_white.png" style="height:50px">
<img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" style="height:50px">
</div>

# Demo app to show Django Rest Framework working with Firebase for authentication ft. React as frontend

## OAuth2.0
What is OAuth? <br/>
OAuth is an authorization protocol that provides users to grant websites or applications access to their information on other websites <br/>

Oauth became so popular that people started using OAuth for authentication, which OAuth is not built for.
That's where OpenID connect comes in.
OpenID connect is on the top layer of oauth2.0 which provides authentication to users on the server side.

<img src=""/>

---

## Firebase Authentication
Firebase provides both authentications as well as authorization for us.

Firebase Admin SDK helps us integrate our own server with the Firebase system.

On the Client side, Firebase helps you authorize users. We can get the TokenID from that user object received from firebase.
TokenID is nothing but a JWT token which is then decoded to authenticate the user and can be verified with firebase.

To achieve authentication in our Django backend we have to extend BaseAuthentication class and write a simple middleware that decodes JWT and authenticates our user. Using this we can protect private routes in our backend.

We can then add our FirebaseAuthentication class as a default authentication class

```
REST_FRAMEWORK = {
  'DEFAULT_AUTHENTICATION_CLASSES': (
        'firebase_auth.authentication.FirebaseAuthentication',
  ),
}
```

After the successful sign-in and verification, we can register the verified user in our backend with username as UID and can extend user class accordingly.


This was a fun and great learning experience for me.
If you want to contribute feel free to create a PR request or raise an issue
