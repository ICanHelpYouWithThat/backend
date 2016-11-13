[![Build Status](https://travis-ci.org/ICanHelpYouWithThat/backend.svg?branch=master)](https://travis-ci.org/ICanHelpYouWithThat/backend)

### What we are...
A simple site which allows people who are logged in through Facebook to find tasks that help out an organization who needs a skill they can offer - location/time constraints are matching.

We will have a simple UI Allow users once logged in as either an individual or organization. Individual User Create their profile - skills, contact info, privacy settings, skills they can offer, location, find tasks that they can signup for

Organization User Create events that require skills at a location for a certain timeframe, give Karma points to people who have completed tasks

Simple UI with a few screens that have simple forms to enter in data

###  Dev Setup
1) Clone the repo
        
        git clone https://github.com/ICanHelpYouWithThat/backend.git
        cd ./backend

2) Start project

        npm start

App is now running on port 3000

#### Mocha for testing.

###### *Mocha Docs*
https://mochajs.org/


###### *Express Docs*
https://expressjs.com/

###### *Node 7 Docs*
https://nodejs.org/dist/latest-v7.x/docs/api/

HTML - JavaScript - Simple UI - Angular2 with WebPack front-end
Simple Services which will read, update, create data about the individual user, organization, event

NodeJS w/ Express 4.x
Simple Datastore which will store user info, organization info, event info which requires skill and relationship between user and event skills.

MySQL DB
Location Google Apps
