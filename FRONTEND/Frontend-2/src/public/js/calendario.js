const calendar = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    selectedDate: null,
    events: JSON.parse(localStorage.getItem('events')) || {}
};

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

document.addEventListener("DOMContentLoaded", function() {
    renderCalendar();
    document.getElementById("prev").addEventListener("click", () => changeMonth(-1));
    document.getElementById("next").addEventListener("click", () => changeMonth(1));
    document.getElementById("cancelButton").addEventListener("click", closeModal);
    document.getElementById("eventForm").addEventListener("submit", saveEvent);
    document.getElementById("deleteButton").addEventListener("click", deleteEvent);
    document.getElementById("goToYear").addEventListener("click", goToYear);
    document.getElementById("yearInput").value = calendar.year;
});

function renderCalendar() {
    const daysContainer = document.getElementById("days");
    daysContainer.innerHTML = "";
    const monthYear = document.getElementById("monthYear");
    monthYear.textContent = `${monthNames[calendar.month]} ${calendar.year}`;

    const firstDay = new Date(calendar.year, calendar.month, 1).getDay();
    const daysInMonth = new Date(calendar.year, calendar.month + 1, 0).getDate();

    const dayColors = ["bg-red-100", "bg-orange-100", "bg-yellow-100", "bg-green-100", "bg-blue-100", "bg-indigo-100", "bg-purple-100"];

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        daysContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.textContent = day;
        dayDiv.classList.add("py-2", "rounded", "hover:bg-blue-300", "cursor-pointer", "shadow-md", "text-center", dayColors[(firstDay + day - 1) % 7]);
        dayDiv.addEventListener("click", () => openModal(day));
        const dateKey = `${calendar.year}-${calendar.month + 1}-${day}`;
        if (calendar.events[dateKey]) {
            dayDiv.classList.add("bg-green-500", "text-white");
        }
        daysContainer.appendChild(dayDiv);
    }
}

function changeMonth(direction) {
    calendar.month += direction;
    if (calendar.month < 0) {
        calendar.month = 11;
        calendar.year--;
    } else if (calendar.month > 11) {
        calendar.month = 0;
        calendar.year++;
    }
    document.getElementById("yearInput").value = calendar.year;
    renderCalendar();
}

function goToYear() {
    const yearInput = document.getElementById("yearInput").value;
    const year = parseInt(yearInput, 10);
    if (!isNaN(year) && year >= 1900 && year <= 2100) {
        calendar.year = year;
        renderCalendar();
    } else {
        alert("Por favor, ingrese un año válido entre 1900 y 2100.");
    }
}

function openModal(day) {
    calendar.selectedDate = `${calendar.year}-${calendar.month + 1}-${day}`;
    const event = calendar.events[calendar.selectedDate];
    document.getElementById("eventTitle").value = event ? event.title : "";
    document.getElementById("eventDescription").value = event ? event.description : "";
    document.getElementById("deleteButton").classList.toggle("hidden", !event);
    document.getElementById("eventModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("eventModal").classList.add("hidden");
}

function saveEvent(event) {
    event.preventDefault();
    const title = document.getElementById("eventTitle").value;
    const description = document.getElementById("eventDescription").value;
    calendar.events[calendar.selectedDate] = { title, description };
    localStorage.setItem('events', JSON.stringify(calendar.events));
    closeModal();
    renderCalendar();
}

function deleteEvent() {
    delete calendar.events[calendar.selectedDate];
    localStorage.setItem('events', JSON.stringify(calendar.events));
    closeModal();
    renderCalendar();
}


