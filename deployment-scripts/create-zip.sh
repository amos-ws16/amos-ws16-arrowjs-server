#!/bin/bash
mkdir -p deployment-build/temp
cp -R $(git ls-tree --name-only HEAD) deployment-scripts/config.cfg appspec.yml deployment-build/temp/
cd deployment-build/temp
zip -r ../latest.zip ./
cd ../..
