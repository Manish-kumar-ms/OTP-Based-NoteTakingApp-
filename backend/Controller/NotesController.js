import NotesModel from "../Model/NotesModel.js";

export const createNote=async(req,res)=>{
    try {
         const { title} = req.body;

    const userId = req.user._id;
    console.log(userId)
    // Validate request
    if (!title ) {
        return res.status(400).json({ message: "Title is required" });
    }

    // Create a new note
    const newNote = await NotesModel.create({
        title,
        createdby: userId
    });

    return res.status(201).json({ success: true, message: "Note created successfully!", newNote });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Error creating note", error });
    }

};

export const deleteNote=async(req,res)=>{
    try {
        const noteId = req.params.id;
        
        if(!noteId){
            return res.status(400).json({ success: false, message: "Note ID is required" });
        }
        // Find the note by ID and delete it
        const deletedNote = await NotesModel.findByIdAndDelete(noteId);

        return res.status(200).json({ success: true, message: "Note deleted successfully", deletedNote });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error deleting note", error });
    }
}

export const getAllNotes = async (req, res) => {
    try {
        const userId = req.user._id;
        const notes = await NotesModel.find({ createdby: userId });
        return res.status(200).json({ success: true, message: "Notes fetched successfully", userAllNotes: notes });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching notes", error });
    }
};
