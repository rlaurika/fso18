const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sumOfLikes, item) => {
    if (typeof(item.likes) !== 'undefined') {
      return sumOfLikes + item.likes
    } else {
      throw 'Item in array has no likes field'
    }
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}