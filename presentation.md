# Overview
ETF helper is an application that takes in acceptable price ranges for ETFs and outputs when it makes sense to buy and sell postions in those ETFs

# Workflow
Below is an image of how the workflow operates

<img src="./img/Screenshot from 2021-05-23 22-26-29.png">


# ERD for models

The database consists of three tables:
- user: data about the user which is logged on
- etfdata: the ETF tickers we are currently tracking
- etfweekly: price data for the ETFs we are tracking


# RESTful routing table
| VERB | URL | CRUD | Description |
|------|-----|------|-------------|
| GET | /etf | READ | list all existing ETFS being tracked |
| GET | /etf/myetfs | READ | shows the ETFS you are tracking |
| POST | /etf/weekly | CREATE | retrieves stock prices |
| POST | /etf/new | CREATE | creates new ETF you wish to track |
| PUT | /etfs/edit/:id | UPDATE | update data about your ETF |
| DELETE | /etfs/delete/:id | DELETE | remove an ETF from tracking |

# Installation instructions
1. `npm install` will install the packages locally that you will need to run the application
2. install postgres to use as the database to host the data you create
3. `sequelize db:migrate` to migrate your databse models to postgres
4. run `npm start`
5. the application will launch at localhost:3000

# Future Upgrades
Charting: gather data on a weekly basis and be able to make charts

Styling: Grow the existing styling to improve visibility where action is needed. 
