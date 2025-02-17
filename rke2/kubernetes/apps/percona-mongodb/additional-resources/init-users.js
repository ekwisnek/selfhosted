const mongodbSvcName = process.env.MONGODB_SERVICE_NAME;
const replSetName = process.env.MONGODB_REPLICASET_NAME;
const k8sNamespace = process.env.K8S_NAMESPACE;
const mongoHost = `mongodb+srv://${mongodbSvcName}-${replSetName}.${k8sNamespace}.svc.cluster.local`;
const adminDbName = "admin";
const adminUser = process.env.MONGODB_USER_ADMIN_USER;
const adminUserPassword = process.env.MONGODB_USER_ADMIN_PASSWORD;
const newCommonName = process.env.MONGODB_DATABASE_USER;
const newDbName = process.env.MONGODB_DATABASE_NAME;

if (!adminUser || !adminUserPassword || !mongoHost) {
  console.error("Missing environment variables for MongoDB connection.");
  process.exit(1);
}

// Connect to the admin database with the admin credentials
const conn = new Mongo(
  `${mongoHost}/admin?replicaSet=${replSetName}&ssl=false`
);
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
