// Student controller

var Student = require('../models/student')

// Returns student list
module.exports.list = () => {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}
// Returns the student page
module.exports.lookUp = id => {
    return Student
        .findOne({numero:id})
        .exec()
}

module.exports.insert = student => {
    var newStudent = new Student(student)
    return newStudent.save()
}

module.exports.update = params => {
    return Student.updateOne({numero: params.id}, params.student)
}

module.exports.remove = id => {
	return Student.deleteOne({numero: id})
}
