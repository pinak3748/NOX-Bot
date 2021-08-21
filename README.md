# NOX [Discord-Bot]

![npm version](https://img.shields.io/npm/v/node?style=plastic) ![MIT License](https://img.shields.io/github/license/yogeshwar24/blogging_site)  

Discord bot for simple use of GitHub using  :octocat:octocat

How to Install to use it? 
---------------------

1. **You need to have token for your bot, don't worry if you don't have it [click](https://discord.com/developers/applications) here to create one**
    - Give all Text permission and view channel in general permission
 
 2. **create a OAuth token for your git account, if you don't have it [click](https://github.com/settings/tokens) here**
    - Give all Read permission and other are optional.
    
   

**Steps to setup the local environment:**
- Clone the repository:
```bash
git clone git@github.com:pinak3748/NOX-Bot.git
```
- Install all the needed npm packages:
```bash
npm install
```
- Create .env file and place your discord and git token

- Run Project:
```bash
Node index.js
```

Things to know before using it:
---------------------

The following command can only be performed by a certain role in this case the role of the user is `Master`
you can change it if you want or remove it by just keeping it blank or `New User`

Commands to use it:
---------------------

Its has master syntex `NOX` which is prefix for commands

 - `$NOX` to get the name of Authorised user
 - `nox -l {username}` to list all the repo of following user
 - `nox -b {username} {repo}` to list all branches all branches in repo
 - `nox -p {username}` to get a profile card of user
