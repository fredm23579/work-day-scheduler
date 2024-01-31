$(function () {
    // Function to display the current date at the top of the calendar
    function displayCurrentDate() {
        // Function to display the current date at the top of the calendar
        let date = dayjs(); // Get the current date using Day.js library and assign it to date variable in the format 
        let day = date.date(); // Get the day of the month using Day.js library and assign it to day variable 
        
        let suffix = (day % 10 === 1 && day !== 11) ? 'st' : // Determine the suffix for the day of the month and assign it to suffix variable
                     (day % 10 === 2 && day !== 12) ? 'nd' : // Determine the suffix for the day of the month and assign it to suffix variable
                     (day % 10 === 3 && day !== 13) ? 'rd' : 'th'; // Determine the suffix for the day of the month and assign it to suffix variable
    
        let formattedDate = date.format(`dddd, MMMM D${suffix}`); // Format the date using Day.js library and assign it to formattedDate variable in the format "dddd, MMMM Dth" where th is the suffix
        $('#currentDay').text(formattedDate); // Display the formatted date in the current day element in the format "dddd, MMMM Dth" where th is the suffix using jQuery library 
    }
    
    // Function to create and append time blocks
    function createTimeBlocks() { // Function to create and append time blocks to the time blocks container element with the format "hour AM" or "hour PM" using Day.js library
        const workHoursStart = 9; // Start at 9 AM (9) in 24-hour format (0-23) using Day.js library and assign it to workHoursStart variable in the format "9 AM" or "5 PM"
        const workHoursEnd = 17; // End at 5 PM (17) in 24-hour format (0-23) using Day.js library and assign it to workHoursEnd variable in the format "9 AM" or "5 PM"
        const $timeBlocksContainer = $('#timeBlocks'); // Get the container element for the time blocks to be appended to it and assign it to $timeBlocksContainer variable

        for (let hour = workHoursStart; hour <= workHoursEnd; hour++) { // Loop through the hours from workHoursStart to workHoursEnd and assign it to hour variable in the format "9 AM" or "5 PM"
            let timeLabel = hour <= 12 ? `${hour} AM` : `${hour - 12} PM`; // Determine the time label based on the hour value (AM or PM) and assign it to timeLabel variable in the format "hour AM" or "hour PM"
            if (hour === 12) timeLabel = '12 PM'; // Correct 12 PM label to 12 AM label if hour is 12 and assign it to timeLabel variable in the format "12 AM" or "12 PM" 

            const $timeBlock = $('<div>').addClass('row time-block').attr('id', `hour-${hour}`); // Create the time block element with the hour value as its id attribute and assign it to $timeBlock variable
            const $hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(timeLabel); // Create the hour element and assign it to $hourDiv variable (with the timeLabel as its text) and append it to $timeBlock variable
            const $textarea = $('<textarea>').addClass('col-8 col-md-10 description'); // Create the textarea element and assign it to $textarea variable and append it to $timeBlock variable
            const $saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save') // Create the save button element and assign it to $saveBtn variable and append it to $timeBlock variable
                                           .html('<i class="fas fa-save" aria-hidden="true"></i>'); // Add the save icon to the save button element and assign it to $saveBtn variable and append it to $timeBlock variable

            $timeBlock.append($hourDiv, $textarea, $saveBtn); // Append the hour, textarea, and save button elements to the time block element in the correct order and assign it to $timeBlock variable 
                        $timeBlocksContainer.append($timeBlock); // Append the time block element to the time blocks container element and assign it to $timeBlocksContainer variable
        }
    }

    // Function to update the class of time blocks based on the current time
    function updateBlockClasses() { // Function to update the class of time blocks based on the current time
        const currentHour = dayjs().hour(); // Get the current hour in 24-hour format (0-23) using Day.js library and assign it to currentHour variable 
        $('.time-block').each(function () { // Loop through each time block element in the time blocks container element
            const blockHour = parseInt($(this).attr('id').split('-')[1]); // Get the hour value of the time block in 24-hour format (0-23) using Day.js library and assign it to blockHour variable
            $(this).removeClass('past present future'); // Remove the past, present, and future classes from the time block
            if (blockHour < currentHour) { // If the time block hour is less than the current hour, add the past class to the time block
                $(this).addClass('past'); // Add the past class to the time block if the time block hour is less than the current hour 
            } else if (blockHour === currentHour) { // If the time block hour is equal to the current hour, add the present class to the time block 
                $(this).addClass('present'); // Add the present class to the time block if the time block hour is equal to the current hour
            } else { // If the time block hour is greater than the current hour, add the future class to the time block 
                $(this).addClass('future'); // Add the future class to the time block if the time block hour is greater than the current hour 
            }
        });
    }

    // Function to save events to localStorage
    function saveEvents() { // Function to save events to localStorage
        $('.saveBtn').click(function () { // When the save button is clicked on, save the event text to localStorage for the corresponding time block id 
            const $parentBlock = $(this).closest('.time-block'); // Get the parent time block element and assign it to $parentBlock variable
            const eventId = $parentBlock.attr('id'); // Get the id of the parent time block element and assign it to eventId variable
            const eventText = $parentBlock.find('.description').val(); // Get the value of the textarea element and assign it to eventText variable
            localStorage.setItem(eventId, eventText); // Save the event text to localStorage for the corresponding time block id
        });
    }

    // Function to load saved events from localStorage
    function loadSavedEvents() { // Function to load saved events from localStorage
        $('.time-block').each(function () { // Loop through each time block element in the time blocks container element 
            const eventId = $(this).attr('id'); // Get the id of the time block element and assign it to eventId variable and append it to $timeBlocksContainer variable 
            const savedEvent = localStorage.getItem(eventId); // Get the saved event text from localStorage for the corresponding time block id and assign it to savedEvent variable
            if (savedEvent) { // If the saved event text exists in localStorage for the corresponding time block id 
                $(this).find('.description').val(savedEvent); // Set the value of the textarea element to the saved event text if it exists in localStorage for the corresponding time block id
            }
        });
    }

    // Initialize the Scheduler
    function initScheduler() { // Function to initialize the scheduler
        displayCurrentDate(); // Display the current date
        createTimeBlocks(); // Create the time blocks
        updateBlockClasses(); // Update the class of time blocks
        saveEvents(); // Save events to localStorage when the save button is clicked on
        loadSavedEvents(); // Load saved events from localStorage when the page loads and display them in the correct time blocks 
        setInterval(updateBlockClasses, 60000); // Update classes every minute (60,000 milliseconds) using setInterval function from Day.js library 
    }

    initScheduler(); // Initialize the scheduler when the page loads 
});

