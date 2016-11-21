const timeLimit = 600
/**
 * Takes as an input an object of the form:
 *
 * @param file - an object that has a number property timestamp
 * @param task - an object that has a number property timestamp
 * @return score - between 1.0 and 0.0 and decreases
 * linear with increasing difference between timestamps. Time differences greater
 * than timeLimit will result in a score of 0.0.
 */
function closeTimestampPlugin (t1, t2) {
  let difference = Math.abs(t1 - t2)
  return difference > timeLimit ? 0.0 : 1.0 - difference / timeLimit
}

module.exports = closeTimestampPlugin
