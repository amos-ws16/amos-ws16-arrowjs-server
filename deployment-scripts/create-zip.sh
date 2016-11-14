#!/bin/bash
mkdir deployment-build/temp
cp -R bin deployment-scripts lib test .eslintignore .eslintrc appspec.yml LICENSE.md package.json README.md deployment-build/temp/
cd deployment-build/temp
zip -r ../latest.zip ./
cd ../..
rm -R deployment-build/temp
