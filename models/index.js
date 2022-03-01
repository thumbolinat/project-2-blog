const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

/* A user can make many posts. But a post only belongs to a single user, and never many users. By this relationship definition, we know we have a one-to-many relationship.*/
// create associations
/* This association creates the reference for the id column in the User model to link to the corresponding foreign key pair, which is the user_id in the Post model.*/
User.hasMany(Post, {
    foreignKey: 'user_id'
});

/* defining the relationship of the Post model to the User. The constraint we impose here is that a post can belong to one user, but not many users. Again, we declare the link to the foreign key, designated at user_id in the Post model */
Post.belongsTo(User, {
    foreignKey: 'user_id',
    
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
 
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});


module.exports = { User, Post, Comment};