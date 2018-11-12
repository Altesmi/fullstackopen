const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return (blogs.length > 0 && Number.isInteger(blogs[0].likes))
    ? blogs.reduce((sum, cur) => sum + cur.likes, 0) : 0;
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = blogs.find(blog => blog.likes === Math.max.apply(null, blogs.map(blog => blog.likes)))

  return typeof(favoriteBlog) === 'undefined' ? {} : favoriteBlog
}

const mostBlogs = (blogs) => {

  let counts = []; // initialize empty array
  blogs.forEach(blog => { // goes trough every blog
    if(counts.filter(count=>count.author===blog.author).length===0) { //if this name is not found in 'counts' count how many times this author is in blogs
  
      let tempArr = blogs.filter(b=>b.author===blog.author) //temporary array for storing all the object which have the name blog.name
    
      counts.push({author: blog.author, blogs: tempArr.length})
      } else { // if the name is already in counts do not count again
      }
  })
  // return the author with most blogs if multiple authors have the same amount of blogs the first entry is returned
  return counts.length === 0 ? {} : counts.find(count => count.blogs === Math.max.apply(null,counts.map(count=>count.blogs)))
}

const mostLikes = (blogs) => { // This is pretty much the same function as listhelper.mostBlogs

  let counts = []; 
  blogs.forEach(blog => { 
    if(counts.filter(count=>count.author===blog.author).length===0 && typeof(blog.author)!=='undefined') { 
  
      let tempArr = blogs.filter(b=>b.author===blog.author)
    
      counts.push({author: blog.author, likes: tempArr.reduce((sum, cur) => sum + cur.likes, 0)})
      } else { 
      }
  })
  // return the author with most likes if multiple authors have the same amount of blogs the first entry is returned
  return counts.length === 0 ? {} : counts.find(count => count.likes === Math.max.apply(null,counts.map(count=>count.likes)))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
