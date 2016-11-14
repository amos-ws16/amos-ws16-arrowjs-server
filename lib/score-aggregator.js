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

/** Return the sum of the values of all keys in object */
function sumValues (object) {
  return Object.values(object).reduce((sum, value) => sum + value)
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

    let sum = sumValues(scores)
    return sum / Object.values(scores).length
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
    return Math.max.apply(null, Object.values(scores))
  }
}

/** */
class WeightedMeanQ {
  /** */
  constructor (weights) {
    let sum = sumValues(weights)
    if (Math.abs(sum - 1.0) > 1.0e-5) {
      throw new Error('Weights must add up to 1.0')
    }

    this.weights = weights
  }

  /**
   * Return the weighted mean of scores using the weights given in the
   * constructor. */
  combine (scores) {
    let sum = Object.keys(this.weights).reduce((sum, key) => {
      return sum + this.weights[key] * scores[key]
    }, 0)
    return sum / Object.keys(scores).length
  }
}

module.exports = {
  Mean: MeanQ,
  Largest: LargestQ,
  WeightedMean: WeightedMeanQ
}
