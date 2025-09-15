# 使用官方 Node LTS 映像檔
FROM node:18

# 建立 app 資料夾
WORKDIR /app

# 複製 package.json 與 lock 檔案
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有原始碼
COPY . .

# 編譯 TypeScript
RUN npm run build

# port
EXPOSE 3000

# 啟動 app
CMD [ "node", "dist/bin/www.js" ]