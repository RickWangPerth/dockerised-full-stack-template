# 使用 Node.js 的 Alpine 版本镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app/frontend/

# 首先复制 package.json 和 package-lock.json
COPY package*.json .

# 安装依赖
RUN npm install

# 复制所有源代码到工作目录
COPY . .

# 构建应用
RUN npm run build

# Next.js 默认监听 3000 端口
EXPOSE 3000

# 使用 Next.js 的 start 命令来运行构建后的应用
CMD ["npm", "run", "dev"]
