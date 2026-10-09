
# 🖨️ Label Printing Server (4-API Modular Node.js System)

A modular Node.js backend system for printing labels using 4 dedicated API endpoints. Each endpoint maps to a custom executable (`label_execX.exe`) and accepts unique parameters.

## 📁 Project Structure


project/
│
├── server.js                       # Entry point of the server
├── routes/
│   └── print.js                    # Central router for /api/print/X
├── controllers/
│   ├── label1.js                   # Logic for API 1
│   ├── label2.js                   # Logic for API 2
│   ├── label3.js                   # Logic for API 3
│   └── label4.js                   # Logic for API 4
├── views/
│   └── confirmPage.js              # Renders confirmation page
├── executableBaseCodes/    # Codes Only Compile them with Visual Studio or other software 
│   ├── label_exec1            #  label 1
│   ├── label_exec2           # label 2
│   ├── label_exec3           # label 3
│   └── label_exec             #  label 4
|-- Lables # Contains all albel files .lbx
├── uploads/                        # (Optional) For resume or file uploads
├── .env                            # Environment variables
├── package.json



## 🚀 How to Start the Server

`bash
# Install dependencies
npm install

# Start the server
node server.js


Server will run at:

http://localhost:5050

---

## 📌 .env Configuration
PORT=5050


*(Note: Executable paths are hardcoded relative to `/executables/`)*

---

## ✅ Supported APIs

### 🔹 API 1 — Print Type 1

**URL:** `GET /api/print/1`

**Query Parameters:**

* `PartsNumber`
* `DrawingNumber`
* `PrintQuantity`
* `Type`

**Executable:** `label_exec1.exe`

**Example:**

```http
GET /api/print/1?PartsNumber=ABC123&DrawingNumber=TEC-4300994%20%232&PrintQuantity=2&Type=0
```

---

### 🔹 API 2 — Print Type 2

**URL:** `GET /api/print/2`

**Query Parameters:**

* `PartsNumber`
* `DrawingNumber`
* `PrintQuantity`
* `CustomerItem`

**Executable:** `label_exec2.exe`

---

### 🔹 API 3 — Print Type 3

**URL:** `GET /api/print/3`

**Query Parameters:**

* `CustomerItem`
* `PrintQuantity`

**Executable:** `label_exec3.exe`

---

### 🔹 API 4 — Print Type 4

**URL:** `GET /api/print/4`

**Query Parameters:**

* `ProductName`
* `ModelNumber`
* `PrintQuantity`

**Executable:** `label_exec4.exe`

---

## 🧾 How it Works

### 🔄 GET Request

1. User visits an API URL with query params
2. Server responds with an HTML **confirmation page** containing a button
3. All parameters are embedded as hidden form fields

### ✅ POST Request

1. When the user clicks "Confirm & Print", the form sends a POST request to the same endpoint.
2. The respective `.exe` file is executed using `child_process.execFile` with the given parameters.
3. A success or error HTML page is returned (auto-closes in 5 seconds).

---

## 📄 Sample Confirmation Page Output

```html
<form method="POST" action="/api/print/1">
  <input type="hidden" name="PartsNumber" value="ABC123" />
  <input type="hidden" name="DrawingNumber" value="TEC-4300994 #2" />
  <input type="hidden" name="PrintQuantity" value="2" />
  <input type="hidden" name="Type" value="0" />
  <button type="submit">Confirm & Print</button>
</form>
```

---

## ⚙️ Custom Executables

Each `.exe` should accept the exact order of arguments as required by the respective label type.

Example for `label_exec1.exe`:

```bash
label_exec1.exe ABC123 "TEC-4300994 #2" 2 0
```

---

## 🛠️ Debugging

* Errors during execution are logged in the server console.
* 500 errors are shown if the executable fails.
* Make sure the executable has proper permissions and paths.

---

## 🔁 Restart on Boot (Optional)

To auto-start the server on Windows boot:

1. Create a `.bat` file like this:

```bat
@echo off
cd C:\Path\To\Project
start cmd /k "node server.js"
```

2. Place it in:

```
shell:startup
```

---

## 🔒 Security Notes

* Ensure proper validation/sanitization for all inputs.
* Limit access to executables and enforce user roles if needed.
* Disable file uploads or restrict file types if you extend to resumes or attachments.

---

## 📦 Future Enhancements

* Add frontend UI for uploading CSVs or PDFs
* Connect to MongoDB for logging history
* Enable printer selection via config

---

## 👨‍💻 Author

Created by \ Arnav Jain
For internal label automation printing using Brother P-touch or equivalent tools.

---


****
