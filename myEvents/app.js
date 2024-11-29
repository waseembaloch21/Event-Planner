import {
    auth,
    db,
    collection,
    getDoc,
    doc,
    signOut,
    onAuthStateChanged,
    getDocs,
    query, where,
  } from './utils/utils.js'
  
  const logout_btn = document.getElementById('logout_btn');
  const login_Event = document.getElementById('login_Event');
  const user_img = document.getElementById('user_img');
  const events_cards_container = document.getElementById('events_cards_container')
  
 
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      login_Event.style.display = "none";
      user_img.style.display = "inline-block";
      getUserInfo(uid);
      getMyEvents(user.uid);
      // ...
    } else {
      login_Event.style.display = "inline-block";
      user_img.style.display = "none";
    }
  });
  
  logout_btn.addEventListener("click", () => {
    signOut(auth);
  });
  
  function getUserInfo(uid) {
    const userRef = doc(db, "user", uid)
    getDoc(userRef).then((data) => {
      console.log("data==>", data.id);
      console.log("data==>", data.data());
  
      user_img.src = data.data()?.img;
    })
  };
  
  async function getMyEvents(uid) {
    try {
        const q = query(collection(db, "events"), where("createdBy", "==", uid));
        const querySnapshot = await getDocs(q);
      events_cards_container.innerHTML = ''
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    const event = doc.data()
  console.log("event==>",event);
    const {banner, title, location, createdByEmail, description,time,date, } = event
    const card =
     `<div class=" m-9  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
          <img class="rounded-t-lg" src="${banner}" alt="" />
      </a>
      <div class="p-5">
          <a href="#">
              <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h2>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Time: ${date},${time}</p>
           <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Creator: ${createdByEmail}</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Location: ${location}</p>
          <button
          id= ${doc.id}
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
           ${auth?.currentUser && event?.likes?.includes(auth?.currentUser.uid) ? "Liked..":"Like"}
         ${event?.likes?.length}
          </button>
      </div>
  </div>`;

    events_cards_container.innerHTML +=card;
    console.log(event);
  }); 
    } catch (err) {
      alert(err);
    }
  }
  