const { DataTypes } = require("sequelize");
const moment = require("moment");
const db = require("./../utils/db");
const { SalaryType } = require("./salaryTypeModel");
const { EmploymentContractType } = require("./employmentContractTypeModel");

const Job = db.sequelize.define(
  "Job",
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
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: true,
        notNull: true,
        isInt: true,
        isIn: [[0, 1]],
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
    salary_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: SalaryType,
        key: "id",
      },
    },
    salary: {
      type: DataTypes.FLOAT(11, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    employment_contract_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: EmploymentContractType,
        key: "id",
      },
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        notNull: true,
        isDate: true,
        isAfter: moment().format("L"),
      },
    },
  },
  {
    tableName: "ojb_jobs",
    paranoid: true,
  }
);

/**
 * A model specific update function which will prepare user input for db insertion
 * @param {object} job - the job data to update
 * @param {obejct} where - the sql where clause
 * @returns Object
 */
async function _update(job, where) {
  if ("id" in job) delete job.id;
  return await Job.update(job, { where });
}

module.exports = { Job, _update };
