const { Pool } = require('pg');
const args = process.argv.slice(2);
const values = [`${args[0]}`];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const query = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teachers.name;
`;

pool.query(query, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(user.cohort, user.teacher);
  });
})
.catch(err => console.error('query error', err.stack));