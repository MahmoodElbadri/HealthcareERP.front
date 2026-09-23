### This is the Frontend Project, Backend will be found at `https://github.com/MahmoodElbadri/Healthcare-ERP.api`
# Healthcare ERP System 🏥

A comprehensive, enterprise-grade Healthcare Enterprise Resource Planning (ERP) application designed to streamline medical facility operations. This system manages the complete patient lifecycle, from appointment scheduling and medical examinations to automated billing and interactive administrative dashboards.

## 🌟 Core Features & Modules

* **Role-Based Access Control (RBAC):** Secure JWT authentication with distinct portals for Admins, Doctors, and Receptionists.
* **Patient & Medical History Management:** Detailed patient records featuring a chronological timeline of past visits, diagnoses, and prescribed medications.
* **Smart Appointment Scheduling:** Automated queue number generation, daily capacity limits, and real-time status tracking (Scheduled, Completed, Cancelled).
* **Clinical Examination Workflow:** Dynamic electronic prescription building (FormArrays) and diagnosis recording.
* **Automated Billing & Invoicing:** Auto-generation of pending invoices upon appointment completion, with seamless payment collection workflows.
* **Interactive Admin Dashboard:** Live KPIs, revenue tracking, and analytics using `Chart.js` (Top prescribed medications, appointment distribution).
* **Automated Background Jobs:** Integration with `Hangfire` to proactively process missed appointments and cancel pending invoices at midnight.
* **Bilingual & RTL Support:** Instant language switching (English/Arabic) with dynamic Right-to-Left layout adjustments using `ngx-translate`.
* **Enterprise-Grade Logging:** Structured global exception handling and daily rolling log files managed by `Serilog`.

## 🛠️ Tech Stack

### Frontend (Client-Side)

* **Framework:** Angular 18+ (Standalone Components, Reactive Forms, Signals)
* **Styling & UI:** Bootstrap 5, FontAwesome, custom CSS/SCSS
* **Charting:** `ng2-charts` & `Chart.js`
* **Internationalization:** `ngx-translate`
* **Routing:** Angular Router with AuthGuards & RoleGuards

### Backend (Server-Side)

* **Framework:** .NET 8 (ASP.NET Core Web API)
* **Database & ORM:** SQL Server, Entity Framework Core
* **Authentication:** ASP.NET Core Identity, JWT Bearer Tokens
* **Task Scheduling:** Hangfire
* **Logging:** Serilog (Console & Rolling File Sinks)
* **Object Mapping:** AutoMapper

## 📐 Architecture & Design Patterns

The backend is structured to ensure maintainability, testability, and separation of concerns:

* **N-Tier Architecture Approach:** Separation of Core, Application, Infrastructure, and API layers.
* **Repository & Unit of Work Patterns:** Centralized data access logic and transaction management to prevent partial database updates (Cartesian explosion handling).
* **Data Transfer Objects (DTOs):** Strict payload isolation between database entities and API responses.
* **Global Exception Handling:** Custom Middlewares to catch unhandled errors, ensuring uniform JSON error responses and silent logging.
* **Defensive Programming:** Optimized LINQ queries (`SumAsync`, `CountAsync`, decoupled Eager Loading) to maximize performance and minimize database load.

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* Angular CLI
* .NET 8 SDK
* SQL Server

### Backend Setup

1. Clone the repository and navigate to the API directory.
2. Update the `DefaultConnection` string in `appsettings.json`.
3. Open the Package Manager Console and apply migrations:
```bash
Update-Database

```


4. Run the application (This will automatically seed the default Admin, Doctor, and Receptionist roles/users).
5. The Hangfire dashboard will be available at `/hangfire`.

### Frontend Setup

1. Navigate to the client directory.
2. Install dependencies:
```bash
npm install

```


3. Start the development server:
```bash
ng serve

```


4. Open `http://localhost:4200` in your browser.

---

*Developed with a focus on code quality, edge-case prevention, and scalable architecture by Mahmoud Salah Elbadri.*

---


