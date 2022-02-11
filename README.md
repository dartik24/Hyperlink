# Setup

## Note
1. You want to be using some form of Linux (wsl or virtual box if on Windows) or a mac
2. Below is the setup that I used

##  NodeJS / NVM / NPM

1. Install Node: https://github.com/nvm-sh/nvm
2. Install NVM: 
    nvm install --lts
    nvm use --lts --default
3. Install git:
    sudo apt-get install git
4. Fork the main hyperlink repo on github
5. Clone your repo:
    git clone https://github.com/yourUserName/Hyperlink.git


## How to run

### Frontend
1. cd frontend
2. npm start
3. Wait for command to finishg
4. It should open http://localhost:3000

### Backend
1. cd backend
2. npm start
3. Server should listen on port 4201