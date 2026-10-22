# MediMaint — Medical Equipment Maintenance Management

## Overview

**MediMaint** is a web-based application designed to improve the management of medical equipment maintenance in hospitals. It helps biomedical engineering teams organize maintenance schedules, monitor equipment status, track maintenance deadlines, and identify potential equipment failure risks.

The project aims to support preventive maintenance, reduce unexpected equipment downtime, and contribute to the reliability and safety of medical devices in healthcare facilities.

## Features

- **Dashboard:** Overview of medical equipment, operational devices, alerts, and critical equipment.
- **Equipment Management:** Organization of medical devices by hospital department.
- **Maintenance Scheduling:** Automatic calculation of upcoming maintenance dates based on maintenance intervals.
- **Alert System:** Identification of equipment requiring maintenance or attention.
- **Equipment Details:** Access to equipment information, maintenance history, and recorded failures.
- **Risk Assessment:** Rule-based risk scoring using recorded equipment failures.
- **Hospital Department Overview:** Monitoring of equipment status across different departments.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JSON-like JavaScript objects for simulated equipment data

## Project Structure

```text
MediMaint/
├── index.html          # Main dashboard
├── equipements.html    # Equipment and department management
├── alertes.html        # Maintenance alerts
├── fiche.html          # Equipment details
├── style.css           # Application styling
├── data.js             # Simulated hospital and equipment data
├── prediction.js       # Maintenance calculations and risk scoring
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

A modern web browser is sufficient to run the application.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/MediMaint.git
   ```

2. Open the project folder.
3. Open `index.html` in your web browser.

No backend server or database is required for the current prototype.

## Example Use Cases

The application uses simulated medical equipment data organized into hospital departments, such as:

- Cardiology
- Emergency Department
- Intensive Care Unit
- Radiology
- Pediatrics
- Operating Room

Example equipment includes ECG machines, patient monitors, defibrillators, ventilators, ultrasound systems, infusion pumps, and neonatal incubators.

## Current Limitations

- Equipment records are simulated and are not connected to a real hospital database.
- Maintenance and failure-risk calculations are based on predefined rules.
- The risk score is a preliminary heuristic, not a validated predictive AI model.
- User authentication, real-time notifications, and integration with hospital information systems are not implemented in the current prototype.

## Future Improvements

- Integration with a database for persistent equipment records.
- Implementation of machine learning models for predictive maintenance using real historical data.
- User authentication and role-based access control.
- Automated notifications for upcoming or overdue maintenance.
- Maintenance reports and equipment performance analytics.

## Disclaimer

MediMaint is an educational prototype developed for biomedical engineering purposes. It is not a certified medical device management system and should not be used as the sole basis for clinical or maintenance safety decisions.

## Author

Developed as a biomedical engineering project focused on medical equipment management and preventive maintenance.
