# REST API Reference
This file documents the REST API input and output schemata for the route
`/api/score`.

## Input Schema
All fields are optional unless specified as required.

```json
{
  "content": {
    "file": {
      "title": "(required) string ",
      "type": "(required) string png/jpeg",
      "created_on": "(required) number",
      "user": "(required) id string",
      "description": "string that was sent with the upload",
      "context": {
        "chat": "...",
        "more stuff": "...",
        "to be defined later": "..."
      }
    },
    "tasks": [
      {
        "title": "(required) string",
        "created_on": "(required) number",
        "due_date": "number",
        "created_by": "(required) id string",
        "last_updated_by": "id string",
        "last_updated_on": "number",
        "assignees": ["userid1", "userid2", "..."],
        "description": "string",
        "location": "..."
    },
    "..."]
  },
  "metadata": {
    "plugins" : [
      {
        "name": "(required) string",
        "wheight": "(required) float"
      }
    ]
  }
}

```

## Output Schema
Not yet finished.

```json
{
  "tasks": [
    {
      "name": "string",
      "score": 1.0,
      "subscores": {
        "plugin-a": 1.0,
        "...": "..."
      }
    },
    "..."
  ]
}
```
