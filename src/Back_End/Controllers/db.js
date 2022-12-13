const fs = require("fs");
const { nanoid } = require("nanoid");
// const path = `${__dirname}/db`;
const path = `./db`;
const moment = require("moment");

//use to create new database
class DB {
  constructor(dbName) {
    this.dbName = dbName;
    this.dbPath = `${path}/${dbName}.json`;
  }

  create = () => {
    this.save([]);
    console.log(`${this.dbName} Created!`);
  };

  //replaces entire content of database
  save = (data) => {
    fs.writeFileSync(this.dbPath, JSON.stringify(data));
    console.log("data has been updated! from db.js");
  };

  get = () => {
    const data = fs.readFileSync(this.dbPath, "utf-8");
    return JSON.parse(data);
    // return data;
  };

  add = (item) => {
    const data = this.get(); //gives me all data
    const newId = nanoid();
    const obj = { ...item, id: newId };
    data.push(obj);
    this.save(data);
    return obj;
  };

  find = (query) => {
    // //should return the item
    // const data = this.get(); //returns array of data
    // const item = data.find((i) => query(i));
    // return item;
    const fields = Object.keys(query);
    const values = Object.values(query);

    const filterAllFields = (data, fInd) => {
      if (typeof fields[fInd] === "undefined") {
        return data;
      }
      const currentField = fields[fInd];
      const shouldHaveValue = values[fInd];
      const filter = data.filter(
        (line) => line[currentField] === shouldHaveValue
      );
      return filterAllFields(filter, fInd + 1);
    };
    return filterAllFields(this.get(), 0)?.[0] || null;
  };

  getById = (id) => {
    //should return the item
    const data = this.get(); //returns array of data
    const item = data.find((item) => item.id === id);
    return item;
  };

  

  update = (id, item) => {
    const data = this.get();
    const index = data.findIndex((item) => item.id == id);
    const curr = data[index];
    data[index] = { ...item, id: curr.id, updatedAt: moment().unix() };
    console.log("data from db.js update", curr)
    this.save(data);
  };

  updateCol = (id, key, value) => {
    const data = this.get();
    const index = data.findIndex((item) => item.id == id);
    data[index][key] = value;
    this.save(data);
  };

  del = (id) => {
    const data = this.get();
    const newData = data.filter((i) => i.id !== id);
    this.save(newData);
  };
}

module.exports = DB;
