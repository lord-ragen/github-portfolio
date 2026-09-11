import { StrictMode, useEffect, useMemo, useState, type CSSProperties } from "react";
import { createRoot } from "react-dom/client";

type Project = {
  slug: string;
  title: string;
  group: "Mobile applications" | "Data visualization & analytics" | "Scripting & automation";
  category: string;
  description: string;
  tags: string[];
  accent: string;
  overview: string;
  role: string;
  highlights: string[];
  details: { title: string; copy: string; items: string[] }[];
  image?: string;
  gallery?: string[];
};

type ProjectNarrative = {
  problem: string;
  engineeringNote: string;
  outcome: string;
};

const colors = {
  smokyBlack: "#171914",
  oliveDrab: "#6b733f",
  bone: "#d8cfb8",
  floralWhite: "#fbf8ef",
  muted: "#a8a28e",
  line: "rgba(216, 207, 184, 0.18)",
  panel: "#20221b",
};

const projects: Project[] = [
  {
    slug: "mywork",
    title: "MyWork Application",
    group: "Mobile applications",
    category: "Productivity system",
    description: "A calm, structured workspace for turning notes into tasks, events, and momentum.",
    tags: ["Flutter", "Dart", "SQL Server", "MVVM"],
    accent: "#b1bb72",
    overview: "MyWork brings notes, tasks, events, reminders, search, and activity history into one focused productivity system. The product is designed around a clear path from an idea to an accountable action.",
    role: "System architect, backend logic designer, database schema designer, business rules implementer, and UI workflow designer.",
    highlights: ["Rich notes with tags, sharing, archive, and search", "Tasks with priority, status, due dates, dependencies, and subtasks", "Recurring events, conflict detection, reminders, and calendar views", "Dashboard summaries, notifications, audit logs, sync, and offline support"],
    details: [
      { title: "Problem statement", copy: "Manual productivity management scattered notes, deadlines, and events across disconnected tools.", items: ["Scattered notes and unclear priorities", "No unified view of personal productivity", "No structured workflow from idea to execution"] },
      { title: "Core functional modules", copy: "The product connects the complete productivity lifecycle in one place.", items: ["Authentication and role-based access", "Notes, tasks, events, dashboard, search, and filters", "Notifications, audit logging, sync, and offline workflows"] },
      { title: "Core modules in detail", copy: "Each module supports a distinct part of the work-management lifecycle.", items: ["Authentication: account creation, password reset, token validation, and Admin/User access", "Notes: rich editing, categorization, tagging, search, sharing, archive, and deletion", "Tasks: creation from notes, priorities, statuses, due dates, dependencies, subtasks, assignment, and reassignment", "Events: recurring schedules, conflict warnings, reminders, categories, colors, and calendar views", "Dashboard: daily overview, week/month planning, statistics, widgets, and layouts", "Search, notifications, audit logs, sync, offline work, backup, restore, and JSON/CSV/PDF export"] },
      { title: "Technology and database design", copy: "The system combines Flutter and Dart with a relational API-backed data model.", items: ["ASP.NET Web API, Entity Framework, SQL Server, and JSON data interchange", "Users, notes, tasks, events, categories, tags, notifications, and ActivityLogs", "Denormalized dashboard queries, soft deletes, UTC timestamps, referential integrity, and indexed full-text search"] },
      { title: "Data flow", copy: "MyWork follows a traceable path from idea capture to measurable completion.", items: ["User captures a note", "Note becomes an actionable task", "Task is scheduled as an event", "Reminders and notifications are configured", "Work is completed, logged, and archived", "Notes can generate tasks, tasks can schedule events, and every operation creates an audit entry"] },
      { title: "Engineering challenges and solutions", copy: "The implementation addresses scale, time, concurrency, performance, and workflow state.", items: ["SQL Server full-text indexes and cached results keep search responsive beyond 100K records", "UTC storage and presentation-layer timezone conversion keep reminders accurate", "Optimistic locking, last-write-wins handling, merge logic, and activity history protect concurrent edits", "Denormalized dashboard data, scheduled cache refreshes, pagination, and filtered queries keep dashboards under 100ms", "State-machine validation and atomic stored procedures prevent invalid note-to-task-to-event transitions"] },
      { title: "Operational impact", copy: "The unified workflow reduces cognitive load while making work measurable.", items: ["Centralized notes, tasks, and events", "Clearer deadlines and better planning", "Automatic reminders and follow-ups", "Activity-based accountability and collaboration", "Higher completion visibility and a complete audit trail"] },
      { title: "Scalability and engineering principles", copy: "The design leaves room for a multi-user, multi-tenant productivity platform.", items: ["Role-based collaboration and multi-tenant SaaS support", "Slack, Microsoft Teams, and Google Calendar integration points", "WebSocket notifications, API-first clients, partitioning, caching, and million-user growth planning", "Domain-driven design, Clean Architecture, SOLID, state machines, event-sourcing concepts, and layered caching"] },
      { title: "Future enhancements and lessons learned", copy: "The project established a foundation for richer collaboration and analytics.", items: ["Mobile and web client expansion with real-time collaboration", "More analytics-driven productivity insights", "Security and compliance through comprehensive auditability", "Strict validation, explicit state transitions, and clear domain boundaries are essential for dependable workflow software"] },
    ],
    image: "assets/images/MyWork.png",
    gallery: ["assets/screenshots/MYWORK1.jpg", "assets/screenshots/MYWORK2.jpg", "assets/screenshots/MYWORK3.jpg", "assets/screenshots/MYWORK4.jpg", "assets/screenshots/MYWORK5.jpg", "assets/screenshots/MYWORK6.jpg"],
  },
  {
    slug: "natmobile",
    title: "NATMOBILE",
    group: "Mobile applications",
    category: "Financial systems",
    description: "Secure digital banking flows shaped around reliability, clear transactions, and enterprise integration.",
    tags: [".NET MAUI", "C#", "MVVM", "Security"],
    accent: "#9fb8a1",
    overview: "NATMOBILE is a production-minded mobile banking concept built around secure authentication, reliable transactions, and maintainable separation of financial logic.",
    role: "Full system architect, mobile application developer, security logic designer, API integration designer, data flow architect, and UI/UX workflow designer.",
    highlights: ["Account dashboard with balances, quick actions, and recent activity", "Validated funds transfers with confirmation, retries, and failure states", "Token-based sessions, secure storage, timeout handling, and MFA extension points", "Layered presentation, ViewModel, service, and data architecture"],
    details: [
      { title: "Problem statement", copy: "Digital banking requires enterprise-grade security, reliable transactions, and maintainable architecture rather than a simple UI demo.", items: ["Secure authentication mechanisms", "Reliable transactional handling", "Clear separation of financial logic", "Responsive and testable UI"] },
      { title: "Architecture and security", copy: "NATMOBILE uses MVVM inside .NET MAUI to keep presentation, financial logic, services, and data separate.", items: ["Secure token sessions and session timeout handling", "Secure storage, input validation, and sanitation", "Balance verification and business-rule validation before transfers"] },
      { title: "System layers", copy: "The application is organized into explicit layers so financial behavior remains testable and replaceable.", items: ["Presentation: login, account overview, transfers, history, profile, and settings", "ViewModels: transaction validation, state management, error handling, API orchestration, and transformation", "Services: authentication, token handling, transaction processing, account services, encryption, and secure storage", "Data: Account, Transaction, and User models with JSON serialization and deserialization"] },
      { title: "Core banking features", copy: "The banking workflow covers the essential account and transaction experience.", items: ["Current and available balances, account number, quick actions, and recent activity", "Validated transfers between accounts with double confirmation, retries, and explicit success/failure states", "Chronological transaction history with credit/debit differentiation, timestamps, status, and filters", "Account details, secure logout, session termination, and security placeholders"] },
      { title: "Transaction data flow", copy: "Every transaction is validated before it is persisted and surfaced back to the user.", items: ["User enters transaction", "ViewModel validates input", "Service layer applies financial business rules", "API or banking core is called", "Transaction is confirmed and persisted", "Notifications and UI state are updated", "Accounts store balances, transactions reference accounts and users, and activity logs capture events"] },
      { title: "Engineering decisions", copy: "The architecture favors enterprise maintainability and controlled financial behavior.", items: [".NET MAUI provides cross-platform deployment, one codebase, XAML UI, and MVVM support", "MVVM keeps business logic testable and separate from views", "Service abstraction decouples financial processing from UI and allows API changes without breaking presentation", "Folder boundaries include Models, ViewModels, Views, Services, Utilities, and Resources"] },
      { title: "Challenges and solutions", copy: "The design anticipates failure states and security concerns in financial workflows.", items: ["Observable ViewModel properties control pending, success, and failure states", "Client-side validation and business rules prevent invalid financial inputs", "Secure token storage, timeout handling, and explicit logout protect sessions", "Optimized bindings, controlled API frequency, asynchronous calls, and reduced re-renders support performance"] },
      { title: "Future enhancements, readiness, and lessons learned", copy: "NATMOBILE is structured for production hardening and backend expansion.", items: ["Biometric and multi-factor authentication", "Push transaction notifications and encrypted local cache", "Role-based access control, cloud backend integration, and audit logging", "Banking security must be built into the architecture; financial logic must never live in the UI layer"] },
    ],
    image: "assets/screenshots/bank-mobile1.jpeg",
    gallery: ["assets/screenshots/bank-mobile1.jpeg", "assets/screenshots/bank-mobile2.jpeg", "assets/screenshots/bank-mobile3.jpeg", "assets/screenshots/bank-mobile4.jpeg", "assets/screenshots/bank-mobile5.jpeg", "assets/screenshots/bank-mobile6.jpeg", "assets/screenshots/bank-mobile7.jpeg", "assets/screenshots/bank-mobile8.jpeg"],
  },
  {
    slug: "hoops-track-kenya",
    title: "Hoops Track Kenya",
    group: "Mobile applications",
    category: "Sports analytics",
    description: "A mobile platform for leagues, fixtures, player stats, and the culture around Kenyan basketball.",
    tags: [".NET MAUI", "MVVM", "REST APIs", "Analytics"],
    accent: "#e1ad67",
    overview: "Hoops Track Kenya centralizes player performance, team analytics, fixtures, and game history into a digital platform built for the Kenyan basketball ecosystem.",
    role: "Sole architect and developer, including UI/UX, backend integration, database design, and application architecture.",
    highlights: ["Player profiles with points, assists, rebounds, efficiency, and history", "Team dashboards with offensive and defensive breakdowns", "Fixtures, results, match summaries, and structured game analytics", "Shell navigation, deep links, parameterized routes, and clean MVVM separation"],
    details: [
      { title: "Problem statement", copy: "Kenyan basketball lacked a centralized performance database, structured statistical tracking, and accessible team and fixture insight.", items: ["Historical performance comparison", "Digital player and team comparison", "Reliable fixture and game visibility"] },
      { title: "Architecture and technical design", copy: "The application uses clean separation between UI and business logic with service-layer data access.", items: ["Shell navigation and parameterized deep links", "REST API integration and scalable data models", "Reusable ViewModels and structured folder boundaries"] },
      { title: "Technology and core features", copy: "The mobile-first product combines Flutter, Dart, MVVM, Shell navigation, REST APIs, and JSON exchange.", items: ["Player points, assists, rebounds, efficiency, history, and profile pages", "Team statistics dashboards with offensive and defensive breakdowns", "Upcoming fixtures, results, match summaries, and data-driven analytics", "PlayerProfilePage, TeamDetailPage, and FixtureDetailPage routes with JSON-encoded parameters"] },
      { title: "Engineering decisions", copy: "The architecture supports testability, growth, and contributor onboarding.", items: ["MVVM separates business logic, improves testability, and enables reusable ViewModels", "Shell centralizes route management, tab/stack navigation, and parameterized deep linking", "Models, Providers, Screens, Services, and Themes create clear responsibility boundaries"] },
      { title: "Data flow and challenges", copy: "The application keeps data access and navigation predictable across complex mobile states.", items: ["API or data source flows through the service layer, ViewModel, and UI binding", "JSON-encoded navigation parameters preserve complex page state", "Conditional fetching, smart refresh, and cached ViewModel state reduce unnecessary re-binding", "The structure leaves room for chat, live statistics, admin analytics, and centralized cloud storage"] },
      { title: "Impact, future enhancements, and lessons learned", copy: "Hoops Track Kenya is intended to make local basketball development more data-driven.", items: ["Enables talent scouting and structured team visibility", "Supports digitized league analytics and national-level performance tracking", "Azure or AWS cloud database, authentication, role-based access, live match updates, charts, AI prediction, player ranking, and league integrations", "Scalable mobile architecture, Shell navigation, real-world MVVM, complex UI state management, and maintainability were central lessons"] },
    ],
    image: "assets/images/Hoops Track Kenya.png",
    gallery: ["assets/screenshots/HTK1.jpg", "assets/screenshots/HTK2.jpg", "assets/screenshots/HTK3.jpg", "assets/screenshots/HTK4.jpg", "assets/screenshots/HTK5.jpg", "assets/screenshots/HTK6.jpg", "assets/screenshots/HTK7.jpg"],
  },
  {
    slug: "hotel-business-intelligence",
    title: "Hotel Business Intelligence",
    group: "Data visualization & analytics",
    category: "Data & reporting",
    description: "Executive-ready Power BI analytics for hotel bookings, revenue efficiency, capacity, and operations.",
    tags: ["Power BI", "DAX", "Star schema", "Time intelligence"],
    accent: "#c7a9b5",
    overview: "This end-to-end Power BI solution consolidates hotel booking data into consistent KPIs and interactive views for executive, operational, and trend analysis.",
    role: "Data analyst, data model architect, DAX developer, dashboard UX designer, and performance optimization analyst.",
    highlights: ["Star schema with booking facts and date and room dimensions", "Revenue, ADR, RevPAR, realisation, DSRN, DBRN, and DURN measures", "Executive summary, operational performance, and week-over-week trend pages", "Surfaced cancellations, no-shows, revenue leakage, and capacity trends"],
    details: [
      { title: "Business problem", copy: "Hotel management lacked consistent KPI definitions, real-time revenue visibility, and standardized reporting.", items: ["Booking and occupancy performance", "Revenue leakage from cancellations and no-shows", "Executive and operational week-over-week reporting"] },
      { title: "Solution architecture", copy: "A structured BI pipeline moves from data ingestion through star-schema modeling and DAX measures to executive delivery.", items: ["Fact bookings and aggregated bookings tables", "Date and room dimensions with one-to-many relationships", "Interactive slicers, conditional formatting, and trend indicators"] },
      { title: "Data modeling and DAX", copy: "The model is optimized for reusable measures and reliable filter context.", items: ["fact_bookings and fact_aggregated_bookings fact tables", "dim_date and dim_rooms dimension tables", "Single-direction one-to-many relationships", "Revenue, ADR, RevPAR, Realisation %, DSRN, DBRN, DURN, and week-over-week trend measures"] },
      { title: "Dashboard design", copy: "The report is organized for executive and operational decision-making.", items: ["Executive summary, operational performance, and trend pages", "Interactive slicers, conditional formatting, and week-over-week indicators", "Revenue, occupancy, capacity, cancellation, and no-show visibility"] },
      { title: "Engineering challenges and solutions", copy: "The report balances multiple fact tables, responsive visuals, and accurate time comparison.", items: ["Aligned aggregation logic across fact tables while preserving filter context", "Moved calculations into measures and optimized relationships through star-schema modeling", "Used SELECTEDVALUE and ALL with FILTER for reliable previous-week comparisons"] },
      { title: "Business impact and future enhancements", copy: "The dashboard creates a consistent language for hotel performance.", items: ["Real-time revenue efficiency monitoring", "Surfaced cancellations and no-shows to reduce leakage", "Standardized hotel KPIs and week-over-week monitoring", "Row-level security, cloud refresh with Azure SQL, predictive occupancy forecasting, and anomaly detection"] },
    ],
    image: "assets/screenshots/hotel-dashboard.PNG",
    gallery: ["assets/screenshots/hotel-dashboard.PNG"],
  },
  {
    slug: "hr-analytics",
    title: "HR Analytics Dashboard",
    group: "Data visualization & analytics",
    category: "Data & reporting",
    description: "Interactive Tableau reporting for workforce composition, compensation, demographics, and HR planning.",
    tags: ["Tableau", "Data cleaning", "Calculated fields", "KPI design"],
    accent: "#d0b98f",
    overview: "The HR Analytics Dashboard gives HR teams a consolidated view of workforce composition, compensation efficiency, demographic distribution, and operational metrics.",
    role: "Data analyst, Tableau data model designer, calculated field developer, dashboard UX designer, and performance optimization analyst.",
    highlights: ["Executive summary with workforce, department, gender, age, and salary KPIs", "Demographics and diversity views with department drill-downs", "Compensation analysis across salary bands, education, gender, and age", "Employee detail view with filters and deep-dive exploration"],
    details: [
      { title: "Business problem", copy: "HR teams lacked consolidated workforce visibility and spent too much time producing manual reports.", items: ["Limited visibility into demographics and departments", "Difficulty tracking salary distribution and pay gaps", "Delayed insight for strategic planning"] },
      { title: "Data preparation and model", copy: "Raw HR data was cleaned and transformed into a logical model designed for interactive exploration.", items: ["Standardized data types, names, values, and identifiers", "Dimensions for department, gender, age, education, and salary band", "Measures for employees, salary, expense, and averages"] },
      { title: "Key HR metrics", copy: "The dashboard supports workforce, demographic, and compensation analysis.", items: ["Total employees, average age, average salary, salary expense, departments, and gender distribution", "Employees by age group and education, gender ratio by department, and department headcount", "Average salary by department, salary bands, salary-versus-age correlation, education, and gender analysis"] },
      { title: "Dashboard pages", copy: "Each view answers a different HR planning question while remaining connected through filters.", items: ["Executive summary with KPI cards, headcount, gender and age visuals, and salary-band overview", "Demographics and diversity heat maps with department drill-downs", "Compensation analysis with salary distributions, correlation scatter plots, and interactive bands", "Employee detail table with all attributes, column filters, and individual record exploration"] },
      { title: "Engineering challenges and UX principles", copy: "The Tableau experience is designed to remain interactive without sacrificing clarity.", items: ["Calculated fields dynamically classify salary bands and age groups", "Optimized data sources and efficient filters protect dashboard responsiveness", "Cross-filtering and synchronized field actions keep multi-dimensional metrics consistent", "Logical grouping, consistent color coding, slicers, tooltips, drill-downs, executive hierarchy, and responsive layouts improve usability"] },
      { title: "Business impact, future enhancements, and lessons learned", copy: "The dashboard turns HR data into practical workforce intelligence.", items: ["Real-time workforce tracking, pay-gap visibility, recruitment and compensation decisions, and diversity planning", "Reduced manual reporting and improved strategic HR planning", "Row-level security, scheduled refresh, SAP/Workday integration, attrition and hiring forecasts, and AI salary benchmarking", "Accurate analytics starts with data preparation; calculated measures and clear visual design improve adoption"] },
    ],
    image: "assets/screenshots/tableau-hr-dashboard.PNG",
    gallery: ["assets/screenshots/tableau-hr-dashboard.PNG"],
  },
  {
    slug: "tbotone",
    title: "TBotOne Trading System",
    group: "Scripting & automation",
    category: "Automation",
    description: "A trading automation system focused on repeatable strategy execution, monitoring, and disciplined workflows.",
    tags: ["Automation", "Trading", "Python", "Risk controls"],
    accent: "#a8c0aa",
    overview: "TBotOne explores how disciplined automation can support trading workflows with repeatable signals, structured execution, and a clear view of system state.",
    role: "Trading system designer and automation developer.",
    highlights: ["Strategy-driven execution workflows", "Structured monitoring and event logging", "Risk-aware automation patterns", "Clear separation between strategy, execution, and reporting"],
    details: [
      { title: "Core workflow", copy: "TBotOne automates a disciplined trading workflow from signal to execution and monitoring.", items: ["Position sizing with a 2% capital risk model", "Telegram signal integration", "Binance API integration", "Performance tracking and monitoring dashboard"] },
      { title: "Engineering focus", copy: "Automation is separated into understandable stages so strategy decisions remain observable and controllable.", items: ["Strategy and execution boundaries", "Event logging for traceability", "Risk controls before external actions"] },
    ],
  },
  {
    slug: "excel-xml-converter",
    title: "Excel to XML Converter",
    group: "Scripting & automation",
    category: "Data automation",
    description: "A utility for transforming spreadsheet data into structured XML for dependable system integration.",
    tags: ["Python", "XML", "Data transformation", "Automation"],
    accent: "#b9b27d",
    overview: "The Excel to XML Converter reduces repetitive data preparation by mapping spreadsheet content into predictable XML structures for downstream systems.",
    role: "Automation developer and integration designer.",
    highlights: ["Repeatable spreadsheet-to-XML transformation", "Consistent field mapping and output structure", "Validation-oriented conversion flow", "Reduced manual data entry and integration errors"],
    details: [
      { title: "Core workflow", copy: "The utility transforms spreadsheet content into predictable XML for enterprise data exchange.", items: ["File upload interface", "Dynamic XML schema mapping", "Error validation and exception handling", "Repeatable output for downstream systems"] },
      { title: "Value delivered", copy: "The converter removes repetitive manual preparation and creates a dependable integration boundary.", items: ["Consistent field mapping", "Reduced data entry and integration errors", "Enterprise-ready structured output"] },
    ],
  },
  {
    slug: "ticket-management-system",
    title: "Ticket Management System",
    group: "Scripting & automation",
    category: "Enterprise operations",
    description: "A service workflow for capturing, prioritizing, tracking, and reporting on operational requests.",
    tags: ["Python", "Workflow automation", "Reporting", "Service desk"],
    accent: "#c6a4a0",
    overview: "The Ticket Management System turns service requests into a visible operational workflow, making ownership, response, resolution, and reporting easier to manage.",
    role: "Workflow automation developer and reporting system designer.",
    highlights: ["Structured intake, categorization, assignment, and status tracking", "Priority and SLA-aware operational handling", "Automated reporting for recurring service insights", "Trends that support faster resolution and fewer repeat incidents"],
    details: [
      { title: "Core workflow", copy: "The system makes service requests visible from intake through resolution and reporting.", items: ["Ticket lifecycle management", "Priority and status tracking", "Admin dashboard", "Database-driven persistence"] },
      { title: "Operational impact", copy: "A consistent workflow supports faster resolution, clearer ownership, and better recurring service insight.", items: ["Structured categorization and assignment", "SLA-aware operational handling", "Automated reports for trend analysis"] },
    ],
  },
];

const projectNarratives: Record<string, ProjectNarrative> = {
  mywork: {
    problem: "Notes, deadlines, events, and follow-ups were scattered across disconnected tools.",
    engineeringNote: "Separated the workflow into clear presentation, business-rule, service, and data layers with explicit state transitions.",
    outcome: "A unified productivity system that turns ideas into scheduled, accountable work.",
  },
  natmobile: {
    problem: "Digital banking flows need reliable transactions and security behavior, not just a polished interface.",
    engineeringNote: "Used MVVM and service abstractions to keep financial rules testable and independent from the mobile UI.",
    outcome: "A production-minded banking experience with clear validation, session control, and transaction states.",
  },
  "hoops-track-kenya": {
    problem: "Fixtures, teams, player information, and statistics were difficult to maintain and access across separate channels.",
    engineeringNote: "Designed a mobile-first MVVM workflow with service-layer data access and predictable navigation boundaries.",
    outcome: "A centralized platform for fixtures, teams, player statistics, and basketball content.",
  },
  "hotel-business-intelligence": {
    problem: "Hotel teams lacked consistent KPI definitions and a dependable view of revenue, capacity, and leakage.",
    engineeringNote: "Built a star schema and reusable DAX measures so executive and operational views share the same logic.",
    outcome: "Decision-ready reporting for revenue efficiency, occupancy, cancellations, and week-over-week performance.",
  },
  "hr-analytics": {
    problem: "HR reporting required manual work and made workforce, compensation, and demographic trends hard to compare.",
    engineeringNote: "Cleaned the source data and organized calculated fields, filters, and drill-downs around real planning questions.",
    outcome: "Interactive workforce intelligence that reduces reporting effort and improves compensation and staffing decisions.",
  },
  tbotone: {
    problem: "Trading execution needed repeatable signals, observable system state, and guardrails around external actions.",
    engineeringNote: "Kept strategy, execution, risk controls, monitoring, and reporting as distinct automation stages.",
    outcome: "A disciplined trading workflow with traceable execution and risk-aware automation patterns.",
  },
  "excel-xml-converter": {
    problem: "Spreadsheet data had to be repeatedly prepared and reshaped before downstream systems could use it.",
    engineeringNote: "Made field mapping explicit and validation-oriented so the transformation remains predictable as inputs change.",
    outcome: "Consistent XML output with less manual preparation and fewer integration errors.",
  },
  "ticket-management-system": {
    problem: "Operational requests needed clearer ownership, prioritization, resolution tracking, and recurring insight.",
    engineeringNote: "Modeled the work as a visible ticket lifecycle with SLA-aware status changes and automated reporting.",
    outcome: "A more dependable service workflow for intake, escalation, resolution, and operational reporting.",
  },
};

const globalStyle: CSSProperties = {
  background: colors.smokyBlack,
  color: colors.floralWhite,
  fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif",
  minHeight: "100vh",
  lineHeight: 1.6,
};

const maxWidth: CSSProperties = { maxWidth: 1180, margin: "0 auto", padding: "0 28px" };

function App() {
  const [activeFilter, setActiveFilter] = useState("All work");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => window.location.hash.replace("#project-", "") || null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 760);
  const filters = ["All work", "Mobile applications", "Data visualization & analytics", "Scripting & automation"];
  const selectedProject = projects.find((project) => project.slug === selectedSlug);
  const filteredProjects = useMemo(
    () => projects.filter((project) => project.group === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    document.title = selectedProject ? `${selectedProject.title} — Thomas Ragen` : "Thomas Ragen — Software Engineer";
    const handleResize = () => setIsMobile(window.innerWidth < 760);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedProject]);

  const openProject = (slug: string) => {
    window.location.hash = `project-${slug}`;
    setSelectedSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeProject = () => {
    window.history.pushState({}, "", window.location.pathname);
    setSelectedSlug(null);
  };

  return (
    <div style={globalStyle}>
      <header style={{ ...maxWidth, paddingTop: 22 }}>
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${colors.line}`, paddingBottom: 18 }}>
          <a href="#top" style={{ color: colors.floralWhite, textDecoration: "none", fontWeight: 800, letterSpacing: "0.04em", fontSize: 15 }}>Thomas Ragen</a>
          <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <a href="#work" style={navLink}>Work</a>
            <a href="#approach" style={navLink}>Approach</a>
            <a href="#contact" style={navLink}>Contact</a>
            <a href="assets/Otieno Thomas Ragen Resume.pdf" download style={{ ...smallButton, background: colors.bone, color: colors.smokyBlack }}>Resume</a>
          </div>
        </nav>
      </header>

      <main id="top">
        {selectedProject ? (
          <ProjectDetail project={selectedProject} onBack={closeProject} isMobile={isMobile} />
        ) : (
          <>
            <section style={{ ...maxWidth, paddingTop: isMobile ? 68 : 110, paddingBottom: isMobile ? 80 : 120, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.4fr 0.6fr", gap: isMobile ? 44 : 80 }}>
              <div>
                <p style={kicker}>Software engineer / Nairobi, Kenya</p>
                <h1 style={{ fontSize: "clamp(3.5rem, 8vw, 7.8rem)", lineHeight: 0.92, letterSpacing: "-0.08em", maxWidth: 850, margin: "24px 0 34px", fontWeight: 800 }}>Build it<br /><span style={{ color: colors.oliveDrab }}>better.</span></h1>
                <p style={{ color: colors.bone, maxWidth: 580, fontSize: 20, lineHeight: 1.55 }}>I build software, support enterprise systems, and automate the work between them.</p>
                <p style={{ color: colors.muted, maxWidth: 560, fontSize: 16, lineHeight: 1.55, marginTop: 14 }}>My work spans application development, ICT operations, data, automation, and the systems that keep businesses running.</p>
                <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                  <a href="#work" style={primaryButton}>Explore all work</a>
                  <a href="mailto:thomas95ragen@gmail.com" style={secondaryButton}>Start a conversation</a>
                </div>
              </div>
              <aside style={{ alignSelf: "end", borderLeft: `1px solid ${colors.line}`, paddingLeft: 24 }}>
                <div style={{ width: "min(100%, 320px)", aspectRatio: "3204 / 4080", borderRadius: 24, overflow: "hidden", border: `2px solid ${colors.oliveDrab}`, marginBottom: 18 }}>
                  <img src="assets/images/Thomas Recent Background.jpg" alt="Thomas Ragen" style={{ display: "block", width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", imageRendering: "auto" }} />
                </div>
                <p style={{ color: colors.muted, fontSize: 14, marginBottom: 12 }}>Currently focused on</p>
                <p style={{ fontSize: 24, lineHeight: 1.25, margin: 0 }}>Software • Systems • Automation</p>
                <p style={{ color: colors.muted, fontSize: 15, lineHeight: 1.5, margin: "14px 0 0" }}>Software, support &amp; automation for real-world systems.</p>
                <ProofMetrics isMobile={isMobile} />
              </aside>
            </section>

            <section id="work" style={{ ...maxWidth, paddingBottom: 120 }}>
              <div style={sectionHeading}><p style={kicker}>Selected work</p><h2 style={h2}>A complete archive of things I’ve made useful.</h2></div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "30px 0" }}>
                {filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} style={{ ...filterButton, ...(activeFilter === filter ? { background: colors.oliveDrab, color: colors.floralWhite, border: `1px solid ${colors.oliveDrab}` } : {}) }}>{filter}</button>)}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
                {[
                  ["Mobile applications", "Cross-platform products built around useful, human workflows.", "01"],
                  ["Data visualization & analytics", "Dashboards that turn complex data into confident decisions.", "02"],
                  ["Scripting & automation", "Focused tools that remove repetition and keep operations moving.", "03"],
                ].map(([title, copy, number]) => (
                  <button key={title} onClick={() => setActiveFilter(title)} style={{ ...groupCard, ...(activeFilter === title ? { border: `1px solid ${colors.oliveDrab}`, background: "#292d20", borderRadius: 28 } : {}) }}>
                    <span style={{ color: colors.oliveDrab, fontWeight: 800 }}>{number}</span>
                    <strong>{title}</strong>
                    <span style={{ color: colors.muted, fontSize: 13 }}>{copy}</span>
                    <span style={{ color: colors.bone, alignSelf: "end" }}>View group</span>
                  </button>
                ))}
              </div>
              {activeFilter !== "All work" && (
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${Math.min(filteredProjects.length, 3)}, minmax(0, 1fr))`, gap: 18 }}>
                  {filteredProjects.map((project) => (
                    <button key={project.slug} onClick={() => openProject(project.slug)} style={{ ...projectCard, textAlign: "left", color: colors.floralWhite, cursor: "pointer" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-start" }}>
                        <div><p style={{ color: project.accent, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14 }}>{project.category}</p><h3 style={{ fontSize: 32, lineHeight: 1, margin: 0 }}>{project.title}</h3></div>
                      </div>
                      <p style={{ color: colors.bone, margin: "24px 0 22px", fontSize: 17 }}>{project.description}</p>
                      <div style={{ display: "grid", gap: 14, borderTop: `1px solid ${colors.line}`, paddingTop: 18 }}>
                        <ProjectCardField label="Problem" copy={projectNarratives[project.slug].problem} />
                        <ProjectCardField label="Built with" copy={project.tags.join(" · ")} />
                        <ProjectCardField label="Engineering note" copy={projectNarratives[project.slug].engineeringNote} />
                        <ProjectCardField label="Outcome" copy={projectNarratives[project.slug].outcome} />
                      </div>
                      <span style={{ color: project.accent, fontWeight: 800, marginTop: 22 }}>View case study</span>
                    </button>
                  ))}
                </div>
              )}
            </section>

            <ExperienceSection isMobile={isMobile} />
            <ToolsSection isMobile={isMobile} />

            <section id="approach" style={{ background: colors.floralWhite, color: colors.smokyBlack, padding: "110px 0" }}>
              <div style={{ ...maxWidth, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.8fr 1.2fr", gap: isMobile ? 44 : 90 }}>
                <div><p style={{ ...kicker, color: colors.oliveDrab }}>My approach</p><h2 style={{ ...h2, color: colors.smokyBlack }}>Quietly rigorous. Visibly useful.</h2></div>
                <div style={{ display: "grid", gap: 36 }}>
                  {[["01", "Start with the problem", "Before choosing a framework or architecture, I try to understand what is actually failing, who is affected and what success looks like."], ["02", "Make the system legible", "Clear boundaries, predictable data flows and useful documentation make software easier to operate, troubleshoot and hand over."], ["03", "Leave it better", "Good engineering should reduce future work. I look for opportunities to automate repetitive tasks, improve documentation, simplify workflows and remove recurring problems."]].map(([number, title, copy]) => (
                    <div key={number} style={{ display: "grid", gridTemplateColumns: "50px 1fr", gap: 18, borderTop: "1px solid rgba(23, 25, 20, 0.18)", paddingTop: 20 }}><span style={{ color: colors.oliveDrab, fontWeight: 800 }}>{number}</span><div><h3 style={{ margin: "0 0 8px", fontSize: 24 }}>{title}</h3><p style={{ margin: 0, color: "#555748", fontSize: 17 }}>{copy}</p></div></div>
                  ))}
                </div>
              </div>
            </section>

            <ContactSection isMobile={isMobile} />
          </>
        )}
      </main>

      <footer style={{ ...maxWidth, borderTop: `1px solid ${colors.line}`, paddingTop: 20, paddingBottom: 30, display: "flex", flexDirection: isMobile ? "column" : "row", gap: 8, justifyContent: "space-between", color: colors.muted, fontSize: 13 }}>
        <span>© 2026 Thomas Ragen</span><span>Built with intention.</span>
      </footer>
    </div>
  );
}

function ProofMetrics({ isMobile }: { isMobile: boolean }) {
  const proof = [["2,000+", "users supported"], ["22", "branches"], ["~300", "tickets / month"], ["20%", "faster resolution"], ["97.9%", "availability"], ["5+", "years building software & IT"]];
  return <div style={{ borderTop: `1px solid ${colors.line}`, marginTop: 28, paddingTop: 20, display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(2, minmax(0, 1fr))", gap: "18px 14px" }}>{proof.map(([value, label]) => <div key={label}><strong style={{ display: "block", color: colors.floralWhite, fontSize: isMobile ? 23 : 24, lineHeight: 1 }}>{value}</strong><span style={{ display: "block", color: colors.muted, fontSize: 10, lineHeight: 1.35, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 7 }}>{label}</span></div>)}</div>;
}

function ProjectCardField({ label, copy }: { label: string; copy: string }) {
  return <div><span style={{ display: "block", color: colors.oliveDrab, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 3 }}>{label}</span><span style={{ display: "block", color: colors.bone, fontSize: 14, lineHeight: 1.45 }}>{copy}</span></div>;
}

function ExperienceSection({ isMobile }: { isMobile: boolean }) {
  const experience = [
    { date: "2025 — PRESENT", title: "ICT SUPPORT OFFICER", company: "HFCB Kenya", stack: "Enterprise IT · Application Support · Automation", bullets: ["Supporting enterprise users and business-critical systems across multiple branches.", "Managing incidents, escalations, monitoring, documentation, and SLA-driven support.", "Built automation to reduce repetitive ticket-management and reporting work."] },
    { date: "2024 — 2025", title: "SOFTWARE DEVELOPMENT", company: "National Bank of Kenya", stack: "Spring Boot · SQL · Reporting · Banking Systems", bullets: ["Worked on software and reporting workflows inside a banking environment.", "Translated operational needs into maintainable application and data solutions.", "Balanced reliability, supportability, and delivery in a regulated context."] },
  ];
  return <section style={{ background: colors.floralWhite, color: colors.smokyBlack, padding: "110px 0" }}><div style={{ ...maxWidth, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.75fr 1.25fr", gap: isMobile ? 44 : 90 }}><div><p style={{ ...kicker, color: colors.oliveDrab }}>Experience</p><h2 style={h2}>Built in the real world.</h2><p style={{ color: "#555748", fontSize: 17, maxWidth: 430, marginTop: 24 }}>My work isn&apos;t limited to personal projects. I&apos;ve worked across software development, application support and enterprise IT environments where reliability, incident response and maintainability matter as much as writing code.</p></div><div style={{ display: "grid", gap: 42 }}>{experience.map((item) => <article key={item.company} style={{ borderTop: "1px solid rgba(23, 25, 20, 0.18)", paddingTop: 20 }}><p style={{ ...kicker, color: colors.oliveDrab, margin: 0 }}>{item.date}</p><h3 style={{ fontSize: 25, margin: "14px 0 2px" }}>{item.title}</h3><p style={{ color: colors.smokyBlack, fontSize: 18, margin: 0 }}>{item.company}</p><p style={{ color: "#555748", fontSize: 14, margin: "12px 0 18px" }}>{item.stack}</p><ul style={{ paddingLeft: 18, margin: 0, color: "#555748", display: "grid", gap: 8 }}>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div></div></section>;
}

function ToolsSection({ isMobile }: { isMobile: boolean }) {
  const groups: [string, string[]][] = [["Software", ["Python", "Java", "Spring Boot", "JavaScript", "Flutter", "React Native", ".NET MAUI", "C#"]], ["Data", ["SQL", "Oracle", "SSRS", "Power BI", "Tableau"]], ["Enterprise IT", ["Active Directory", "Microsoft 365", "Application Support", "Incident Management", "Monitoring", "ITSM"]], ["DevOps / Operations", ["Git", "Jenkins", "GitLab CI/CD", "Azure DevOps", "ELK Stack", "Linux"]]];
  return <section style={{ ...maxWidth, paddingTop: 110, paddingBottom: 110 }}><div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.75fr 1.25fr", gap: isMobile ? 44 : 90 }}><div><p style={kicker}>Capabilities</p><h2 style={h2}>What I actually work with.</h2></div><div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 36 }}>{groups.map(([title, tools]) => <div key={title}><h3 style={{ color: colors.oliveDrab, fontSize: 20, margin: "0 0 14px" }}>{title}</h3><p style={{ color: colors.bone, lineHeight: 1.9, margin: 0 }}>{(tools as string[]).join(" · ")}</p></div>)}</div></div></section>;
}

function ProjectDetail({ project, onBack, isMobile }: { project: Project; onBack: () => void; isMobile: boolean }) {
  return (
    <article style={{ ...maxWidth, paddingTop: isMobile ? 60 : 100, paddingBottom: 110 }}>
      <button onClick={onBack} style={{ ...secondaryButton, cursor: "pointer", background: "transparent" }}>Back to all work</button>
      <p style={{ ...kicker, color: project.accent, marginTop: 70 }}>{project.category}</p>
      <h1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.92, letterSpacing: "-0.08em", maxWidth: 900, margin: "22px 0 30px" }}>{project.title}</h1>
      {project.image && <img src={project.image} alt="" style={{ width: "100%", maxHeight: 420, objectFit: "cover", borderRadius: 24, border: `1px solid ${colors.line}`, marginBottom: 42 }} />}
      {project.gallery && project.gallery.length > 1 && <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 10, marginBottom: 52 }}>
        {project.gallery.map((image, index) => <img key={image} src={image} alt={`${project.title} screenshot ${index + 1}`} style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: 16, border: `1px solid ${colors.line}` }} />)}
      </div>}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.75fr 1.25fr", gap: 60 }}>
        <div><p style={kicker}>My role</p><p style={{ color: colors.bone, fontSize: 19 }}>{project.role}</p><div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>{project.tags.map((tag) => <span key={tag} style={tagStyle}>{tag}</span>)}</div></div>
        <div><p style={kicker}>Project overview</p><p style={{ color: colors.bone, fontSize: 21, lineHeight: 1.55 }}>{project.overview}</p><h2 style={{ ...h2, fontSize: "clamp(2rem, 4vw, 3.4rem)", marginTop: 54 }}>What I built</h2><ul style={{ listStyle: "none", padding: 0, marginTop: 26, display: "grid", gap: 14 }}>{project.highlights.map((highlight) => <li key={highlight} style={{ borderTop: `1px solid ${colors.line}`, paddingTop: 14, color: colors.bone }}>↳ {highlight}</li>)}</ul>{project.details.map((section) => <section key={section.title} style={{ marginTop: 52 }}><h2 style={{ fontSize: 28, marginBottom: 10 }}>{section.title}</h2><p style={{ color: colors.muted, fontSize: 17 }}>{section.copy}</p><ul style={{ listStyle: "none", padding: 0, marginTop: 16, display: "grid", gap: 8 }}>{section.items.map((item) => <li key={item} style={{ color: colors.bone }}>• {item}</li>)}</ul></section>)}</div>
      </div>
    </article>
  );
}

function ContactSection({ isMobile }: { isMobile: boolean }) {
  const contacts = [
    ["Phone", "+254 726 297 777", "tel:+254726297777"],
    ["Email", "thomas95ragen@gmail.com", "mailto:thomas95ragen@gmail.com"],
    ["GitHub", "github.com/lord-ragen", "https://github.com/lord-ragen"],
    ["Twitter / X", "x.com/Lord_Ragen", "https://x.com/Lord_Ragen"],
    ["LinkedIn", "linkedin.com/in/thomas-r-930ab617a", "https://www.linkedin.com/in/thomas-r-930ab617a/"],
  ];
  return (
    <section id="contact" style={{ ...maxWidth, paddingTop: 120, paddingBottom: 120 }}>
      <p style={kicker}>Have a challenge in mind?</p>
      <h2 style={{ ...h2, fontSize: "clamp(2.8rem, 6vw, 6rem)", maxWidth: 800 }}>Have a system worth building?</h2>
      <p style={{ color: colors.bone, fontSize: 19, maxWidth: 620, marginTop: 22 }}>Let&apos;s talk about the problem, the constraints and what a useful solution would look like.</p>
      <a href="mailto:thomas95ragen@gmail.com" style={{ ...primaryButton, marginTop: 26 }}>Get in touch</a>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(5, minmax(0, 1fr))", gap: 10, marginTop: 32, maxWidth: 920 }}>
        {contacts.map(([label, , href]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 52, width: "100%", boxSizing: "border-box", padding: "14px 16px", border: `1px solid ${colors.line}`, borderRadius: 12, color: colors.bone, textDecoration: "none", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>{label}</a>)}
      </div>
    </section>
  );
}

const navLink: CSSProperties = { color: colors.bone, textDecoration: "none", fontSize: 14 };
const smallButton: CSSProperties = { textDecoration: "none", padding: "8px 13px", borderRadius: 999, fontWeight: 700, fontSize: 12 };
const kicker: CSSProperties = { color: colors.bone, textTransform: "uppercase", letterSpacing: "0.16em", fontSize: 12, fontWeight: 700 };
const h2: CSSProperties = { fontSize: "clamp(2.2rem, 4vw, 4.6rem)", lineHeight: 0.98, letterSpacing: "-0.07em", margin: "16px 0 0" };
const sectionHeading: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "end", gap: 20 };
const primaryButton: CSSProperties = { background: colors.oliveDrab, color: colors.floralWhite, padding: "14px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none", display: "inline-flex", gap: 12, alignItems: "center" };
const secondaryButton: CSSProperties = { color: colors.bone, padding: "14px 18px", border: `1px solid ${colors.line}`, borderRadius: 999, fontWeight: 700, textDecoration: "none" };
const filterButton: CSSProperties = { border: `1px solid ${colors.line}`, background: "transparent", color: colors.bone, padding: "9px 14px", borderRadius: 999, cursor: "pointer", fontSize: 13 };
const groupCard: CSSProperties = { display: "grid", gap: 12, minHeight: 190, padding: 20, textAlign: "left", color: colors.floralWhite, background: colors.panel, border: `1px solid ${colors.line}`, borderRadius: 28, cursor: "pointer", overflow: "hidden" };
const projectCard: CSSProperties = { background: colors.panel, border: `1px solid ${colors.line}`, borderRadius: 24, padding: 28, minHeight: 270, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" };
const tagStyle: CSSProperties = { color: colors.bone, border: `1px solid ${colors.line}`, padding: "6px 10px", borderRadius: 999, fontSize: 12 };

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
