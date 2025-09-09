import Note from "../Models/Note.js"



export async function GetAllNotes(req,res){
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    }
    catch(error){
        console.error("Failed to fetch notes", error);
        res.status(500).json({messsage: "Internal server error"});
    }
}

export async function createNote(req,res){
    try{
        const {title, content}= req.body;
        const note = new Note({title, content});
        const SavedNote = await note.save();
        res.status(201).json(SavedNote);
    }catch(error){
        console.error("Error creating Note", error);
        res.status(500).json({messsage: "Internal server error"});
    }
}

export async function updateNote(req,res){
    try {
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content});
        if(!updateNote) return res.status(404).json({message:"Note not found"});
        res.status(201).json({message:"Content updated succesfully"});
    } catch (error) {
        console.error("Error creating Note", error);
        res.status(500).json({messsage: "Internal server error"});
    }
}

export async function deleteNote(req,res){
    try {
        
        const delNode = await Note.findByIdAndDelete(req.params.id);
        res.status(201).json({message:"Note Deleted succesfully!"});
    } catch (error) {
        console.error("Error creating Note", error);
        res.status(500).json({messsage: "Internal server error"});
    }
}

export async function getNoteByID(req,res){
    try {
        const requestedNote = await Note.findById(req.params.id);
        if(!requestedNote) return res.status(404).json({message:"Note not found. Please check the ID again"});
        res.status(201).json({requestedNote});
    } catch (error) {
        console.error("Error creating Note", error);
        res.status(500).json({messsage: "Internal server error"});
    }
}