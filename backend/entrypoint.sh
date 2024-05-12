#!/bin/bash
# Wait for Postgres to be ready
/wait-for-postgres.sh postgresdb

# Perform database migration
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start Django application with Gunicorn
gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
