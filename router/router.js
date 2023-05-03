const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const examController = require('../controller/examController')
const questionController = require('../controller/questionController')
const userExamController = require('../controller/userExamController')
const Auth = require('../middleware/auth');

/*
CREATE NEW USER
req body : 
@role (default value is 'student') -required
@email - required
@password -required
@name - optional
@phone - optional
@photo_url - optional
*/
router.post('/signup', userController.signUp) 

/*
LOGIN
req body : 
@email - required
@password -required
*/
router.post('/login', userController.login) 

/*
CREATE EXAM QUIZ
req body : 
@title
@description
@duration
@code
@photo_url
@audio_url
*/
router.post('/exam',Auth.verifyTokenAdmin, examController.createExam)

/*
GET ALL EXAM QUIZ
*/
router.get('/exam',Auth.verifyToken ,examController.getExam)

/*
CREATE EXAM QUESTION
req params :
@_id : the id of the exam
req body : 
@type
@question_text
@photo_url
@audio_url
@answer
@option_a
@option_b
@option_c
@option_d
*/
router.post('/exam/:_id/question', Auth.verifyTokenAdmin, questionController.createQuestion)

/*
GET ALL EXAM QUESTION 
req params :
@_id : the id of the exam
*/
router.get('/exam/:_id/question',Auth.verifyToken, questionController.getQuestion)

/*
START EXAM
req params :
@_id : the id of the exam
*/
router.post('/exam/:_id/',Auth.verifyToken, userExamController.takeExam)

/*
CREATE ANSWER OR UPDATE THE QUESTION OF EXAM
req query :
@id_take_exam : the id of teh take exam
@id_question : the id of the question
req.body :
@answer_text : the answer want to submitted
*/
router.post('/answer', Auth.verifyToken,userExamController.takeAnswer)

/*
SUBMIT THE EXAM AND FINISH IT
req query :
@id_take_exam : the id of teh take exam
*/
router.post('/answerexam',Auth.verifyToken, userExamController.submitExam)

/*
GET THE RESULT OF EXAM
*/
router.get('/resultexam', Auth.verifyToken, userExamController.getResultExam)

/*
FOR DUMP DATABASE
*/
router.post('/dump', examController.dumpSql)


module.exports = router