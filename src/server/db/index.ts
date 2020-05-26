import MongoDB from 'mongodb';

const CONNECTION_URL = "mongodb+srv://dbUser:P@ssw0rd@draftcluster-ynuqw.gcp.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "draft";

let db: any;
let db2: any;

export const connect = async () => {
    const MongoClient = MongoDB.MongoClient;
    
    try{
        const client = await MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(DATABASE_NAME);
    } catch(e) {
        console.log(e)
    }
}


export const collection = (name:any) => {
    return db.collection(name);
};

