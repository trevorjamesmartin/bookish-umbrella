exports.up = function (knex) {
  return knex.schema.createTable("project_card", (tbl) => {
    tbl.increments();
    tbl.string("image", 255);
    tbl.string("description", 255);
    tbl.string("name", 255);
    tbl.string("app_uri", 255);
    tbl.string("repo_uri", 255);
    tbl.timestamp("created_on", (useTz = true));
    tbl
      .integer("user")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("project_card");
};
