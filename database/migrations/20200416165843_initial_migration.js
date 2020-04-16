exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl
        .increments();

    tbl
        .string("user_name", 128)
        .unique()
        .notNullable();

    tbl
        .string("password", 128)
        .notNullable();

    tbl
        .string("email", 128)
        .unique()
        .notNullable();

    tbl
        .string("street", 128)
        .notNullable();

    tbl
        .string("apartment", 128)

    tbl
        .string("city", 128)
        .notNullable();

    tbl
        .string("state", 128)
        .notNullable();

    tbl
        .string("zip", 128)
        .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
