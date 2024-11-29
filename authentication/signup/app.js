import {
    auth,
    createUserWithEmailAndPassword,
    doc,
    db,
    setDoc,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
} from '../../utils/utils.js'

const Signup_btn = document.getElementById('Signup_form');
const submit_btn = document.getElementById('submit_btn');

Signup_btn.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(e);
    console.log(e.target);

    const img = e.target[0].files[0];
    const email = e.target[1].value;
    const password = e.target[2].value;
    const firstName = e.target[4].value;
    const lastName = e.target[5].value;
    const phone = e.target[6].value;
    const company = e.target[7].value;


    let userInfo = {
        img,
        email,
        password,
        firstName,
        lastName,
        phone,
        company,
    }

    //create account

    submit_btn.disabled = true
    submit_btn.innerText = 'loading...'
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
        console.log("user==>", user.user.uid);
        const userRef = ref(storage, `users/${user.user.uid}`);
        uploadBytes(userRef, img).then(() => {
            console.log("user image uploade");

            getDownloadURL(userRef).then((url) => {
                console.log("url agaya bahi==>",url);

                userInfo.img=url

                const userDbRef = doc(db, "users", user.user.uid )
                setDoc(userDbRef, userInfo).then(()=>{
                    console.log("User object updated into DB");
                    window.location.href="/"
                     submit_btn.disabled = false
                     submit_btn.innerText = 'Submit'
                })

            }).catch((err)=>{
                alert(err)
                submit_btn.disabled = false
                     submit_btn.innerText = 'Submit'
            })

        }).catch(() => {
            console.log("Error in uploading user image");
        });

    })
        .catch((err) => alert(err));

    console.log(userInfo);
});