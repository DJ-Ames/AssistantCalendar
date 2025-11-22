const date = new Date(); // https://www.youtube.com/watch?v=o1yMqPyYeAo


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
const signinStatus = document.getElementById('signinStatus'); // Optional status area in modal













if (openBtn && modal && overlay && closeBtn && form && username && password && togglePwd && userInfo) { // ChatGPT. If all elements listen are on the page (When a user is using the sign in modal)

  const showSigninStatus = (msg, type = 'error') => { // ChatGPT. ShowsigninStatus stores error as a default message
    if (!signinStatus) { // ChatGPT. if there is no <div id="signinStatus"> on the page
      alert(msg); // ChatGPT. Sends error message
      return; // ChatGPT. Ends if statement
    }
    signinStatus.textContent = msg; // ChatGPT. Shows the status message
    signinStatus.className = 'form-status'; // ChatGPT. Resets status message
    signinStatus.classList.add(type);  // ChatGPT. Adds the error, success or info CSS style type
  };

  const escToClose = (e) => {  // ChatGPT. Sets a variable to be an escape key
    if (e.key === 'Escape') closeModal(); // ChatGPT. Closes modal after escape is pressed
  };

  const openModal = () => {   // ChatGPT. For opening the sign in modal
    modal.classList.add('active'); // ChatGPT. Makes the modal panel visible
    overlay.classList.add('active'); // ChatGPT. Makes the screen overlay cover the screen
    requestAnimationFrame(() => username.focus()); // ChatGPT. Focuses on the username text box
    document.addEventListener('keydown', escToClose); // ChatGPT. Activates the function that closes the modal when esc is pressed
    if (signinStatus) { // ChatGPT. If the sign in status element is there
      signinStatus.textContent = ''; // ChatGPT. Text is cleared
      signinStatus.className = 'form-status'; // ChatGPT. Sets CSS class to form-status
    } // ChatGPT.
  }; // ChatGPT.

  const closeModal = () => { // ChatGPT. To close the modal
    modal.classList.remove('active'); // ChatGPT. Remove active style from the modal
    overlay.classList.remove('active'); // ChatGPT. Remove active style from the overlay
    document.removeEventListener('keydown', escToClose); // ChatGPT. Ends the event listener waiting for escape to be pressed
  };

  // Toggle password visibility
  togglePwd.addEventListener('click', () => { // ChatGPT. Upon clicking the eye icon
    const isHidden = password.type === 'password'; // ChatGPT. Checks if the password is still set as password and hidden
    password.type = isHidden ? 'text' : 'password'; // ChatGPT. Switches between text or password setting for the password
    togglePwd.innerHTML = isHidden // ChatGPT. Checks if symbol is set to hidden
      ? '<i class="far fa-eye-slash"></i>' // ChatGPT. Slash over eye symbol
      : '<i class="far fa-eye"></i>'; // ChatGPT. Normal eye symbol
    password.focus(); // ChatGPT. Focus on the password box
  }); // ChatGPT.

  // Open / close bindings
  openBtn.addEventListener('click', openModal); // ChatGPT. Calls openModal on click of sign in
  closeBtn.addEventListener('click', closeModal); // ChatGPT. Closes modal after close button is clicked
  overlay.addEventListener('click', closeModal);  // ChatGPT. Closes modal afte4r overlay is clicked


  function updateUserDisplay() { // ChatGPT. For updating the username area after sign in
    if (currentUser) { // ChatGPT. If there is a current user
      userInfo.innerHTML = `
        Welcome, <strong>${currentUser}</strong>
        <br />
        <button id="signOutBtn" class="btn ghost" style="margin-top:8px;">
          Sign Out
        </button>
      `; // ChatGPT. Creates text displaying "welcome, username" and displays sign out button
      openBtn.style.display = 'none'; // ChatGPT. Hides sign in button

      document.getElementById('signOutBtn').addEventListener('click', () => { // ChatGPT. Upon clicking the sign out button
        currentUser = null; // ChatGPT. Set user to null
        // Optionally tell Flask you're logging out:
        // fetch('/api/logout', { method: 'POST' }).catch(() => {});
        updateUserDisplay(); // ChatGPT. Change user display to show the signed out page
      }); // ChatGPT.
    } else { // ChatGPT. If there is no current user
      userInfo.textContent = ''; // ChatGPT. Clear welcome text box
      openBtn.style.display = 'inline-block'; // ChatGPT. Makes sign in button visible
    }
  }

  // Initial state
  updateUserDisplay(); // ChatGPT. Calls the function to check if a user is signed in

  // ===== Login form submit → call Flask /api/login =====
  form.addEventListener('submit', async (e) => { // ChatGPT. async allows background running after submitting the sign in information
    e.preventDefault(); // ChatGPT. Stops page from reloading

    const user = username.value.trim(); // ChatGPT. Stores username. Trims white spaces from username value
    const pass = password.value; // ChatGPT. Stores Password.

    // Front-end validation
    if (!user || !pass) { // ChatGPT. If there is no username or password
      (!user ? username : password).focus(); // ChatGPT. Focus on whichever is missing
      showSigninStatus('Please enter both username and password.', 'error'); // ChatGPT. Send error message
      return; // ChatGPT. Finish
    }

    if (pass.length < 8) { // ChatGPT. If password is less than 8 characters
      password.focus(); // ChatGPT. Focus on password box
      showSigninStatus('Password must be at least 8 characters long.', 'error'); // ChatGPT. Error message
      return; // ChatGPT. Finish
    }  // ChatGPT.

    // Talk to backend
    try { // ChatGPT. Try for error handling
      showSigninStatus('Signing in...', 'info'); // ChatGPT. Signing in message

      const res = await fetch('/api/login', { // ChatGPT. Sends to the server
        method: 'POST', // ChatGPT. For client to server 
        headers: { 'Content-Type': 'application/json' }, // ChatGPT. JSON type for transport
        body: JSON.stringify({ username: user, password: pass }) // ChatGPT. Turns username and password into JSON
      }); // ChatGPT.

      const data = await res.json(); // ChatGPT. Stores JSON text as data

      if (!res.ok || !data.ok) { // ChatGPT. if the data doesn't transit or the text fails to become json
        showSigninStatus(data.error || 'Invalid username or password.', 'error'); // ChatGPT. error message
        return; // ChatGPT. Ends
      } // ChatGPT.

      // Success: store username from server & update UI
      currentUser = data.username || user; // ChatGPT. Current user equals data of user
      updateUserDisplay(); // ChatGPT. Shows username
      showSigninStatus('Login successful.', 'success'); // ChatGPT. Success status
      closeModal(); // ChatGPT. Closes sign in

    } catch (err) {  // ChatGPT. If there is an error
      console.error('Login error:', err); // ChatGPT. Console message
      showSigninStatus('Network error. Please try again.', 'error'); // ChatGPT. Error status message
    } // ChatGPT.
  }); // ChatGPT.
} // ChatGPT.











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

  
    const patterns = loadPatterns(); // ChatGPT. Stores patterns
    

    const idx = patterns.findIndex((p) => p.name === payload.name); // ChatGPT. Sees if a pattern has the same name and either updates or makes a new pattern

    const newRecord = { // ChatGPT. For adding a new pattern on the front end
      id: // ChatGPT. For setting an id
        idx >= 0 // ChatGPT. does the pattern exist
          ? patterns[idx].id // ChatGPT. if the id exists reuse
          : (window.crypto && crypto.randomUUID // ChatGPT. If the id does not exist make a new one
              ? crypto.randomUUID() // ChatGPT. Generate random number
              : String(Date.now())), // ChatGPT. Or use the date as a string
      name: payload.name, // ChatGPT. Take name from the payload name
      color: payload.color || "#10b981", // ChatGPT. Take the color from the payload color
      patternType: payload.patternType, // ChatGPT. Take the pattern type
      payload: payload // ChatGPT. store the whole payload object
    }; // ChatGPT.

    if (idx >= 0) { // ChatGPT. If a pattern with the same id existed
      patterns[idx] = newRecord; // ChatGPT.overwrite with the new pattern
    } else { // ChatGPT. Else
      patterns.push(newRecord); // ChatGPT. Create the new pattern
    }

    savePatterns(patterns); // ChatGPT. Add pattern data to the array

    if (typeof window.refreshPatternList === "function") { // ChatGPT. If the page has the menu list
      window.refreshPatternList(); // ChatGPT. refresh the page
    }

    // Later you will also POST to Flask here:
    // After payload is built & validated:
fetch("/create_event", { // ChatGPT. Send data to flask server
  method: "POST", // ChatGPT. use client to server method
  headers: { "Content-Type": "application/json" }, // ChatGPT. As JSON
  body: JSON.stringify(payload) // ChatGPT. Send the JSON payload
})
  .then(res => res.json()) // ChatGPT. If there is a response
  .then(data => { // ChatGPT. After the response
    if (!data.ok) { // ChatGPT. Checkes if the data was false
      alert(data.error || "Failed to create event");  // ChatGPT. Sends an error message about creation failure
      return; // ChatGPT. ends
    } // ChatGPT.
    console.log("Event created:", data); // ChatGPT. Logs that an event was created
    alert(`Event created. Dates inserted: ${data.datesInserted}`); // ChatGPT. Tells the user the event was successful. Displays dates inserted
  }) // ChatGPT.
  .catch(err => { // ChatGPT. If there is an error
    console.error("Error:", err); // ChatGPT. Console logs error
    alert("Network or server error."); // ChatGPT. Tells user there was an error
  }); // ChatGPT.

  }); // ChatGPT.
  // Initialize visibility on load
  applyVisibility(); // ChatGPT. Once everything is submitted returns to the default visibility screen
})(); // ChatGPT.



// check matching passwords
    // === Create Account → talk to Flask backend ===
document.addEventListener('DOMContentLoaded', () => { // ChatGPT. Waits until everything is loaded
  const createForm = document.getElementById('createForm'); // ChatGPT. Checks that user is on the create account page
  if (!createForm) return;  // ChatGPT. Don't run if not the create account page.

  const userInput    = document.getElementById('createUser'); // ChatGPT. The input username
  const passInput    = document.getElementById('createPass'); // ChatGPT. The input password
  const confirmInput = document.getElementById('confirmPass'); // ChatGPT. The input confirmed password
  const statusBox    = document.getElementById('createStatus'); // ChatGPT. The status of the create account attempt

  createForm.addEventListener('submit', async function (e) {  // ChatGPT. Waits for the submit button to be pressed.
    e.preventDefault(); // ChatGPT. Keeps browser from resetting when a submit fails

    const user     = userInput.value.trim();      // ChatGPT. Username text with whitespace removed
    const pass     = passInput.value;             // ChatGPT. First password text
    const confirm  = confirmInput.value;          // ChatGPT. Confirm password text

    // Reset status box styles
    statusBox.textContent = '';                   // ChatGPT. Empties the status box
    statusBox.className   = 'form-status';        // ChatGPT. Base class, removes previous error/success

    // ===== Front-end validation =====
    if (!user || !pass || !confirm) {             // ChatGPT. If a field is empty
      statusBox.textContent = 'Please fill out all fields.';  // ChatGPT. Tells user to fill out the empty field
      statusBox.classList.add('error');           // ChatGPT. Error status added
      return; // ChatGPT. ends
    }

    if (pass !== confirm) {                       // ChatGPT. If the password and the confirmation do not match
      statusBox.textContent = 'Passwords do not match. Please try again.'; // ChatGPT. Tells user passwords do not match
      statusBox.classList.add('error'); // ChatGPT. Sets status box to error
      return; // ChatGPT. ends
    }

    if (pass.length < 8) {                        // ChatGPT. If password is less than 8 characters
      statusBox.textContent = 'Password must be at least 8 characters long.'; // ChatGPT. Creates error message
      statusBox.classList.add('error'); // ChatGPT. Adds error style to status
      return; // ChatGPT. ends
    } // ChatGPT.

    // ===== Backend call to Flask =====
    try {  // ChatGPT. Try catch 
      statusBox.textContent = 'Creating account...';  // ChatGPT. Status box says creating account
      statusBox.classList.add('info'); // ChatGPT. Sets style to info

      const response = await fetch('/api/create-account', { // ChatGPT. Sends to the javascript server in the background
        method: 'POST', // ChatGPT. Client to server data
        headers: { 'Content-Type': 'application/json' }, // ChatGPT. As JSON
        body: JSON.stringify({ // ChatGPT. Turn into JSON string
          username: user, // ChatGPT. username JSON formatted
          password: pass // ChatGPT. Password JSON formatted
        }) // ChatGPT.
      }); // ChatGPT.

      const data = await response.json(); // ChatGPT. Store the response

      // Expecting something like { ok: true/false, message / error }
      if (!response.ok || !data.ok) { // ChatGPT. If the HTTP sending method failed
        statusBox.textContent = data.error || 'Could not create account.'; // ChatGPT. Error message
        statusBox.classList.remove('info'); // ChatGPT. Remove info style
        statusBox.classList.add('error'); // ChatGPT. Add error style to status box
        return; // ChatGPT. End
      } // ChatGPT.

      statusBox.textContent = data.message || 'Account created successfully!'; // ChatGPT. Sends status message telling user the account was created
      statusBox.classList.remove('info'); // ChatGPT. Removes info style
      statusBox.classList.add('success'); // ChatGPT. Adds success style

      createForm.reset(); // ChatGPT. Resets create account page

      // Optionally redirect to home / sign-in page after a short delay:
      // setTimeout(() => { window.location.href = 'home.html'; }, 1000);

    } catch (err) { // ChatGPT. If nothing goes through
      console.error('Network or server error:', err); // ChatGPT. Error message on console log
      statusBox.textContent = 'Network error. Please try again.'; // ChatGPT. Status box error message
      statusBox.classList.remove('info'); // ChatGPT. Remove info style
      statusBox.classList.add('error'); // ChatGPT. Add error style
    } // ChatGPT.
  }); // ChatGPT.
}); // ChatGPT.




    // ===== Pattern storage (front-end, localStorage) =====
const PATTERN_STORAGE_KEY = "assistantCalendarPatterns"; // ChatGPT. Stores the array of the patterns

function loadPatterns() { // ChatGPT. For loading the patterns on the menu
  try {
    const raw = localStorage.getItem(PATTERN_STORAGE_KEY); // ChatGPT. Gets whatever is stored in the key
    if (!raw) return []; // ChatGPT. Ends if nothing is stored
    const parsed = JSON.parse(raw); // ChatGPT. Turn into a JSON object
    return Array.isArray(parsed) ? parsed : []; // ChatGPT. Return the array stored
  } catch (err) { // ChatGPT. If the try statement doesn't work
    console.error("Failed to load patterns:", err); // ChatGPT. Send a console error
    return []; // ChatGPT. End
  } // ChatGPT.
} // ChatGPT.

function savePatterns(patterns) { // ChatGPT. Saves the patterns
  try { // ChatGPT. If things go right
    localStorage.setItem(PATTERN_STORAGE_KEY, JSON.stringify(patterns)); // ChatGPT. Saves the pattern array to JSON
  } catch (err) { // ChatGPT. If thing don't go right
    console.error("Failed to save patterns:", err); // ChatGPT. Send error message
  } // ChatGPT.
} // ChatGPT.

function ShowRibbon() { // ChatGPT. Function to unhide the ribbon
  const sideMenu = document.getElementById("sideMenu"); // ChatGPT. Stores the side menu CSS
  const ribbonBtn = document.querySelector(".RibbonClip"); // ChatGPT. Stores the Ribbonclip button CSS

  if (!sideMenu || !ribbonBtn) return; // ChatGPT. If there is no value for the side menu or ribbon button end the function

  const isOpen = sideMenu.classList.toggle("open"); // ChatGPT. Sets open to either true or false depending on whether or not the menu is open

  ribbonBtn.textContent = isOpen ? "<<<" : ">>>"; // ChatGPT. If the ribbon is open button font is <<< otherwise it is >>>

  document.body.classList.toggle("menu-open", isOpen); // ChatGPT. Adds menu-open class to the button so it moves with the menu. 
}


(function setupRibbonMenu() { // ChatGPT. Function to connect to the ribbon menu
  const sideMenu = document.getElementById("sideMenu"); // ChatGPT. Stores SideMenu div
  const patternList = document.getElementById("patternList"); // ChatGPT. Stores patternlist div
  const helpBtn = document.getElementById("helpBtn"); // ChatGPT. Stores help button
  const createEventBtn = document.getElementById("createEventBtn"); // ChatGPT. Stores create event button
  if (createEventBtn) { // ChatGPT. if the create event button is there 
    createEventBtn.addEventListener("click", () => { // ChatGPT. Upon click
      window.location.href = "create.html"; // ChatGPT. Take to create event page
  }); // ChatGPT.
} // ChatGPT.

  if (!sideMenu || !patternList) return; // ChatGPT. End if not on home page and there is no ribbon menu

  if (helpBtn) { // ChatGPT. If there is a help button
    helpBtn.addEventListener("click", () => { // ChatGPT. On click
      window.location.href = "help.html"; // ChatGPT. Take to help page
    }); // ChatGPT.
  } // ChatGPT.

  function renderPatternList() { // ChatGPT. For loading the user's patterns
    const patterns = loadPatterns(); // ChatGPT. Load saved patterns
    patternList.innerHTML = ""; // ChatGPT. Clear pattern list

    if (!patterns.length) { // ChatGPT. If there are no patterns
      patternList.innerHTML = 
        '<p class="pattern-empty">No patterns yet. Create one in the event builder.</p>'; // ChatGPT. Send a message saying there are no patterns yet
      return; // ChatGPT. end
    } // ChatGPT.

    patterns.forEach((p) => { // ChatGPT. Loop over everything in the pattern array
      const item = document.createElement("div"); // ChatGPT. Create a div for each item in the array
      item.className = "pattern-item"; // ChatGPT. Stores the name
      item.dataset.id = p.id; // ChatGPT. Give the pattern an id

      item.innerHTML = `
        <div class="pattern-main">
          <span class="pattern-color" style="background:${p.color || "#10b981"}"></span>
          <span class="pattern-name">${p.name}</span>
        </div>
        <div class="pattern-actions">
          <button type="button" class="pattern-btn edit-btn">Edit</button>
          <button type="button" class="pattern-btn delete-btn">Delete</button>
        </div>
      `; // ChatGPT. Would show the color, name, edit and delete on each of the user's events

      patternList.appendChild(item); // ChatGPT. Add the events to the list for the user to see
    }); // ChatGPT.
  } // ChatGPT.

  patternList.addEventListener("click", (e) => { // ChatGPT. For when an event is clicked
    const target = e.target; // ChatGPT. What was clicked
    const item = target.closest(".pattern-item"); // ChatGPT.Finds the pattern row
    if (!item) return; // ChatGPT. If there is no row ends

    const id = item.dataset.id; // ChatGPT. Check if item has an id
    if (!id) return; // ChatGPT. end if there is no id

    if (target.classList.contains("edit-btn")) { // ChatGPT. If the edit button is clicked
      // Go to edit page with pattern id in the query string
      window.location.href = `edit.html?id=${encodeURIComponent(id)}`; // ChatGPT. Opens the edit page
    } else if (target.classList.contains("delete-btn")) { // ChatGPT. If the delete button is clicked
      if (!confirm("Delete this pattern and its data?")) return; // ChatGPT. Asks user to confirm that the pattern should be deleted

      const patterns = loadPatterns().filter((p) => p.id !== id); // ChatGPT. If confirmed load the patterns and delete the one with the id of the one being deleted
      savePatterns(patterns); // ChatGPT. Save the new array
      renderPatternList(); // ChatGPT. Show the new list

      // Later: also send a delete request to Flask backend here.
      // fetch("/delete_pattern", { method: "POST", body: JSON.stringify({ id }) })
    }
  });

  // Initial render
  renderPatternList(); // ChatGPT. Fill the pattern list with the user's patterns

  // Expose a hook so event builder can refresh list if home and builder share JS
  window.refreshPatternList = renderPatternList; // ChatGPT. Refreshes to let the pattern change trigger wherever it needs to.
})(); // ChatGPT.
