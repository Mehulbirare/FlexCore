# FlexCore

<p align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js%2015-E11D48?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Animations-Framer%20Motion-black?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
</p>

<p align="center">
  A modern, high-performance fitness management dashboard built with Next.js 15, featuring real-time analytics, dynamic inventory management, and a cinematic dark-theme UI.
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Advanced Dashboards](#advanced-dashboards)
- [UI & Design System](#ui--design-system)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Project Structure](#project-structure)
- [License](#license)

---

## Overview

FlexCore is a comprehensive fitness facility management platform designed for modern athletic centers. It consolidates revenue tracking, member management, equipment inventory, and staff scheduling into a single unified dashboard — built around a cinematic dark aesthetic with fluid animations and high-contrast data visualizations.

---

## Features

### Dashboard & Analytics
- **Revenue Dashboard** — Real-time revenue tracking with interactive charts powered by Recharts. Visualize daily, weekly, and monthly financial performance at a glance.
- **Live Revenue Ticker** — A continuous scrolling ticker displaying live transaction throughput for instant financial awareness.

### Member Management
- **Member Roster** — Full member directory with profile management, activity tracking, and filtering capabilities.
- **Activity Density Heatmap** — A live CSS-driven heatmap visualizing gym floor occupancy and member activity distribution in real time.

### Inventory & Equipment
- **Equipment Inventory** — Stock management with category filtering, search, and real-time stock-level indicators.
- **Hover Inspection** — Detailed equipment spec panels that surface on hover, providing instant technical information without navigation.

### Staff & Coaching
- **Trainer Directory** — Manage coaching staff with profile cards, specialty tags, and availability status indicators.

---

## Advanced Dashboards

FlexCore includes a suite of advanced analytical dashboards that go beyond basic tracking — providing predictive insights, real-time operational control, and deep performance intelligence.

### 📊 Member Performance Analytics
Tracks individual and group member performance over time. Displays progress curves across custom metrics (strength, endurance, flexibility, body composition) using multi-axis line charts. Supports goal-setting with automatic progress percentage calculations and milestone notifications when targets are reached.

- Multi-metric comparison charts (weekly / monthly / quarterly)
- Individual member goal tracking with percentage completion rings
- Performance trend forecasting using historical data averages
- Top performer leaderboard with real-time rank updates

### 📅 Class & Session Scheduler
A fully interactive scheduling engine for group classes, personal training sessions, and facility bookings. Supports recurring events, capacity limits, waitlists, and conflict detection.

- Weekly and monthly calendar views with color-coded session types
- Drag-and-drop session creation and rescheduling
- Automated capacity monitoring with waitlist queue management
- Trainer-to-class assignment with availability conflict prevention
- Email/notification triggers on booking confirmation and cancellation

### 💰 Financial Intelligence Panel
An extended revenue module built on top of the base Revenue Dashboard. Provides deeper financial breakdowns, cost analysis, and profitability scoring per department.

- Revenue vs. Expense comparison charts (monthly/quarterly/yearly)
- Per-department profitability breakdown (memberships, classes, merchandise, personal training)
- Average revenue per member (ARPM) trend tracker
- Payment status monitoring — pending, overdue, and completed invoices
- Forecasted monthly revenue based on current membership and retention rates

### 🔔 Notifications & Alert Center
A centralized notification hub that aggregates system-wide alerts into a single, prioritized feed. Supports real-time push updates and manual alert management.

- Priority-tiered alerts (critical, warning, info) with color-coded badges
- Alert categories: equipment maintenance due, member contract expiry, low stock inventory, class capacity reached
- Read / unread status with bulk-dismiss functionality
- Configurable notification preferences per alert type
- Notification history log with timestamps and resolution status

### 🏋️ Equipment Maintenance Tracker
Extends the base Inventory module with a dedicated maintenance workflow. Tracks equipment health, scheduled servicing, repair history, and downtime impact.

- Equipment health score (0–100) calculated from age, usage cycles, and last service date
- Scheduled maintenance calendar synced with the Session Scheduler
- Repair history log per equipment item with technician and cost records
- Downtime impact analysis — shows how out-of-service equipment affects class capacity
- Auto-flag alerts when health scores drop below configurable thresholds

### 📈 Retention & Churn Dashboard
Monitors member retention patterns and predicts churn risk using behavioral signals. Designed to give facility managers early warning on at-risk memberships.

- Monthly retention rate chart with month-over-month delta
- Churn risk scoring per member based on visit frequency, engagement drops, and contract timeline
- Segment-level analysis — retention by membership type, age group, and join date cohort
- At-risk member list with recommended re-engagement actions
- Lifetime value (LTV) estimation per member segment

---

## UI & Design System

FlexCore is built around a custom dark-mode design system with a focus on visual depth and interactivity.

- **Color Palette** — A crimson accent system (`#E11D48`) built using OKLCH color space for perceptually uniform, accessible contrast across all components.
- **Glassmorphism** — Semi-transparent card layouts with `backdrop-blur` for layered visual depth against full-page background imagery.
- **Kinetic Backgrounds** — Each module features a unique high-resolution abstract background (`/public/`) to reinforce spatial context and reduce cognitive monotony.
- **Micro-Interactions** — Framer Motion powers smooth transitions across page navigation, modal entries, card hovers, and data state changes.
- **Carbon-Fiber Settings Panel** — The settings module uses a textured dark surface to differentiate administrative controls from the primary dashboard.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 4.0 |
| Animations | Framer Motion 11 |
| Charts & Graphs | Recharts (Line, Bar, Area, Pie, RadialBar) |
| Icons | Lucide React |
| State Management | React Hooks + Context API |
| Scheduling | Custom drag-and-drop calendar engine |
| Forecasting | Client-side trend projection (moving averages) |
| Backend / Auth | Supabase |
| Real-time Updates | Supabase Realtime Subscriptions |

---

## Getting Started

### Prerequisites

- Node.js `>=18.0.0`
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/Mehulbirare/FlexCore.git
   cd FlexCore
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Configure environment variables:**
```bash
   cp .env.example .env.local
```
   Open `.env.local` and add your Supabase credentials (see [Environment Configuration](#environment-configuration)).

4. **Start the development server:**
```bash
   npm run dev
```

5. **Open in browser:**
   Navigate to `http://localhost:3000`

---

## Environment Configuration

FlexCore uses Supabase for authentication and database operations. To connect your own instance:

1. Create a project at [supabase.com](https://supabase.com).
2. Copy your **Project URL** and **API Key** (anon) from the Supabase dashboard.
3. Add them to your `.env.local` file using the variable names defined in `.env.example`.

---

## Project Structure
```
FlexCore/
├── app/                        # Next.js App Router pages & layouts
│   ├── dashboard/              # Revenue dashboard & analytics
│   ├── members/                # Member roster & activity heatmap
│   │   └── performance/        # Individual & group performance analytics
│   ├── inventory/              # Equipment management
│   │   └── maintenance/        # Equipment health & repair tracking
│   ├── staff/                  # Trainer directory
│   ├── schedule/               # Class & session scheduler
│   ├── finance/                # Financial intelligence panel
│   ├── notifications/          # Alert center & notification hub
│   ├── retention/              # Retention & churn dashboard
│   └── settings/               # Configuration panel
├── components/                 # Reusable UI components
│   ├── charts/                 # Recharts wrappers (line, bar, ring, area)
│   ├── calendar/               # Scheduler calendar components
│   ├── notifications/          # Alert badge & notification list
│   └── heatmap/                # Activity density heatmap
├── lib/                        # Utility functions & data helpers
│   ├── analytics/              # Performance & churn calculation logic
│   ├── forecasting/            # Revenue & retention prediction helpers
│   └── notifications/          # Alert trigger & classification engine
├── public/                     # Static assets & background images
├── .env.example                # Environment variable template
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json
```

---

## License

This project is licensed under the MIT License.

---

<p align="center">
  Built by <a href="https://github.com/Mehulbirare">Mehul Birare</a>
</p>