import mongoose from "mongoose";

const NotesSchema=mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
   
})


const NotesModel = mongoose.model("NoteModel", NotesSchema);

export default NotesModel;
