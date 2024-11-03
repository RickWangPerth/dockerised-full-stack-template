#!/bin/sh
# Wait for Postgres to be ready
/wait-for-postgres.sh postgresdb

# Perform database migration
poetry run python manage.py makemigrations
poetry run python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start Django application with Gunicorn
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
