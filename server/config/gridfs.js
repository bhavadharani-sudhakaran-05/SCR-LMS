const mongoose = require('mongoose');

// GridFS bucket initialization
let gridfsBucket;

const initGridFS = (conn) => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
  console.log('✅ GridFS initialized');
  return gridfsBucket;
};

const getGridFSBucket = () => {
  if (!gridfsBucket) {
    throw new Error('GridFS not initialized. Call initGridFS first.');
  }
  return gridfsBucket;
};

module.exports = { initGridFS, getGridFSBucket };
