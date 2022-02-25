// import the db connection and the model you're seeding up here
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');



// create an array of rows that you want to seed the model with
const posts = [
  {
    title: 'Gandalf',
    post_text: 'Gandalf is a protagonist in J. R. R. Tolkiens novels The Hobbit and The Lord of the Rings. He is a wizard, one of the Istari order, and the leader and mentor of the Fellowship of the Ring. Tolkien took the name "Gandalf" from the Old Norse "Catalogue of Dwarves" in the Völuspá.',
    user_id: 1
  },
  {
    title: 'Gollum',
    post_text: 'Gollum is a fictional monstrous character from J. R. R. Tolkiens Middle-earth legendarium. He was introduced in the 1937 fantasy novel The Hobbit, and became important in its sequel, The Lord of the Rings. Gollum was a Stoor Hobbit of the River-folk who lived near the Gladden Fields.',
    user_id: 1
  },
  {
    title: 'Aragorn',
    post_text: 'Aragorn is a fictional character and a main protagonist in J. R. R. Tolkiens The Lord of the Rings. Aragorn was a Ranger of the North, first introduced with the name Strider and later revealed to be the heir of Isildur, King of Gondor.',
    user_id: 2
  }
];

// create an array of rows that you want to seed the model with
const users = [
  {
    username: 'frodo',
    password: '123456'
  },
  {
    username: 'aragon',
    password: '1234567'
  },
  {
    username: 'gollum',
    password: '1234568'
  }
];

const comments = [
  {
    comment_text: 'comment1',
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: 'comment2',
    user_id: 2,
    post_id: 2,
  },
  {
    comment_text: 'comment3',
    user_id: 3,
    post_id: 3,
  },
  {
    comment_text: 'comment4',
    user_id: 1,
    post_id: 1,
  },
]

// create an asynchronous seeding script
const seedPosts = async () => {

  console.log('Seeding data now...');
  console.log('\n=================\n');

  try {
    // use await to handle the async sequelize method
    // call the bulk create method on the model you want to seed
    // pass in the array of objects you want to seed the table with
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await User.bulkCreate(users);
    await Post.bulkCreate(posts);
    await Comment.bulkCreate(comments);


    // catch: handle any errors that might pop up
  } catch (err) {
    console.log(err);
    return;
  }

  console.log('\n=================\n');
  console.log('Seeding successful.');
};

// call the seeding script to seed the table
seedPosts();

module.exports = { seedPosts };