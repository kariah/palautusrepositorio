const _ = require("lodash");

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sumOfLikes = blogs.map(blog => blog.likes).reduce((sum, val) => sum + val, 0);

    return sumOfLikes
}


const favoriteBlog = (blogs) => {
    let maxLikes = blogs.map(blog => blog.likes).reduce((max, val) => val > max ? val : max, 0);
    blogWithMostLikes = blogs.filter(blog => blog.likes === maxLikes)[0]

    return blogWithMostLikes
}

const mostBlogs = (blogs) => { 
    let authorsWithBlogs = [] 
    for (let blog of blogs) {
        var obj = {
            author: blog.author,
            blogs: 0
        }; 
        let authorFound = authorsWithBlogs.find(x => x.author === blog.author)  
        if (authorFound === undefined) {
            authorsWithBlogs.push(obj)
        }
    } 
    for (let authorWithBlogs of authorsWithBlogs) {  
        const blogsFoundByAuthor = blogs.filter(blog => blog.author === authorWithBlogs.author).length;  
 
        const index = authorsWithBlogs.map(x => x).indexOf(authorWithBlogs); 

        authorsWithBlogs[index].blogs = blogsFoundByAuthor 
    }

    // console.log("authorsWithBlogs: ", authorsWithBlogs)
 
    let max = _.maxBy(authorsWithBlogs, 'blogs'); 
    
    // console.log("max: ", max)

    return max;  
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}