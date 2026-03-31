# Remote Digital Signage & Public Address (PA) Controller

A Centralized Media Orchestrator designed to manage remote endpoints via a web browser, enabling the playback of synchronized audio and visual content. 

Unlike standard video players, this system is **event-driven**, capable of seamlessly interrupting visual loops for scheduled advertisements.

---

## 🏗️ Architectural Breakdown

This project bridges software and hardware through a three-tier architecture:

### 1. The Content Management System (CMS) - Frontend
* **Framework:** React.js
* **Function:** A User Interface (UI) for Asset Orchestration.
* **Key Features:** Utilizes Drag and Drop (DnD) APIs to allow users to create a visual timeline or "Playlist" of media files effortlessly.

### 2. The State Manager & File Server - Backend
* **Framework:** Node.js
* **Function:** Acts as the central brain of the system.
* **Key Features:** Maintains the "Source of Truth" (via a JSON manifest) that dictates exactly what the edge devices should play and when. Communicates with endpoints via WebSockets or Polling.

### 3. The Edge Media Player - Hardware
* **Hardware:** Raspberry Pi
* **Function:** Acts as a Kiosk Client and physical endpoint.
* **Key Features:** Runs a restricted browser environment configured via custom automation scripts. It listens for updates from the Node.js server and renders the synchronized media directly to the HDMI output.

---

## 🚀 Features

* **Centralized Dashboard:** Manage multiple Pi endpoints from a single React web interface.
* **Drag-and-Drop Playlist Creation:** Easily sequence images, videos, and audio.
* **Event-Driven Interruptions:** Instantly push scheduled advertisements that temporarily override the standard media loop.
* **Automated Edge Deployment:** Custom scripts to configure the Raspberry Pi into a secure, automated Kiosk mode on boot.

---

## 🛠️ Installation & Setup

### Prerequisites
* Node.js installed on your primary server/machine
* A Raspberry Pi with Raspberry Pi OS installed
* A display monitor connected to the Pi via HDMI

### Local Development Setup

**1. Clone the repository**
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
