const date = new Date(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

function ShowRibbon() {

};

const renderCalendar = () => { // https://www.youtube.com/watch?v=o1yMqPyYeAo
  date.setDate(1); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const monthDays = document.querySelector(".days"); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const lastDay = new Date( // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getFullYear(), // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getMonth() + 1, // https://www.youtube.com/watch?v=o1yMqPyYeAo
    0 // https://www.youtube.com/watch?v=o1yMqPyYeAo
  ).getDate(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const prevLastDay = new Date( // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getFullYear(), // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getMonth(), // https://www.youtube.com/watch?v=o1yMqPyYeAo
    0 // https://www.youtube.com/watch?v=o1yMqPyYeAo
  ).getDate(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const firstDayIndex = date.getDay(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const lastDayIndex = new Date( // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getFullYear(), // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getMonth() + 1, // https://www.youtube.com/watch?v=o1yMqPyYeAo
    0 // https://www.youtube.com/watch?v=o1yMqPyYeAo
  ).getDay(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const nextDays = 7 - lastDayIndex - 1; // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const months = [ // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "January", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "February", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "March", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "April", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "May", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "June", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "July", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "August", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "September", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "October", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "November", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "December", // https://www.youtube.com/watch?v=o1yMqPyYeAo
  ];

  document.querySelector(".date h2").innerHTML = months[date.getMonth()]; // https://www.youtube.com/watch?v=o1yMqPyYeAo edited

  document.querySelector(".date p").innerHTML = new Date().toDateString(); // https://www.youtube.com/watch?v=o1yMqPyYeAo edited

  document.querySelector(".date h1").innerHTML = date.getFullYear(); 

  let days = ""; // https://www.youtube.com/watch?v=o1yMqPyYeAo

  for (let x = firstDayIndex; x > 0; x--) { // https://www.youtube.com/watch?v=o1yMqPyYeAo
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`; // https://www.youtube.com/watch?v=o1yMqPyYeAo
  } 

  for (let i = 1; i <= lastDay; i++) { // https://www.youtube.com/watch?v=o1yMqPyYeAo
    if ( // https://www.youtube.com/watch?v=o1yMqPyYeAo
      i === new Date().getDate() && // https://www.youtube.com/watch?v=o1yMqPyYeAo
      date.getMonth() === new Date().getMonth() && // https://www.youtube.com/watch?v=o1yMqPyYeAo
      date.getFullYear() === new Date().getFullYear() 
    ) {
      days += `<div class="today">${i}</div>`; // https://www.youtube.com/watch?v=o1yMqPyYeAo
    } else { // https://www.youtube.com/watch?v=o1yMqPyYeAo
      days += `<div>${i}</div>`; // https://www.youtube.com/watch?v=o1yMqPyYeAo
    }
  }

  for (let j = 1; j <= nextDays; j++) { // https://www.youtube.com/watch?v=o1yMqPyYeAo
    days += `<div class="next-date">${j}</div>`; // https://www.youtube.com/watch?v=o1yMqPyYeAo
  }
  monthDays.innerHTML = days; // https://www.youtube.com/watch?v=o1yMqPyYeAo
};

document.querySelector(".prev").addEventListener("click", () => { // https://www.youtube.com/watch?v=o1yMqPyYeAo
  date.setMonth(date.getMonth() - 1); // https://www.youtube.com/watch?v=o1yMqPyYeAo
  renderCalendar(); // https://www.youtube.com/watch?v=o1yMqPyYeAo
});

document.querySelector(".next").addEventListener("click", () => { // https://www.youtube.com/watch?v=o1yMqPyYeAo
  date.setMonth(date.getMonth() + 1); // https://www.youtube.com/watch?v=o1yMqPyYeAo
  renderCalendar(); // https://www.youtube.com/watch?v=o1yMqPyYeAo
});

renderCalendar(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

    const openBtn = document.getElementById('openSignIn'); // ChatGPT. Uses the button for opening the modal from the home screen. Stores as openBtn.
    const modal = document.getElementById('signInModal'); // ChatGPT. Uses and stores the modal container. Stores as modal
    const overlay = document.getElementById('modalOverlay'); // ChatGPT. Calls the modalOverlay container Stores as overlay
    const closeBtn = document.getElementById('closeSignIn'); // ChatGPT. Calls the close button. Stores as closeBtn
    const form = document.getElementById('signinForm'); // ChatGPT. Uses the form element. Stores as form
    const username  = document.getElementById('username'); // ChatGPT. Stores username input. Stores as username
    const password  = document.getElementById('password'); // ChatGPT. Stores password input. Stores as password.
    const togglePwd = document.getElementById('togglePwd'); // ChatGPT. Toggle password reveal. Stores as togglePwd
    const userInfo = document.getElementById('userInfo'); // ChatGPT. Username display. Stores as userInfo

    const openModal = () => { // ChatGPT. Function to open the modal
      modal.classList.add('active'); // ChatGPT. Sets the modal as active and allows it to become visible
      overlay.classList.add('active'); // ChatGPT. Sets the overlay as active which makes it visible
      requestAnimationFrame(() => username.focus()); // ChatGPT. Focuses on the username textbox so the user can immediately type
      document.addEventListener('keydown', escToClose); // ChatGPT. Allows user to close the modal by pressing escape
    };

    const closeModal = () => { // ChatGPT. Function to close the modal
      modal.classList.remove('active'); // ChatGPT. Removes the active status from modal to close it
      overlay.classList.remove('active'); // ChatGPT. Removes the active status from overlay
      document.removeEventListener('keydown', escToClose); // ChatGPT. User can no longer do anything with the escape button
    };

    const escToClose = (e) => { // ChatGPT. Function for when the escape key is pressed. Variable e is used.
      if (e.key === 'Escape') closeModal(); // ChatGPT. The e value reaches escape then the modal is closed.
    }; // ChatGPT

    togglePwd.addEventListener('click', () => { // ChatGPT. When the show password button is pressed
      const isHidden = password.type === 'password'; // ChatGPT. Determines whether or not an input is in password mode. Stores whether it is or isn't.
      password.type = isHidden ? 'text' : 'password'; // ChatGPT. If the password type is in clear text switches to the password mode. Otherwise switches to text
      togglePwd.innerHTML = isHidden ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>'; // ChatGPT. Changes the icon from an eye to an eye with a slash in it
      password.focus(); // ChatGPT. Focuses on the password box after pressing the reveal button so the user can type
    });

    openBtn.addEventListener('click', openModal); // ChatGPT. Pressing the sign in button opens the modal
    closeBtn.addEventListener('click', closeModal); // ChatGPT. Pressing the red x button on the modal closes it

    form.addEventListener('submit', (e) => { // ChatGPT. Eventlistener waits for a password and username submission.
      e.preventDefault(); // ChatGPT. Keeps the browser from reloading when a wrong input is made

      const user = username.value.trim(); // ChatGPT. Removes leading and trailing whitespaces in a username, stores username
      const pass = password.value; // ChatGPT. Stores password value

      if (!user || !pass) { // ChatGPT. If user or pass have no value
        (!user ? username : password).focus(); // ChatGPT. Focudrd on username if user is empty otherwise it focuses on password.
        return; // ChatGPT. stop
      }

      if (pass.length < 8) { // ChatGPT. Determines if the password value is less than 8
        password.focus(); // ChatGPT. Focuses on the password box so it can be rewritten.
        return; // ChatGPT. stops
      } // ChatGPT

      // sign in call

      currentUser = user;          // ChatGPT. Stores the input and trimmed username.
      updateUserDisplay();         // ChatGPT. Calls function to display to show the sign out button and the username
      closeModal(); // ChatGPT. Calls function to close the modal
    }); // ChatGPT


let currentUser = null; // ChatGPT. The variable that tracks the input username


function updateUserDisplay() { // ChatGPT. Function to change the user display after someone signs in
  if (currentUser) { // ChatGPT. An if statement that works whenever someone is logged in
    userInfo.innerHTML = `
      Welcome, <strong>${currentUser}</strong> 
      <br /> 
      <button id="signOutBtn" class="btn ghost" style="margin-top:8px;">Sign Out</button>
    `; // ChatGPT. Changes the userinfo divider to display the string above. Also adds a sign out button.

    openBtn.style.display = "none"; // ChatGPT. Hides the sign in button whenever someone is logged in. 

    document.getElementById('signOutBtn').addEventListener('click', () => { // ChatGPT. Whenever signout button is clicked
      currentUser = null; // ChatGPT. Removes the current user from the variable.
      updateUserDisplay(); // ChatGPT. Returns to being signed out
    });
  } else { // ChatGPT. When no one is signed in
    userInfo.textContent = ""; // ChatGPT. Gets rid of the welcome message.
    openBtn.style.display = "inline-block"; // ChatGPT. Allows the sign in button to be seen again.
}
};



