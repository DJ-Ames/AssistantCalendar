 # ChatGPT. Calls Python Libraries.
from flask import Flask, request, jsonify, session  # ChatGPT.
from datetime import datetime, date, timedelta  # ChatGPT.
import mysql.connector  # ChatGPT.

app = Flask(__name__) # ChatGPT.Tells python the name of the module so it can find necessary resources
app.secret_key = "sdddddsssssssss" # ChatGPT. The secret key for session cookies

# ---------- DB CONFIG ----------
DB_CONFIG = { # ChatGPT. For connecting to the SQL server
    "host": "localhost", # ChatGPT. The hosting computer
    "user": "your_mysql_user", # ChatGPT. SQL user
    "password": "your_mysql_password", # ChatGPT. My SQL password
    "database": "AssistantCalendar", # ChatGPT. Database name
    "auth_plugin": "mysql_native_password", # ChatGPT. Authorization password
}


def get_db(): # ChatGPT. for connecting to the SQL database
    """Create a new DB connection.""" # ChatGPT. Docstring
    return mysql.connector.connect(**DB_CONFIG) # ChatGPT. Uses DB_CONFIG to access the SQL


# ---------- DATE HELPERS ----------

def parse_iso_date(s):  # ChatGPT. Takes date strings
    """Parse 'YYYY-MM-DD' into a date object (or None).""" # ChatGPT. Docstring
    if not s: # ChatGPT. If s is empty
        return None # ChatGPT. Return nothing
    return datetime.strptime(s, "%Y-%m-%d").date() # ChatGPT. Otherwise return a date object. 


def daterange(start, end): # ChatGPT. Stores every date between the start and end
    """Yield dates from start to end inclusive.""" # ChatGPT. Docstring
    current = start # ChatGPT. Stores the start date
    one_day = timedelta(days=1) # ChatGPT. Variable for a single day
    while current <= end: # ChatGPT. Loop while the current day is less than the end day
        yield current # ChatGPT. Return current date, continue loop
        current += one_day # ChatGPT. add a day


# ---------- PATTERN GENERATORS ----------

def generate_223(start, end): # ChatGPT. For generating 2-2-3 events.
    """
    2 days on, 2 off, 3 on, 2 off, 2 on, 3 off, then repeat.
    Pattern length 14 days.
    """ # ChatGPT. Docstring
    # True = event day, False = off
    pattern = [ # ChatGPT. Shows the pattern for the days
        True, True,      # ChatGPT. 2 days on
        False, False,     # ChatGPT. 2 days off
        True, True, True, # ChatGPT. 3 days on
        False, False,     # ChatGPT. 2 days off
        True, True,       # ChatGPT. 2 days on
        False, False, False  # ChatGPT. 3 days off
    ]  # ChatGPT. Shows the pattern over the course of 14 days.

    result = [] # ChatGPT. List to store the days
    i = 0 # ChatGPT. Start at 0 in the pattern
    for d in daterange(start, end): # ChatGPT. Loop through the start and end date range
        if pattern[i]: # ChatGPT. If pattern = true
            result.append(d) # ChatGPT. Add date to the event
        i = (i + 1) % len(pattern) # ChatGPT. Move to the next number. Restart after 13
    return result # ChatGPT. Return the event dates.


def generate_every_x_days(start, end, interval_days): # ChatGPT. For generating every x days events
    """Start date is included, then every N days until end.""" # ChatGPT. Docstring
    if not interval_days or interval_days < 1: # ChatGPT. If interval is less than 1
        return [] # ChatGPT. Return nothing
    result = [] # ChatGPT. List to store the days
    current = start # ChatGPT. Set starting date
    while current <= end: # ChatGPT. While the current date is not the end date
        result.append(current) # ChatGPT. Add the date
        current += timedelta(days=interval_days) # ChatGPT. Jump ahead by the interval days. Loop again if within end date
    return result # ChatGPT. Return all event days.


def generate_every_other_day(start, end): # ChatGPT. For the every other day event
    """On, off, on, off... starting with start date as ON.""" # ChatGPT. Docstring
    return generate_every_x_days(start, end, 2) # ChatGPT. Uses the every_x_days function but with an interval of 2. 


def generate_every_x_weekday(start, end, weekday_js):# ChatGPT. For every x weekday
    """
    Repeat the chosen weekday (0=Sun,...,6=Sat like JS) weekly between start & end. 
    """ # ChatGPT. Docstring
    if weekday_js is None: # ChatGPT. If there is no weekday.
        return [] # ChatGPT.return nothing

    target_py = (weekday_js + 6) % 7 # ChatGPT. Convert javascript numbers to python numbers. 

    current = start # ChatGPT. Set start day as current
    while current.weekday() != target_py: # ChatGPT. When the current day number does not match the right day of the week
        current += timedelta(days=1) # ChatGPT. Increase the value of current by 1 day. Loop again

    result = [] # ChatGPT. A list to store the data
    while current <= end: # ChatGPT. While the current date is less than the end date
        result.append(current) # ChatGPT. Store the current day
        current += timedelta(days=7) # ChatGPT. Advance 7 days. Continue loop

    return result # ChatGPT. Return the event days


def generate_nth_day_year(start, end, month, day_of_month): # ChatGPT. For the nth day of the year event
    """
    Example: month=1, day=15 => Jan 15 every year between start & end.
    """ # ChatGPT. Docstring
    if not (month and day_of_month): # ChatGPT. If there is no month and day of the month
        return [] # ChatGPT. Return nothing

    result = [] # ChatGPT. Starts the list for the calendar.
    for year in range(start.year, end.year + 1): # ChatGPT.  Loop through the start and end years
        try: # ChatGPT.
            candidate = date(year, month, day_of_month) # ChatGPT. Try finding the specific date. Add to candidate
        except ValueError: # ChatGPT. Except dates that don't exist
            continue # ChatGPT. Continue
        if start <= candidate <= end: # ChatGPT. If start is less than or equal to candidate which is less than or equal to end
            result.append(candidate) # ChatGPT. Add candidate
    return result # ChatGPT. Return the days


def generate_biweekly(start, end, biweekly_obj): # ChatGPT. For the biweekly pattern builder
    """
    biweekly_obj = { "week1": [0..6], "week2": [0..6] }
    JS day numbers: 0=Sun,...,6=Sat.
    We define:
      - Week 1 = week of the startDate
      - Week 2 = next week
      - Then repeat every 2 weeks
    """ # ChatGPT. Docstring
    week1_days = set(biweekly_obj.get("week1") or []) # ChatGPT. Convert the week1 array from JS
    week2_days = set(biweekly_obj.get("week2") or []) # ChatGPT. Convert the week2 array from JS

    result = [] # ChatGPT. A list to store the data
    for current in daterange(start, end): # ChatGPT. Loop through the start to end date range
        delta_days = (current - start).days # ChatGPT. How many days since the start day
        week_index = delta_days // 7  # ChatGPT. Counts weeks by dividing days by 7

        # JS weekday: Sun=0...Sat=6
        js_weekday = (current.weekday() + 1) % 7 # ChatGPT. Converts to javascript weekday

        if week_index % 2 == 0:  # ChatGPT. If the week is even 
            if js_weekday in week1_days: # ChatGPT. The week is part of week 1
                result.append(current) # ChatGPT. add effected days
        else:  # ChatGPT. Otherwise
            if js_weekday in week2_days: # ChatGPT.  Week is part of week 2
                result.append(current) # ChatGPT.  Add affected days

    return result # ChatGPT.  Return dates affected by event.


def generate_dates_for_pattern(payload): # ChatGPT. Selects the type of event to use. 
    """
    Central dispatcher: reads patternType + other fields from payload,
    returns a list[date] of all event dates that should go into Cache.
    """ # ChatGPT. Docstring
    pattern_type = payload.get("patternType") # ChatGPT. Gets the pattern type
    start = parse_iso_date(payload.get("startDate")) # ChatGPT. converts start date string into a date
    end = parse_iso_date(payload.get("endDate")) # ChatGPT. converts end date string into a date

    if not start or not end or start > end: # ChatGPT. If one of the dates is missing  
        return [] # ChatGPT. Return an empty set

    if pattern_type == "223": # ChatGPT. If 223 
        return generate_223(start, end) # ChatGPT. Use the 223 function

    elif pattern_type == "every-x-days": # ChatGPT. if Every X days
        interval_days = int(payload.get("intervalDays") or 0) # ChatGPT. Gets the nth day
        return generate_every_x_days(start, end, interval_days) # ChatGPT. runs the every_x_days function

    elif pattern_type == "every-other-day": # ChatGPT. If every other day
        return generate_every_other_day(start, end) # ChatGPT. runs the generate_every_other_day function

    elif pattern_type == "every-x-weekday": # ChatGPT. If every-x-Weekday
        weekday = payload.get("weekday") # ChatGPT. get the input weekday 
        weekday = int(weekday) if weekday is not None else None # ChatGPT. weekday is the int value of weekday if there is a weekday value
        return generate_every_x_weekday(start, end, weekday) # ChatGPT. runs generate every x weekday function

    elif pattern_type == "nth-day-year": # ChatGPT. if nth day of every year
        month = payload.get("month") # ChatGPT. Get the input month
        day_of_month = payload.get("dayOfMonth") # ChatGPT. get the input day of the month
        month = int(month) if month is not None else None # ChatGPT. Turn month into an integer as long as there is a month input
        day_of_month = int(day_of_month) if day_of_month is not None else None # ChatGPT. Turn day of month into an integer is there is a valid day input
        return generate_nth_day_year(start, end, month, day_of_month) # ChatGPT. run the function
 
    elif pattern_type == "biweekly": # ChatGPT. if biweekly pattern type
        biweekly = payload.get("biweekly") or {} # ChatGPT. Gets the biweekly payload array
        return generate_biweekly(start, end, biweekly) # ChatGPT. Runs the biweekly function
 
    elif pattern_type == "ai-prompt": # ChatGPT. If AI pattern type
        # For now, NO date generation – only store the prompt in the DB.
        return [] # ChatGPT. End

    else: # ChatGPT. Otherwise
        # Unknown pattern
        return [] # ChatGPT. end empty


# ---------- ROUTE: CREATE EVENT ----------

@app.route("/create_event", methods=["POST"]) # ChatGPT. Post endpoint to receive data
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

    # In your real app, user_id should come from session when user logs in replace 1 with real user from login
    user_id = session.get("user_id", 1) # ChatGPT. Temporary test ID

    conn = get_db() # ChatGPT. Connect to database
    try: # ChatGPT.
        cur = conn.cursor() # ChatGPT. Create a cursor to manipulate the database

        cur.execute( # ChatGPT. For intserting event information
            """
            INSERT INTO Event (UserID, Name, Color, Note, Start, End, EventType)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, # ChatGPT. Runs into SQL table
            (
                user_id, # ChatGPT. the user id
                name, # ChatGPT. name of the event
                color, # ChatGPT. event color
                note, # ChatGPT. event note
                start, # ChatGPT. Start date
                end, # ChatGPT. End date
                pattern_type, # ChatGPT. type of event
            ), # ChatGPT. inputing values into SQL
        )
        event_id = cur.lastrowid # ChatGPT. Event id is stored here. 

        if pattern_type == "ai-prompt": # ChatGPT. If the pattern is an ai prompt
            ai_prompt = (payload.get("aiPrompt") or "").strip() # ChatGPT. Get the prompt text with spaces removed
            if ai_prompt: # ChatGPT. If there is an ai prompt
                cur.execute( # ChatGPT. Access SQL
                    """
                    INSERT INTO Prompt (UserID, EventID, PromptText)
                    VALUES (%s, %s, %s)
                    """, # ChatGPT.SQL code to insert values
                    (user_id, event_id, ai_prompt), # ChatGPT. The values being inserted
                ) # ChatGPT.
            # No Cache rows for now

        else: # ChatGPT. Otherwise
            # 3) Generate all dates for this pattern & insert into Cache
            dates = generate_dates_for_pattern(payload) # ChatGPT. Stores the generated dates

            if dates: # ChatGPT. Dates to be stored in the cache
                cache_rows = [(d, event_id, user_id) for d in dates] # ChatGPT. The variables needed for the cache SQL table
                cur.executemany( # ChatGPT. For running the SQL 
                    """
                    INSERT INTO Cache (Times, EventID, UserID)
                    VALUES (%s, %s, %s)
                    """, # ChatGPT. SQL code
                    cache_rows, # ChatGPT. inserts the content of cache rows into the %s spots
                ) # ChatGPT. 
            else: # ChatGPT. If there are no dates
                # Optional: you might treat "no dates" as an error instead
                pass # ChatGPT. Do nothing

        conn.commit() # ChatGPT. Save database changes

        return jsonify( # ChatGPT. Response to front end
            {
                "ok": True, # ChatGPT. Tells JS JSON got the data
                "eventId": event_id, # ChatGPT. sends the event id
                "patternType": pattern_type, # ChatGPT. Sends the pattern type
                "datesInserted": len(generate_dates_for_pattern(payload)) # ChatGPT. Counts how many dates were made by the function
                if pattern_type != "ai-prompt" # ChatGPT. If pattern is not ai prompt
                else 0, # ChatGPT. Otherwise nothing happens
            }
        )

    except mysql.connector.Error as e: # ChatGPT. If there is an SQL error
        conn.rollback() # ChatGPT. undo changes
        print("DB error:", e) # ChatGPT. Print that there was an error
        return jsonify({"ok": False, "error": "Database error."}), 500 # ChatGPT. Create an error message in JSON. http 500

    finally: # ChatGPT. After everything else
        cur.close() # ChatGPT. Close cursor
        conn.close() # ChatGPT. End connection


if __name__ == "__main__": # ChatGPT. If the module is running
    app.run(debug=True) # ChatGPT. Start the app
