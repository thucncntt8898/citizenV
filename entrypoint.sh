#!/bin/sh
if [ -f "/vault/secrets/env" ]; then
export $(cat /vault/secrets/env | xargs)
fi
npm run start