#832201305_concacts_frontend
# Ruoyi Framework Backend Usage Guide

This project is based on the [Ruoyi Framework](https://gitee.com/y_project/RuoYi), providing basic backend management system functionality. The following are the steps to deploy and use the backend.

## Requirements

- **JDK**: Version 1.8 or higher
- **Maven**: Version 3.5 or higher
- **MySQL**: Version 5.7 or higher

## Local Environment Setup

1. **Clone the Project**

	Clone the project repository by running:

	`git clone https://gitee.com/y_project/RuoYi.git`

	Then navigate to the project directory:

	`cd RuoYi`

2. **Configure the Database**

	Create a database in MySQL:

	`CREATE DATABASE ruoyi CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`

	Import the `/ruoyi/sql/ruoyi.sql` script into the database to set up the table structure and initial data.

3. **Modify Configuration File**

	In `ruoyi-admin/src/main/resources/application-druid.yml`, configure the database connection details:

	`spring.datasource.druid.url: jdbc:mysql://localhost:3306/ruoyi?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC`

	`spring.datasource.druid.username: your_username`

	`spring.datasource.druid.password: your_password`

	Replace `your_username` and `your_password` with your actual database username and password.

4. **Start the Backend Service**

	Run the following command in the project root directory to start the service with Maven:

	`mvn spring-boot:run`

	Or, directly run the `RuoyiApplication` main class in your IDE.

	Once the service starts, it will be accessible at `http://localhost:8080`.

5. **Test API Endpoints**

	The Ruoyi framework provides RESTful API endpoints that can be tested using tools like Postman or Apifox. The default Swagger API documentation is available at `http://localhost:8080/swagger-ui.html`.

## Project Structure

- `ruoyi-admin`: Main backend module that provides API endpoints.
- `ruoyi-common`: Common module with utilities and general configurations.
- `ruoyi-framework`: Core framework module with Spring Boot configuration and permission management.
- `ruoyi-generator`: Code generation module to quickly generate CRUD code.
- `ruoyi-quartz`: Task scheduling module for managing scheduled tasks.
- `ruoyi-system`: System module containing user, role, and permission management functionalities.

## Common Commands

- **Start the Project**: Run `mvn spring-boot:run` to start the project.
- **Package the Project**: Run `mvn clean package` to package the project.
- **Generate Code**: Configure the tables to generate in the code generator module, then run to generate related code.

## Default Account

After starting the project, you can log in to the backend management system using the following account:

- **Username**: `admin`
- **Password**: `admin123`
