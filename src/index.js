// index.js

const mysql = require('mysql')

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
})

// Connect to MySQL
connection.connect(err => {
  if (err) throw err
  console.log('Connected to MySQL database')

  // SQL query to find subjects for each student
  const sql = `
    SELECT c.customerId, c.name AS customerName, GROUP_CONCAT(s.subjectName ORDER BY s.subjectName ASC SEPARATOR ', ') AS subjects
    FROM customers c
    LEFT JOIN subject_student_mapping m ON c.customerId = m.customerId
    LEFT JOIN subjects s ON m.subjectId = s.subjectId
    GROUP BY c.customerId, c.name
    ORDER BY c.name ASC
  `

  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) throw err

    console.log('Subjects for each student:')
    console.log('customerId\tname\t\tsubjects')
    results.forEach(row => {
      console.log(`${row.customerId}\t\t${row.customerName}\t\t${row.subjects}`)
    })

    // Close the MySQL connection
    connection.end(err => {
      if (err) throw err
      console.log('Disconnected from MySQL database')
    })
  })
})
