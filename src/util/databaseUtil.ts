/*require the ibm_db module*/
import * as ibmdb from 'ibm_db';
import { Pool } from 'ibm_db';

const pool = new Pool();
const connStr = `DATABASE=whx;UID=db2inst1;PWD=db2inst1;HOSTNAME=47.98.132.56;port=50000`;
const ret = pool.init(5, connStr);
let database: any = null;
if(ret !== true) {
    console.log(ret);
}

pool.open(connStr, (err, db) => {
    if(err) {
       return console.log(err.message);
    }
    
    database = db;

    console.log('database pool connectt success!');

})




export default class DatabaseUtil {
     
    // 执行sql语句
    static execute(queryStr: string, param: Array<any>, isArray?: boolean): Array<object> |object {
        try{
            var stmt = database.prepareSync(queryStr);

            //Bind and Execute the statment asynchronously
            var result = stmt.executeSync([...param]);
            return result.fetchAllSync({fetchMode:isArray?3:4}); //default Fetch data in object mode. 3: array mode
        }catch(e) {
            console.log(JSON.stringify(e));
        }
        return {}
    }


}

// try{
    
//     let option = {
//         connectTimeout : 40,
//         systemNaming : true 
//     };
//     let conn = ibmdb.openSync(connStr);
//     // conn.query('')
// }catch(e) {
//     console.log(e.message);
// }


