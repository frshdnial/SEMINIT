# Seminit — Smart Meeting Minutes 

**Seminit** (a portmanteau of *"Smart Meeting Minutes"*) is an AI-based automatic meeting minutes generation system. It was proposed to solve a real operational bottleneck at **Pejabat Daerah Kulai** (Kulai District Council), where manual meeting minutes preparation — listening back to recordings and typing everything by hand — could take up to **five months** per report, with no standardized format and a high risk of human error or lost information.

Seminit's goal is to let a secretary upload or record a meeting's audio and have the system handle transcription, summarization, and formatting automatically, so minutes can be produced, searched, and shared in a fraction of the time.

> This repository is a Project by **All Day Project**. It implements the core application end-to-end; the AI transcription/summarization layer described in the original proposal is currently **mocked** pending integration with a real Speech-to-Text/NLP provider — see the [Features](#-features) table below for exactly what's real and what's a placeholder today.

---

##  Team

Developed by **All Day Project**, Section 02, Universiti Teknologi Malaysia, using Agile Scrum across 4 sprints with rotating roles each sprint:

| Name | Matric No |
|---|---|
| Muhammad Farish Danial Bin Abdul Hamid | A24CS0131 |
| Mohamad Hafiz Haziq Bin Matdaim | A24CS0115 |
| Jeremy Geafri | A24CS0087 |
| Nurhurin Balqis Binti Azrul Rafiz | A24CS0170 |

---

##  Vision

Beyond solving Kulai District Office's immediate administrative bottleneck, Seminit is positioned as a small step toward **Johor's Vision 2030** goal of becoming a regional AI and data hub — demonstrating how AI can reduce human error and administrative overhead in everyday public-sector workflows.

---

##  Features

| Subsystem (per proposal) | What it does | Status |
|---|---|---|
| **Audio Processing & Transcription** | Upload a pre-recorded `.mp3`/`.wav`/`.m4a` file, or record live via microphone | 🟢 File upload is fully implemented (stored to backend + database). 🟡 Live microphone recording UI exists but doesn't capture real audio yet. 🔴 Speech-to-Text conversion is mocked (returns placeholder transcript). |
| **Minutes Generation** | Detect action items, generate a summary, format into a standard template | 🔴 Summary/action-item generation is mocked (returns placeholder text) — no LLM is wired in yet. 🟢 Standardized formatting/template UI is implemented. |
| **Search & Retrieval** | Store audio + minutes in a database; filter/search meetings | 🟢 Meetings + audio files are persisted to MySQL. 🔴 Metadata/AI-assisted search filtering is not yet implemented (only client-side name search on the list screen). |
| **User Interface & Interaction** | Dashboard, meeting setup, review/editing, export & sharing | 🟢 Dashboard, meeting setup, audio upload, minutes review/editing, and a printable minutes production view are all implemented. 🔴 Export to PDF/Word and email sharing are not yet implemented. |

---

##  Architecture

### Current (as implemented in this repo)

```
┌─────────────────────────────┐
│   Frontend (Expo / React    │
│   Native + NativeWind)      │
│   — runs as a web app via   │
│     `expo start --web`      │
└──────────────┬───────────────┘
               │  REST API (fetch, JSON + multipart/form-data)
               ▼
┌─────────────────────────────┐
│   Backend (Laravel / PHP)   │
│   — routes/api.php          │
│   — MeetingController       │
└──────────────┬───────────────┘
               │  Eloquent ORM
               ▼
┌─────────────────────────────┐
│   MySQL Database             │
│   (`seminit_db`)             │
└─────────────────────────────┘
               ▲
               │  local disk storage
┌──────────────┴───────────────┐
│  storage/app/public/          │
│  meeting_audio/  (.mp3 files) │
└───────────────────────────────┘
```

- **Frontend**: Expo (React Native + `react-native-web`), styled with **NativeWind** (Tailwind for React Native). Runs in the browser via Expo's web target, and can also run on iOS/Android through Expo.
- **Backend**: **Laravel 12** (PHP 8.2+), exposing a small REST API for meetings and audio uploads.
- **Database**: **MySQL**, storing meeting metadata (name, date, time, participants, agenda, status) plus the transcript/summary text once generated.
- **File storage**: Uploaded audio files are stored on Laravel's local `public` disk (`storage/app/public/meeting_audio`) and served via the `storage:link` symlink.

### Original proposed architecture 

The proposal envisioned a more elaborate stack for the AI layer specifically, which this codebase does not yet integrate:

```
[ Frontend: React + Tailwind CSS ]
              │  RESTful API
              ▼
[ Backend: Node.js ]
              │  RESTful API
              ▼
[ AI Integration Layer: FastAPI ]
              ├─► [ Speech-to-Text: ClipChamp ]
              └─► [ NLP / Summarization: OpenAI ]
              │
              ▼
[ Database: MySQL + Oracle Cloud Infrastructure (OCI) for file storage ]
```

In practice, the team built the frontend with **Expo/React Native** (rather than a plain React web app) and the backend with **Laravel** (rather than Node.js + a separate FastAPI AI microservice), since this let one team cover both mobile and web from a single codebase and kept the backend simpler for the project's scope. The `FastAPI` + `ClipChamp` + `OpenAI` AI pipeline is the natural next step to replace the current mocked transcript/summary generation.

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Expo (React Native `0.81`), React `19`, NativeWind / Tailwind CSS, TypeScript |
| Backend | Laravel `12`, PHP `8.2+` |
| Database | MySQL |
| File storage | Laravel local `public` disk |
| Dev tools | Composer, npm, Git |

---

##  Project Structure

```
SEMINIT/
├── App.tsx                     # Root component & screen router (state machine)
├── src/
│   ├── screens/                 # Dashboard, CreateMeeting, AudioUpload, Generate/Format/Production, List
│   ├── components/              # Reusable UI (MeetingListItem, layout, ui/ primitives)
│   ├── config/api.ts            # API base URL + endpoint builders
│   ├── types/index.ts           # Shared TypeScript types (Meeting, etc.)
│   └── theme/                   # Colors & shared style tokens
├── schema/
│   └── schema_test.sql          # Raw SQL fallback for bootstrapping the DB without migrations
├── Backend/                     # Laravel API
│   ├── app/Http/Controllers/MeetingController.php
│   ├── app/Models/Meeting.php
│   ├── database/migrations/     # Includes add_audio_path_to_meetings_table
│   ├── routes/api.php
│   └── .env.example
└── package.json                 # Expo frontend dependencies & scripts
```

---

##  Prerequisites

Install these before setting up the project:

- **Node.js** 18+ and npm
- **PHP** 8.2+ with the usual extensions Laravel needs (`mbstring`, `pdo_mysql`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`)
- **Composer** (PHP dependency manager)
- **MySQL** 8.x (or MariaDB equivalent) running locally
- A modern web browser (for `expo start --web`) — or Expo Go / an emulator if you want to run it as a mobile app instead

---

##  Setup & Run Locally

### 1. Get the code

Clone the project, then open a terminal in the project root (the folder containing `App.tsx` and `Backend/`).

### 2. Backend (Laravel API)

```bash
cd Backend

# Install PHP dependencies
composer install

# Copy the example env file (skip if .env already exists)
cp .env.example .env

# Generate the app encryption key
php artisan key:generate
```

Open `Backend/.env` and set your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=seminit_db
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

Create the database, then run the migrations:

```bash
# In MySQL: CREATE DATABASE seminit_db;

php artisan migrate
```

Link the public storage folder so uploaded audio files are actually reachable over HTTP:

```bash
php artisan storage:link
```

Start the API server (defaults to `http://localhost:8000`):

```bash
php artisan serve
```

### 3. Frontend (Expo)

Open a **second terminal** in the project root:

```bash
npm install
```

If your backend isn't running on `http://localhost:8000`, update the `BASE_URL` in `src/config/api.ts` accordingly.

Start the Expo dev server for web:

```bash
npx expo start --web
```

This opens the app at `http://localhost:8081`. You can also run `npx expo start` and scan the QR code with Expo Go to try it on a phone (make sure `BASE_URL` points to your machine's LAN IP, not `localhost`, in that case, since the phone isn't the same device as the API server).

### 4. Verify

- Create a new meeting from the dashboard → confirms the frontend can reach the Laravel API and MySQL.
- Upload an `.mp3` file on the Audio Upload screen → confirms `storage:link` and the `meeting_audio` upload endpoint are working.
- Check `Backend/storage/app/public/meeting_audio/` — your uploaded file should be there.

---

##  Troubleshooting

| Symptom | Likely cause |
|---|---|
| Blank white screen on `expo start --web` | Corrupted/incompatible `node_modules` (e.g. copied from a different OS). Delete `node_modules` and re-run `npm install` on the target machine. |
| `SQLSTATE[42S22]: Column not found` | A migration hasn't been run yet. Run `php artisan migrate`. |
| Uploaded audio 404s when played back | `php artisan storage:link` wasn't run, or was run before the `public` disk existed. |
| `Validation rule ... requires at least 1 parameters` | A Laravel validation rule is malformed (e.g. `max|255` instead of `max:255`) — check `MeetingController.php`. |
| CORS errors calling the API from the browser | Confirm the backend is running and `BASE_URL` in `src/config/api.ts` matches its host/port exactly. |

