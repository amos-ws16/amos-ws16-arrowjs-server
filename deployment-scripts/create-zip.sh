#!/bin/bash
mkdir deployment-build
mkdir deployment-build/temp
cp -R $(git ls-tree --name-only HEAD) deployment-build/temp/
cd deployment-build/temp
zip -r ../latest.zip ./
cd ../..
rm -R deployment-build/temp
