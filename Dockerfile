FROM node:20-alpine

# 设置工作目录
WORKDIR /user/src/app

# 首先只复制包管理文件
COPY package.json pnpm-lock.yaml* ./


# 安装依赖
RUN npm install

# 复制其余项目文件
# COPY . .

# 暴露端口
EXPOSE 3000

# 开始 dev 模式
CMD ["npm", "run", "start:dev"]