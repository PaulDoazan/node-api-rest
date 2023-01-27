const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.delete('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      const pokemonDeleted = pokemon;
      Pokemon.findAll()
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = `La liste des pokemons n'a pas pu etre recuperee. Reessayez dans quelques instants.`
          res.status(500).json({ message, data: error })
        })
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
        .then(_ => {
          const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
          res.json({ message, data: pokemonDeleted })
        })
        .catch(error => {
          const message = `Le pokemon n'a pu etre supprime. Reessayez dans quelques instants.`
          res.status(500).json({ message, data: error })
        })
    })
  })
}