const { Router } = require('express');
const router = Router();
const { getCompetitions, addCompetitions, deleteCompetitions, updateCompetitions, getCompetition, addParticipants } = require('../controllers/competitions.controller')

router.get('/competitions', getCompetitions);
router.get('/competitions/:id', getCompetition);
router.post('/competitions/add', addCompetitions);
router.post('/competitions/:id/participant', addParticipants);
router.delete('/competitions/:id', deleteCompetitions);
router.put('/competitions/:id', updateCompetitions);

module.exports = router;    
