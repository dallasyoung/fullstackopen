// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((count, blog) => count + blog.likes, 0);

const favoriteBlog = (blogs) => blogs.reduce((prev, current) => current.likes > prev.likes ? current : prev);

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};