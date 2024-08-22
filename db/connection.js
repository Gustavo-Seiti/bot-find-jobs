import { Sequelize } from 'sequelize';

const db = new Sequelize({
    dialect: 'sqlite',
    storage :'../job_finder/db/app.db',
    logging: false
});

export {db};