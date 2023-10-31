const mongoHost =
  "mongodb-in-cluster-ps-rs0-0.mongodb-in-cluster-ps-rs0.mongodb.svc.cluster.local";
const mongoPort = 27017;
const adminDbName = "admin";
const adminUser = process.env.MONGODB_USER_ADMIN_USER;
const adminUserPassword = process.env.MONGODB_USER_ADMIN_PASSWORD;
const newCommonName = process.env.DATABASE_USER;
const newDbName = process.env.DATABASE_NAME;

if (!adminUser || !adminUserPassword || !mongoHost) {
  console.error("Missing environment variables for MongoDB connection.");
  process.exit(1);
}

// Connect to the admin database with the admin credentials
const conn = new Mongo(`${mongoHost}:${mongoPort}`);
const adminDB = conn.getDB(adminDbName);
const newDB = conn.getDB(newDbName);
adminDB.auth(adminUser, adminUserPassword);

// Add mongodb_exporter account for observability
try {
  adminDB.createUser({
    user: "mongodb_exporter",
    pwd: "password",
    roles: ["clusterMonitor"],
  });
} catch (error) {
  console.log(error);
}

// Add application user
try {
  newDB.getSiblingDB("$external").runCommand({
    createUser: `CN='${newCommonName}'`,
    roles: [{ role: "readWrite", db: newDbName }],
  });
} catch (error) {
  console.log(error);
}
