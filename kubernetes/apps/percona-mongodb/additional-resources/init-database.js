const mongoHost =
  "mongodb-in-cluster-ps-rs0-0.mongodb-in-cluster-ps-rs0.mongodb.svc.cluster.local";
const mongoPort = 27017;
const adminDbName = "admin";
const adminUser = "databaseAdmin";
const newCommonName = "evan";
const newDbName = "evan";
const collectionName = "test_collection";

// Connect to the admin database with the admin credentials
const conn = new Mongo(`${mongoHost}:${mongoPort}`);
const adminDB = conn.getDB(adminDbName);
const newDB = conn.getDB(newDbName);
adminDB.auth(adminUser, "wH4qlp7HPOT17iZT");

// Switch to the 'evan' database
const evanDB = conn.getDB(newDbName);

// Check if the 'evan' database already exists
if (!evanDB.getName()) {
  // Create the 'evan' database
  evanDB.createCollection("exampleCollection"); // You can create an initial collection if needed
  print(`Database '${newDbName}' created.`);
} else {
  print(`Database '${newDbName}' already exists.`);
}

db = db.getSiblingDB(newDbName);

try {
  db.createCollection(collectionName);
} catch (error) {
  console.log(error);
}

id = db[collectionName].insertOne({ name: "test", age: 30 });

print(id);

print("Finding inserted ObjectId\n");

find = db[collectionName].find(ObjectId(id.insertedId));

print(find);

print("Deleting inserted ObjectId\n");

delete_ = db[collectionName].deleteOne({ _id: ObjectId(id.insertedId) });

print(delete_);
