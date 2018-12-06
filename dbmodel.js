const db = require('./dbinit');

module.exports = {
  get: () => {
    return db('students');
  },
  getById: id => {
    return db('students')
      .where({ id: id })
      .first();
  },
  insert: student => {
    return db('students').insert(student);
  },
  update: (id, student) => {
    return db('students')
      .where({ id })
      .update(student);
  },
  delete: id => {
    return db('students')
      .where({ id })
      .del();
  }
};
