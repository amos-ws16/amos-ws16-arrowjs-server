#!/bin/bash

echo 'change the behaviour depending on the branch (master|dev)'
if [ "$TRAVIS_BRANCH" = "master" ]; then
  echo 'deploy on master'
  cp deployment-scripts/config-master.cfg deployment-scripts/config.cfg
  cp appspec-master.yml appspec.yml
else
  echo 'deploy on dev'
  cp deployment-scripts/config-dev.cfg deployment-scripts/config.cfg
  cp appspec-dev.yml appspec.yml
fi
