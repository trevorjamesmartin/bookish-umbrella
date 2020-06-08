exports.up = function (knex) {
  return knex.schema.createTable("user", (tbl) => {
    tbl.increments();
    tbl.string("username", 255).unique().notNullable();
    tbl.string("email", 255).unique().notNullable();
    tbl.string("hash", 255).notNullable();
    tbl.string("session", 255);
    tbl.timestamp("expires", (useTz = true));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};
