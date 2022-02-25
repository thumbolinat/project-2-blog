// import the db connection and the model you're seeding up here
const sequelize = require('../config/connection');
const { Post } = require('../models');
const { User } = require('../models');


// create an array of rows that you want to seed the model with
const postData = [
  {
    title: 'Sting',
    post_text: 'Sting was original lead singer of band Police.',
    user_id: 1
  },
  {
    title: 'Paul Simon',
    post_text: 'Originally one of the 2 memers of music group called Simon and Garfankel.',
    user_id: 1
  },
  {
    title: 'Belinda Carlile',
    post_text: 'One of the original members of 80s all girl band called Go-Gos',
    user_id: 2
  }
];

// create an array of rows that you want to seed the model with
const users = [
  {
    username: 'Mark',
    password: '123456'
  },
  {
    username: 'Nancy',
    password: '1234567'
  },
  {
    username: 'Richard',
    password: '1234568'
  }
];

// create an asynchronous seeding script
const seedPosts = async () => {

  console.log('Seeding data now...');
  console.log('\n=================\n');

  try {
    // use await to handle the async sequelize method
    // call the bulk create method on the model you want to seed
    // pass in the array of objects you want to seed the table with
    await User.bulkCreate(users);
    await Post.bulkCreate(postData);
    

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