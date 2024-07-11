#!/bin/sh
# Wait for Postgres to be ready
/wait-for-postgres.sh postgresdb

# Perform database migration
python manage.py makemigrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start Django application with Gunicorn
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
