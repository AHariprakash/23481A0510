# Notification System Design

## Stage 1: Priority Inbox

### Overview
A campus notification platform that displays the top 'n' most important
unread notifications using a Priority Inbox algorithm.

### Architecture
[Affordmed Test Server]
|
| GET /evaluation-service/notifications
|
[notification_app_be] (Node.js + Express)
|
| Priority Scoring Algorithm
| GET /api/notifications?top=10
|
[notification_app_fe] (React)
|
| Displays Priority Inbox UI
|
[logging_middleware] (Reusable Package)
|
| POST /evaluation-service/logs
|
[Affordmed Log Server]

### Priority Algorithm
Notifications are scored using two factors:

1. **Type Weight** (higher = more important):
   - Placement = 3
   - Result = 2
   - Event = 1

2. **Recency** (newer = higher priority):
   - Unix timestamp used as tiebreaker

**Formula:**
priorityScore = (typeWeight × 10^13) + unixTimestamp

### Folder Structure
23481A0510/
├── logging_middleware/
│   └── index.js
├── notification_app_be/
│   ├── config/auth.js
│   ├── handler/notificationHandler.js
│   ├── route/notificationRoute.js
│   ├── service/notificationService.js
│   └── index.js
├── notification_app_fe/
│   └── src/
│       ├── api/notificationApi.js
│       ├── component/NotificationCard.js
│       ├── hook/useNotifications.js
│       ├── page/HomePage.js
│       └── state/notificationState.js
├── notification_system_design.md
└── .gitignore

### Tech Stack
- **Backend:** Node.js, Express, Axios
- **Frontend:** React, Axios
- **Logging:** Custom middleware package
- **Styling:** Vanilla CSS

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/notifications?top=n | Get top n priority notifications |

### Logging Strategy
Logs are captured at every critical point:
- Server start
- Notification fetch initiated
- Notification fetch success/failure
- Handler request received
- Handler errors