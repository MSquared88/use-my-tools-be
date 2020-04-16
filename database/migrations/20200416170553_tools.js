
exports.up = function(knex) {
  return knex.schema.createTable("tools", (tbl) => {
    tbl
        .increments();

    tbl
        .integer('owner_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

    tbl
        .string('tool_name')
        .notNullable();

    tbl
        .string('tool_type')
        .notNullable();
    
    tbl
        .text('tool_description');

    tbl
        .boolean('available');

    tbl
        .string('rental_cost')
        .notNullable()
    
    //requests table
    kex.schema.createTable('requests', (tbl) => {
        tbl
            .increments()

        tbl
            .integer('requestor_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        tbl
            .integer('tool_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('tools')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        tbl
            .string("request_length")
            .notNullable()



    })
  })
};

exports.down = function(knex) {
  return knex.schema.drobTableIfExsists("tools")
};
