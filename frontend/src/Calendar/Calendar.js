import React, { useState } from "react";
import "./Calendar.css";
import "../bootstrap.css"
import DaysInfo from "./DaysInfo.js";

const useCalendar = () => {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const WEEKS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [today, setToday] = useState(new Date());

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const setNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  const setPreMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const daysInMonth = (year, month) => {
    const firstDay = new Date(year, month).getDay();
    const days = 32 - new Date(year, month, 32).getDate();

    let date = 1;
    let daysInMonth = [];
    let weekNum = days => {
      return Math.ceil((days + firstDay) / 7);
    };

    for (let i = 0; i < weekNum(days); i++) {
      let week = [];
      let day = {
        date: ""
      };
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(day);
        } else if (date > days) {
          week.push(day);
        } else {
          week.push({ ...day, date });
          date++;
        }
      }
      daysInMonth.push(week);
    }
    return daysInMonth;
  };

  const days = daysInMonth(currentYear, currentMonth);
  const selectToday = date => setToday(date);
  const displayMonth = MONTHS[currentMonth];
  return {
    currentMonth,
    currentYear,
    days,
    displayMonth,
    setNextMonth,
    setPreMonth,
    selectToday,
    today,
    MONTHS,
    WEEKS
  };
};

const Calendar = () => {
  const calendar = useCalendar();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td colSpan="100%">
                <div className="monthBar" style={{fontWeight: "800"}}>
                    <button className="leftButton" onClick={calendar.setPreMonth}>Prev Month</button>
                    {calendar.displayMonth} {calendar.currentYear}
                    <button className="rightButton" onClick={calendar.setNextMonth}>Next Month</button>
                </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {calendar.WEEKS.map((title, i) => {
              return <td>{title}</td>;
            })}
          </tr>
          {calendar.days.map((week, i) => {
            const days = week.map((day, i) => {
              const isSeleted =
                calendar.today.getDate() === day.date &&
                calendar.today.getMonth() === calendar.currentMonth &&
                calendar.today.getFullYear() === calendar.currentYear;

              const setSelectDate = () => {
                let getDate = new Date(
                  calendar.currentYear,
                  calendar.currentMonth,
                  day.date
                );
                calendar.selectToday(getDate);
              };
              return (
                <td
                  key={i}
                  className={isSeleted ? "selected" : ""}
                  onClick={() => {
                      setSelectDate();
                      <DaysInfo/>;
                    }
                  }
                >
                  {day.date} <br />
                </td>
              );
            });
            return <tr key={i}>{days}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
