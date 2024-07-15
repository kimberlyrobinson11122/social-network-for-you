const reactions = ['Like', 'Love', 'Haha', 'Wow', 'Sad', 'Angry'];

const users = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack',
  'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Sam', 'Tina'
];

// Get a random item from an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate random reaction
const getRandomReaction = () => getRandomArrItem(reactions);

// Generate random user
const getRandomUser = () => getRandomArrItem(users);

module.exports = { getRandomReaction, getRandomUser };