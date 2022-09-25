import { Collection, Db, MongoClient } from "mongodb";
import { User, Entry } from "./types";

class DB {
	private client: MongoClient;
	public db: Db;
	public users: Collection<User>;
	public entries: Collection<Entry>;

	constructor() {
		this.client = new MongoClient(process.env.MONGO_URI!);
		this.db = this.client.db("cash-register");
		this.users = this.db.collection("users");
		this.entries = this.db.collection("entries");
	}
}
const db = new DB();

export default db;
