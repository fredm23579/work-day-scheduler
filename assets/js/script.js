$(function () {
    // Function to display the current date at the top of the calendar
    function displayCurrentDate() {
        $('#currentDay').text(dayjs().format('dddd, MMMM D'));
    }

    // Function to create and append time blocks
    function createTimeBlocks() {
        const workHoursStart = 9; // Start at 9 AM
        const workHoursEnd = 17; // End at 5 PM
        const $timeBlocksContainer = $('#timeBlocks');

        for (let hour = workHoursStart; hour <= workHoursEnd; hour++) {
            let timeLabel = hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
            if (hour === 12) timeLabel = '12 PM'; // Correct 12 PM label

            const $timeBlock = $('<div>').addClass('row time-block').attr('id', `hour-${hour}`);
            const $hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(timeLabel);
            const $textarea = $('<textarea>').addClass('col-8 col-md-10 description');
            const $saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save')
                                           .html('<i class="fas fa-save" aria-hidden="true"></i>');

            $timeBlock.append($hourDiv, $textarea, $saveBtn);
            $timeBlocksContainer.append($timeBlock);
        }
    }

    // Function to update the class of time blocks based on the current time
    function updateBlockClasses() {
        const currentHour = dayjs().hour();
        $('.time-block').each(function () {
            const blockHour = parseInt($(this).attr('id').split('-')[1]);
            $(this).removeClass('past present future');
            if (blockHour < currentHour) {
                $(this).addClass('past');
            } else if (blockHour === currentHour) {
                $(this).addClass('present');
            } else {
                $(this).addClass('future');
            }
        });
    }

    // Function to save events to localStorage
    function saveEvents() {
        $('.saveBtn').click(function () {
            const $parentBlock = $(this).closest('.time-block');
            const eventId = $parentBlock.attr('id');
            const eventText = $parentBlock.find('.description').val();
            localStorage.setItem(eventId, eventText);
        });
    }

    // Function to load saved events from localStorage
    function loadSavedEvents() {
        $('.time-block').each(function () {
            const eventId = $(this).attr('id');
            const savedEvent = localStorage.getItem(eventId);
            if (savedEvent) {
                $(this).find('.description').val(savedEvent);
            }
        });
    }

    // Initialize the Scheduler
    function initScheduler() {
        displayCurrentDate();
        createTimeBlocks();
        updateBlockClasses();
        saveEvents();
        loadSavedEvents();
        setInterval(updateBlockClasses, 60000); // Update classes every minute
    }

    initScheduler();
});

