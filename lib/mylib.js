/** Promise based setTimeout wrapper */
function timeout (delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}

/** Very complicated */
async function complicatedAsyncTask (done) {
  await timeout(100)
  return 42
}

module.exports = { wisdom: true, complicatedAsyncTask }
