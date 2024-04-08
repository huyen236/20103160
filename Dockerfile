# Sử dụng một image Node.js đã có sẵn làm cơ sở
FROM node:20-alpine

# Tạo thư mục làm việc cho ứng dụng
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có) vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependency của ứng dụng
RUN npm install

# Sao chép toàn bộ mã nguồn của ứng dụng vào thư mục làm việc
COPY . .

# Expose cổng mà ứng dụng chạy trên (trong trường hợp này, cổng mặc định của NestJS là 4050)
EXPOSE 4050

# Khởi chạy ứng dụng NestJS
CMD ["npm", "run", "start:dev"]