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
  return db.Survey.findByPk(id)
    .then((survey) => survey.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('***Error deleting survey', JSON.stringify(err))
      res.status(400).send(err)
    })
});

app.put('/api/surveys/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Survey.findByPk(id)
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
  return db.Question.findAll({ include: [{ 
    model: db.Answer,
   }]
  })
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
  return db.Question.findByPk(id)
    .then((question) => question.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('***Error deleting question', JSON.stringify(err))
      res.status(400).send(err)
    })
});

app.put('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Question.findByPk(id)
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
  return db.Answer.findByPk(id)
    .then((answer) => answer.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('***Error deleting answer', JSON.stringify(err))
      res.status(400).send(err)
    })
});

app.put('/api/answers/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Answer.findByPk(id)
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

//RespondentAnswer

app.get('/api/respondents', (req, res) => {
	return db.RespondentAnswer.findAll()
	  .then((respondentAnswers) => res.send(respondentAnswers))
	  .catch((err) => {
		console.log('There was an error querying answers', JSON.stringify(err))
		return res.send(err)
	  });
  });
  
app.post('/api/respondents', (req, res) => {
	const { name, content, surveyId, userId } = req.body
	return db.RespondentAnswer.create({ name, content, surveyId, userId })
	  .then((respondentAnswer) => res.send(respondentAnswer))
	  .catch((err) => {
		console.log('***There was an error creating a answer', JSON.stringify(err))
		return res.status(400).send(err)
	  })
});

app.delete('/api/respondents/:id', (req, res) => {
	const id = parseInt(req.params.id)
	return db.RespondentAnswer.findByPk(id)
	  .then((respondentAnswer) => respondentAnswer.destroy({ force: true }))
	  .then(() => res.send({ id }))
	  .catch((err) => {
		console.log('***Error deleting answer', JSON.stringify(err))
		res.status(400).send(err)
	  })
  });

  // user 

  app.get('/api/users', (req, res) => {
	return db.User.findAll({ include: [{ all: true, nested: true }]})
	  .then((users) => res.send(users))
	  .catch((err) => {
		console.log('There was an error querying users', JSON.stringify(err))
		return res.send(err)
	  });
  });
  
  app.post('/api/users', (req, res) => {
	const { name,email,password } = req.body
	return db.User.create({ name,email,password })
	  .then((user) => res.send(user))
	  .catch((err) => {
		console.log('***There was an error creating a user', JSON.stringify(err))
		return res.status(400).send(err)
	  })
  });
  
  app.post('/api/login', (req, res) => {
	const { email, password } = req.body
	return db.User.findOne({
		where: {email: email}
	  }).then(users => {
		// project will be the first entry of the Projects table with the title 'aProject' || null
		// project.get('title') will contain the name of the project
		// const id = req.body
		if (users.password == password) {
			return res.send({ status: true, message: 'Все отлично', userId: users.id})
		} else {
			return res.send({ status: false, message: 'Пароль не правильный'})
		}
	  }).catch((err) => {
		console.log('***Cannot find user', JSON.stringify(err))
		return res.send({ status: false, message: 'Пользователь не найден'})
	  })
  });

  app.delete('/api/users/:id', (req, res) => {
	const id = parseInt(req.params.id)
	return db.User.findByPk(id)
	  .then((user) => user.destroy({ force: true }))
	  .then(() => res.send({ id }))
	  .catch((err) => {
		console.log('***Error deleting user', JSON.stringify(err))
		res.status(400).send(err)
	  })
  });
  
  app.put('/api/users/:id', (req, res) => {
	const id = parseInt(req.params.id)
	return db.User.findByPk(id)
	.then((user) => {
	  const { name,email,password } = req.body
	  return user.update({ name,email,password })
		.then(() => res.send(user))
		.catch((err) => {
		  console.log('***Error updating user', JSON.stringify(err))
		  res.status(400).send(err)
		})
	})
  });

//Routing
app.route('/surveys')
  .get(function(req, res) {
    res.sendFile(__dirname+'/static/survey.html');
});
app.route('/survey/:id')
  .get(function(req, res) {
    res.sendFile(__dirname+'/static/questions.html');
  });
app.route('/adminq')
  .get(function(req, res) {
    res.sendFile(__dirname+'/static/admin/survey.html');
});
app.route('/adminq/survey/:id')
  .get(function(req, res) {
    res.sendFile(__dirname+'/static/admin/questions.html');
  });
app.route('/adminq/respondent/:id')
  .get(function(req, res) {
    res.sendFile(__dirname+'/static/admin/respondent.html');
});

app.route('/adminq/question/:id')
  .get(function(req, res) {
    res.sendFile(__dirname+'/static/admin/answers.html');
  });
  app.route('/adminq/users/')
  .get(function(req, res) {
    res.sendFile(__dirname+'/static/admin/users.html');
  });

https.createServer(options, app).listen(9008, () => {
    console.log('Server start');
});

//app.listen(9002, () => {
//  console.log('Server is up on port 9002');
//});
