# ChatGPT. Imports python libraries
from flask import Flask, request, jsonify, session, render_template, url_for # ChatGPT.
import mysql.connector  # ChatGPT.
from mysql.connector import Error  # ChatGPT.
from werkzeug.security import generate_password_hash, check_password_hash  # ChatGPT.
from datetime import datetime, date, timedelta  # ChatGPT. For date handling

app = Flask(__name__)  # ChatGPT.Tells python the name of the module so it can find necessary resources

# Needed if you want to use Flask session:
app.secret_key = "asdfadasdasdasdasdg"  # ChatGPT. Stores a session cookie for integrity verification


# -------------------------------------------------
#  PAGE ROUTES
# -------------------------------------------------
@app.route("/") # ChatGPT. Creates a URL path for the home page
def home_page(): # ChatGPT. Creates a variable to call home
    return render_template("home.html") # ChatGPT. Shows the home page

@app.route("/create") # ChatGPT. Creates a URL path for the create page
def create_page(): # ChatGPT. Creates a variable to call create
    return render_template("create.html") # ChatGPT. Shows the create page

@app.route("/createaccount") # ChatGPT. Creates a URL path for the create account page
def createaccount_page(): # ChatGPT. Creates a variable to call createaccount
    return render_template("createaccount.html") # ChatGPT. Shows the create account page

@app.route("/edit") # ChatGPT. Creates a URL path for the edit page
def edit_page(): # ChatGPT. Creates a variable to call edit
    return render_template("edit.html") # ChatGPT. Shows the edit page

@app.route("/help") # ChatGPT. Creates a URL path for the help page
def help_page(): # ChatGPT. Creates a variable to call help
    return render_template("help.html") # ChatGPT. Shows the help page


# -------------------------------------------------
#  DATABASE CONFIG
# -------------------------------------------------
DB_CONFIG = {  # ChatGPT. Used to connect with the SQL database
    "host": "localhost",  # ChatGPT. Run server on same machine
    "user": "root",  # ChatGPT. Where I'll input my username
    "password": "123", # ChatGPT. Where I'll input my password
    "database": "AssistantCalendar",  # ChatGPT. Database name
}

def get_db_connection():  # ChatGPT. Function for establishing Database Connection
    return mysql.connector.connect(**DB_CONFIG)  # ChatGPT. Connects to database using the config information made in DB_CONFIG


# -------------------------------------------------
#  DATE HELPERS (from eventlink.py)
# -------------------------------------------------
def parse_iso_date(s):  # ChatGPT. Takes date strings
    """Parse 'YYYY-MM-DD' into a date object (or None)."""  # ChatGPT. Docstring
    if not s:  # ChatGPT. If s is empty
        return None  # ChatGPT. Return nothing
    return datetime.strptime(s, "%Y-%m-%d").date()  # ChatGPT. Otherwise return a date object.


def daterange(start, end):  # ChatGPT. Stores every date between the start and end
    """Yield dates from start to end inclusive."""  # ChatGPT. Docstring
    current = start  # ChatGPT. Stores the start date
    one_day = timedelta(days=1)  # ChatGPT. Variable for a single day
    while current <= end:  # ChatGPT. Loop while the current day is less than the end day
        yield current  # ChatGPT. Return current date, continue loop
        current += one_day  # ChatGPT. add a day


# -------------------------------------------------
#  PATTERN GENERATORS (from eventlink.py)
# -------------------------------------------------
def generate_223(start, end):  # ChatGPT. For generating 2-2-3 events.
    """
    2 days on, 2 off, 3 on, 2 off, 2 on, 3 off, then repeat.
    Pattern length 14 days.
    """  # ChatGPT. Docstring
    pattern = [  # ChatGPT. Shows the pattern for the days
        True, True,       # ChatGPT. 2 days on
        False, False,     # ChatGPT. 2 days off
        True, True, True,  # ChatGPT. 3 days on
        False, False,     # ChatGPT. 2 days off
        True, True,       # ChatGPT. 2 days on
        False, False, False  # ChatGPT. 3 days off
    ]

    result = []  # ChatGPT. List to store the days
    i = 0  # ChatGPT. Start at 0 in the pattern
    for d in daterange(start, end):  # ChatGPT. Loop through the start and end date range
        if pattern[i]:  # ChatGPT. If pattern = true
            result.append(d)  # ChatGPT. Add date to the event
        i = (i + 1) % len(pattern)  # ChatGPT. Move to the next number. Restart after 13
    return result  # ChatGPT. Return the event dates.


def generate_every_x_days(start, end, interval_days):  # ChatGPT. For generating every x days events
    """Start date is included, then every N days until end."""  # ChatGPT. Docstring
    if not interval_days or interval_days < 1:  # ChatGPT. If interval is less than 1
        return []  # ChatGPT. Return nothing
    result = []  # ChatGPT. List to store the days
    current = start  # ChatGPT. Set starting date
    while current <= end:  # ChatGPT. While the current date is not the end date
        result.append(current)  # ChatGPT. Add the date
        current += timedelta(days=interval_days)  # ChatGPT. Jump ahead by the interval days
    return result  # ChatGPT. Return all event days.


def generate_every_other_day(start, end):  # ChatGPT. For the every other day event
    """On, off, on, off... starting with start date as ON."""  # ChatGPT. Docstring
    return generate_every_x_days(start, end, 2)  # ChatGPT. Uses the every_x_days function but with an interval of 2.


def generate_every_x_weekday(start, end, weekday_js):  # ChatGPT. For every x weekday
    """
    Repeat the chosen weekday (0=Sun,...,6=Sat like JS) weekly between start & end.
    """  # ChatGPT. Docstring
    if weekday_js is None:  # ChatGPT. If there is no weekday.
        return []  # ChatGPT. return nothing

    target_py = (weekday_js + 6) % 7  # ChatGPT. Convert javascript numbers to python numbers.

    current = start  # ChatGPT. Set start day as current
    while current.weekday() != target_py:  # ChatGPT. When the current day number does not match the right day of the week
        current += timedelta(days=1)  # ChatGPT. Increase the value of current by 1 day. Loop again

    result = []  # ChatGPT. A list to store the data
    while current <= end:  # ChatGPT. While the current date is less than the end date
        result.append(current)  # ChatGPT. Store the current day
        current += timedelta(days=7)  # ChatGPT. Advance 7 days. Continue loop

    return result  # ChatGPT. Return the event days


def generate_nth_day_year(start, end, month, day_of_month):  # ChatGPT. For the nth day of the year event
    """
    Example: month=1, day=15 => Jan 15 every year between start & end.
    """  # ChatGPT. Docstring
    if not (month and day_of_month):  # ChatGPT. If there is no month and day of the month
        return []  # ChatGPT. Return nothing

    result = []  # ChatGPT. Starts the list for the calendar.
    for year in range(start.year, end.year + 1):  # ChatGPT. Loop through the start and end years
        try:  # ChatGPT.
            candidate = date(year, month, day_of_month)  # ChatGPT. Try finding the specific date
        except ValueError:  # ChatGPT. Except dates that don't exist
            continue  # ChatGPT. Continue
        if start <= candidate <= end:  # ChatGPT. If candidate is within range
            result.append(candidate)  # ChatGPT. Add candidate
    return result  # ChatGPT. Return the days


def generate_biweekly(start, end, biweekly_obj):  # ChatGPT. For the biweekly pattern builder
    """
    biweekly_obj = { "week1": [0..6], "week2": [0..6] }
    JS day numbers: 0=Sun,...,6=Sat.
    """  # ChatGPT. Docstring
    week1_days = set(biweekly_obj.get("week1") or [])  # ChatGPT. Convert the week1 array from JS
    week2_days = set(biweekly_obj.get("week2") or [])  # ChatGPT. Convert the week2 array from JS

    result = []  # ChatGPT. A list to store the data
    for current in daterange(start, end):  # ChatGPT. Loop through the start to end date range
        delta_days = (current - start).days  # ChatGPT. How many days since the start day
        week_index = delta_days // 7  # ChatGPT. Counts weeks by dividing days by 7

        js_weekday = (current.weekday() + 1) % 7  # ChatGPT. Converts to javascript weekday

        if week_index % 2 == 0:  # ChatGPT. If the week is even
            if js_weekday in week1_days:  # ChatGPT. The week is part of week 1
                result.append(current)  # ChatGPT. add effected days
        else:  # ChatGPT. Otherwise
            if js_weekday in week2_days:  # ChatGPT. Week is part of week 2
                result.append(current)  # ChatGPT. Add affected days

    return result  # ChatGPT. Return dates affected by event.


def generate_dates_for_pattern(payload):  # ChatGPT. Selects the type of event to use.
    """
    Central dispatcher: reads patternType + other fields from payload,
    returns a list[date] of all event dates that should go into Cache.
    """  # ChatGPT. Docstring
    pattern_type = payload.get("patternType")  # ChatGPT. Gets the pattern type
    start = parse_iso_date(payload.get("startDate"))  # ChatGPT. converts start date string into a date
    end = parse_iso_date(payload.get("endDate"))  # ChatGPT. converts end date string into a date

    if not start or not end or start > end:  # ChatGPT. If one of the dates is missing
        return []  # ChatGPT. Return an empty set

    if pattern_type == "223":  # ChatGPT. If 223
        return generate_223(start, end)  # ChatGPT. Use the 223 function

    elif pattern_type == "every-x-days":  # ChatGPT. if Every X days
        interval_days = int(payload.get("intervalDays") or 0)  # ChatGPT. Gets the nth day
        return generate_every_x_days(start, end, interval_days)  # ChatGPT. runs the every_x_days function

    elif pattern_type == "every-other-day":  # ChatGPT. If every other day
        return generate_every_other_day(start, end)  # ChatGPT. runs the generate_every_other_day function

    elif pattern_type == "every-x-weekday":  # ChatGPT. If every-x-Weekday
        weekday = payload.get("weekday")  # ChatGPT. get the input weekday
        weekday = int(weekday) if weekday is not None else None  # ChatGPT. convert to int
        return generate_every_x_weekday(start, end, weekday)  # ChatGPT. runs generate every x weekday function

    elif pattern_type == "nth-day-year":  # ChatGPT. if nth day of every year
        month = payload.get("month")  # ChatGPT. Get the input month
        day_of_month = payload.get("dayOfMonth")  # ChatGPT. get the input day of the month
        month = int(month) if month is not None else None  # ChatGPT. Turn month into an integer
        day_of_month = int(day_of_month) if day_of_month is not None else None  # ChatGPT. Turn day into integer
        return generate_nth_day_year(start, end, month, day_of_month)  # ChatGPT. run the function

    elif pattern_type == "biweekly":  # ChatGPT. if biweekly pattern type
        biweekly = payload.get("biweeklyDays") or {}  # ChatGPT. Gets the biweekly payload array (note: changed key name to match JS)
        return generate_biweekly(start, end, biweekly)  # ChatGPT. Runs the biweekly function

    elif pattern_type == "ai-prompt":  # ChatGPT. If AI pattern type
        return []  # ChatGPT. End

    else:  # ChatGPT. Otherwise
        return []  # ChatGPT. end empty


# -------------------------------------------------
#  CHECK SESSION - returns current login status
# -------------------------------------------------
@app.route("/api/check-session", methods=["GET"]) # ChatGPT. Creates a URL path getting sign in information
def check_session(): # ChatGPT. Function for checking user
    """
    Returns JSON indicating whether a user is currently logged in.
    The frontend calls this on page load to determine UI state.
    """ # ChatGPT. Doc string
    if "user_id" in session and "username" in session: # ChatGPT. if there is a user id and username
        return jsonify({ # ChatGPT. return JSON 
            "ok": True, # ChatGPT. send ok
            "loggedIn": True, # ChatGPT. send logged in
            "userId": session["user_id"], # ChatGPT. send user id
            "username": session["username"] # ChatGPT. send username
        }), 200 # ChatGPT. 200 code 
    else: # ChatGPT. otherwise
        return jsonify({ # ChatGPT. Return JSON
            "ok": True, # ChatGPT. send ok
            "loggedIn": False # ChatGPT. Send not logged in
        }), 200 # ChatGPT. 200 code.


# -------------------------------------------------
#  CREATE ACCOUNT ROUTE
# -------------------------------------------------
@app.route("/api/create-account", methods=["POST"]) # ChatGPT. Creates a URL path for account creation
def create_account(): # ChatGPT. Function for account creation
    data = request.get_json(silent=True) or {} # ChatGPT. Reads the json information
    username = (data.get("username") or "").strip() # ChatGPT. The username from the JSON format. Removes empty spaces and is empty if there is no username
    password = data.get("password") or "" # ChatGPT. The password from the JSON format. is empty if there is no password.

    if not username or not password: # ChatGPT. If username or password is empty
        return jsonify({"ok": False, "error": "Username and password are required."}), 400 # ChatGPT. Return JSON error message and HTTP 400 bad request
    if not (3 <= len(username) <= 20): # ChatGPT. If username is more than 20 characters
        return jsonify({"ok": False, "error": "Username must be 3–20 characters."}), 400 # ChatGPT. Return JSON error message and HTTP 400 bad request
    if len(password) < 8: # ChatGPT. If password is less than 8.
        return jsonify({"ok": False, "error": "Password must be at least 8 characters."}), 400 # ChatGPT. Return JSON error message and HTTP 400 bad request

    password_hash = generate_password_hash(password) # ChatGPT. Hashes the password to be stored.

    conn = None # ChatGPT. Establishes the connection variable
    cursor = None # ChatGPT. Establishes the cursor variable

    try: # ChatGPT. Try First
        conn = get_db_connection() # ChatGPT. Connects to the database
        cursor = conn.cursor(dictionary=True) # ChatGPT. Starts a cursor object for SQL commands

        cursor.execute("SELECT UserID FROM Users WHERE Username = %s", (username,)) # ChatGPT. Checks for usernames that are the same
        if cursor.fetchone(): # ChatGPT. If the username is found
            return jsonify({"ok": False, "error": "Username already taken."}), 409 # ChatGPT. JSON warning that the username is in use. 409 error

        cursor.execute( # ChatGPT. To insert the data
            "INSERT INTO Users (Username, Password) VALUES (%s, %s)", # ChatGPT. Inserts the username and password hash into the %s values.
            (username, password_hash), # ChatGPT. values inserted into the placeholders
        )
        conn.commit() # ChatGPT. Saves database changes
        user_id = cursor.lastrowid  # ChatGPT. Contains the userid.

    except Error as e: # ChatGPT. If an error occurs
        print("Database error in create_account:", e) # ChatGPT. Sends error message
        return jsonify({"ok": False, "error": f"Database error: {e}"}), 500  # ChatGPT. Returns error in JSON format. 500 HTTP internal server error.

    except Exception as e: # ChatGPT. If an unexpected error occurs
        print("Unexpected error in create_account:", e) # ChatGPT. Sends error message
        return jsonify({"ok": False, "error": "Server error."}), 500 # ChatGPT. Returns error in JSON format. 500 HTTP internal server error.

    finally:  # ChatGPT. Always runs
        if cursor is not None: # ChatGPT. If cursor is open
            cursor.close() # ChatGPT. Close cursor
        if conn is not None: # ChatGPT. If there is still a connection
            conn.close() # ChatGPT. Close the connection

    return jsonify( # ChatGPT. JSON returned to the front end
        {
            "ok": True, # ChatGPT. Shows that saving the account was successful
            "message": "Account created successfully.", # ChatGPT. shows a message that creation was successful.
            "userId": user_id, # ChatGPT. Shows user id
            "username": username, # ChatGPT. shows username
        }
    ), 201 # ChatGPT.201 created status HTTP


# -------------------------------------------------
#  LOGIN ROUTE
# -------------------------------------------------
@app.route("/api/login", methods=["POST"]) # ChatGPT. Login url path.
def login(): # ChatGPT. Login function
    """
    Expects JSON: { "username": "someone", "password": "theirPassword" }
    Returns JSON with login status
    """ # ChatGPT. Docstring
    data = request.get_json(silent=True) or {} # ChatGPT. Reads the JSON information
    username = (data.get("username") or "").strip() # ChatGPT. Shows username or nothing if empty. Removes empty spaces
    password = data.get("password") or "" # ChatGPT. Shows password or nothing if empty.

    if not username or not password: # ChatGPT. If neither password or username are input
        return jsonify({"ok": False, "error": "Username and password are required."}), 400 # ChatGPT. 400 bad connection. Sends JSON error to front end.

    conn = None # ChatGPT. Establishes the connection variable
    cursor = None # ChatGPT. Establishes the cursor variable

    try: # ChatGPT. Try first
        conn = get_db_connection() # ChatGPT. Connects to mysql
        cursor = conn.cursor(dictionary=True) # ChatGPT. Ensures that data comes in a dict format based on keys

        cursor.execute( # ChatGPT. Looks for the input username
            "SELECT UserID, Username, Password FROM Users WHERE Username = %s", # ChatGPT. SQL for the username search
            (username,), # ChatGPT. variable being searched for
        )
        row = cursor.fetchone() # ChatGPT. Fetches the user

        if not row: # ChatGPT. If an invalid username was input
            return jsonify({"ok": False, "error": "Invalid username or password."}), 401 # ChatGPT. Returns a JSON error message. 401 unauthorized code.

        stored_hash = row["Password"] # ChatGPT. Finds the hash in the database.

        if not check_password_hash(stored_hash, password): # ChatGPT. if the hash does not equal the password.
            return jsonify({"ok": False, "error": "Invalid username or password."}), 401 # ChatGPT. Returns a JSON error message. 401 unauthorized code.

        user_id = row["UserID"] # ChatGPT. Stores the user's ID

        session["user_id"] = user_id # ChatGPT. Stores ID in a session with browser cookies.
        session["username"] = row["Username"] # ChatGPT. Stores the username in a session.

    except Error as e:  # ChatGPT. If there is an error.
        print("Database error in login:", e)  # ChatGPT. Print error message
        return jsonify({"ok": False, "error": f"Database error: {e}"}), 500  # ChatGPT. Send JSON data for the error to the front end. 500 internal server error.

    except Exception as e: # ChatGPT. If there is an unexpected error.
        print("Unexpected error in login:", e) # ChatGPT. Print error message
        return jsonify({"ok": False, "error": "Server error."}), 500 # ChatGPT. Send JSON data for the error to the front end. 500 internal server error.

    finally: # ChatGPT. Always runs
        if cursor is not None: # ChatGPT. If the cursor is active
            cursor.close() # ChatGPT. Close the cursor
        if conn is not None: # ChatGPT. if the connection is open
            conn.close() # ChatGPT. close the connection

    return jsonify( # ChatGPT. For returning JSON data upon success
        {
            "ok": True, # ChatGPT. Confirms login for JS
            "message": "Login successful.", # ChatGPT. Confirms login for user
            "userId": user_id, # ChatGPT. Stores user id
            "username": row["Username"], # ChatGPT. Sends username
        }
    ), 200  # ChatGPT. 200 request succeeded.


# -------------------------------------------------
#  LOGOUT ENDPOINT
# -------------------------------------------------
@app.route("/api/logout", methods=["POST"]) # ChatGPT. Logout URL route
def logout(): # ChatGPT. logout function
    session.clear() # ChatGPT. Clears all session data.
    return jsonify({"ok": True, "message": "Logged out."}) # ChatGPT. Send a JSON message confirming the logout


# -------------------------------------------------
#  CREATE EVENT ROUTE (from eventlink.py)
# -------------------------------------------------
@app.route("/api/create-event", methods=["POST"]) # ChatGPT. Post endpoint to receive data
def create_event(): # ChatGPT.Receives the input event data
    """
    Expects JSON like your buildPayload() produces, e.g.:
    {
      "patternType": "every-x-days",
      "startDate": "2025-01-01",
      "endDate": "2025-01-31",
      "name": "Work",
      "note": "Night shift",
      "color": "#10b981",
      "intervalDays": 3,
      ...
    }

    Creates:
      - Event row
      - Prompt row (only for patternType == "ai-prompt")
      - Cache rows for all affected dates (except ai-prompt)
    """ # ChatGPT. Docstring
    user_id = session.get("user_id") # ChatGPT. gets users id
    if not user_id: # ChatGPT. if no user is logged in
        return jsonify({"ok": False, "error": "You must be logged in to create events."}), 401 # ChatGPT. Send JS error message

    payload = request.get_json(silent=True) # ChatGPT. Reads incoming JSON
    if not payload: # ChatGPT. If not the correct payload data.
        return jsonify({"ok": False, "error": "Missing or invalid JSON body."}), 400 # ChatGPT. JSON sends front end a error message. 400 HTTP code

    pattern_type = payload.get("patternType") # ChatGPT. Get the patterntype from JSON
    start = parse_iso_date(payload.get("startDate")) # ChatGPT. Get the startdate from JSON
    end = parse_iso_date(payload.get("endDate")) # ChatGPT. get the end date from JSON
    name = (payload.get("name") or "").strip() # ChatGPT. Get the events name from JSON
    note = (payload.get("note") or "").strip() # ChatGPT. Get the event's note from JSON
    color = (payload.get("color") or "").lstrip("#") or None # ChatGPT. Get the event's color from JSON

    if not pattern_type or not start or not end or not name: # ChatGPT. If missing fields that aren't color or note.
        return jsonify({"ok": False, "error": "Missing required fields."}), 400 # ChatGPT. 400 error. JSON sends message that data is missing.

    conn = None # ChatGPT. establishes connection variable
    cursor = None # ChatGPT. establishes cursor
    try: # ChatGPT. Try first
        conn = get_db_connection() # ChatGPT. Connect to database
        cursor = conn.cursor() # ChatGPT. Create a cursor to manipulate the database

        # Insert into Event table
        cursor.execute( # ChatGPT. For intserting event information
            """
            INSERT INTO Event (UserID, Name, Color, Note, Start, End, EventType)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, # ChatGPT. Runs into SQL table
            (user_id, name, color, note, start, end, pattern_type), # ChatGPT. inputing values into SQL
        )
        event_id = cursor.lastrowid # ChatGPT. Event id is stored here. 

        if pattern_type == "ai-prompt": # ChatGPT. If the pattern is an ai prompt
            # Store the AI prompt text
            ai_prompt = (payload.get("aiPrompt") or "").strip() # ChatGPT. Get the prompt text with spaces removed
            if ai_prompt: # ChatGPT. If there is an ai prompt
                cursor.execute( # ChatGPT. Access SQL
                    """
                    INSERT INTO Prompt (UserID, EventID, PromptText)
                    VALUES (%s, %s, %s)
                    """, # ChatGPT.SQL code to insert values
                    (user_id, event_id, ai_prompt), # ChatGPT. The values being inserted
                )
        else: # ChatGPT. Otherwise
            dates = generate_dates_for_pattern(payload) # ChatGPT. Stores the generated dates

            if dates: # ChatGPT. Dates to be stored in the cache
                cache_rows = [(d, event_id, user_id) for d in dates] # ChatGPT. The variables needed for the cache SQL table
                cursor.executemany( # ChatGPT. For running the SQL 
                    """
                    INSERT INTO Cache (Times, EventID, UserID)
                    VALUES (%s, %s, %s)
                    """, # ChatGPT. SQL code
                    cache_rows, # ChatGPT. inserts the content of cache rows into the %s spots
                )

        conn.commit() # ChatGPT. Save database changes

        dates_count = len(generate_dates_for_pattern(payload)) if pattern_type != "ai-prompt" else 0 # ChatGPT. Counts the dates added to the payload unless it is ai prompt type

        return jsonify({ # ChatGPT. Response to front end
            "ok": True, # ChatGPT. Tells JS JSON got the data
            "eventId": event_id, # ChatGPT. sends the event id
            "patternType": pattern_type, # ChatGPT. Sends the pattern type
            "datesInserted": dates_count # ChatGPT. Counts how many dates were made by the function
        }), 201 # ChatGPT. Code 201

    except Error as e: # ChatGPT. If there is an error
        if conn: # ChatGPT. If connection exists
            conn.rollback() # ChatGPT. Undoes last database change
        print("Database error in create_event:", e) # ChatGPT. Error message
        return jsonify({"ok": False, "error": "Database error."}), 500 # ChatGPT. 500 HTML error

    except Exception as e: # ChatGPT. if there is an unexpected error
        if conn: # ChatGPT. If connection exists
            conn.rollback() # ChatGPT. Undoes last database change
        print("Unexpected error in create_event:", e) # ChatGPT. Error message
        return jsonify({"ok": False, "error": "Server error."}), 500 # ChatGPT. 500 HTML error

    finally: # ChatGPT. After everything else
        if cursor is not None: # ChatGPT. If cursor exists
            cursor.close() # ChatGPT. Close cursor
        if conn is not None: # ChatGPT. if connection exists
            conn.close() # ChatGPT. Close connection


# -------------------------------------------------
#  GET USER EVENTS - Fetch all events for logged-in user
# -------------------------------------------------
@app.route("/api/events", methods=["GET"]) # ChatGPT. Establishes url to connect to JS
def get_events(): # ChatGPT. For retrieving events
    """
    Returns all events for the currently logged-in user.
    """ # ChatGPT. doc string
    user_id = session.get("user_id") # ChatGPT. Gets user id
    if not user_id: # ChatGPT. If there is no user id
        return jsonify({"ok": False, "error": "You must be logged in to view events."}), 401 # ChatGPT. send error message

    conn = None # ChatGPT. Establishes connection variable
    cursor = None # ChatGPT. Establishes cursor variable

    try: # ChatGPT. Try first
        conn = get_db_connection() # ChatGPT. connects to database
        cursor = conn.cursor(dictionary=True) # ChatGPT. creates database cursor

        cursor.execute( # ChatGPT. for retrieving event information
            """
            SELECT EventID, Name, Color, Note, Start, End, EventType
            FROM Event
            WHERE UserID = %s
            ORDER BY Start ASC
            """, # ChatGPT. SQL code
            (user_id,) # ChatGPT. Value
        )
        events = cursor.fetchall() # ChatGPT. Retrives all queried

        # Convert date objects to strings for JSON
        for event in events: # ChatGPT. loops through every event
            if event["Start"]: # ChatGPT. if in SQL format
                event["Start"] = event["Start"].isoformat() # ChatGPT. Changes to a JS friendly format
            if event["End"]: # ChatGPT. if in SQL format
                event["End"] = event["End"].isoformat() # ChatGPT. Changes format

        return jsonify({"ok": True, "events": events}), 200 # ChatGPT. Return JSON message

    except Error as e: # ChatGPT. if there is an error
        print("Database error in get_events:", e) # ChatGPT. Print error message
        return jsonify({"ok": False, "error": "Database error."}), 500 # ChatGPT.  Return JSON method

    finally: # ChatGPT. After everything else
        if cursor is not None: # ChatGPT. if there is a cursor
            cursor.close() # ChatGPT. close the cursor
        if conn is not None: # ChatGPT.  if there is a connection
            conn.close() # ChatGPT. Close the connection


# -------------------------------------------------
#  GET EVENT DATES - Fetch cached dates for a specific event
# -------------------------------------------------
@app.route("/api/events/<int:event_id>/dates", methods=["GET"]) # ChatGPT. Route to get event dates
def get_event_dates(event_id): # ChatGPT. function to get event dates
    """
    Returns all cached dates for a specific event.
    """ # ChatGPT. doc string
    user_id = session.get("user_id") # ChatGPT. get user id
    if not user_id: # ChatGPT. if there is no user id
        return jsonify({"ok": False, "error": "You must be logged in."}), 401 # ChatGPT. send error message

    conn = None # ChatGPT. establish connection variable
    cursor = None # ChatGPT. establish cursor variable

    try: # ChatGPT. try first
        conn = get_db_connection() # ChatGPT. establish connection with database
        cursor = conn.cursor(dictionary=True) # ChatGPT. create cursor for database

        # Verify the event belongs to this user
        cursor.execute( # ChatGPT. In SQL
            "SELECT EventID FROM Event WHERE EventID = %s AND UserID = %s",
            (event_id, user_id)
        ) # ChatGPT. Retrieve event and user id
        if not cursor.fetchone(): # ChatGPT. otherwise
            return jsonify({"ok": False, "error": "Event not found."}), 404 # ChatGPT. Send error message

        # Get all cached dates for this event
        cursor.execute( # ChatGPT. SQL to retrieve dates from CACHE
            """
            SELECT Times FROM Cache
            WHERE EventID = %s AND UserID = %s
            ORDER BY Times ASC
            """,
            (event_id, user_id)
        ) # ChatGPT. inserts event and user id
        rows = cursor.fetchall() # ChatGPT. stores cursor information
        dates = [row["Times"].isoformat() for row in rows] # ChatGPT. Turns sql code into an ISO 

        return jsonify({"ok": True, "dates": dates}), 200 # ChatGPT. sends the dates through JSON

    except Error as e: # ChatGPT. if there is an error
        print("Database error in get_event_dates:", e) # ChatGPT. print error message
        return jsonify({"ok": False, "error": "Database error."}), 500 # ChatGPT. Return JSON message

    finally: # ChatGPT. Upon finish
        if cursor is not None: # ChatGPT. if there is a cursor
            cursor.close() # ChatGPT. Close the cursor
        if conn is not None: # ChatGPT. If there is a connection
            conn.close() # ChatGPT. Close the connection


# -------------------------------------------------
#  DELETE EVENT
# -------------------------------------------------
@app.route("/api/events/<int:event_id>", methods=["DELETE"]) # ChatGPT. Route for delete requests
def delete_event(event_id): # ChatGPT. function to delete events
    """
    Deletes an event and all its cached dates (CASCADE handles this).
    """ # ChatGPT. Docstring
    user_id = session.get("user_id") # ChatGPT. Get the user id
    if not user_id: # ChatGPT. If there is no userid
        return jsonify({"ok": False, "error": "You must be logged in."}), 401 # ChatGPT. Return json 

    conn = None # ChatGPT. establish connection variable
    cursor = None # ChatGPT. establish cursor variable

    try: # ChatGPT. Try first
        conn = get_db_connection() # ChatGPT. Connect to database
        cursor = conn.cursor() # ChatGPT. Use cursor.

        # Delete the event (CASCADE will delete Cache and Prompt entries)
        cursor.execute( # ChatGPT. Add the sql code
            "DELETE FROM Event WHERE EventID = %s AND UserID = %s",
            (event_id, user_id) # ChatGPT. Delete where = user and event ids
        )

        if cursor.rowcount == 0: # ChatGPT. If no rows were deleted
            return jsonify({"ok": False, "error": "Event not found."}), 404 # ChatGPT. Return json error message

        conn.commit() # ChatGPT. save changes
        return jsonify({"ok": True, "message": "Event deleted."}), 200 # ChatGPT. Send Json message

    except Error as e: # ChatGPT. if there is an error
        if conn: # ChatGPT. if there is a connection
            conn.rollback() # ChatGPT. reverts any changes
        print("Database error in delete_event:", e) # ChatGPT. Print error message
        return jsonify({"ok": False, "error": "Database error."}), 500 # ChatGPT. Send JSON to JS

    finally: # ChatGPT. After everything else
        if cursor is not None: # ChatGPT. If there is a cursor
            cursor.close() # ChatGPT. Close the cursor
        if conn is not None: # ChatGPT. if there is a connection
            conn.close() # ChatGPT. close the connection


if __name__ == "__main__": # ChatGPT. If the module is running
    app.run(debug=True) # ChatGPT. Starts the app
