const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le nom est déjà pris'
      },
      validate: {
        notEmpty: { msg: `Le nom ne peut pas etre vide.` },
        notNull: { msg: `Le nom est une propriete requise.` }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: `Utilisez uniquement des nombres entiers pour les points de vie.` },
        notNull: { msg: `Les points de vie sont une propriete requise.` },
        min: {
          args: [0],
          msg: "Les points de vie doivent etre superieurs a 0."
        },
        max: {
          args: [999],
          msg: "Les points de vie doivent etre inferieurs a 999."
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: `Utilisez uniquement des nombres entiers pour les points de vie.` },
        notNull: { msg: `Les points de vie sont une propriete requise.` },
        min: {
          args: [0],
          msg: "Les points de degats doivent etre superieurs a 0."
        },
        max: {
          args: [99],
          msg: "Les points de degats doivent etre inferieurs a 99."
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: `L'url renseignee n'est pas valide.` },
        notNull: { msg: `Les points de vie sont une propriete requise.` }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypeValid(value) {
          if (!value) {
            throw new Error('Un pokémon doit avoir au moins un type.')
          }
          if (value.split(',').length > 3) {
            throw new Error('Un pokémon ne peux pas avoir plus de trois types')
          }
          value.split(',').forEach(type => {
            if (!validTypes.includes(type)) {
              throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
            }
          })
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}