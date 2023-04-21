const models = {
  user: require("./nosql/User"),
  role: require("./nosql/Role"),
  permission: require("./nosql/Permission"),
  category: require("./nosql/Category"),
  blog: require("./nosql/Blog"),
  resources: require("./nosql/Resources"),
  event: require("./nosql/Event"),
  person: require("./nosql/Person"),
  tag: require("./nosql/Tag"),
  organization: require("./nosql/Organization"),
  areas: require("./nosql/Area"),
  institution: require("./nosql/Institution"),
  specialist: require("./nosql/Specialist"),
  contact: require("./nosql/Contact"),
  countries: require('./nosql/Country'),
  suscription: require('./nosql/Suscribers')
};

module.exports = models;
