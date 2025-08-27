# Time-Snap — Employee/Device Monitor/Time tracker Desktop App

An open-source desktop monitoring application inspired by tools like **Apploye**. This app is designed to be easily integrated with your own backend server, making it fully customizable and developer-friendly.

Built using **Tauri** for the desktop client and an example backend written in **Rust**.

---

## ✨ Features

* Open-source and fully extensible
* Backend-agnostic (easily connect your own server)
* Built with Tauri for native performance
* Simple and clean user interface
* Secure login with email and password
* Forgot Password and Signup redirects

---

## 📁 Project Structure Overview

```
├── client/                 # Tauri-based desktop client application
├── server/                 # Sample backend in Rust (for reference)
└── README.md               # You're here
```

---

## ⚙️ Getting Started

### Prerequisites

* Rust (for building the backend example)
* Node.js / Tauri CLI (for building the desktop app)


## 🛠️ Configuration

On first launch, Time-Snap will ask for your backend **Base URL**:

```
https://yourserver.com
```

After entering the Base URL and clicking **Next**, you'll be redirected to the **Login Screen**.

---

## 🔑 Authentication Flow

### Login

* Endpoint: `baseUrl/auth/login`
* Method: `POST`
* Payload:

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

### Forgot Password

* Opens in browser:

```
baseUrl/auth/forgotpass
```

### Sign Up

* Opens in browser:

```
baseUrl/auth/signup
```

---

## 🚀 Example Backend

A working example of the backend integration written in **Rust** is available in:

```
server/
```

This helps you understand the expected API structure and response formats.

---

## 🚧 Contribution Guide

We welcome contributions from the community!

* Fork the repository
* Create a new branch
* Submit a pull request

Please ensure your code is well-documented and tested.

---

## ❓ Support

If you run into any issues or have questions:

* Check the [Issues](https://github.com/your-username/time-snap/issues)
* Submit a bug report or feature request

---

## 🌟 License

This project is licensed under the **MIT License**. Feel free to use and modify it as needed.

---

## 📍 Credits

Built with love using **Tauri** and **Rust** by \[Your Name / Organization]

---

> “Monitor smart, work better — with Time-Snap.”


## 📍 Troubleshooting
For mac skip shacking 
```shall
sudo xattr -rd com.apple.quarantine /Applications/TimeSnap.app
```
For linux
screen capture work on X11
if use wayland get black screen
```
echo $XDG_SESSION_TYPE // for Verify you are on X11

// move to X11
sudo nano /etc/gdm3/custom.conf 
#WaylandEnable=false // uncomment this line
```