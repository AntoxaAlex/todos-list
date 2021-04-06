const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema( {
    sections: [
        {
            section:{
                type:String
            },
            style:{
                fontColor:{
                    type:String
                },
                background:{
                    type: String
                }
            },
            todos:[
                {
                    text:{
                        type: String,
                        required: true
                    },
                    isCompleted:{
                        type:Boolean,
                        required: true
                    },
                    completedDate:{
                        type:Date,
                        required:true
                    }
                }
            ]
        }
    ]
})

module.exports = mongoose.model("Todolist",todosSchema)