#!/bin/bash

# Open the terminal for the backend folder and run npm run dev
xfce4-terminal --hold --command="bash -c 'cd /home/nenad/Documents/Coding/personalApp/backend && npm run dev; exec bash'"

# Open the terminal for the frontend folder and run npm run dev
xfce4-terminal --hold --command="bash -c 'cd /home/nenad/Documents/Coding/personalApp/frontend && npm run dev; exec bash'"
