const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    return res.render("instructors/index");
  },
  create(req, res) {
    return res.render("instructors/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all filds");
      }
    }

    let { avatar_url, birth, name, services, gender } = req.body;

    // birth = Date.parse(birth);
    // const created_at = Date.now();
    // const id = Number(data.instructors.length + 1);

    // data.instructors.push({
    //   id,
    //   avatar_url,
    //   name,
    //   birth,
    //   gender,
    //   services,
    //   created_at,
    // });

    // fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    //   if (err) return res.send("Write file error");

    //   return res.redirect(`/instructors/${id}`);
    // });

    return;
  },
  show(req, res) {
    return;
  },
  edit(req, res) {
    return;
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all filds");
      }
    }
    return;
  },
  delete(req, res) {
    return;
  },
};
