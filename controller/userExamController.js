const db = require('../model/model')
const Helper = require('../middleware/helper')
const dbUser = db.user
require('dotenv').config()
const { comparePassword } = require('../middleware/helper')
const { where } = require('sequelize')

const takeExam = async (req, res) => {
    try {
        id_user = req.id
        id_exam = req.params._id
        take_count = await db.take_exam.findAll({where: {id_user:id_user, id_exam:id_exam}})
        takeCount = take_count.length + 1
        take_exam = {
            id_user : id_user,
            id_exam : id_exam,
            takeCount : takeCount,
            status : req.body.status,
            take_count : takeCount,
            score : req.body.score
        }
        hasil = await db.take_exam.create(take_exam)
        console.log(hasil);
        return res.status(200).send({
            message : "Success create take_exam",
            data : hasil
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({message : err.message})
    }
}

const takeAnswer = async (req, res) => {
    try {
        id_take_exam = req.query.id_take_exam
        id_question = req.query.id_question
        take_answer = {
            id_take_exam : id_take_exam,
            id_question : id_question,
            answer_text : req.body.answer_text,
            nilai : 0
        }
        getAnswer = await db.question.findOne({where: {id_question: id_question}, attributes: ['answer']})
        getAnswer = getAnswer.dataValues.answer
        console.log({getAnswer});
        
        if(getAnswer.toLowerCase() == take_answer.answer_text.toLowerCase()) {
            take_answer.nilai = 1
        }
        console.log(take_answer);
        
        check = await db.take_answer.findAll({where : {id_take_exam : id_take_exam, id_question : id_question}})
        if(check.length == 0){
            // create ans
            hasil = await db.take_answer.create(take_answer)
            return res.status(200).send({
                message: "Successfully created answer",
                data : hasil
            })
        }else {
            //update ans
            hasil = await db.take_answer.update(take_answer, {where : {id_take_exam : id_take_exam, id_question : id_question}})
            hasil1 = await db.take_answer.findOne({where : {id_take_exam : id_take_exam, id_question : id_question}})
            return res.status(200).send({
                message: "Successfully updated answer",
                data : hasil1
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({message : err})
    }
}


const submitExam = async (req, res) => {
    try {

        id_take_exam = req.query.id_take_exam

        getIdExam = await db.take_exam.findByPk(id_take_exam, {
            attributes : ['id_exam']
        });

        id_exam = getIdExam.dataValues.id_exam;

        getTotalQuestion = await db.question.count({
            where : {
                id_exam : id_exam
            }
        })
        let sql = "SELECT SUM(nilai) as `total` FROM take_answers WHERE id_take_exam =  (:id_take_exam)"
        hasil = await db.sequelize.query(sql, {
            replacements: {id_take_exam : id_take_exam},
          })
        score = hasil[0][0].total * 100 / getTotalQuestion

        take_exam = {
            score : score,
            status : "finished",
        }
        console.log({take_exam});

        hasil = await db.take_exam.update(take_exam, {where : {
            id_take_exam : id_take_exam,
        }})
        hasil1 = await db.take_exam.findOne({where : {
            id_take_exam : id_take_exam,
        }})

        return res.status(200).send({
            message :"Succes submit exam!",
            data : hasil1
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({message : err})
    }
}

const getResultExam = async (req, res) => {
    try {
        id_take_exam = req.query.id_take_exam;
        id_user = req.id
        hasil = await db.take_exam.findAll({
            where : {
                id_user : id_user
            }, 
            include : [{
                model : db.exam
            }, {
                model : db.take_answer
            }]
        });
        return res.status(200).send({
            message : "Success get result",
            data : hasil
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({message : err})
    }
}

module.exports = {
    takeExam,
    takeAnswer,
    submitExam,
    getResultExam
}