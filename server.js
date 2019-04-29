// server.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('keys/key.pem'),
    cert: fs.readFileSync('keys/cert.pem'),
    passphrase: '123_abc',
};

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/static'));

app.get('/api/all', (req,res) => {
  return db.Survey.findAll({ include: [{ all: true, nested: true }]})
  .then((surveys) => res.send(surveys))
  .catch((err) => {
    console.log('There was an error querying surveys', JSON.stringify(err))
    return res.send(err)
  });
});
app.get('/api/surveys', (req, res) => {
  return db.Survey.findAll()
    .then((surveys) => res.send(surveys))
    .catch((err) => {
      console.log('There was an error querying surveys', JSON.stringify(err))
      return res.send(err)
    });
});

app.post('/api/surveys', (req, res) => {
  const { name } = req.body
  return db.Survey.create({ name })
    .then((survey) => res.send(survey))
    .catch((err) => {
      console.log('***There was an error creating a survey', JSON.stringify(err))
      return res.status(400).send(err)
    })
});

app.delete('/api/surveys/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Survey.findById(id)
    .then((survey) => survey.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('***Error deleting survey', JSON.stringify(err))
      res.status(400).send(err)
    })
});

app.put('/api/surveys/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Survey.findById(id)
  .then((survey) => {
    const { name } = req.body
    return survey.update({ name })
      .then(() => res.send(survey))
      .catch((err) => {
        console.log('***Error updating survey', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
});

app.get('/api/questions', (req, res) => {
  return db.Question.findAll()
    .then((questions) => res.send(questions))
    .catch((err) => {
      console.log('There was an error querying questions', JSON.stringify(err))
      return res.send(err)
    });
});

app.post('/api/questions', (req, res) => {
  const { name,type,surveyId } = req.body
  return db.Question.create({ name, type, surveyId })
    .then((question) => res.send(question))
    .catch((err) => {
      console.log('***There was an error creating a question', JSON.stringify(err))
      return res.status(400).send(err)
    })
});

app.delete('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Question.findById(id)
    .then((question) => question.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('***Error deleting question', JSON.stringify(err))
      res.status(400).send(err)
    })
});

app.put('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Question.findById(id)
  .then((question) => {
    const { name,type,surveyId } = req.body
    return question.update({ name,type,surveyId })
      .then(() => res.send(question))
      .catch((err) => {
        console.log('***Error updating question', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
});


app.get('/api/answers', (req, res) => {
  return db.Answer.findAll()
    .then((answers) => res.send(answers))
    .catch((err) => {
      console.log('There was an error querying answers', JSON.stringify(err))
      return res.send(err)
    });
});

app.post('/api/answers', (req, res) => {
  const { name, checked, questionId } = req.body
  return db.Answer.create({ name, checked, questionId })
    .then((answer) => res.send(answer))
    .catch((err) => {
      console.log('***There was an error creating a answer', JSON.stringify(err))
      return res.status(400).send(err)
    })
});

app.delete('/api/answers/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Answer.findById(id)
    .then((answer) => answer.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('***Error deleting answer', JSON.stringify(err))
      res.status(400).send(err)
    })
});

app.put('/api/answers/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Answer.findById(id)
  .then((answer) => {
    const { name, checked, questionId } = req.body
    return answer.update({ name, checked, questionId })
      .then(() => res.send(answer))
      .catch((err) => {
        console.log('***Error updating answer', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
});


//Routing

app.route('/survey/:id')
  .get(function(req, res) {
    res.sendFile(__dirname+'/static/questions.html');
  });

app.route('/question/:id')
  .get(function(req, res) {
    res.sendFile(__dirname+'/static/answers.html');
  });

https.createServer(options, app).listen(9002, () => {
    console.log('Server start');
});

//app.listen(9002, () => {
//  console.log('Server is up on port 9002');
//});
