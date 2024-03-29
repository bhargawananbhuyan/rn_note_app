const Note = require('../models/Note')

const addNoteController = async (req, res) => {
	const { title, body, category } = req.body

	const newNote = new Note({ title, body, category, userId: req.user._id })

	try {
		const savedNote = await newNote.save()
		return res.status(201).json({ data: savedNote })
	} catch (error) {
		res.json({ error })
	}
}

const getAllNotesController = async (req, res) => {
	try {
		const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 })
		return res.status(200).json({ data: notes })
	} catch (error) {
		res.json({ error })
	}
}

const getANoteController = async (req, res) => {
	try {
		const note = await Note.findOne({
			$and: [{ userId: req.user._id }, { _id: req.params.id }],
		})
		return res.status(200).json({ data: note })
	} catch (error) {
		res.json({ error })
	}
}

const updateANoteController = async (req, res) => {
	try {
		const noteToUpdate = await Note.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
		return res.status(200).json({data: noteToUpdate})
	} catch (error) {
		res.json({ error })
	}
}

const deleteANoteController = async (req, res) => {
	try {
		const noteToDelete = await Note.findOneAndDelete({_id: req.params.id});
		return res.status(200).json({data: noteToDelete})
	} catch (error) {
		res.json({ error })
	}
}

module.exports = {
	addNoteController,
	getAllNotesController,
	getANoteController,
	updateANoteController,
	deleteANoteController,
}
