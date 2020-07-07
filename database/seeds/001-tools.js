
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tools').del()
    .then(function () {
      // Inserts seed entries
      return knex('tools').insert([
        {
          owner_id: 1, 
          tool_name: 'saw', 
          tool_type: 'Power',
          tool_description: 'a power saw', 
          available: 1,
          rental_cost: 10.25
        },
        {
          owner_id: 2, 
          tool_name: 'Hoe', 
          tool_type: 'Garden',
          tool_description: 'a wooden Hoe', 
          available: 1,
          rental_cost: 5
        },
        {
          owner_id: 1, 
          tool_name: 'Hammer', 
          tool_type: 'Hand',
          tool_description: 'a wooden Hammer', 
          available: 1,
          rental_cost: 10
        },

      ]);
    });
};
