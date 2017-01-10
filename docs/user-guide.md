# Arrow.js - The correlation engine

## 1. Content

1. [Content](#Content)
2. [Introduction](#Introduction)
3. [Usage](#Usage)
 1. [Requests](#Requests)
 2. [Configuration](#Configuration)
 3. [Example Request](#Example-Request)

## 2. Introduction

This user guide explains how to use the Arrow.js API.

## 3. Usage

## 3.1 Requests

The Arrow.js API is based on REST principles: data resources are accessed via standard HTTP requests in UTF-8 format to an API endpoint. The API is running on a server hosted by amazon AWS. To use this API you have to send a POST request to the following address:

**http://ec2-52-212-74-103.eu-west-1.compute.amazonaws.com:4000/api/score**

## 3.2 Input Scheme

All data is received as a JSON object that are based on the following scheme:

```json
{
    "file": {
      "title": "(required) string ",
      "type": "(required) string png/jpeg",
      "created_at": "(required) unix timestamp",
      "user": "(required) id string",
      "description": "string that was sent with the upload"
    },
    "tasks": [
      {
        "title": "(required) string",
        "created_at": "(required) unix timestamp",
        "due_date": "unix timestamp",
        "created_by": "(required) id string",
        "last_updated_by": "id string",
        "last_updated_at": "unix timestamp",
        "assignees": ["userid1", "userid2", "..."],
        "description": "string",
        "location": "..."
    },
    "..."]
}
```

The fields marked with '(required)' are necessary for the comparison. If one or more of these fields are missing the API will return an exception.

## 3.3 Configuration

For information on how to configure different parts of the API follow the [user guide](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/user-guide.md) of the Arrow.js Engine.

## 3.4 Example Request

POST Request:

```json
{
    "config": {
        "aggregator": {"mean": "*"},
        "plugins": {
            "context-file-description-task-description": {
                "use": "similar-text-plugin",
                "inputs": ["file.description", "tasks[].description"],
                "params": {
                    "extractKeywords": true
                }
            }
        }
    },
    "file": {
        "title": "Cafe abc",
        "type": "jpeg",
        "created_at": 1479755100,
        "user": "5hj34thtr",
        "description": " Great location for a meeting"
    },
    "tasks": [{
        "title": " find a location",
        "created_at": 1479754800,
        "due_date": 1479766305,
        "created_by": "ikgDG94s",
        "description": "Find a location for the next meeting"
    }, {
        "title": " Check your mails",
        "created_at": 1379754800,
        "due_date": 1454353454,
        "created_by": "dfgj2s334",
        "description": "Check your mails before you leave."
    }]
}
```
