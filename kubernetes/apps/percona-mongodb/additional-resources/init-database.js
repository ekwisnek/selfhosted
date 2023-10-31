const mongodbSvcName = process.env.MONGODB_SERVICE_NAME;
const replSetName = process.env.MONGODB_REPLICASET_NAME;
const k8sNamespace = prcoess.env.K8S_NAMESPACE;
const mongoHost = `mongodb+srv://${mongodbSvcName}-${replSetName}.${k8sNamespace}.svc.cluster.local`;
const adminDbName = "admin";
const adminUser = process.env.MONGODB_DATABASE_ADMIN_USER;
const adminUserPassword = process.env.MONGODB_DATABASE_ADMIN_PASSWORD;
const newDbName = process.env.MONGODB_DATABASE_NAME;
const collectionName = process.env.MONGODB_COLLECTION_NAME;

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

// Check if the 'new' database already exists
if (!newDB.getName()) {
  // Create the 'new' database
  newDB.createCollection("exampleCollection"); // You can create an initial collection if needed
  print(`Database '${newDbName}' created.`);
} else {
  print(`Database '${newDbName}' already exists.`);
}

db = db.getSiblingDB(newDbName);

// Create new collection
try {
  db.createCollection(collectionName);
} catch (error) {
  console.log(error);
}

// Test inserting a document
id = db[collectionName].insertOne({ name: "test", age: 30 });

print(id);

print("\nFinding inserted ObjectId\n");

find = db[collectionName].find(ObjectId(id.insertedId));

print(find);

print("\nDeleting inserted ObjectId\n");

delete_ = db[collectionName].deleteOne({ _id: ObjectId(id.insertedId) });

print(delete_);
