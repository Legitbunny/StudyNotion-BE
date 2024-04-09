const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type: String,
        required: true,
        trim: true
    },
    courseDescription:{
        type: String,
        required: true,
        trim:true
    },
    language:{
        type: String,
        required: true,
        trim:true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    whatYoullLearn:{
        type: String,
        required: true,
    },
    courseContent:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    ratingAndReviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReviews"
    }],
    price:{
        type:Number,
    },
    thumbnail:{
        type: String,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    studentEnrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }],
    tag:{
        type: [String],
        required: true,
    },
    instructions: {
        type:[String],
    },
    status:{
        type: String,
        enum: ["draft", "published"]
    }
});

module.exports = mongoose.model('Course', courseSchema);