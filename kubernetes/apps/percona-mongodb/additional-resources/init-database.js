const mongoHost =
  "mongodb-in-cluster-ps-rs0-0.mongodb-in-cluster-ps-rs0.mongodb.svc.cluster.local";
const mongoPort = 27017;
const adminDbName = "admin";
const adminUser = process.env.MONGODB_DATABASE_ADMIN_USER;
const adminUserPassword = process.env.MONGODB_DATABASE_ADMIN_PASSWORD;
const newDbName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_NAME;

if (!adminUser || !adminUserPassword || !mongoHost) {
  console.error("Missing environment variables for MongoDB connection.");
  process.exit(1);
}

// Connect to the admin database with the admin credentials
const conn = new Mongo(`${mongoHost}:${mongoPort}`);
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
