#!/bin/bash

# This script deploys our application to our digital ocean droplet

ssh ${::env(user)}@${::env(dropletIP)}
git clone git@github.com:IyiKuyoro/portfolio-react.git
cd portfolio-react
npm install
npm run build
cd ~
sudo rm /var/www/html/*
expect {
  "[sudo] password for $user*" {send -- "${::env(DOPLET_USER_PASSWORD)}\r"}
}
expect eof
sudo mv -v portfolio-react/dist/* /var/www/html
