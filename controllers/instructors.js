const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

//index
exports.index = function (req, res) {
  return res.render("instructors/index", { instructors: data.instructors });
};

//show
exports.show = function (req, res) {
  const { id } = req.params;
  const foundInstructor = data.instructors.find(function (instructor) {
    return id == instructor.id;
  });

  if (!foundInstructor) return res.send("Instructor not found");

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
  };

  //ele vai retorna o arquivo que está nessa pagina q foi passada como parametro
  return res.render("instructors/show", { instructor });
};

//create (apenas mostra a pagina onde vai ser criado os instructors)
exports.create = function (req, res) {
  return res.render("instructors/create");
};

//post (criação de instructors)
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill all filds");
    }
  }

  let { avatar_url, birth, name, services, gender } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error");

    return res.redirect(`/instructors/${id}`);
  });

  // return res.send(req.body);
};

//edit (apenas mostra a pagina onde vai ser possivel editar o instructor, essa logica serve para saber se o id passado existe)
exports.edit = function (req, res) {
  const { id } = req.params;
  const foundInstructor = data.instructors.find(function (instructor) {
    return id == instructor.id;
  });

  if (!foundInstructor) return res.send("Instructor not found");

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth),
  };

  return res.render("instructors/edit", { instructor: instructor });
};

// put (vai realmente editar o instructor ao apertar o button (verificar o form, nele precisamos mudar o metodo para ficar ok))
exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find(function (
    instructor,
    foundIndex
  ) {
    if (id == instructor.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) return res.send("Instructor not found");

  const instructor = {
    ...foundInstructor,
    ...req.body,
    id: Number(id),
    birth: Date.parse(req.body.birth),
  };

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error");

    return res.redirect(`/instructors/${id}`);
  });
};

//delete
exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter(function (instructor) {
    return instructor.id != id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error");

    return res.redirect("/instructors");
  });
};
