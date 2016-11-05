# Amazon Web Service - Server Setup

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/AmazonWebservices_Logo.svg/2000px-AmazonWebservices_Logo.svg.png" alt="Amazon Web Service" style="width: 400px;"/>

## Installation

Prerequisites: [Python 2 version 2.6.5+](https://www.python.org/downloads/) or [Python 3 version 3.3+](https://www.python.org/downloads/)

Install Amazon Command Line Interface

    $ pip install awscli            (Windows)
    $ sudo pip install awscli       (Linux, OS X, Unix)

## Configuration

Configure a profile, which is stored in the config and credentials files

*~/.aws/credentials*

    $aws configure -profile <NAME>

AWS Access Key ID | AWS Secret Access Key | Defail region name | Defaul output format


## Test profiles

    $ aws ec2 describe-instances --profile <NAME>

*~/.aws/credentials*

*~/.aws/config*

## Key Pairls & Security Groups



## Command Line Options



## Command Structure



## Amazon Machine Image (AMI)



## Choose the right EC2 Instance Type



## Create



## Find



## Shut-down



## Connect



## Terminate