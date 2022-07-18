const router = require('express').Router()
const {
	getAllNotesController,
	getANoteController,
	addNoteController,
	updateANoteController,
	deleteANoteController,
} = require('../controllers/notes')
const verifyUser = require('../middlewares/verifyUser')

router.get('/', verifyUser, getAllNotesController)
router.get('/:id', verifyUser, getANoteController)
router.post('/', verifyUser, addNoteController)
router.put('/:id', verifyUser, updateANoteController)
router.delete('/:id', verifyUser, deleteANoteController)

module.exports = router
