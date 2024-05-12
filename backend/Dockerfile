# 使用轻量级的Python镜像
FROM python:3.10-alpine

# 设定环境变量，确保Python输出直接打印到控制台，不产生Python字节码文件
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# 设置工作目录
WORKDIR /app/backend

# 复制Python依赖文件
COPY requirements.txt .

# 安装GeoDjango所需的系统依赖，包括编译依赖和地理空间库
RUN apk update && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev python3-dev && \
    apk add --no-cache geos gdal proj binutils postgresql-client && \
    pip install --no-cache-dir -r requirements.txt && \
    apk del .build-deps

# 复制项目文件到容器内
COPY . .

# 列出当前目录内容以确保脚本存在
RUN ls -la

# Copy the wait-for-postgres.sh script into our container and make it executable
COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

# 列出根目录内容以确保脚本在那里
RUN ls -la /

# 容器启动时运行Django开发服务器
CMD ["/wait-for-postgres.sh", "postgresdb", "python", "manage.py", "runserver", "0.0.0.0:8000"]
