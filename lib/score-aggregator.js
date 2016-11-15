/**
 * In this module a number of different Aggregators are implemented. An
 * Aggegrator is an object with a combine() method that takes scores from
 * one or more Plugin and calculates a total score depending on the policy
 * implemented by the particular Aggregator. They are a component used by a
 * ScoreManager to provide the final score result.
 *
 * Examples are the Largest Aggregator, Mean Aggregator and WeightedMean
 * Aggregator.
 * @module score-aggregator
 */

/**
 * Throw an error if the scores are not valid. Scores must be an object where
 * all properties' values are numbers between 0.0 and 1.0. There must be at
 * least one property.
 *
 * @param scores - an object with at least one key set and all values numbers
 *                 between 0.0 and 1.0
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
 * Return the sum of the values of all keys in object. For example, given that
 *   object = { foo: 1.0, bar: 0.5 }
 * this function returns the sum of object's values sumValues(object) = 1.5.
 *
 * @param object - an object who's values are numbers
 */
function sumValues (object) {
  return Object.values(object).reduce((sum, value) => sum + value)
}

/**
 * Implements an Aggregator that combines scores by calculating the average
 * of all scores.
 */
class Mean {

  /**
   * Returns the mean value of the given scores. For example, given
   *   scores = { 'plugin-a': 1.0, 'plugin-b': 0.5 }
   * combine(scores) will return (1.0 + 0.5) / 2 = 0.75.
   *
   * @param scores - obect that contains the keys and scores
   *                 for each used Plugin
   */
  combine (scores) {
    checkValidity(scores)

    let sum = sumValues(scores)
    return sum / Object.values(scores).length
  }
}

/**
 * Implements an Aggregator that combines scores by choosing the biggest score
 * out of all scores.
 */
class Largest {

  /**
   * Returns the biggest score value of the given scores. For example, given
   *   scores = { 'plugin-a': 0.2, 'plugin-b': 0.8, 'plugin-c': 0.5 }
   * combine(scores) will return max(0.2, 0.8, 0.5) = 0.8.
   *
   * @param scores - object that contains the keys and scores
   *                 for each used Plugin
   */
  combine (scores) {
    checkValidity(scores)
    return Math.max.apply(null, Object.values(scores))
  }
}

/**
 * Implements an Aggregator that combines scores by calculating the weighted
 * average of all scores. */
class WeightedMean {
  /**
   * Construct a new WeightedMean Aggregator using the given weights. The
   * weights are passed in the form { 'plugin name': numericWeight, ... }.
   * In order to ensure that the resulting scores are in the valid range
   * between 0.0 and 1.0 all numericWeight values must be between 0.0 and 1.0
   * and their sum must be equal to 1.0.
   *
   * @param weights - an object where the keys match a Plugin and it's value
   *                  represents the weight of that Plugin
   */
  constructor (weights) {
    let sum = sumValues(weights)
    if (Math.abs(sum - 1.0) > 1.0e-5) {
      throw new Error('Weights must add up to 1.0')
    }

    this.weights = weights
  }

  /**
   * Returns the weighted mean of scores using the weights given in the
   * constructor. For example, given
   *   scores = { 'plugin-a': 0.2, 'plugin-b': 0.5 } and
   *   weights = { 'plugin-a': 0.8, 'plugin-b': 0.2 }
   * new WeightedMean(weights).combine(scores) will return
   *   totalScore = 0.2*0.8 + 0.5*0.2 = 0.26.
   *
   * @param scores - obect that contains the keys and scores
   *                 for each used Plugin
   * */
  combine (scores) {
    let sum = Object.keys(this.weights).reduce((sum, key) => {
      return sum + this.weights[key] * scores[key]
    }, 0)
    return sum / Object.keys(scores).length
  }
}

module.exports = {
  Mean: Mean,
  Largest: Largest,
  WeightedMean: WeightedMean
}
