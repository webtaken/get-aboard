#!/bin/sh

echo 'Running collecstatic...'
python manage.py collectstatic --no-input

echo 'Applying migrations...'
python manage.py wait_for_db
python manage.py migrate

echo 'Running subscriptions synchronization...'
python manage.py sync_subscription_plans

echo 'Running server...'
gunicorn GetAboardBackend.asgi:application -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT