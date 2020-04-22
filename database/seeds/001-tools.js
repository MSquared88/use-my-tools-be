
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tools').del()
    .then(function () {
      // Inserts seed entries
      return knex('tools').insert([
        {
          owner_id: 1, 
          tool_name: 'saw', 
          tool_type: 'power',
          tool_description: 'a power saw', 
          available: 1,
          rental_cost: 10.25
        },

      ]);
    });
};
