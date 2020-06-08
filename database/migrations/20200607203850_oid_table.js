exports.up = function (knex) {
  return knex.schema.createTable("oid", (tbl) => {
    tbl
      .integer("id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    tbl.string("displayName", 255);
    tbl.string("oid_id", 255);
    tbl.string("user_id", 255);
    tbl.string("provider", 255);
    tbl.string("familyName", 255);
    tbl.string("givenName", 255);
    tbl.string("emails", 255);
    tbl.string("picture", 255);
    tbl.string("locale", 255);
    tbl.string("nickname", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("oid");
};
