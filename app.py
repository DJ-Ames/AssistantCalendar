# ChatGPT. Imports python libraries
from flask import Flask, request, jsonify, session # ChatGPT.
import mysql.connector # ChatGPT.
from mysql.connector import Error # ChatGPT.
from werkzeug.security import generate_password_hash, check_password_hash # ChatGPT.

app = Flask(__name__) # ChatGPT.Tells python the name of the module so it can find necessary resources

# Needed if you want to use Flask session:
app.secret_key = "asdfadasdasdasdasdg" # ChatGPT. Stores a session cookie for integrity verification


DB_CONFIG = {  # ChatGPT. Used to connect with the SQL database
    "host": "localhost",  # ChatGPT. Run server on same machine
    "user": "your_mysql_username",  # ChatGPT. Where I'll input my username
    "password": "your_mysql_password",  # ChatGPT. Where I'll input my password
    "database": "AssistantCalendar",  # ChatGPT. Database name
}

def get_db_connection():  # ChatGPT. Function for establishing Database Connection
    return mysql.connector.connect(**DB_CONFIG)  # ChatGPT. Connects to database using the config information made in DB_CONFIG


# -------------------------------------------------
#  OPTIONAL: create-account route (for reference)
# -------------------------------------------------
@app.route("/api/create-account", methods=["POST"])  # ChatGPT. Creates a URL path for account creation
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

    try: # ChatGPT.
        conn = get_db_connection() # ChatGPT. Connects to the database
        cursor = conn.cursor() # ChatGPT. Starts a cursor object for SQL commands

        cursor.execute("SELECT UserID FROM Users WHERE Username = %s", (username,)) # ChatGPT. Checks for usernames that are the same
        if cursor.fetchone(): # ChatGPT. If the username is found
            return jsonify({"ok": False, "error": "Username already taken."}), 409 # ChatGPT. JSON warning that the username is in use. 409 error

        cursor.execute( # ChatGPT. To insert the data
            "INSERT INTO Users (Username, Password) VALUES (%s, %s)", # ChatGPT. Inserts the username and password hash into the %s values.
            (username, password_hash), # ChatGPT.
        ) # ChatGPT.
        conn.commit() # ChatGPT. Saves database changes
        user_id = cursor.lastrowid # ChatGPT. Contains the userid.
    except Error as e: # ChatGPT. If an error occurs
        return jsonify({"ok": False, "error": f"Database error: {e}"}), 500 # ChatGPT. Returns error in JSON format. 500 HTTP internal server error.
    finally: # ChatGPT. Always runs
        if cursor: # ChatGPT. If cursor is open
            cursor.close() # ChatGPT. Close cursor
        if conn: # ChatGPT. If there is still a connection
            conn.close() # ChatGPT. Close the connection

    return jsonify( # ChatGPT. JSON returned to the front end
        {
            "ok": True, # ChatGPT. Shows that saving the account was successful
            "message": "Account created successfully.", # ChatGPT. shows a message that creation was successful.
            "userId": user_id, # ChatGPT. Shows user id
            "username": username, # ChatGPT. shows username
        } # ChatGPT.
    ), 201 # ChatGPT.201 created status HTTP


# -------------------------------------------------
#  LOGIN ROUTE (this is what you asked for)
# -------------------------------------------------
@app.route("/api/login", methods=["POST"]) # ChatGPT. Login url path.
def login(): # ChatGPT. Login function
    """
    Expects JSON:
    {
      "username": "someone",
      "password": "theirPassword"
    }

    Returns JSON:
    {
      "ok": true/false,
      "message" or "error",
      "userId": ...,
      "username": ...
    }
    """ # ChatGPT. Docstring
    data = request.get_json(silent=True) or {} # ChatGPT. Reads the JSON information
    username = (data.get("username") or "").strip() # ChatGPT. Shows username or nothing if empty. Removes empty spaces
    password = data.get("password") or "" # ChatGPT. Shows password or nothing if empty.

    if not username or not password: # ChatGPT. If neither password or username are input
        return jsonify({"ok": False, "error": "Username and password are required."}), 400 # ChatGPT. 400 bad connection. Sends JSON error to front end.

    try: # ChatGPT.
        conn = get_db_connection() # ChatGPT. Connects to mysql
        cursor = conn.cursor(dictionary=True) # ChatGPT. Ensures that data comes in a dict format based on keys

        cursor.execute( # ChatGPT. Looks for the input username
            "SELECT UserID, Username, Password FROM Users WHERE Username = %s", # ChatGPT. SQL for the username search
            (username,), # ChatGPT. variable being searched for
        ) # ChatGPT.
        row = cursor.fetchone() # ChatGPT. Fetches the user

        if not row: # ChatGPT. If an invalid username was input
            return jsonify({"ok": False, "error": "Invalid username or password."}), 401 # ChatGPT. Returns a JSON error message. 401 unauthorized code.

        stored_hash = row["Password"] # ChatGPT. Finds the hash in the database.

        # If you're storing plain-text passwords (NOT recommended), you would do:
        # if password != stored_hash: ...
        if not check_password_hash(stored_hash, password): # ChatGPT. if the hash does not equal the password.
            return jsonify({"ok": False, "error": "Invalid username or password."}), 401 # ChatGPT. Returns a JSON error message. 401 unauthorized code.

        user_id = row["UserID"]  # ChatGPT. Stores the user's ID

        # Optionally store login info in Flask session
        session["user_id"] = user_id  # ChatGPT. Stores ID in a session with browser cookies.
        session["username"] = row["Username"]  # ChatGPT. Stores the username in a session.

    except Error as e:  # ChatGPT. If there is an error.
        return jsonify({"ok": False, "error": f"Database error: {e}"}), 500  # ChatGPT. Send JSON data for the error to the front end. 500 internal server error. 
    finally:  # ChatGPT. Always runs
        if cursor:  # ChatGPT. If the cursor is active
            cursor.close()  # ChatGPT. Close the cursor
        if conn:  # ChatGPT. if the connection is open
            conn.close()  # ChatGPT. close the connection

    return jsonify(  # ChatGPT. For returning JSON data upon success
        {
          "ok": True,  # ChatGPT. Confirms login for JS
          "message": "Login successful.",  # ChatGPT. Confirms login for user
          "userId": user_id,  # ChatGPT. Stores user id
          "username": row["Username"],  # ChatGPT. Sends username
        }  # ChatGPT.
    ), 200  # ChatGPT. 200 request succeeded.


# -------------------------------------------------
#  OPTIONAL: logout endpoint
# -------------------------------------------------
@app.route("/api/logout", methods=["POST"])  # ChatGPT. Logout URL route
def logout():  # ChatGPT. logout function
    session.clear()  # ChatGPT. Clears all session data.
    return jsonify({"ok": True, "message": "Logged out."})  # ChatGPT. Send a JSON message confirming the logout


if __name__ == "__main__":   # ChatGPT. If the module is running
    app.run(debug=True)  # ChatGPT. Starts the app
