const connection = require('../Main/config/connection');
const { User, Thought } = require('../Main/models');
const { getRandomUser, getRandomReaction } = require('./data');

connection.on('error', (err) => console.error('MongoDB connection error:', err));

connection.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Drop collections if they exist
    const collections = await connection.db.collections();
    for (let collection of collections) {
      if (collection.collectionName === 'users' || collection.collectionName === 'thoughts') {
        await collection.drop();
      }
    }

    // Create empty array to hold the thoughts
    const thoughts = [];

    // Loop 5 times to add thoughts to the thoughts array
    for (let i = 0; i < 5; i++) {
      // Generate random reactions
      const reactions = [];
      for (let j = 0; j < 5; j++) {
        const reactionBody = getRandomReaction();
        const username = getRandomUser();
        reactions.push({ reactionBody, username });
      }

      // Generate random thought data
      const thoughtText = `Thought #${i + 1}`;
      const username = getRandomUser();

      thoughts.push({
        thoughtText,
        username,
        reactions,
      });
    }

    // Insert thoughts into the database
    const insertedThoughts = await Thought.insertMany(thoughts);

    // Create multiple users with the inserted thought IDs
    const usersData = [];
    for (let k = 0; k < 3; k++) { // Create 3 users
      const userData = {
        username: getRandomUser(), // Generate a random username
        inPerson: false,
        thoughts: insertedThoughts.map(thought => thought._id),
      };
      usersData.push(userData);
    }

    // Insert the users into the database
    await User.insertMany(usersData);

    // Log the seeded data
    console.table(thoughts);
    console.log('Seed data insertion complete!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    // Close the connection
    await connection.close();
    console.log('Connection closed');
    process.exit(0);
  }
});