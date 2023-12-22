# Availability Tracker

## Overview

The Availability Tracker is a Node.js program designed to find the optimal meeting time for a team with members in different time zones. This program takes user input for each team member's name, availability, and location (city or region), and suggests a meeting time when most team members are available.

## Prerequisites

Before running the program, ensure you have Node.js installed on your machine. You can download Node.js from [https://nodejs.org/](https://nodejs.org/).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chrismar-dev/AvailabilityTracker.git
2. Navigate to the correct folder
    ```bash
    cd AvailabilityTracker
    ```

## How to Run

Open a terminal in the project directory.

Run the program:

 ```bash
   npm start

```
Here is an example of a run of the program

```bash
$ npm start
Enter the number of team members: 2

Enter name for team member 1: John
Enter the month for John (e.g., 01 for January): 01
Enter the day of the month for John: 15
Enter the year for John: 22
Enter availability time for John (e.g., 9:00 AM - 3:40 PM): 9:00 AM - 3:40 PM
Enter city or region for John (e.g., New York): New York

Enter name for team member 2: Jane
Enter the month for Jane (e.g., 01 for January): 01
Enter the day of the month for Jane: 15
Enter the year for Jane: 22
Enter availability time for Jane (e.g., 9:00 AM - 3:40 PM): 10:00 AM - 4:30 PM
Enter city or region for Jane (e.g., New York): London

Optimal Meeting Time: Thursday, January 15th 2022, 15:00:00 [UTC]Z
```
# Input Format
- Number of Team Members: Enter a positive integer representing the number of team members.
- Name: Enter the name of each team member.
- Month: Enter the month in "mm" format (e.g., 01 for January).
- Day: Enter the day of the month.
- Year: Enter the year (e.g., 22 for 2022).
- Time: Enter the availability time in "h:mm AM/PM - h:mm AM/PM" format (e.g., 9:00 AM - 3:40 PM).
- Location (City or Region): Enter the city or region where the team member is located.

# Approach
User Input
The script prompts the user to input the following information:
- Number of team members.
- Availability for each team member in the format "start time - end time".
- Meeting duration in minutes.
- Validation
   - To ensure correct input, the script uses regular expressions to validate the format of the time slots provided by the user.

# Time Zone Considerations
- The moment-timezone library is utilized to handle time zones. The script converts all time slots to UTC for consistency during calculations.

# Optimal Meeting Time Calculation
- The script counts the occurrences of each time slot and determines the one with the maximum occurrences, suggesting it as the optimal meeting time.
