import * as crypto from 'crypto-js';

export class AppUtils {
    public static hash( data: any ) : string {
        return crypto.SHA256(JSON.stringify(data)).toString();
    }

    public static setLocal(key, value){
        localStorage.setItem(key,JSON.stringify(value)); 
    }

    public static getLocal(key) : any{
         return JSON.parse(localStorage.getItem(key));
    }

    public static deleteLocal(key){
          localStorage.removeItem('userToken');
    }

    public static getArrayIds(formArray: any[], modelArray: any[]) :string[]{
        const selectedOrderIds = formArray
        .map((v, i) => v ? modelArray[i]._id : null)
        .filter(v => v !== null);
        return selectedOrderIds;
    }

    public static matchView(idView) : boolean{
        const user = JSON.parse(localStorage.getItem("userData"));
        console.log(user);
        if(user){
            if(user.vistas){
                if(user.vistas.includes(idView)){return true}
                else{return false;}
            }
            else{return false;}
        }
        else {return false;}
    }
}
