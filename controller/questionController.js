const db = require('../model/model')


const createQuestion = async (req, res, next) => {
    try {
        console.log(req.params._id);
        question = {
            type : req.body.type,
            question_text : req.body.question_text,
            photo_url : req.body.photo_url,
            audio_url : req.body.audio_url,
            answer : req.body.answer,
            option_a: req.body.option_a,
            option_b : req.body.option_b,
            option_c : req.body.option_c,
            option_d : req.body.option_d,
            id_exam : req.params._id
        }
        hasil = await db.question.create(question)
        return res.status(200).send({message : "Succesfully create question", data: hasil})
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err.message);
    }
   
}
const getQuestion = async (req, res, next) => {
    try {
        console.log(req.params._id);
        hasil = await db.question.findAll({
            where : {
                id_exam : req.params._id
            }
        })
        return res.status(200).send({data: hasil})
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err.message);
    }
    

}


module.exports = {
    createQuestion,
    getQuestion,

}