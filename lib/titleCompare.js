class TitleCompare {
  /**
   * Returns wheiter a String is contained in another String (e.g. the title).
   * @param title - Title to search for the string.
   * @param searchString - String for which should be searched.
   * @return boolean value wheither string is contained.
   * True, if it is contained, false otherwise.
   */
  static compareTitle (title, searchString) {
    if (title.indexOf(searchString) >= 0) {
      return true
    } else {
      return false
    }
  }
}
module.exports = {
  TitleCompare: TitleCompare
}
