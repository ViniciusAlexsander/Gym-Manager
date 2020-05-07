const { age, date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM members`, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },
  create(dataFromBody, callback) {
    const query = `
      INSERT INTO members (
        name,
        avatar_url,
        gender,
        email,
        birth,
        blood,
        weight,
        height
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;

    const values = [
      dataFromBody.name,
      dataFromBody.avatar_url,
      dataFromBody.gender,
      dataFromBody.email,
      date(dataFromBody.birth).iso,
      dataFromBody.blood,
      dataFromBody.weight,
      dataFromBody.height,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(`SELECT * FROM members WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows[0]);
    });
  },
  update(data, callback) {
    const query = `
      UPDATE members SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        email=($5),
        blood=($6),
        weight=($7),
        height=($8)
      WHERE id = ($9)
    `;
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.gender,
      data.email,
      data.blood,
      data.weight,
      data.height,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`;
      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM members WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database Error! ${err}`;

      return callback();
    });
  },
};
