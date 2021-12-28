const { Router } = require('express');
const router = Router();
const {getCompetitions, addCompetitions, deleteCompetitions, updateCompetitions, getCompetition } = require('../controllers/competitions.controller')

router.get('/competitions', getCompetitions);
router.get('/competitions/:id', getCompetition);
router.post('/competitions/add', addCompetitions);
router.delete('/competitions/:id', deleteCompetitions);
router.put('/competitions/:id', updateCompetitions);

module.exports = router;    