# Project Title

Internet Usage Monitoring Service



## install all the dependencies , type the below command


npm install


## make .env file and add the below snippet into that file



PORT = 3000



DB_URL = "mongodb://127.0.0.1:27017/internet_usage_db"




## Run the project


npm run dev


## Hit the edpoints in your browser



http://localhost:3000/user/search?name="john"
http://localhost:3000/analytics?date?24122022&limit=100&page=1



## We are using Jest (Javascript Unit testing Framework)



## install Jest



npm install --save-dev jest



## install babel



npm install --save-dev babel-jest @babel/core @babel/preset-env
