const readline = require('readline');
const moment = require('moment-timezone');

// Function to get user input
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Function to convert user input to ISO 8601 format
function convertToISOFormat({ month, day, year, time, timezone }) {
  const dateTimeString = `${month}-${day}-${year} ${time}`;
  const isoDateTime = moment.tz(dateTimeString, 'MM-DD-YY h:mm A', timezone).toISOString();
  return isoDateTime;
}

// Availability Tracker function
async function findOptimalMeetingTime() {
  const numTeamMembers = parseInt(await askQuestion('Enter the number of team members: '), 10);

  if (isNaN(numTeamMembers) || numTeamMembers <= 0) {
    throw new Error('Invalid input. Please enter a valid number of team members.');
  }

  const teamAvailability = [];
  
  for (let i = 0; i < numTeamMembers; i++) {
    const name = await askQuestion(`Enter name for team member ${i + 1}: `);
    const month = await askQuestion(`Enter the month for ${name} (e.g., 01 for January): `);
    const day = await askQuestion(`Enter the day of the month for ${name} (e.g., 15): `);
    const year = await askQuestion(`Enter the year for ${name} (e.g., 22 for 2022): `);
    const time = await askQuestion(`Enter availability time for ${name} (e.g., 9:00 PM - 3:40 PM): `);
    const cityOrRegion = await askQuestion(`Enter city or region for ${name} (e.g., New York): `);

    // Use moment-timezone to infer the timezone from the provided city or region
    const timezone = moment.tz.guess(true, { location: cityOrRegion });

    if (!timezone) {
      throw new Error(`Could not determine timezone for ${name}. Please enter a valid city or region.`);
    }

    const availability = convertToISOFormat({ month, day, year, time, timezone });
    teamAvailability.push({ name, availability });
  }

  const flatAvailability = teamAvailability.reduce((acc, memberAvailability) => {
    return acc.concat(memberAvailability.availability);
  }, []);

  const availabilityCounts = flatAvailability.reduce((acc, timeSlot) => {
    acc[timeSlot] = (acc[timeSlot] || 0) + 1;
    return acc;
  }, {});

  const optimalTime = Object.keys(availabilityCounts).reduce((maxTime, timeSlot) => {
    return availabilityCounts[timeSlot] > availabilityCounts[maxTime] ? timeSlot : maxTime;
  }, Object.keys(availabilityCounts)[0]);

  return moment(optimalTime).format('dddd, MMMM Do YYYY, HH:mm:ss [UTC]Z');
}

// Example usage / Testing 
(async () => {
  try {
    const optimalMeetingTime = await findOptimalMeetingTime();
    console.log(`Optimal Meeting Time: ${optimalMeetingTime}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
