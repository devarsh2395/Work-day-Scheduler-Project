$(document).ready(function(){
    const currentDay = moment().format('dddd MMMM Do YYYY');
    $("#currentDay").text(currentDay);
    updateTimeBlocks();
    loadPlanner();

    function updateTimeBlocks() {
        const currentHour = moment().hours();
        $(".time-block").each(function() {
            const timeBlockHour = parseInt(this.id);
            updateTimeBlockClass(timeBlockHour, currentHour, this);
        });
    }

    function updateTimeBlockClass(timeBlockHour, currentHour, timeBlock) {
        if (timeBlockHour > currentHour) {
            timeBlock.classList.add("future");
        } else if (timeBlockHour === currentHour) {
            timeBlock.classList.add("present");
        } else {
            timeBlock.classList.add("past");
        }
    }

    $(".saveBtn").on("click", function() {
        const time = $(this).siblings(".hour").text();
        const plan = $(this).siblings(".plan").val();
        localStorage.setItem(time, plan);
    });

    function loadPlanner() {
        $(".hour").each(function() {
            const currHour = this.textContent;
            const currPlan = localStorage.getItem(currHour);
            setPlan(currHour, currPlan);
        });
    }

    function setPlan(currHour, currPlan) {
        if(currPlan !== null) {
            $(`#${currHour} .plan`).val(currPlan);
        }
    }
});