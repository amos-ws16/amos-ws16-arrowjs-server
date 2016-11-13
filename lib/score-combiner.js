/**
 * checks if there are scores which can be combined
 */
function checkValidity (scores) {
  if (scores == null) {
    throw new Error('There must be a scores object parameter')
  }
  if (Object.keys(scores).length <= 0) {
    throw new Error('At least one score must be passed')
  }
}

/**
 * Score canidate based on the mean value of two or more parent Qs.
 */
class MeanQ {

  /**
   * Returns the mean value of the given scores.
   * @param scores - obect that contains the keys and scores
   *                 for each used scoring method
   * @return mean value of given scores
   */
  combine (scores) {
    checkValidity(scores)

    var sum = 0
    Object.keys(scores).map((key, index, arr) => {
      sum += scores[key]
    })
    return sum / Object.keys(scores).length
  }
}

/**
 * Chooses the biggest score out of all possible scores
 */
class LargestQ {

  /**
   * combines all scores by choosing the largest score
   */
  combine (scores) {
    checkValidity(scores)

    var largest = 0.0
    Object.keys(scores).map((key, index, arr) => {
      if (scores[key] >= largest) {
        largest = scores[key]
      }
    })
    return largest
  }

}

module.exports = {
  Mean: MeanQ,
  Largest: LargestQ
}
