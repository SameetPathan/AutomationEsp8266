import { initializeApp } from "firebase/app";
import { getDatabase, ref,get ,update,push } from "firebase/database";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const firebaseConfig = {
    apiKey: "AIzaSyBOpOaxJUFq8D3e9qOqY6MSi9AOk-elbBs",
    authDomain: "jarvishomeautomation-9c138.firebaseapp.com",
    databaseURL: "https://jarvishomeautomation-9c138-default-rtdb.firebaseio.com",
    projectId: "jarvishomeautomation-9c138",
    storageBucket: "jarvishomeautomation-9c138.appspot.com",
    messagingSenderId: "562568012799",
    appId: "1:562568012799:web:f9d4dce5907401bac1fdca"
};

export const app = initializeApp(firebaseConfig);

export function OnOffControl(id,flag) {
    const dbb = getDatabase();
    const AutoRef = ref(dbb, 'Relay/');

    get(AutoRef).then((snapshot) => {
        if (snapshot.exists()) {
            const AutoData = snapshot.val();
            AutoData[id] = flag;
           
            update(AutoRef, AutoData).then(() => {
                if(flag===1){
                    toast.success("On");
                }else{
                    toast.success("Off");
                }
                
            }).catch((error) => {
                toast.error('Error');
            });
        } else {
            toast.error('Error');
        }
    }).catch((error) => {
        toast.error('Error');
    });
}



// export function register(username) {
//     const db = getDatabase();
//     const usersRef = ref(db, 'users/');
//     push(usersRef, {
//       username: username
//     })
//       .then(() => {
//         alert('Registration successful');
//       })
//       .catch((error) => {
//         console.error('Error creating user:', error);
//         alert('Registration failed');
//       });
// }
  



