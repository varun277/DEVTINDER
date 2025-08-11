# Devtinder APIs

## auth routers
POST /signup
POST /login
POST /logout

## profile router
GET /Profile/view
PATCH /profile/edit
PATCH /profile/password

## connection request router
POST /request/send/interested/:userId
POST /request/send/ignored/:userId
POST /request/review/accepted/:userId
POST /request/review/rejected/:userId

## userRouter
GET /user/connections
GET /user/request
GET /user/feed

Status: ignore,interested,accepted,rejected

