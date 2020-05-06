const { age, date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM instructors`, function (err, results) {
      if (err) return res.send("Database Error!");

      callback(results.rows);
    });
  },
  create(dataFromBody, callback) {
    const query = `
      INSERT INTO instructors (
        name,
        avatar_url,
        gender,
        services,
        birth,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      dataFromBody.name,
      dataFromBody.avatar_url,
      dataFromBody.gender,
      dataFromBody.services,
      date(dataFromBody.birth).iso,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) return res.send("Database Error!");
      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(`SELECT * FROM instructors WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) return res.send("Database Error!");
      callback(results.rows[0]);
    });
  },
};
