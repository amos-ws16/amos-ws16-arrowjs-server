#!/bin/bash
echo 'this script is being executed before deployment\n'
echo 'it changes the behaviour depending on the branch (master|dev)'
echo $TRAVIS_BRANCH
