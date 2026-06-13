# Seminit (Smart Meeting Minutes) 🚀

An AI-Based Automatic Meeting Minutes Generation System designed to transform traditional, time-consuming administrative workflows into high-efficiency, digital-first operations. **Seminit** automates the entire documentation lifecycle—from audio capture and Speech-to-Text (STT) processing to natural language summarization and standardized report formatting.

Developed for the **Kulai District Council** to eliminate a critical administrative backlog where manual minutes preparation takes up to five months, this application introduces an intelligent, future-proof solution that delivers a **60% reduction in minutes preparation time**.

---

## 📌 Features & Core Subsystems

The application architecture is broken down into four intelligent subsystems:

### 1. Audio Processing & Transcription Subsystem
* **Flexible Audio Input:** Captures audio through live microphone recording or allows users to upload pre-recorded audio files in standard formats.
* **Autonomous Transcription:** Converts spoken words into written text with high accuracy utilizing AI-driven Speech-to-Text.
* **Precision Timestamping:** Assigns synchronized time markers to segments of the text, enabling users to easily track the meeting's timeline.

### 2. Minutes Generation Subsystem
* **Action Item Detection:** Automatically identifies critical decisions, assigned tasks, and follow-ups from the conversation to reduce human error and ensure accountability.
* **Generative Summarization:** Condenses long, complex discussions into clear, readable, and concise summaries.
* **Standardized Formatting:** Structures the final output into a professional, consistent format tailored to corporate and council standards.

### 3. Search & Retrieval Subsystem (Knowledge Hub)
* **Digital Database Storage:** Securely stores audio files and generated meeting minutes to protect data longevity and prevent the risks associated with physical file cabinets.
* **Metadata Search Module:** Leverages AI to let administrative staff easily filter through unstructured historical data by date range, department, and meeting category.

### 4. User Interface & Interaction Subsystem
* **Central Dashboard:** Provides a clean overview of upcoming/past meetings, generated minutes, and usage statistics.
* **Minutes Review & Editing:** Offers a dedicated workspace for secretaries to review, modify, and manually approve drafts before finalized locks.
* **Export & Sharing Module:** Allows instant exporting of completed meeting logs into PDF or Word documents, or direct sharing via email.

---

## 🛠️ Tech Stack & Solution Architecture

The platform uses a robust, multi-layered stack designed for asynchronous high performance, cross-language AI integration, and secure scalability.

### Solution Architecture Flow
[ Frontend: React + Tailwind CSS ]
│
▼ (RESTful API)
[ Backend Layer: Node.js ]
│
▼ (RESTful API)
[ AI Integration Layer: FastAPI ]
│
├─► [ Transcription Layer: ClipChamp AI ]
└─► [ Natural Language Model: OpenAI API ]
│
▼
[ Database & Storage: MongoDB & Oracle Cloud Infrastructure (OCI) ]

### Component Details
* **Frontend:** Built with **React** for a component-based, highly maintainable user interface, styled using **Tailwind CSS** for clean utility-first design.
* **Backend:** Powered by **Node.js** utilizing an event-driven architecture to handle concurrent user connections smoothly with minimal overhead.
* **API Communication:** Standardized using **RESTful APIs** for secure data interoperability and fast caching strategies.
* **AI Integration Layer:** Driven by a **FastAPI** Python framework, selected for its lightweight asynchronous performance.
* **AI Engines:** Integrates **ClipChamp** for rapid Speech-to-Text translation and **OpenAI** for advanced Natural Language Processing (NLP) to summarize text and detect action items.
* **Database & Cloud Storage:** Uses **MongoDB** to handle flexible, unstructured document data, combined with **Oracle Cloud Infrastructure (OCI)** for reliable, secure file hosting of `.pdf` and source audio archives.

---

## 👥 The Scrum Team

This system was proposed and developed by the **All Day Project** team (Section 02, Universiti Teknologi Malaysia) using Agile Scrum methodologies across 4 structured sprints[cite: 1]:

* **Muhammad Farish Danial Bin Abdul Hamid** (Matric No: A24CS0131)
* **Mohamad Hafiz Haziq Bin Matdaim** (Matric No: A24CS0115)
* **Jeremy Geafri** (Matric No: A24CS0087)
* **Nurhurin Balqis Binti Azrul Rafiz** (Matric No: A24CS0170)

---

## 📈 Impact & Vision Alignment

Beyond solving the immediate operational bottlenecks of local council management, **Seminit** directly supports the broader **Johor Vision 2030** initiatives. By infusing AI technologies into daily public workflows, the system helps minimize human errors, secures public data lifecycle management, and acts as a stepping stone toward regional digital transformation.

# Setup using your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
