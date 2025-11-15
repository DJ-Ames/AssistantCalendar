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








// ===== Event Builder Logic =====
(function () {  // ChatGPT. 
  const $$ = (sel) => document.querySelector(sel); // ChatGPT. Shortcut to the HTML document
  const $$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel)); // ChatGPT. Creates another shortcut to the HTML document allowing for arrays

  const form = $$("#eventBuilderForm"); // ChatGPT. Looks for the eventbuilder form 
  if (!form) return; // ChatGPT. If the event builder form is not on the page then ends code

  const patternSelect = $$("#patternType"); // ChatGPT. Takes the type of pattern selected
  const sections = $$$(".eb-section"); // ChatGPT. Holds an array of all of the data types the patterns can use
  const preview = $$("#eventPreview"); // ChatGPT. For the JSON preview of the input data

  // Show/hide sections based on selected pattern
  function applyVisibility() { // ChatGPT. For hiding and showing parts of patterns that aren't shared between all patterns
    const val = patternSelect.value; // ChatGPT. Finds the current pattern type
    sections.forEach(sec => { // ChatGPT. Checks each available data type used by the patterns
      sec.hidden = sec.getAttribute("data-for") !== val; // ChatGPT. Finds if the data type is valid for the pattern type. If not applies the hidden status
    }); // ChatGPT. 
  } // ChatGPT. 

  patternSelect.addEventListener("change", applyVisibility); // ChatGPT. upon changing event type runs applyVisibility()

  // Biweekly picker toggles
  $$$(".biweekly-grid .day-toggle").forEach(btn => { // ChatGPT. Finds the day of the week buttons
    btn.addEventListener("click", () => { // ChatGPT. After clicking the button
      btn.classList.toggle("active"); // ChatGPT. Sets the button to active to turn it green
    }); // ChatGPT. 
  }); // ChatGPT. 

  // Helper: collect selected biweekly days into {week1:[...], week2:[...]}
  function getBiweeklySelection() { // ChatGPT. To gather the days selected for the biweekly pattern
    const weeks = { week1: [], week2: [] }; // ChatGPT. Creates arrays for weeks 1 and 2
    $$$(".week-col").forEach(col => { // ChatGPT. Fills arrays with the days
      const week = col.getAttribute("data-week") === "1" ? "week1" : "week2"; // ChatGPT. Determines whether the week is the first or the second
      $$$(".day-toggle.active", col).forEach(btn => { // ChatGPT. Loops through until all active days are found
        weeks[week].push(Number(btn.getAttribute("data-day"))); // ChatGPT. Pushes the day of the week onto one of the week arrays.
      }); // ChatGPT.
    }); // ChatGPT.
    return weeks; // ChatGPT. Returns the day numbers of both weeks
  }

  // Validate date range quickly
  function validRange(start, end) { // ChatGPT. function using the input start and end dates
    if (!start || !end) return false; // ChatGPT. Does not allow start or end to be empty
    const s = new Date(start); // ChatGPT. Creates a constant from the input start date
    const e = new Date(end); // ChatGPT. Creates a constant from the input end date
    return !isNaN(s) && !isNaN(e) && s <= e; // ChatGPT. Makes sure the start and end dates are valid dates and the start date is before the end date
  }

  // Build payload by pattern
  function buildPayload() { // ChatGPT. Collects the data for the pattern
    const base = { // ChatGPT. For the default pattern data that's shared between all patterns.
      patternType: patternSelect.value, // ChatGPT. The pattern type
      startDate: $$("#startDate")?.value || null, // ChatGPT. The input start date
      endDate: $$("#endDate")?.value || null, // ChatGPT. The input end date
      name: $$("#patternName")?.value?.trim() || "", // ChatGPT. The pattern name
      note: $$("#patternNote")?.value?.trim() || "", // ChatGPT. The pattern note
      color: $$("#colorChoice")?.value || null // ChatGPT. The pattern color
    }; // ChatGPT.

    switch (base.patternType) { // ChatGPT. Runs different code based on the type of pattern
      case "223": // ChatGPT. When a 223 pattern
        return {
          ...base, // ChatGPT. The default types
        }; // ChatGPT. Return just the default pattern data types
      case "every-x-days": // ChatGPT. When an every x days pattern
        return { // ChatGPT. Return the default types and the every nth day type
          ...base, // ChatGPT. The default types
          intervalDays: parseInt($$("#xDaysInterval")?.value || "0", 10) || null, // ChatGPT. The every nth day data type
        }; 
      case "every-other-day": // ChatGPT. When every other day datatype
        return { ...base }; // ChatGPT. Just return the base data types
      case "every-x-weekday": // ChatGPT. When every x weekday pattern
        return { // ChatGPT. Return the default and the day of the week
          ...base, // ChatGPT. Return default
          weekday: $$("#weekday")?.value === "" ? null : Number($$("#weekday")?.value) // ChatGPT. Return weekday value
        };
      case "nth-day-year": // ChatGPT. when nth day year datatype
        return { // ChatGPT. Returns defaul, day of the month and month of the year
          ...base, // ChatGPT. Default
          month: $$("#monthOfYear")?.value === "" ? null : Number($$("#monthOfYear")?.value), // ChatGPT. month of the year
          dayOfMonth: parseInt($$("#dayOfMonth")?.value || "0", 10) || null // ChatGPT. Day of the year
        };
      case "biweekly": // ChatGPT. When biweekly pattern type
        return { // ChatGPT. Store the default and the days the user chose
          ...base, // ChatGPT. Default data types
          biweekly: getBiweeklySelection() // ChatGPT. The days selected by the user
        };
      case "ai-prompt": // ChatGPT. When ai-prompt pattern type
        return { // ChatGPT. The default and the prompt data types
          ...base, // ChatGPT. store the default
          aiPrompt: $$("#aiPromptText")?.value?.trim() || "" // ChatGPT. Store the prompt
        }; // ChatGPT.
      default: // ChatGPT. If nothing is yet selected
        return base; // ChatGPT. Show the default data types
    } // ChatGPT.
  } // ChatGPT.

  // Simple per-pattern required fields check
  function validateByPattern(payload) { // ChatGPT. Error messages for the pattern types
    if (!payload.patternType) return "Please select a pattern type."; // ChatGPT. Error for when there is no patternType
    if (!validRange(payload.startDate, payload.endDate)) return "Start Date must be on or before End Date."; // ChatGPT. If the dates are an invalid range (such as end before start) send an error message
    if (!payload.name) return "Please provide a Name."; // ChatGPT. If there is no name datatype sends an error message

    switch (payload.patternType) { // ChatGPT. Validates based on patterntype
      case "223": // ChatGPT. If the type is 223
        return null; // ChatGPT. No extra validation needed
      case "every-x-days": // ChatGPT. If the patterntype is every x days
        if (!payload.intervalDays || payload.intervalDays < 1) return "Enter a valid 'Every X Days' interval (>= 1)."; // ChatGPT. Send error if 0 or lower is entered
        return null; // ChatGPT. No extra validation needed
      case "every-other-day": // ChatGPT. if the patterntype is every other day
        return null; // ChatGPT. No extra validation needed
      case "every-x-weekday": // ChatGPT. If the pattern type is every x weekday
        if (payload.weekday == null) return "Please choose a weekday."; // ChatGPT. Sends error message if no day is chosen
        return null; // ChatGPT. No extra validation needed
      case "nth-day-year": // ChatGPT. if the event type is nth day of every year
        if (!payload.month || payload.month < 1 || payload.month > 12) return "Choose a valid month."; // ChatGPT. Sends error message if a month value over 12 or less than 1 is chosen
        if (!payload.dayOfMonth || payload.dayOfMonth < 1 || payload.dayOfMonth > 31) return "Choose a valid day of month (1–31)."; // ChatGPT. Sends an error message if the day isn't between 1 and 31
        return null; // ChatGPT. No extra validation needed
      case "biweekly": // ChatGPT. If biweekly is chosen
        if ((!payload.biweekly?.week1?.length) && (!payload.biweekly?.week2?.length)) {
          return "Select at least one day in Week 1 or Week 2.";
        } // ChatGPT. If both weeks arrays are empty
        return null; // ChatGPT. No extra validation needed
      case "ai-prompt": // ChatGPT. If the ai prompt patterntype is selected
        if (!payload.aiPrompt) return "Please enter a Prompt for the AI.";  // ChatGPT. If there is no prompt send error message
        return null; // ChatGPT. No extra validation needed
      default: // ChatGPT. If none is selected
        return "Unknown pattern type."; // ChatGPT. Return error message
    } // ChatGPT.
  } // ChatGPT.

  // Submit handler (stays on page; logs JSON; shows preview)
  form.addEventListener("submit", (e) => { // ChatGPT. When submit is pressed in event builder
    e.preventDefault(); // ChatGPT. Keeps page from reloading after submission

    const payload = buildPayload(); // ChatGPT. Runs the buildPayload function that collects all the data input
    const err = validateByPattern(payload); // ChatGPT. Validates the data input

    if (err) { // ChatGPT. If err value is not null
      alert(err); // ChatGPT. Shows the error message
      return; // ChatGPT. ends statement
    }

    // Preview & console for now; you can POST to Flask later.
    preview.hidden = false; // ChatGPT. Makes the JSON preview visible
    preview.textContent = JSON.stringify(payload, null, 2); // ChatGPT. Formats the payload data into a JSON format
    console.log("Event payload:", payload); // ChatGPT. logs the data made.

    // Example for Flask later:
    // fetch("/create_event", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload)
    // }).then(r => r.json()).then(console.log).catch(console.error);
  });

  // Initialize visibility on load
  applyVisibility(); // ChatGPT. Once everything is submitted returns to the default visibility screen
})(); // ChatGPT.




// check matching passwords
    document.getElementById('createForm').addEventListener('submit', function (e) {  // ChatGPT. Waits for the submit button to be pressed.
      e.preventDefault(); // ChatGPT. Keeps browser from resetting when a submit fails

      const user = document.getElementById('createUser').value.trim(); // ChatGPT. Username text with white space removed
      const pass = document.getElementById('createPass').value; // ChatGPT. First password text
      const confirm = document.getElementById('confirmPass').value; // ChatGPT. Confirm password text
      const statusBox = document.getElementById('createStatus'); // ChatGPT. Whether or not the password succeeded or failed

      statusBox.textContent = ''; // ChatGPT. Empties the status box
      statusBox.className = 'form-status'; // ChatGPT. removes the error and success modifiers from the form status

      if (!user || !pass || !confirm) { // ChatGPT. If a field is empty
        statusBox.textContent = 'Please fill out all fields.'; // ChatGPT. Status box tells user to fill out the field
        statusBox.classList.add('error'); // ChatGPT. Error status added
        return; // ChatGPT. end loop
      }

      if (pass !== confirm) { // ChatGPT. If the password and the confirmation attempt do not match
        statusBox.textContent = 'Passwords do not match. Please try again.'; // ChatGPT. Status box tells user they do not match
        statusBox.classList.add('error'); // ChatGPT. error message occurs
        return; // ChatGPT. end loop
      }

      if (pass.length < 8) { // ChatGPT. if password is less than 8 characters
        statusBox.textContent = 'Password must be at least 8 characters long.'; // ChatGPT. Tells user password must be 8 characters or more
        statusBox.classList.add('error'); // ChatGPT. sets to error
        return; // ChatGPT. end loop
      }

      // TODO: when you build your backend, send data with fetch() here:
      // fetch('/api/create-account', { method: 'POST', body: JSON.stringify({ username: user, password: pass }) ... })

      statusBox.textContent = 'Account created (demo only). Connect backend next.'; // ChatGPT. Status box confirms success if nothing goes wrong
      statusBox.classList.add('success'); // ChatGPT. success status added

      // Optionally reset form
      // this.reset();
    });