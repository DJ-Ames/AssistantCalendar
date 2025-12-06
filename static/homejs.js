document.addEventListener("DOMContentLoaded", function () { // ChatGPT. Runs function when HTML page is loaded
  // ---------------- CALENDAR ----------------
  const date = new Date(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  // Store event dates for the calendar display
  let calendarEventDates = {}; // ChatGPT. Stores event dates

  // Function to fetch event dates for the current month
  const fetchCalendarDates = async () => { // ChatGPT. Function to get event dates
    try { // ChatGPT. Try first
      const year = date.getFullYear(); // ChatGPT. Get current year
      const month = date.getMonth() + 1; // ChatGPT. Get current month 
      
      const response = await fetch(`/api/calendar-dates?year=${year}&month=${month}`); // ChatGPT. Get dates from flask
      const data = await response.json(); // ChatGPT. Wait for JSON response
      
      if (data.ok) { // ChatGPT. If successful
        calendarEventDates = data.dates; // ChatGPT. Store the dates
      } else { // ChatGPT. Otherwise
        calendarEventDates = {}; // ChatGPT. Reset to empty
      }
    } catch (err) { // ChatGPT. If error
      console.error('Error fetching calendar dates:', err); // ChatGPT. Log error to console
      calendarEventDates = {}; // ChatGPT. Set to empty
    }
  }; // ChatGPT.

  const createEventDots = (dateStr) => { // ChatGPT. HTML for the dots
    const events = calendarEventDates[dateStr]; // ChatGPT. Get events on this date
    if (!events || events.length === 0) { // ChatGPT. If no events
      return ''; // ChatGPT. Return empty string
    }
    
    // Create dots container with individual dots
    let dotsHtml = '<div class="event-dots">'; // ChatGPT. Start dots container
    events.forEach((event) => { // ChatGPT. Loop through events
      const color = event.color ? (event.color.startsWith('#') ? event.color : '#' + event.color) : '#10b981'; // ChatGPT. Store event color
      dotsHtml += `<span class="event-dot" style="background-color:${color}" title="${event.name}"></span>`; // ChatGPT. Add the color dot
    }); // ChatGPT.
    dotsHtml += '</div>'; // ChatGPT. Close dots container
    return dotsHtml; // ChatGPT. Add the dot HTML to the home page
  }; // ChatGPT.

  const renderCalendar = async () => { // https://www.youtube.com/watch?v=o1yMqPyYeAo - Modified to be async
    date.setDate(1); // https://www.youtube.com/watch?v=o1yMqPyYeAo

    const monthDays = document.querySelector(".days"); // https://www.youtube.com/watch?v=o1yMqPyYeAo
    if (!monthDays) return; // ChatGPT. Safety check - if calendar isn't on this page, stop

    await fetchCalendarDates(); // ChatGPT. Fetch events before rendering

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
    ]; // https://www.youtube.com/watch?v=o1yMqPyYeAo

    document.querySelector(".date h2").innerHTML = months[date.getMonth()]; // edited https://www.youtube.com/watch?v=o1yMqPyYeAo
    document.querySelector(".date p").innerHTML = new Date().toDateString(); // edited https://www.youtube.com/watch?v=o1yMqPyYeAo
    document.querySelector(".date h1").innerHTML = date.getFullYear(); 

    let days = ""; // https://www.youtube.com/watch?v=o1yMqPyYeAo

    // Previous month days
    const prevMonth = date.getMonth() === 0 ? 12 : date.getMonth(); // ChatGPT. Get previous month number
    const prevYear = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear(); // ChatGPT. Get previous year if needed
    for (let x = firstDayIndex; x > 0; x--) { // https://www.youtube.com/watch?v=o1yMqPyYeAo
      const dayNum = prevLastDay - x + 1; // ChatGPT. Calculate day number
      const dateStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`; // ChatGPT. Format date string
      const dots = createEventDots(dateStr); // ChatGPT. Get event dots
      days += `<div class="prev-date day-cell"><span class="day-number">${dayNum}</span>${dots}</div>`; // ChatGPT. Include color dots in the cell
    } // https://www.youtube.com/watch?v=o1yMqPyYeAo

    for (let i = 1; i <= lastDay; i++) { // https://www.youtube.com/watch?v=o1yMqPyYeAo
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`; // ChatGPT. Format date string
      const dots = createEventDots(dateStr); // ChatGPT. Get event dots
      
      if ( // https://www.youtube.com/watch?v=o1yMqPyYeAo
        i === new Date().getDate() && // https://www.youtube.com/watch?v=o1yMqPyYeAo
        date.getMonth() === new Date().getMonth() && // https://www.youtube.com/watch?v=o1yMqPyYeAo
        date.getFullYear() === new Date().getFullYear() // ChatGPT. Check if date matches current year
      ) { 
        days += `<div class="today day-cell"><span class="day-number">${i}</span>${dots}</div>`; // ChatGPT. Updates the dots in the cell
      } else { // https://www.youtube.com/watch?v=o1yMqPyYeAo
        days += `<div class="day-cell"><span class="day-number">${i}</span>${dots}</div>`; // ChatGPT. Updates the dots in the cell
      } // https://www.youtube.com/watch?v=o1yMqPyYeAo
    } // https://www.youtube.com/watch?v=o1yMqPyYeAo
 
    // Next month days
    const nextMonth = date.getMonth() === 11 ? 1 : date.getMonth() + 2; // ChatGPT. Get next month number
    const nextYear = date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear(); // ChatGPT. Get next year
    for (let j = 1; j <= nextDays; j++) { // https://www.youtube.com/watch?v=o1yMqPyYeAo
      const dateStr = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(j).padStart(2, '0')}`; // ChatGPT. Format date string
      const dots = createEventDots(dateStr); // ChatGPT. Get event dots
      days += `<div class="next-date day-cell"><span class="day-number">${j}</span>${dots}</div>`; // ChatGPT. updates dots with the month change
    } 
    monthDays.innerHTML = days; // https://www.youtube.com/watch?v=o1yMqPyYeAo
  }; 

  const prevBtn = document.querySelector(".prev"); // ChatGPT. The element for the previous button
  const nextBtn = document.querySelector(".next"); // ChatGPT. The element for the next button

  if (prevBtn && nextBtn) { // ChatGPT. If previous or next buttons are clicked
    prevBtn.addEventListener("click", () => { // ChatGPT. Upon clicking previous
      date.setMonth(date.getMonth() - 1);  // https://www.youtube.com/watch?v=o1yMqPyYeAo
      renderCalendar(); // https://www.youtube.com/watch?v=o1yMqPyYeAo
    }); 

    nextBtn.addEventListener("click", () => { // ChatGPT. Upon clicking next
      date.setMonth(date.getMonth() + 1); // https://www.youtube.com/watch?v=o1yMqPyYeAo
      renderCalendar(); // https://www.youtube.com/watch?v=o1yMqPyYeAo
    }); 
  } 

  renderCalendar(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  window.refreshCalendar = renderCalendar; // ChatGPT. Renders calendar upon refresh


  // ---------------- AUTH STATE MANAGEMENT ----------------
  let currentUser = null; // ChatGPT. The variable that tracks the input username
  let currentUserId = null; // ChatGPT. The variable that tracks the user id

  // Get DOM elements for auth UI
  const openBtn   = document.getElementById('openSignIn');   // ChatGPT. Uses the button for opening the modal from the home screen. Stores as openBtn.
  const modal     = document.getElementById('signInModal');  // ChatGPT. Uses and stores the modal container. Stores as modal
  const overlay   = document.getElementById('modalOverlay'); // ChatGPT. Calls the modalOverlay container Stores as overlay
  const closeBtn  = document.getElementById('closeSignIn');  // ChatGPT. Calls the close button. Stores as closeBtn
  const form      = document.getElementById('signinForm');   // ChatGPT. Uses the form element. Stores as form
  const username  = document.getElementById('username');     // ChatGPT. Stores username input. Stores as username
  const password  = document.getElementById('password');     // ChatGPT. Stores password input. Stores as password.
  const togglePwd = document.getElementById('togglePwd');    // ChatGPT. Toggle password reveal. Stores as togglePwd
  const userInfo  = document.getElementById('userInfo');     // ChatGPT. Username display. Stores as userInfo

  // Function to update the UI based on login state
  const updateUserDisplay = () => { // ChatGPT. For updating the user display when someone is signed in
    if (!userInfo) return; // ChatGPT. End function if there is no user.
    
    if (currentUser) { // ChatGPT. If there is a user logged in.
      userInfo.innerHTML = `
        Welcome, <strong>${currentUser}</strong>
        <br />
        <button id="signOutBtn" class="btn ghost" style="margin-top:8px;">Sign Out</button>
      `; // ChatGPT. Sends a welcome message for the current user. Changes the button to a sign out button.
      
      if (openBtn) { // ChatGPT. If there is a sign in button on screen
        openBtn.style.display = 'none'; // ChatGPT. Hide the sign in button
      } 
      
      const signOutBtn = document.getElementById('signOutBtn'); // ChatGPT. Holds the sign out button
      if (signOutBtn) { // ChatGPT. If there is a sign out button
        signOutBtn.addEventListener('click', handleSignOut); // ChatGPT. Calls sign out function on click
      } 

      // Refresh the pattern list from the database when logged in
      if (typeof renderPatternList === 'function') { // ChatGPT. Calls the list of user patterns
        renderPatternList(); // ChatGPT. Shows the list
      } 

      if (typeof window.refreshCalendar === 'function') { // ChatGPT. If calendar refresh is available
        window.refreshCalendar(); // ChatGPT. Refresh calendar to show event dots
      } 
    } else { // ChatGPT. If there is no user logged in
      userInfo.textContent = ""; // ChatGPT. Remove welcome text
      
      // Show the Sign In button when logged out
      if (openBtn) { // ChatGPT. If there is a sign in button
        openBtn.style.display = ''; // ChatGPT. Show no text above it
      } 

      if (typeof renderPatternList === 'function') { // ChatGPT. when logged out
        renderPatternList(); // ChatGPT. Render the empty pattern list
      } 

      // Refresh the calendar to clear event dots
      if (typeof window.refreshCalendar === 'function') { // ChatGPT. If calendar refresh is available
        window.refreshCalendar(); // ChatGPT. Refresh calendar to clear event dots
      } 

      const notesPlaceholder = document.getElementById('notesPlaceholder'); // ChatGPT. Store notes placeholder element
      const notesDisplay = document.getElementById('notesDisplay'); // ChatGPT. Store notes display element
      if (notesPlaceholder && notesDisplay) { // ChatGPT. If both elements exist
        notesPlaceholder.style.display = 'block'; // ChatGPT. Show the placeholder
        notesDisplay.style.display = 'none'; // ChatGPT. Hide the notes display
      } 
      window.currentPatterns = []; // ChatGPT. Clear stored patterns
    } 
  }; 

  // Function to handle sign out
  const handleSignOut = async () => { // ChatGPT. Sign out function
    try { // ChatGPT. Try first
      const response = await fetch('/api/logout', { // ChatGPT. Calls logout in Flask
        method: 'POST', // ChatGPT. Uses POST method to reach flask
        headers: { 'Content-Type': 'application/json' } // ChatGPT. Send info in JSON to flask
      }); 
      
      const data = await response.json(); // ChatGPT. Waits for a response in JSON
      
      if (data.ok) { // ChatGPT. If cleared by flask
        currentUser = null; // ChatGPT. Empty current user
        currentUserId = null; // ChatGPT. Empty user id
        updateUserDisplay(); // ChatGPT. Update display
      } 
    } catch (err) { // ChatGPT.If receiving error from JSON
      console.error('Logout error:', err); // ChatGPT. Shows a console error.
      currentUser = null; // ChatGPT. Empties current user
      currentUserId = null; // ChatGPT. Empties user id
      updateUserDisplay(); // ChatGPT. Updates display
    } 
  }; 

  // Function to check if user is already logged in (called on page load)
  const checkLoginStatus = async () => { // ChatGPT. Checks if user is logged in
    try { // ChatGPT. Tries first
      const response = await fetch('/api/check-session', { // ChatGPT. Connects with flask endpoint
        method: 'GET', // ChatGPT. Uses GET method to get the data
        headers: { 'Content-Type': 'application/json' } // ChatGPT. JSON format
      }); 
      
      const data = await response.json(); // ChatGPT. Waits for the data from flask
      
      if (data.ok && data.loggedIn) { // ChatGPT. If receiving the data and the user is logged in
        currentUser = data.username; // ChatGPT. Uses the users username
        currentUserId = data.userId; // ChatGPT. Uses the users userID
        updateUserDisplay(); // ChatGPT. Updates display
      } 
    } catch (err) { // ChatGPT. if receiving an error
      console.error('Session check error:', err); // ChatGPT. Sends console error message
      // If check fails, assume not logged in
    } 
  }; 

  // Check login status when page loads
  checkLoginStatus(); // ChatGPT. Checks login status upon loading a page

  // Expose currentUser check for other parts of the code
  window.isLoggedIn = () => currentUser !== null; // ChatGPT. isLoggedIn is true if there is a user
  window.getCurrentUserId = () => currentUserId; // ChatGPT. Stores user id


  // ---------------- SIGN-IN MODAL ----------------

  if (openBtn && modal && overlay && closeBtn && form && username && password && togglePwd) { // ChatGPT. If all of these buttons are on the page

    const openModal = () => { // ChatGPT. For adding the active class to the sign in modal
      modal.classList.add('active'); // ChatGPT. Makes the sign in modal visible
      overlay.classList.add('active'); // ChatGPT. Makes the overlay visible
      requestAnimationFrame(() => username.focus()); // ChatGPT. Focuses on username
      document.addEventListener('keydown', escToClose); // ChatGPT. Closes upon clicking escape
    }; 

    const closeModal = () => { // ChatGPT. For closing the modal
      modal.classList.remove('active'); // ChatGPT. Makes sign in invisible
      overlay.classList.remove('active'); // ChatGPT. Makes sign in overlay invisible
      document.removeEventListener('keydown', escToClose); // ChatGPT. Escape to close modal
    }; 

    const escToClose = (e) => { // ChatGPT. For the escape to close function
      if (e.key === 'Escape') closeModal(); // ChatGPT. Pressing escape closes the modal
    }; 

    togglePwd.addEventListener('click', () => { // ChatGPT. Upon clicking toggle password
      const isHidden = password.type === 'password'; // ChatGPT. Checks if the password is still set as password and hidden
      password.type = isHidden ? 'text' : 'password'; // ChatGPT. Switches between text or password setting for the password
      togglePwd.innerHTML = isHidden // ChatGPT. Checks if symbol is set to hidden
        ? '<i class="far fa-eye-slash"></i>' // ChatGPT. Slash over eye symbol
        : '<i class="far fa-eye"></i>'; // ChatGPT. Normal eye symbol
      password.focus(); // ChatGPT. Focus on the password box
    }); 

    openBtn.addEventListener('click', openModal); // ChatGPT. Calls openModal on click of sign in
    closeBtn.addEventListener('click', closeModal);  // ChatGPT. Closes modal after close button is clicked
    overlay.addEventListener('click', closeModal); // ChatGPT. Closes modal after overlay is clicked

    // Handle sign in form submission - NOW CALLS THE REAL API
    form.addEventListener('submit', async (e) => { // ChatGPT. listens for the submission of the sign in modal
      e.preventDefault(); // ChatGPT. Stops page from reloading

      const user = username.value.trim(); // ChatGPT. Stores username. Trims white spaces from username value
      const pass = password.value; // ChatGPT. Stores Password.

      if (!user || !pass) { // ChatGPT. If there is no username or password
        (!user ? username : password).focus(); // ChatGPT. Focus on whichever is missing
        return; // ChatGPT. Finish
      } 

      if (pass.length < 8) { // ChatGPT. If password is less than 8 characters
        password.focus(); // ChatGPT. Focus on password box
        return; // ChatGPT. Finish
      } 

      // Call the actual login API
      try { // ChatGPT. Try first
        const response = await fetch('/api/login', { // ChatGPT. To the login route
          method: 'POST', // ChatGPT. POST METHOS
          headers: { 'Content-Type': 'application/json' }, // ChatGPT. As JSON
          body: JSON.stringify({
            username: user,
            password: pass
          }) // ChatGPT. Send username and password data to Flask
        }); 

        const data = await response.json(); // ChatGPT. Waits for response from backend

        if (data.ok) { // ChatGPT. if response is ok
          // Login successful - update state and UI
          currentUser = data.username; // ChatGPT. Update username
          currentUserId = data.userId; // ChatGPT. update user ID
          updateUserDisplay(); // ChatGPT. Update sign in button
          closeModal(); // ChatGPT. Close sign in modal
          
          // Clear the form
          form.reset(); // ChatGPT. Reset the sign in form. 
        } else { // ChatGPT. Otherwise
          // Login failed - show error
          alert(data.error || 'Login failed. Please try again.'); // ChatGPT. Alert that the sign in failed
        } 
      } catch (err) { // ChatGPT. If JSON sends an error
        console.error('Login error:', err); // ChatGPT. Console error
        alert('Network error. Please try again.'); // ChatGPT. Network error alert
      } 
    }); 
  } 
}); 




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
  } // ChatGPT. 

  // Validate date range quickly
  function validRange(start, end) { // ChatGPT. function using the input start and end dates
    if (!start || !end) return false; // ChatGPT. Does not allow start or end to be empty
    const s = new Date(start); // ChatGPT. Creates a constant from the input start date
    const e = new Date(end); // ChatGPT. Creates a constant from the input end date
    return !isNaN(s) && !isNaN(e) && s <= e; // ChatGPT. Makes sure the start and end dates are valid dates and the start date is before the end date
  } // ChatGPT. 

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
        return {
          ...base, // ChatGPT. The default types
          intervalDays: Number($$("#xDaysInterval")?.value) || null, // ChatGPT. The number of days skipped
        }; // ChatGPT.
      case "every-other-day": // ChatGPT. When an every-other day pattern
        return {
          ...base, // ChatGPT. The default types only
        }; // ChatGPT.
      case "every-x-weekday": // ChatGPT. When the every x weekday pattern
        return {
          ...base, // ChatGPT. The default types
          weekday: Number($$("#weekday")?.value) || null, // ChatGPT. The weekday that will repeat
        }; // ChatGPT.
      case "nth-day-year": // ChatGPT. When the xth day of every year pattern
        return {
          ...base, // ChatGPT. The default types
          month: Number($$("#monthOfYear")?.value) || null, // ChatGPT. The month of the date that will repeat
          dayOfMonth: Number($$("#dayOfMonth")?.value) || null, // ChatGPT. The day of the date that will repeat
        }; // ChatGPT.
      case "biweekly": // ChatGPT. For the biweekly pattern
        return {
          ...base, // ChatGPT. The default types
          biweeklyDays: getBiweeklySelection(), // ChatGPT. the days selected for both weeks
        }; // ChatGPT.
      case "ai-prompt": // ChatGPT. For the ai prompt pattern
        return {
          ...base, // ChatGPT. The default types
          aiPrompt: $$("#aiPromptText")?.value?.trim() || "", // ChatGPT. The text the user input
        }; // ChatGPT.
      default: // ChatGPT. By default
        return base; // ChatGPT. Default data types
    } 
  } 

  // On form submit - NOW SENDS TO BACKEND API
  form.addEventListener("submit", async (e) => { // ChatGPT. Starts the code when the form is submitted
    e.preventDefault(); // ChatGPT. Stops the default submit option

    const payload = buildPayload(); // ChatGPT. runs the buildPayload() function

    if (!validRange(payload.startDate, payload.endDate)) { // ChatGPT. If valid range says the date range is invalid
      alert("Please select a valid date range."); // ChatGPT. An popup saying to enter a valid date range
      return; // ChatGPT. Ends
    } // ChatGPT.
    if (!payload.patternType) { // ChatGPT. If there is no pattern type in the payload
      alert("Please select a pattern type."); // ChatGPT. A popup telling the user to enter a pattern type
      return; // ChatGPT. ends
    } // ChatGPT.
    if (!payload.name) { // ChatGPT. If there is no name in the payload
      alert("Please provide a name for this pattern."); // ChatGPT. A popup telling the user to enter a name
      return; // ChatGPT. Ends
    } // ChatGPT.

    // Check if user is logged in before submitting
    try { // ChatGPT. Try first
      const sessionResponse = await fetch('/api/check-session');  // ChatGPT. Contacts Flask through check-session route
      const sessionData = await sessionResponse.json(); // ChatGPT. waits for a response
      
      if (!sessionData.loggedIn) { // ChatGPT. If user is not logged in
        alert("You must be logged in to create events. Please sign in first."); // ChatGPT. Tells user to log in
        return; // ChatGPT. Ends function
      } // ChatGPT. 

      // Send to backend API
      const response = await fetch('/api/create-event', { // ChatGPT. Connect to create-event route
        method: 'POST', // ChatGPT. POST method
        headers: { 'Content-Type': 'application/json' }, // ChatGPT. JSON
        body: JSON.stringify(payload) // ChatGPT. Send payload data
      }); // ChatGPT. 

      const data = await response.json(); // ChatGPT. Wait for a JSON response from backend

      if (data.ok) { // ChatGPT. if response is ok
        // Success! Show preview and notify user
        if (preview) { // ChatGPT. if there is a preview
          preview.hidden = false; // ChatGPT. unhide preview
          preview.textContent = `Event created successfully!\nEvent ID: ${data.eventId}\nPattern: ${data.patternType}\nDates generated: ${data.datesInserted}`;
        } // ChatGPT. Show the event's id, pattern type and how many days were affected.
        
        alert(`Event "${payload.name}" created successfully with ${data.datesInserted} dates!`); // ChatGPT. Alert that shows how many dates were affected
        
        // Optionally reset the form
        form.reset(); // ChatGPT. Clears inputs
        
        // Refresh pattern list if we're on a page with the ribbon menu
        if (typeof window.refreshPatternList === 'function') { // ChatGPT. If on the page with the patternlist
          window.refreshPatternList(); // ChatGPT.refreshes the pattern list
        } // ChatGPT. 
      } else { // ChatGPT. Otherwise
        // Error from server
        alert(data.error || "Failed to create event. Please try again."); // ChatGPT. Alert that event could not be created
      } // ChatGPT. 
    } catch (err) { // ChatGPT. If JSON sends back an error
      console.error('Error creating event:', err); // ChatGPT. Send an error message on the console
      alert("Network error. Please try again."); // ChatGPT. Send Network Error alert
    } 
  });

})(); 










// ===== Create Account Form Handler =====
document.addEventListener("DOMContentLoaded", function () { // ChatGPT. Initiates only when the page is loaded
  const createForm = document.getElementById('createForm'); // ChatGPT. Stores create form
  if (!createForm) return;  // ChatGPT. No create form on this page? Stop.

  createForm.addEventListener('submit', async (e) => { // ChatGPT. On submit button click
    e.preventDefault(); // ChatGPT. Stop default submit behavior

    const statusBox = document.getElementById('createStatus'); // ChatGPT. Stores status box
    if (statusBox) { // ChatGPT. If there is a status box, reset all of the values
      statusBox.textContent = ''; // ChatGPT. Reset status box
      statusBox.classList.remove('error', 'success', 'info'); // ChatGPT. Remove error, success, and info styles from status box
    } // ChatGPT.

    const user = document.getElementById('createUser')?.value.trim() || ''; // ChatGPT. Store the username
    const pass = document.getElementById('createPass')?.value || ''; // ChatGPT. Stores the password
    const confirm = document.getElementById('confirmPass')?.value || ''; // ChatGPT. Stores the confirmed password

    if (!user || !pass || !confirm) { // ChatGPT. If there is no user, pass, or confirm password
      statusBox.textContent = 'Please fill in all fields.'; // ChatGPT. Change text box to prompt user
      statusBox.classList.add('error'); // ChatGPT. Set status box to error
      return; // ChatGPT. End
    } // ChatGPT.

    if (pass !== confirm) { // ChatGPT. If passwords do not match
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

      const text = await response.text(); // ChatGPT. Waits for a JSON response
      console.log('Raw response text:', text); // ChatGPT. Shows text returned by JSON

      let data; // ChatGPT. Declares a variable
      try { // ChatGPT. Try first
        data = JSON.parse(text); // ChatGPT. Converts JSON text to something readable in JS
      } catch (e) { // ChatGPT. If gathering JSON failed
        throw new Error("Response was not JSON"); // ChatGPT. Error that app did not receive JSON.
      } 

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
      // setTimeout(() => { window.location.href = '/'; }, 1000);

    } catch (err) { // ChatGPT. If nothing goes through
      console.error('Network or server error:', err); // ChatGPT. Error message on console log
      statusBox.textContent = 'Network error. Please try again.'; // ChatGPT. Status box error message
      statusBox.classList.remove('info'); // ChatGPT. Remove info style
      statusBox.classList.add('error'); // ChatGPT. Add error style
    } // ChatGPT.
  }); // ChatGPT.
}); // ChatGPT.




// ===== Pattern List - Now loads from database =====

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

  if (!sideMenu || !patternList) return; // ChatGPT. End if not on home page and there is no ribbon menu

  if (helpBtn) { // ChatGPT. If there is a help button
    helpBtn.addEventListener("click", () => { // ChatGPT. On click
      window.location.href = "/help"; // ChatGPT. Take to help page
    }); // ChatGPT.
  } // ChatGPT.

  // Function to load patterns from database
  async function renderPatternList() { // ChatGPT. For loading the user's patterns from database
    patternList.innerHTML = '<p class="pattern-empty">Loading...</p>'; // ChatGPT. Show loading state

    try { // ChatGPT. Try first
      // Check if user is logged in first
      const sessionResponse = await fetch('/api/check-session'); // ChatGPT. Retrieve session information from Flask
      const sessionData = await sessionResponse.json(); // ChatGPT. Await json response

      if (!sessionData.loggedIn) { // ChatGPT. if not logged in
        patternList.innerHTML = '<p class="pattern-empty">Sign in to see your saved patterns.</p>'; // ChatGPT. Sends message to sign in
        return; // ChatGPT. Ends function
      } 

      // Fetch events from the database
      const response = await fetch('/api/events'); // ChatGPT. retrieves event information from flask
      const data = await response.json(); // ChatGPT. Await response

      if (!data.ok) { // ChatGPT. If json data was not sent correctly
        patternList.innerHTML = '<p class="pattern-empty">Error loading patterns.</p>'; // ChatGPT. Show error message
        return; // ChatGPT. End function
      } 

      const patterns = data.events; // ChatGPT. stores the event data
      patternList.innerHTML = ""; // ChatGPT. Clear pattern list

      if (!patterns || !patterns.length) { // ChatGPT. If there are no patterns
        patternList.innerHTML = 
          '<p class="pattern-empty">No patterns yet. Create one in the event builder.</p>'; // ChatGPT. Send a message saying there are no patterns yet
        return; // ChatGPT. end
      } // ChatGPT.

      window.currentPatterns = patterns; // ChatGPT. Store patterns 

      patterns.forEach((p) => { // ChatGPT. Loop over everything in the pattern array
        const item = document.createElement("div"); // ChatGPT. Create a div for each item in the array
        item.className = "pattern-item"; // ChatGPT. Stores the name
        item.dataset.id = p.EventID; // ChatGPT. Give the pattern an id (using EventID from database)

        // Format color - add # if it's missing
        const displayColor = p.Color ? (p.Color.startsWith('#') ? p.Color : '#' + p.Color) : '#10b981'; // ChatGPT. Format the color with hash

        item.innerHTML = `
          <div class="pattern-main" data-id="${p.EventID}">
            <span class="pattern-color" style="background:${displayColor}"></span>
            <span class="pattern-name">${p.Name}</span>
          </div>
          <div class="pattern-actions">
            <button type="button" class="pattern-btn edit-btn">Edit</button>
            <button type="button" class="pattern-btn delete-btn">Delete</button>
          </div>
        `; // ChatGPT. Would show the color, name, edit and delete on each of the user's events

        patternList.appendChild(item); // ChatGPT. Add the events to the list for the user to see
      }); // ChatGPT.

    } catch (err) { // ChatGPT. If there is an error loading the JSON
      console.error('Error loading patterns:', err); // ChatGPT. Send error message on console
      patternList.innerHTML = '<p class="pattern-empty">Error loading patterns.</p>'; // ChatGPT. Error message
      window.currentPatterns = []; // ChatGPT. Clear patterns on error
    } // ChatGPT. 
  } // ChatGPT.

  // ChatGPT. Function to display notes for a selected pattern
  function displayPatternNotes(patternId) { // ChatGPT. Function to show notes for a pattern
    const notesPanel = document.getElementById('notesPanel'); // ChatGPT. Get the notes panel
    const notesPlaceholder = document.getElementById('notesPlaceholder'); // ChatGPT. Get placeholder
    const notesDisplay = document.getElementById('notesDisplay'); // ChatGPT. Get notes display container
    const notesPatternColor = document.getElementById('notesPatternColor'); // ChatGPT. Get color indicator
    const notesPatternName = document.getElementById('notesPatternName'); // ChatGPT. Get name display
    const notesText = document.getElementById('notesText'); // ChatGPT. Get notes text element
    
    if (!notesPanel) return; // ChatGPT. Exit if notes panel not found

    const patterns = window.currentPatterns || []; // ChatGPT. Get stored patterns or empty array
    const pattern = patterns.find(p => String(p.EventID) === String(patternId)); // ChatGPT. Find matching pattern by ID

    if (!pattern) { // ChatGPT. Pattern not found
      notesPlaceholder.style.display = 'block'; // ChatGPT. Show placeholder
      notesDisplay.style.display = 'none'; // ChatGPT. Hide notes display
      return; // ChatGPT. Exit function
    } 

    const displayColor = pattern.Color ?   // ChatGPT. Get pattern color
      (pattern.Color.startsWith('#') ? pattern.Color : '#' + pattern.Color) : '#10b981'; // ChatGPT. Format color with hash

    notesPatternColor.style.background = displayColor; // ChatGPT. Set color indicator background
    notesPatternName.textContent = pattern.Name; // ChatGPT. Set pattern name text
    
    if (pattern.Note && pattern.Note.trim()) { // ChatGPT. If pattern has a note
      notesText.textContent = pattern.Note; // ChatGPT. Display the note text
      notesText.classList.remove('notes-empty'); // ChatGPT. Remove empty style
    } else { // ChatGPT. If no note exists
      notesText.textContent = 'No notes for this pattern.'; // ChatGPT. Display empty message
      notesText.classList.add('notes-empty'); // ChatGPT. Add empty style
    } 

    notesPlaceholder.style.display = 'none'; // ChatGPT. Hide note placeholder
    notesDisplay.style.display = 'flex'; // ChatGPT. Show notes display

    // Update selected state on pattern items
    const allItems = patternList.querySelectorAll('.pattern-item'); // ChatGPT. Get all pattern items
    allItems.forEach(item => { // ChatGPT. Loop through items
      if (String(item.dataset.id) === String(patternId)) { // ChatGPT. If this is the selected pattern
        item.classList.add('selected'); // ChatGPT. Add selected class
      } else { // ChatGPT. If not selected
        item.classList.remove('selected'); // ChatGPT. Remove selected class
      } 
    }); 
  } 

  window.displayPatternNotes = displayPatternNotes; // ChatGPT. Makes function accessible globally

  // Handle edit and delete button clicks
  patternList.addEventListener("click", async (e) => { // ChatGPT. For when an event is clicked
    const target = e.target; // ChatGPT. What was clicked
    const item = target.closest(".pattern-item"); // ChatGPT.Finds the pattern row
    if (!item) return; // ChatGPT. If there is no row ends

    const id = item.dataset.id; // ChatGPT. Check if item has an id
    if (!id) return; // ChatGPT. end if there is no id

    const patternMain = target.closest(".pattern-main"); // ChatGPT. Check if main pattern area was clicked
    if (patternMain && !target.classList.contains("edit-btn") && !target.classList.contains("delete-btn")) { // ChatGPT. If main area clicked but not buttons
      displayPatternNotes(id); // ChatGPT. Display notes for this pattern
      return; // ChatGPT. End Function
    }

    if (target.classList.contains("edit-btn")) { // ChatGPT. If the edit button is clicked
      // Go to edit page with pattern id in the query string
      window.location.href = `/edit?id=${encodeURIComponent(id)}`; // ChatGPT. Opens the edit page
    } else if (target.classList.contains("delete-btn")) { // ChatGPT. If the delete button is clicked
      if (!confirm("Delete this pattern and its data?")) return; // ChatGPT. Asks user to confirm that the pattern should be deleted

      try { // ChatGPT. Try first
        // Send delete request to backend
        const response = await fetch(`/api/events/${id}`, { // ChatGPT.Send request to events in flask
          method: 'DELETE' // ChatGPT. DELETE method to delete the data
        }); 
        const data = await response.json(); // ChatGPT. await json response from flask

        if (data.ok) { // ChatGPT. if ok is receieved
          const notesPlaceholder = document.getElementById('notesPlaceholder'); // ChatGPT. Get notes placeholder
          const notesDisplay = document.getElementById('notesDisplay'); // ChatGPT. Get notes display
          if (notesPlaceholder && notesDisplay) { // ChatGPT. If both exist
            notesPlaceholder.style.display = 'block'; // ChatGPT. Show placeholder
            notesDisplay.style.display = 'none'; // ChatGPT. Hide display
          } 
          renderPatternList(); // ChatGPT. Load the list again
        } else { // ChatGPT. otherwise
          alert(data.error || 'Failed to delete event.'); // ChatGPT. Event deletion failed
        } 
      } catch (err) { // ChatGPT. JSON error
        console.error('Error deleting event:', err); // ChatGPT. Console log error
        alert('Network error. Please try again.'); // ChatGPT. Send error message
      } 
    } 
  }); 

  // Initial render
  renderPatternList(); // ChatGPT. Fill the pattern list with the user's patterns

  // Expose a hook so event builder can refresh list if home and builder share JS
  window.refreshPatternList = renderPatternList; // ChatGPT. Refreshes to let the pattern change trigger wherever it needs to.

  // ===== Download ICS Button =====
  const downloadBtn = document.getElementById("downloadIcsBtn"); // ChatGPT. Get the download button
  if (downloadBtn) { // ChatGPT. If the download button exists
    downloadBtn.addEventListener("click", async () => { // ChatGPT. On click
      try { // ChatGPT. Try first
        const sessionResponse = await fetch('/api/check-session'); // ChatGPT. Check session
        const sessionData = await sessionResponse.json(); // ChatGPT. wait for JSON response

        if (!sessionData.loggedIn) { // ChatGPT. If not logged in
          alert('Please sign in to download your calendar.'); // ChatGPT. Show alert
          return; // ChatGPT. End function
        } 

        downloadBtn.disabled = true; // ChatGPT. Disable button
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...'; // ChatGPT. Show loading spinner

        window.location.href = '/api/download-ics'; // ChatGPT. Contact download URL in flask

        setTimeout(() => { // ChatGPT. After 2 seconds
          downloadBtn.disabled = false; // ChatGPT. Re-enable button
          downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Calendar'; // ChatGPT. Reset text
        }, 2000); // ChatGPT.

      } catch (err) { // ChatGPT. If error
        console.error('Error checking session:', err); // ChatGPT. Log error
        alert('Network error. Please try again.'); // ChatGPT. Show alert
        downloadBtn.disabled = false; // ChatGPT. Re-enable button
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Calendar'; // ChatGPT. Reset text
      } // ChatGPT. 
    }); 
  } 
})(); 

// ===== Edit Event Form Handler =====
(function () { // ChatGPT. For editing event
  const $$ = (sel) => document.querySelector(sel); // ChatGPT. Shortcut to query selector
  const $$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel)); // ChatGPT. Array shortcut to query all selector

  const form = $$("#eventEditForm"); // ChatGPT. Get the edit form element
  if (!form) return; // ChatGPT. If not on edit page, exit

  const patternSelect = $$("#patternType"); // ChatGPT. Get pattern type dropdown
  const sections = $$$(".eb-section"); // ChatGPT. Get all event builder sections
  const preview = $$("#eventPreview"); // ChatGPT. Get preview element

  // Show/hide sections based on selected pattern
  function applyVisibility() { // ChatGPT. Function to show hide relevant sections
    const val = patternSelect.value; // ChatGPT. Get current pattern type value
    sections.forEach(sec => { // ChatGPT. Loop through all sections
      sec.hidden = sec.getAttribute("data-for") !== val; // ChatGPT. Hide sections not matching pattern type
    }); 
  } 

  patternSelect.addEventListener("change", applyVisibility); // ChatGPT. Change visibility after a pattern change
  // Biweekly picker toggles
  $$$(".biweekly-grid .day-toggle").forEach(btn => { // ChatGPT. Get all biweekly day toggle buttons
    btn.addEventListener("click", () => { // ChatGPT. On button click
      btn.classList.toggle("active"); // ChatGPT. Toggle active class on button
    }); 
  }); 


  function getBiweeklySelection() { // ChatGPT. Function to collect biweekly selections
    const weeks = { week1: [], week2: [] }; // ChatGPT. Initialize week arrays
    $$$(".week-col").forEach(col => { // ChatGPT. Loop through the weeks
      const week = col.getAttribute("data-week") === "1" ? "week1" : "week2"; // ChatGPT. Determine whether it is week 1 or two
      $$$(".day-toggle.active", col).forEach(btn => { // ChatGPT. Get active buttons in column
        weeks[week].push(Number(btn.getAttribute("data-day"))); // ChatGPT. Add day number to array
      }); 
    }); 
    return weeks; // ChatGPT. Return weeks
  } 

  function setBiweeklySelection(biweeklyDays) { // ChatGPT. Calls function to collect biweekly data. 
    if (!biweeklyDays) return; // ChatGPT. Exit if there is no biweekly input
    
    $$$(".biweekly-grid .day-toggle").forEach(btn => { // ChatGPT. Get all toggle buttons
      btn.classList.remove("active"); // ChatGPT. Remove active class
    }); 

    if (biweeklyDays.week1) { // ChatGPT. If week 1 has data
      const week1Col = document.querySelector('.week-col[data-week="1"]'); // ChatGPT. Get week 1 column
      if (week1Col) { // ChatGPT. If column exists
        biweeklyDays.week1.forEach(day => { // ChatGPT. Loop through week 1 days
          const btn = week1Col.querySelector(`.day-toggle[data-day="${day}"]`); // ChatGPT. Find day button
          if (btn) btn.classList.add("active"); // ChatGPT. Add active class to the selected days
        }); 
      } 
    } 

    if (biweeklyDays.week2) { // ChatGPT. If week 2 has data
      const week2Col = document.querySelector('.week-col[data-week="2"]'); // ChatGPT. Get week 2 column
      if (week2Col) { // ChatGPT. If column exists
        biweeklyDays.week2.forEach(day => { // ChatGPT. Loop through week 2 days
          const btn = week2Col.querySelector(`.day-toggle[data-day="${day}"]`); // ChatGPT. Find day button
          if (btn) btn.classList.add("active"); // ChatGPT. Add active class to the selected days
        }); 
      } 
    } 
  } 

  // Validate date range
  function validRange(start, end) { // ChatGPT. Function to validate date range
    if (!start || !end) return false; // ChatGPT. Return false if missing dates 
    const s = new Date(start); // ChatGPT. Store start
    const e = new Date(end); // ChatGPT. Store end
    return !isNaN(s) && !isNaN(e) && s <= e; // ChatGPT. Check that start is before end and inputs are valid
  } 

  // Build payload for update
  function buildPayload() { // ChatGPT. Function to store update changes
    const base = { // ChatGPT. Stores the data types
      patternType: patternSelect.value, // ChatGPT. Pattern type value
      startDate: $$("#startDate")?.value || null, // ChatGPT. Start date value
      endDate: $$("#endDate")?.value || null, // ChatGPT. End date value
      name: $$("#patternName")?.value?.trim() || "", // ChatGPT. Pattern name
      note: $$("#patternNote")?.value?.trim() || "", // ChatGPT. Pattern note 
      color: $$("#colorChoice")?.value || null // ChatGPT. Color value
    }; 

    switch (base.patternType) { // ChatGPT. Switch on pattern type
      case "223": // ChatGPT. 223 pattern 
        return { ...base }; // ChatGPT. Return base data values
      case "every-x-days": // ChatGPT. Every X days pattern
        return {
          ...base, // ChatGPT. Return base data values
          intervalDays: Number($$("#xDaysInterval")?.value) || null, // ChatGPT. Add interval days
        }; 
      case "every-other-day": // ChatGPT. Every other day pattern 
        return { ...base }; // ChatGPT. Return base data values
      case "every-x-weekday": // ChatGPT. Every X weekday pattern 
        return {
          ...base, // ChatGPT. Return base data values
          weekday: Number($$("#weekday")?.value) || null, // ChatGPT. Add weekday value
        }; 
      case "nth-day-year": // ChatGPT. Nth day of year pattern 
        return {
          ...base, // ChatGPT. Return base data values
          month: Number($$("#monthOfYear")?.value) || null, // ChatGPT. Add month
          dayOfMonth: Number($$("#dayOfMonth")?.value) || null, // ChatGPT. Add day of month
        }; 
      case "biweekly": // ChatGPT. Biweekly pattern 
        return {
          ...base, // ChatGPT. Return base data values
          biweeklyDays: getBiweeklySelection(), // ChatGPT. Add biweekly inputs
        }; 
      case "ai-prompt": // ChatGPT. AI prompt pattern 
        return {
          ...base, // ChatGPT. Return base data values
          aiPrompt: $$("#aiPromptText")?.value?.trim() || "", // ChatGPT. Add AI prompt text
        }; 
      default: // ChatGPT. If nothing is selected
        return base; // ChatGPT. Return base data values
    } 
  } 

  // Load existing event data
  async function loadEventData() { // ChatGPT. Loads event data in the background 
    // Get event ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search); // ChatGPT. Search events
    const eventId = urlParams.get('id'); // ChatGPT. Get event ID

    if (!eventId) { // ChatGPT. If no event ID provided
      alert("No event ID provided. Redirecting to home."); // ChatGPT. Show alert
      window.location.href = "/"; // ChatGPT. Redirect to home
      return; // ChatGPT. Exit function
    } 

    $$("#eventId").value = eventId; // ChatGPT.Keep event id hidden but stored

    try { // ChatGPT. Try first
      const sessionResponse = await fetch('/api/check-session'); // ChatGPT. access check-session from flask
      const sessionData = await sessionResponse.json(); // ChatGPT. Wait for JSON response

      if (!sessionData.loggedIn) { // ChatGPT. If not logged in
        alert("You must be logged in to edit events. Please sign in first."); // ChatGPT. Show alert
        window.location.href = "/"; // ChatGPT. Redirect to home
        return; // ChatGPT. Exit function
      } 

      // Fetch the event data
      const response = await fetch(`/api/events/${eventId}`); // ChatGPT. Get event ids from flask
      const data = await response.json(); // ChatGPT. Wait for JSON response

      if (!data.ok) { // ChatGPT. If request failed
        alert(data.error || "Failed to load event."); // ChatGPT. Show error
        window.location.href = "/"; // ChatGPT. Redirect to home
        return; // ChatGPT. Exit function
      } 

      const event = data.event; // ChatGPT. Get event from data

      patternSelect.value = event.EventType; // ChatGPT. Set pattern type
      applyVisibility(); // ChatGPT. Show the correct patterns

      $$("#startDate").value = event.Start || ""; // ChatGPT. Set start date
      $$("#endDate").value = event.End || ""; // ChatGPT. Set end date
      $$("#patternName").value = event.Name || ""; // ChatGPT. Set pattern name
      $$("#patternNote").value = event.Note || ""; // ChatGPT. Set pattern note
      
      const colorValue = event.Color ?  // ChatGPT. looks for event color
        (event.Color.startsWith('#') ? event.Color : '#' + event.Color) : // ChatGPT. Adds # in front of color hex if there is none
        '#10b981'; // ChatGPT. Format color
      $$("#colorChoice").value = colorValue; // ChatGPT. Set color

      if (event.EventType === "ai-prompt" && event.aiPrompt) { // ChatGPT. If AI prompt pattern has data
        $$("#aiPromptText").value = event.aiPrompt; // ChatGPT. Set AI prompt text
      } 

    } catch (err) { // ChatGPT. If error
      console.error('Error loading event:', err); // ChatGPT. Log error on console
      alert("Network error. Please try again."); // ChatGPT. Show error
      window.location.href = "/"; // ChatGPT. Redirect to home
    } 
  } 
  loadEventData(); // ChatGPT. Loads event after the page is loaded

  // Handle form submission
  form.addEventListener("submit", async (e) => { // ChatGPT. When edit form is submitted
    e.preventDefault(); // ChatGPT. Keep page from reloading

    const eventId = $$("#eventId").value; // ChatGPT. Get event ID
    if (!eventId) { // ChatGPT. If no event ID
      alert("No event ID found."); // ChatGPT. Show error
      return; // ChatGPT. Exit function
    } 

    const payload = buildPayload(); // ChatGPT. Store data from the edit payload function

    if (!validRange(payload.startDate, payload.endDate)) { // ChatGPT. If the date range is invalid
      alert("Please select a valid date range."); // ChatGPT. Show error
      return; // ChatGPT. Exit function
    } 
    if (!payload.patternType) { // ChatGPT. If no pattern type
      alert("Please select a pattern type."); // ChatGPT. Show error
      return; // ChatGPT. Exit function
    } 
    if (!payload.name) { // ChatGPT. If no name
      alert("Please provide a name for this pattern."); // ChatGPT. Show error
      return; // ChatGPT. Exit function
    } 

    try { // ChatGPT. Try first
      const sessionResponse = await fetch('/api/check-session'); // ChatGPT. Check if user is logged in
      const sessionData = await sessionResponse.json(); // ChatGPT. Wait for JSON response

      if (!sessionData.loggedIn) { // ChatGPT. If not logged in
        alert("You must be logged in to edit events. Please sign in first."); // ChatGPT. Show error
        return; // ChatGPT. Exit function
      } 

      const response = await fetch(`/api/events/${eventId}`, { // ChatGPT. Send request to events URL
        method: 'PUT', // ChatGPT. Use PUT method
        headers: { 'Content-Type': 'application/json' }, // ChatGPT. Set content type
        body: JSON.stringify(payload) // ChatGPT. Send payload as JSON
      }); 

      const data = await response.json(); // ChatGPT. Wait for JSON response

      if (data.ok) { // ChatGPT. If update successful
        if (preview) { // ChatGPT. If preview element exists
          preview.hidden = false; // ChatGPT. Show preview
          preview.textContent = `Event updated successfully!\nEvent ID: ${data.eventId}\nPattern: ${data.patternType}\nDates generated: ${data.datesInserted}`; // ChatGPT. Preview text showing what data what updated
        } 

        alert(`Event "${payload.name}" updated successfully with ${data.datesInserted} dates!`); // ChatGPT. Show success alert

        window.location.href = "/"; // ChatGPT. Back home
      } else { // ChatGPT. If update failed
        alert(data.error || "Failed to update event. Please try again."); // ChatGPT. Show error
      } 
    } catch (err) { // ChatGPT. Catch block
      console.error('Error updating event:', err); // ChatGPT. Log error on console
      alert("Network error. Please try again."); // ChatGPT. Show error
    } 
  }); 
})(); 
