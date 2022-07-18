const { model, Schema } = require('mongoose')

module.exports = model(
	'Note',
	new Schema({
		userId: { type: String, required: true },
		title: { type: String, required: true },
		body: { type: String, required: true },
		category: { type: Number, required: true },
		createdAt: { type: Date, default: Date.now },
	})
)
