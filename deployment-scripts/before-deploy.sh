#!/bin/bash
echo 'this script is being executed before deployment\n'
echo 'it changes the behaviour depending on the branch (master|devg)'
echo $TRAVIS_BRANCH
