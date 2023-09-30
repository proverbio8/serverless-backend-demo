#!/bin/bash

# Start serverless offline
npx serverless offline start &

# Give serverless some time to init
sleep 10

# Run mocha tests
npx mocha -r ts-node/register --reporter spec --extensions ts 'test/**/*.ts'

# Get serverless offline pid
SLS_PID=$(pgrep -f 'serverless offline start')

# Kill serverless offline
kill -9 $SLS_PID
