var stringSimilarity = require('string-similarity');

/**
 Takes as input an object of the form:
 {
  upload: {
    title: <string>
  },
  tasks: [
    {
      title: <string>
    },
    {
      title: <string2
    },
    {
      title: <string3
    },
    ...
  ]
 }
  Compares the title of the uploaded file with the titles of the tasks.
  Returns an task array with with and additional information about the matching score to each task.
  Each score is between 0.0 and 1.0 and depends on the degree of similarity
  between the strings.  Using the 'string-similarity' module to calculate these scores,
  which are based on Dice's Coefficient.

  @param input object with two keys: upload and tasks, upload has the property
      title as string, tasks is an array of objects with properties title as string
  @return input.tasks array with additional score property for each task entry
*/

function getScore (input) {

  return input.tasks
}

module.exports = { getScore }
