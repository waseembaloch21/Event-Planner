import {
    auth,
    signInWithEmailAndPassword,
} from '../../utils/utils.js'

const login_form = document.getElementById('login_form');

login_form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    console.log("email==>",email);
    console.log("password==>",password);

    signInWithEmailAndPassword(auth,email,password).then(()=>{
        window.location.href='/'
    }).catch((err) => alert(err));  
});
