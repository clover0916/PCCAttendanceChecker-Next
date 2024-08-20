#!/bin/sh

if [ "$1" = "init" ]; then
  node CreateRecords.js
  node register.js
  exit
fi
if [ ! -f "./attend.sqlite" ]; then
    echo "mount /data/attend.sqlite and init"
    exit 1
fi

exec $@