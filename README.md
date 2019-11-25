# SuperRent
## To Run the Website:
1. Run ```yarn install```
2. Run ```yarn start```
## Getting Started
### 1) Setup PostgreSQL
1. After installing postgresql, run the following in psql CLI to create a user called ```me``` with the password ```password```.
```
CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;
```
2. Log out of the root user and use the newly created user `me`.
```
\q
psql -d postgres -U me
```
3) Create a database called ```cpsc304```.
```
CREATE DATABASE cpsc304;
```

4) Run the SQL script located at ```/backend/sql/create/createAllTables.sql``` to batch create tables for this project. You can do one of either:

    * Copy the SQL script, paste it in DataGrip and run it on the database console.
    * Run ```\i <sql_filename>``` in the psql CLI.

### 2) Run Frontend/Backend
To run the frontend and/or backend, run the following in the command line once you're in the ```/frontend``` or ```/backend``` directory respectively. Any code changes will automatically restart the node application, without having to manually run yarn start again. 

 ```
 yarn start
 ``` 
## Useful PostgreSQL Command Line Commands
* **`\q`** – exit psql connection
* **`\dt`** – list current database's tables
* **`\c <database_name>`** – connect to a database
* **`\l`** – list all databases
* **`\i <filename>`** – executes the SQL script contained in the file as if it has been typed on keyboard
