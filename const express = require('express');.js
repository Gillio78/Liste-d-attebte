const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port : 3306,
  database: 'patients' ,
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion : ' + err.stack);
    return;
  }
  console.log('Connecté en tant que id ' + connection.threadId);
});

app.post('/insertEmail', (req, res) => {
  const email = req.body.email;
  const query = 'INSERT INTO patients (email) VALUES (?)';
  
  connection.query(query, [email], (error, results, fields) => {
    if (error) {
      res.status(500).send({ error: 'Erreur d\'insertion' });
      throw error;
    }
    res.send({ message: 'Email inséré avec succès' });
  });
});

app.listen(port, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${port}`);
});
