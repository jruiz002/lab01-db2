// =======================================
// Laboratorio 01
// Base de datos: lab01
// Autor: José Gerardo Ruiz García
// Fecha: 01/02/2026
// =======================================

// Seleccionar la base de datos
use lab01

// Crear colección de usuarios
db.createCollection("usuarios")

// Crear colección de recetas
db.createCollection("recetas")

// 2.1 Cree una consulta para obtener todas las recetas.
db.recetas.find()

// 2.2 Cree una consulta para obtener todos los usuarios.
db.usuarios.find()

// 2.3 Con base a la estructura observada en la colección de recetas, cree un nuevo documento que contenga los siguientes campos:
    // 2.3.1 Título
    // 2.3.2 Descripción
    // 2.3.3 Tiempo de cocción
db.recetas.insertOne({
  title: "Beef Burritos",
  desc: "Traditional beef burritos with beans and rice",
  cook_time: 25
})

// 2.4 Cree una consulta que busque la receta que acaba de crear.
db.recetas.find({
  _id: ObjectId("697bc24eabeea3c35f860b16")
})

// 2.5 Cree una consulta en la que liste las recetas, mostrando únicamente el título y su tiempo de cocción.
db.recetas.find(
    {},
    { title: 1, cook_time: 1, _id: 0 }
)

// 2.6 Cree una consulta en la que se listen las recetas ordenadas por mayor tiempo de cocción.
db.recetas.find(
    {},
    { title: 1, cook_time: 1, _id: 0 }
).sort({ cook_time: -1 })

// 2.7 Investigue la instrucción update() para poder agregar un rating más a una receta y actualizar el rating promedio.
db.recetas.update(
    { title: "Chicken Soft Tacos" },
    { $set: {rating: [1, 2 ,3]} }
)

// 2.8 Cree una consulta en la que elimine un ingrediente de la lista de ingredientes de una receta en específico.
db.recetas.update(
    { title: "Chicken Soft Tacos" },
    { $pull: {ingredients: { name: "chicken breast"}} }
)

// 2.9 Investigue la opción skip de la instrucción find() y cree una consulta en la que obtenga la tercera receta con mejor rating promedio.
db.recetas.find(
    {},
    { title: 1, rating_avg: 1, _id: 0 }
).sort({ rating_avg: -1 }).skip(2).limit(1)


// 2.10 Cree una consulta que busque las recetas que tienen comentarios.
db.recetas.find(
    { comments: { $exists: true, $ne: [] } },
    { title: 1, comments: 1, _id: 0 }
)

// 2.11 Cree una consulta en la que liste las recetas que son de postres.
db.recetas.find(
    { type: "Dessert" },
    { title: 1, type: 1 }
)

// 2.12 Cree una consulta en la que elimine las recetas que sean difíciles de cocinar.
db.recetas.deleteMany(
  { tags: { $ne: "easy" } }
)

// 2.13 Con base a la estructura observada en la colección de usuarios, cree 3 nuevos documentos de usuarios en una sola instrucción, que contenga los siguientes campos:
    // 2.13.1 Nombre
    // 2.13.2 Apellido
    // 2.13.3 Correo electrónico
    // 2.13.4 Contraseña
db.usuarios.insertMany([
  {
    firstName: "Juan",
    lastName: "Perez",
    email: "juan.perez@email.com",
    password: "pass1234"
  },
  {
    firstName: "Maria",
    lastName: "Gomez",
    email: "maria.gomez@email.com",
    password: "maria2024"
  },
  {
    firstName: "Carlos",
    lastName: "Lopez",
    email: "carlos.lopez@email.com",
    password: "carlos_pwd"
  }
])

// 2.14 Cree las consultas para agregarle la receta favorita a cada uno de los usuarios creados anteriormente.
db.usuarios.updateOne(
  { _id: ObjectId("697bcd3fabeea3c35f860b17") },
  { $set: { favorite_recipe_id: ObjectId("5e6fd805fa98021236426a24") } }
)
db.usuarios.updateOne(
  { _id: ObjectId("697bcd3fabeea3c35f860b18") },
  { $set: { favorite_recipe_id: ObjectId("5e87856d07beb474c074c5ca") } }
)
db.usuarios.updateOne(
  { _id: ObjectId("697bcd3fabeea3c35f860b19") },
  { $set: { favorite_recipe_id: ObjectId("5edf1d313260aab97ea0d589") } }
)


// 2.15 Cree una consulta para consultar los distintos nombres de usuarios.
db.usuarios.distinct("firstName")

// 2.16 Investigue el uso de expresiones regulares en la instrucción find() y cree una consulta para buscar todos los usuarios que tengan correo electrónico con dominio de Gmail.
db.usuarios.find(
    { email: { $regex: "@gmail\\.com$", $options: "i" } },
    { firstName: 1, lastName: 1, email: 1, _id: 0 }
)

// 2.17 Agregar un campo de actividad a los usuarios, para indicar si están activos o inactivos con un valor booleano.
db.usuarios.updateMany(
  {},
  { $set: { active: true } }
)

// 2.18 Cree una consulta en la que inactive a 2 usuarios.
db.usuarios.updateMany(
  {
    _id: {
      $in: [
        ObjectId("697bcd3fabeea3c35f860b19"),
        ObjectId("697bcd3fabeea3c35f860b18")
      ]
    }
  },
  { $set: { active: false } }
)

// 2.19 Cree una consulta en la que cambie la unidad de medida de todas las recetas que tienen lb a kg.
db.recetas.updateMany(
  { "ingredients.quantity.unit": "lbs" },
  { $set: { "ingredients.$.quantity.unit": "kg" } }
)

// 2.20 Cree una consulta en la que elimine a los usuarios inactivos.
db.usuarios.deleteMany({active: false})