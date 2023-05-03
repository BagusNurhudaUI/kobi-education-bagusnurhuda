const db = require('../model/model')
require('dotenv').config()
const examData = require('../data/exam.json')
const questionData = require('../data/question.json')


const createExam = async (req, res) => {
    try {
        exam = {
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            code: req.body.code,
            photo_url : req.body.photo_url,
            audio_url : req.body.audio_url
        }
        await db.exam.create(exam)
        .then( data => {
            return res.status(200).send({data})
        }).catch(err => {})

    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

const getExam = async (req, res) => {
    try {
        
        exam = await db.exam.findAll({
            include: [{
                model: db.question,
                
            }],
            order: [
                [  'createdAt', 'ASC'],
                [ {model : db.question},'no_question', 'ASC'],
                [ {model : db.question}, 'createdAt', 'ASC'], 
                [ {model : db.question},'id_question', 'ASC'],
                
            ],
        })
        return res.status(200).send({data: exam})
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({err: err})
    }
}

const dumpSql = async (req, res) => {
    try {
        console.log(examData.length, questionData.length);
        dataExam = []
        dataQuestion = []
        var promise = new Promise((resolve, reject) => {
            examData.map( async (exam, i,array) => {
                await db.exam.create(exam)
                .then((data) => {
                    console.log("selesai exam", i);
                    dataExam.push(data.dataValues)
                    if( i === array.length -1 ) resolve() 
                })
               
            })
        })

        var promise1 = new Promise((resolve, reject) => {
            questionData.forEach( async (question, i,array) => {
                await db.question.create(question)
                .then((data) => {
                    console.log("selesai question", i);
                    dataQuestion.push(data.dataValues) 
                    if( i === array.length -1 ) resolve() 
                })
                
                if( i === array.length -1 ) resolve()
            })
        })
        
        Promise.all([promise, promise1]).then(() => {
            return res.status(200).send({
                message : "test",
                exam : dataExam,
                question : dataQuestion
            })
        })
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({err: err})
    }
}

module.exports = {
    createExam,
    getExam,
    dumpSql

}