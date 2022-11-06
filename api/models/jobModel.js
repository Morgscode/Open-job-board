const mysql = require('mysql2');
const { Sequelize, DataTypes } = require('sequelize');
const moment = require('moment');
const db = require('../utils/db');

const Job = db.sequelize.define(
  'Job',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    salaryType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        isIn: [
          ['hourly', 'per-day', 'weekly', 'monthly', 'per-annum', 'pro-rata'],
        ],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        notEmpty: true,
        notNull: true,
        isDate: true,
        isAfter: moment().format('L'),
      },
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: true,
        isInt: true,
        isIn: [[0, 1]],
      },
    },
  },
  {
    tableName: 'jb_jobs',
    paranoid: true,
  }
);

if (process.env.NODE_ENV === 'development') {
  Job.sync()
    .then(() => console.log('jobs table synced'))
    .catch((err) => console.error(err));
}

async function _update(job, where) {
  if ('id' in job) delete id;
  return await Job.update(job, {where,});
}

module.exports = { Job, _update };
