'use client'
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Header from "@/components/Header";
import './style.css'

const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);

    const handelDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
        }
    };

    const handelEventClick = (selected) => {
        if (
            window.confirm(
                `Are you sure you wanna delete the event: '${selected.event.title}'`
            )
        ) {
            selected.event.remove();
        }
    };

    return (
        <div className="px-10 mb-3">
            <Header headerText="Calendar" />
            <div className="flex justify-between flex-wrap md:flex-nowrap">
                {/* calendar sidebar */}
                <div
                    className="mb-3 flex-1 md:flex-initial md:mb-0 bg-blue-500 p-4 rounded-md min-w-[100px]"
                >
                    <h5 className="text-white font-medium mb-4">Events</h5>
                    <ul>
                        {currentEvents.map((event) => (
                            <li
                                key={event.id}
                                className="bg-green-500 rounded-md my-2 p-2"
                            >
                                <div className="text-white">{event.title}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-1 ml-4">
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                        ]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                        }}
                        initialView="dayGridMonth"
                        weekends={false}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handelDateClick}
                        eventClick={handelEventClick}
                        eventsSet={(events) => {
                            setCurrentEvents(events);
                        }}
                        initialEvents={[
                            {
                                id: "1234",
                                title: "All-day event",
                                date: "2023-05-26",
                            },
                            {
                                id: "4321",
                                title: "Timed event",
                                date: "2023-06-01",
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Calendar;