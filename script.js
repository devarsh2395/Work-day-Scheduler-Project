// Current Day function selects the element with id and sets its text to current day

$(document).ready(function(){
    const currentDay = moment().format('dddd MMMM Do YYYY');
    $("#currentDay").text(currentDay);
    updateTimeBlocks();
    loadPlanner();


    // Time-block class iterates over each element and assigns the appropriate class based on the hour of the time-block and the current hour

    function updateTimeBlocks() {
        const currentHour = moment().hours();
        $(".time-block").each(function() {
            const timeBlockHour = parseInt(this.id);
            updateTimeBlockClass(timeBlockHour, currentHour, this);
        });
    }

// assigns the necessary class to the tim-block based on the hour of the time-block and current hour

    function updateTimeBlockClass(timeBlockHour, currentHour, timeBlock) {
        if (timeBlockHour > currentHour) {
            timeBlock.classList.add("future");
        } else if (timeBlockHour === currentHour) {
            timeBlock.classList.add("present");
        } else {
            timeBlock.classList.add("past");
        }
    }


    // adds an event listener to the element. And saves the time and plan to local storage

    $(".saveBtn").on("click", function() {
        const time = $(this).siblings(".hour").text();
        const plan = $(this).siblings(".plan").val();
        localStorage.setItem(time, plan);
    });


    // Loads the saved plans from local storage and sets the corresponding text area to the saved plan

    function loadPlanner() {
        $(".hour").each(function() {
            const currHour = this.textContent;
            const currPlan = localStorage.getItem(currHour);
            setPlan(currHour, currPlan);
        });
    }

    // Sets the plan for the given hour
    function setPlan(currHour, currPlan) {
        if(currPlan !== null) {
            $(`#${currHour} .plan`).val(currPlan);
        }
    }
});