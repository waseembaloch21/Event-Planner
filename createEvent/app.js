import {
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    db,
    collection,
    addDoc,
    auth,
} from '../utils/utils.js'

console.log(auth);

const event_form = document.getElementById('event_form')

event_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(e);

    const eventInfo = {
      banner :  e.target[0].files[0],
      title :  e.target[1].value,
      desc :  e.target[2].value,
      location : e.target[3].value,
       date : e.target[4].value,
      time : e.target[5].value,
      createdBy : auth.currentUser.uid,
      createdByEmail : auth.currentUser.email,
      likes:[],
    };

    console.log("eventinfo==>",eventInfo);

    const imgRef = ref(storage,eventInfo.banner.name )
    uploadBytes(imgRef, eventInfo.banner).then(()=>{
        console.log("file upload hogya");

        getDownloadURL(imgRef).then((url)=>{
            console.log("url agya",url);
            eventInfo.banner = url; 

            const eventCollection = collection(db, "events")
            addDoc(eventCollection, eventInfo).then(()=>{
                console.log("Documet Added");
                window.location.href = '/'

            })
        });
    });
});