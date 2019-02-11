import { regGet, regPost } from '../service/index'
import databaseUtil from '../util/databaseUtil';

class User{
    
    @regGet('/login')
    login(params?:{userName: string, pwd: string}){
        const queryStr = `select * from WHX.TESTTABLE`;
        let result = databaseUtil.execute(queryStr, []);
        console.log(result);
        return result;
    }

    
}
