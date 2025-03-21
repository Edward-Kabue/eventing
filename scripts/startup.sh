#!/bin/sh
cd /usr/src/app
npm run db:migrate && npm run db:seed:all && npm start