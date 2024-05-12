# Use a lightweight Python image
FROM python:3.10-alpine

# Set environment variables to ensure Python outputs are directed to the console and no bytecode files are generated
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set the working directory for the container
WORKDIR /app/backend

# Copy the Python dependency file into the container
COPY requirements.txt .

# Install system dependencies required for GeoDjango, including compilation dependencies and geospatial libraries
RUN apk update && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev python3-dev && \
    apk add --no-cache geos gdal proj binutils postgresql-client && \
    pip install --no-cache-dir -r requirements.txt && \
    apk del .build-deps

# Copy the entire project into the container
COPY . .

# Copy the wait-for-postgres.sh script into the container and make it executable
COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

# Copy the entrypoint.sh script into the container and make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the container's entrypoint to the entrypoint.sh script
ENTRYPOINT ["/entrypoint.sh"]
