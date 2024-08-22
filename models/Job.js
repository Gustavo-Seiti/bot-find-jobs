import Sequelize from 'sequelize';
import {db} from '../db/connection.js';


const Job = db.define('job', {
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    company: {
        type: Sequelize.STRING,
    },
    local: {
        type: Sequelize.STRING,
    },
    modalidade: {   
        type: Sequelize.STRING
    },
    link: {   
        type: Sequelize.STRING
    },
    datePublished: {   
        type: Sequelize.STRING
    },
    modalidade: {   
        type: Sequelize.STRING
    },
    img: {   
        type: Sequelize.STRING
    }



});

  
export {Job};

