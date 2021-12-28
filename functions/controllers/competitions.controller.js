const competitionsCtrl = {};

competitionsCtrl.getCompetitions = (req, res) => res.json({message: []});

competitionsCtrl.getCompetition = (req, res) => res.json({message: 'competition'});

competitionsCtrl.addCompetitions = (req, res) => res.json({message: 'competition create'});

competitionsCtrl.deleteCompetitions = (req, res) => res.json({message: 'competition deleted'});

competitionsCtrl.updateCompetitions = (req, res) => res.json({message: 'competition updated'});



module.exports = competitionsCtrl;