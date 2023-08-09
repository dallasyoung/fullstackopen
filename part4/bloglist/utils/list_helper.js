// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((count, blog) => count + blog.likes, 0);

const favoriteBlog = (blogs) => blogs.reduce((prev, current) => current.likes > prev.likes ? current : prev);

// todo: learn to rewrite this test as suggested with `LoDash`
const mostBlogs = (blogs) => {
    const authors = blogs
        .map(b => b.author.toLowerCase())
        .reduce((list, author) => list.includes(author) ? list : list.concat(author), []);

    const stats = authors
        .map(author => {
            const count = blogs
                .filter(b => b.author.toLowerCase() === author)
                .length;
            return { author, blogs: count };
        });

    return stats
        .reduce((prev, current) => current.blogs > prev.blogs ? current : prev, { author: "no one", blogs: 0 });
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
};