const { Pool } = require('pg');
const args = process.argv.slice(2);
const values = [`${args[0]}`, args[1]];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const query = `
SELECT students.id, students.name AS student_name, cohorts.name
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

pool.query(query, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.student_name} has an id of ${user.id} and was in the ${user.name} cohort`);
  });
})
.catch(err => console.error('query error', err.stack));