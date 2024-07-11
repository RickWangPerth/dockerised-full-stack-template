# Dockerised Full-Stack Application Template

This repository contains a template for a Dockerised full-stack application using Django, Next.js, and PostgreSQL. It is designed to help new graduates and junior developers build their own full-stack applications.

## Prerequisites

- Docker installed

## Getting Started

1. **Clone the repository**:
    ```sh
    git clone https://github.com/RickWangPerth/dockerised-full-stack-template.git
    cd dockerised-full-stack-template
    ```

2. **Create a `.env` file in the project root** with the following content:
    ```sh
    POSTGRES_PASSWORD=postgres
    POSTGRES_USER=postgres
    POSTGRES_DB=postgres
    PROJECT_NAME=fullstackproject
    ```

3. **Ensure `.sh` files use LF EOL**:
    If you encounter issues with `no such file or directory`, manually change the EOL settings to LF in your IDE:
    - **VSCode**: Open the `.sh` file, click on the `CRLF` or `LF` at the bottom right corner, and select `LF`.

4. **Build and run the Docker containers**:
    ```sh
    docker-compose up --build
    ```

5. **Access the application**:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:8000](http://localhost:8000)

## Project Structure

- **backend**: Contains the Django backend.
- **frontend**: Contains the Next.js frontend.
- **data**: Contains database data.

## Scripts

- **wait-for-postgres.sh**: Ensures the backend waits for PostgreSQL to be ready.
- **entrypoint.sh**: Manages backend initialization tasks.

## Blog Post

For detailed instructions, check out the [blog post](https://medium.com/@xinlyuwang96/building-a-full-stack-application-with-docker-django-next-js-and-postgresql-part-1-2d9c28874aa6).

## Contributing

Feel free to submit issues and pull requests to improve the project.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
