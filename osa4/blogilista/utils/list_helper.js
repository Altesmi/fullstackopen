const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
  return (blogs.length>0 && Number.isInteger(blogs[0].likes))
   ? blogs.reduce((sum, cur) => sum+cur.likes,0) : 0; 
  }
  
  module.exports = {
    dummy, totalLikes
  }
  