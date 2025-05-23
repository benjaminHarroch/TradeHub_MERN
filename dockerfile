# שלב 1: בחר Base Image עבור Node.js
FROM node:18-alpine

# שלב 2: הגדרת תיקיית עבודה
WORKDIR /app

# שלב 3: העתקת קבצי package.json ו- package-lock.json
COPY package*.json ./

# שלב 4: התקנת תלויות
RUN npm install

# שלב 5: העתקת שאר הקבצים
COPY . .

# שלב 6: חשיפת הפורט
EXPOSE 7000

# שלב 7: הרצת השרת
CMD ["node", "server.js"]
