const mongoHost =
  "mongodb-in-cluster-ps-rs0-0.mongodb-in-cluster-ps-rs0.mongodb.svc.cluster.local";
const mongoPort = 27017;
const adminDbName = "admin";
const adminUser = "userAdmin";
const newCommonName = "evan";
const newDbName = "evan";

// Connect to the admin database with the admin credentials
const conn = new Mongo(`${mongoHost}:${mongoPort}`);
const adminDB = conn.getDB(adminDbName);
const newDB = conn.getDB(newDbName);
adminDB.auth(adminUser, "DWNiVxfa5lygpjb2I");

try {
  newDB.getSiblingDB("$external").runCommand({
    createUser: `CN='${newCommonName}'`,
    roles: [{ role: "readWrite", db: newDbName }],
  });
} catch (error) {
  console.log(error);
}
