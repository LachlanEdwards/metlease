const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');

class Building extends Sequelize.Model {
}

module.exports = (sequelize, DataTypes) => {
  Building.init( {
    contractor: {
      type: Sequelize.STRING,
      validate: {
        len: [0,255]
      }
    },
    developer: {
      type: Sequelize.STRING,
      validate: {
        len: [0,255]
      }
    },
    management: {
      type: Sequelize.STRING,
      validate: {
        len: [0,255]
      }
    },
    build_date: {
      type: Sequelize.DATE
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        len: [0,255]
      }
    },
    class: {
      type: Sequelize.STRING,
      values: ['HIGHRISE', 'MIDRISE', 'LOWRISE']
    },
    cost: {
      type: Sequelize.STRING,
      values: ['HIGHCOST', 'MIDCOST', 'LOWCOST']
    },
    density: {
      type: Sequelize.STRING,
      values: ['HIGHDENSITY', 'MIDDENSITY', 'LOWDENSITY']
    },
    application: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    },
    features: {
      type: Sequelize.STRING,
      validate: {
        len: [0,999]
      }
    },
    environment_rating: {
      type: Sequelize.FLOAT,
      validate: {
        min: 0,
        max: 5
      }
    },
    longitude: {
      type: Sequelize.DECIMAL
    },
    latitude: {
      type: Sequelize.DECIMAL
    },
    mail: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: Sequelize.STRING,
      validate: {
        len: [0,255]
      }
    },
    website: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    },
    description: {
      type: Sequelize.STRING,
      validate: {
        len: [0,999]
      }
    },
    admin_id: {
      type: Sequelize.INTEGER
    },
    unit: {
      type: Sequelize.STRING,
      validate: {
        len: [0,255]
      }
    },
    number: {
      type: Sequelize.INTEGER
    },
    street_name: {
      type: Sequelize.STRING,
      validate: {
        len: [0,255]
      }
    },
    suffix: {
      type: Sequelize.STRING,
      values: ['Alley', 'Arcade', 'Avenue', 'Boulevard', 'Bypass', 'Circuit', 'Close', 'Corner', 'Court', 'Crescent', 'Cul-de-sac', 'Drive', 'Esplanade', 'Green', 'Grove', 'Highway', 'Junction', 'Lane', 'Link', 'Mews', 'Parade', 'Place', 'Ridge', 'Road', 'Square', 'Street', 'Terrace']
    },
    suburb: {
      type: Sequelize.STRING,
      validate: {
        len: [0,255],
        isAlpha: true
      }
    },
    state: {
      type: Sequelize.STRING,
      values: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Australian Capitol Territory", "Tasmania", "Northern Territory"]
    },
    post_code: {
      type: Sequelize.INTEGER,
      validate: {
        len: 4
      }
    },
    country: {
      type: Sequelize.STRING,
      validate: {
        len: [0,255],
        isAlpha: true
      }
    },
    city: {
      type: Sequelize.STRING,
      validate: {
        len: [0,255],
        isAlpha: true
      }
    },
    image: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      }
    },
    master_plan: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    },
    floors: {
      type: Sequelize.INTEGER
    },
    towers: {
      type: Sequelize.INTEGER
    },
    strata_levy: {
      type: Sequelize.STRING,
      validate: {
        len: [0,255]
      }
    },
    verified: {
      type: Sequelize.ENUM,
      values: ["Yes", "No"]
    },

  }, {
    sequelize,
    modelName: 'building',
  });
  return Building;
};
