// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((count, blog) => count + blog.likes, 0);

const favoriteBlog = (blogs) => blogs.reduce((prev, current) => current.likes > prev.likes ? current : prev);

// todo: learn to rewrite these tests as suggested with `LoDash`
const groupBlogsByAuthor = (blogs) => {
    return blogs
        .map(b => b.author.toLowerCase())
        .reduce((list, author) => list.includes(author) ? list : list.concat(author), [])
        .map(author => {
            const filteredBlogs = blogs.filter(b => b.author.toLowerCase() === author);
            return { author, blogs: filteredBlogs };
        });
};

const getGroupedAuthorStats = (blogs) => {
    const authors = groupBlogsByAuthor(blogs);
    return authors.map(author => {
        return {
            author: author.author,
            blogs: author.blogs.length,
            likes: author.blogs.reduce((count, blog) => count + blog.likes, 0)
        };
    });
};

const noOne = { author: "no one", blogs: 0, likes: 0 };

const mostBlogs = (blogs) => {
    const stats = getGroupedAuthorStats(blogs);
    const author = stats.reduce((prev, current) => current.blogs > prev.blogs ? current : prev, noOne);
    return { author: author.author, blogs: author.blogs };
};

const mostLikes = (blogs) => {
    const stats = getGroupedAuthorStats(blogs);
    const author = stats.reduce((prev, current) => current.likes > prev.likes ? current : prev, noOne);
    return { author: author.author, likes: author.likes }; 
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};