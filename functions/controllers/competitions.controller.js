const competitionsCtrl = {};

const db = require('../database')

const ref = db.collection('competitions')

competitionsCtrl.getCompetitions = async (req, res) => {
    try {
        const snapshot = await ref.get()
        const competitions = snapshot.docs.map(competition => ({ ...competition.data(), id: competition.id }))
        return res.status(200).json(competitions)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

competitionsCtrl.getCompetition = (req, res) => {
    (async () => {
        try {
            const doc = ref.doc(req.params.id)
            const item = await doc.get()
            const competition = { ...item.data()}
            return res.status(200).json(competition)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
    )()
}

competitionsCtrl.addCompetitions = async (req, res) => {
    try {
        const competition = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            Participantes: {
                participa: req.body.participa,
            }
        }
        await ref.doc().set(competition)
        return res.status(201).json()
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

competitionsCtrl.deleteCompetitions = async (req, res) => {
    try {
        await ref.doc(req.params.id).delete()
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

competitionsCtrl.updateCompetitions = async (req, res) => {
    try {
        const doc = ref.doc(req.params.id)
        await doc.update({ ...req.body })
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}



module.exports = competitionsCtrl;