#!/bin/sh -e
APP_NAME=$1

heroku maintenance:on --app $APP_NAME
git push heroku $CIRCLE_SHA1:refs/heads/master
heroku restart --app $APP_NAME
heroku maintenance:off --app $APP_NAME