const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogs) =>{
    if(Array.isArray(blogs)){
        const likesList = blogs.map(blog => blog.likes)
        if(likesList.length > 0){
            return likesList.reduce((total, cur) => total+cur)
        }
    }
    return 0
}

module.exports = {
    dummy,
    totalLikes
}