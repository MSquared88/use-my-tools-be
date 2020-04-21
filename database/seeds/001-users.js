
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_name: 'matthew', 
          password: '123', 
          email: 'demo@demo.com' ,
          street: '123 random str',
          city: 'somewhere',
          state: 'Tx',
          zip: '76431'
        },
        {
          user_name: 'bob', 
          password: '123', 
          email: 'demo2@demo.com' ,
          street: '123 random str',
          city: 'somewhere',
          state: 'Tx',
          zip: '76431'
        },
      ]);
    });
};
