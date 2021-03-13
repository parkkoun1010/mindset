<template>
  <div class="box_inside">
    <div class="box_small">
      <div class="calendar">
        <div class="cal_nav">
          <div class="nav-btn go-prev" @click="prevMonth">&lt;</div>
          <div class="nav-btn go-today" @click="goToday"></div>
          <div class="nav-btn go-next" @click="nextMonth">&gt;</div>
        </div>
        <div class="cal_main">
          <div class="days">
            <div class="day">Su</div>
            <div class="day">Mo</div>
            <div class="day">Tu</div>
            <div class="day">We</div>
            <div class="day">Th</div>
            <div class="day">Fr</div>
            <div class="day">Sa</div>
          </div>
          <div class="dates"></div>
        </div>
        <p>날짜를 눌러 다이어리를 추가해보세요!</p>
      </div>
    </div>
    <div class="box_small">
      <router-link to="/diary/diary_detail" style="color:white;">
        <div class="today_btn">
          Today
        </div></router-link
      >
      <p
        style="color:#707070;font-size:10px;text-align:center;margin-top:20px;height:25px;"
      >
        오늘의 다이어리를 추가하세요!
      </p>
    </div>
    <div class="blank_bottom"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Diary_cal",
  data() {
    return {
      monthNames: [
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
      ],
      date: new Date(),
      viewYear: "",
      viewMonth: "",
      dates: [],
      info: null,
      cal_data_sample: [
        {
          date: 8
        },
        {
          date: 10
        }
      ],
      cal_data: []
    };
  },
  created() {},
  mounted() {
    this.renderCalendar();
  },
  methods: {
    renderCalendar() {
      this.viewYear = this.date.getFullYear();
      this.viewMonth = this.date.getMonth();
      axios({
        method: "POST",
        url: "www.naver.com",
        data: {
          year: this.viewYear,
          month: this.viewMonth
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
          throw new Error(error);
        });
      this.cal_data = [];
      var j = 0;
      for (var i = 1; i <= 31; i++) {
        if (this.cal_data_sample[j].date == i) {
          this.cal_data.push(1);
          if (j < this.cal_data_sample.length - 1) j++;
        } else this.cal_data.push(0);
      }
      const prevLast = new Date(this.viewYear, this.viewMonth, 0);
      const thisLast = new Date(this.viewYear, this.viewMonth + 1, 0);
      document.querySelector(".go-today").textContent = `${
        this.monthNames[this.viewMonth]
      } ${this.viewYear}`;
      const PLDate = prevLast.getDate();
      const PLDay = prevLast.getDay();
      const TLDate = thisLast.getDate();
      const TLDay = thisLast.getDay();

      const prevDates = [];
      const thisDates = [...Array(TLDate + 1).keys()].slice(1);
      const nextDates = [];

      if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
          prevDates.unshift(PLDate - i);
        }
      }

      for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
      }

      this.dates = prevDates.concat(thisDates, nextDates);

      const prevFakearray = [];
      const nextFakearray = [];
      for (var i = 1; i <= prevDates.length; i++) prevFakearray.push(0);
      for (var i = 1; i <= nextDates.length; i++) nextFakearray.push(0);
      this.cal_data = prevFakearray.concat(this.cal_data, nextFakearray);

      const firstDateIndex = this.dates.indexOf(1);
      const lastDateIndex = this.dates.lastIndexOf(TLDate);
      this.dates.forEach((date, i) => {
        const condition =
          i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
        if (this.cal_data[i] == 0) {
          this.dates[
            i
          ] = `<div class="cal_date"><a href="/diary/diary_detail" class="${condition}">${date}</a></div>`;
        } else {
          this.dates[
            i
          ] = `<div class="cal_date"><a href="/diary/diary_detail" class="${condition} cal_active">${date}</a></div>`;
        }
      });

      document.querySelector(".dates").innerHTML = this.dates.join("");
    },
    prevMonth() {
      this.date.setMonth(this.date.getMonth() - 1);
      this.renderCalendar();
    },
    nextMonth() {
      this.date.setMonth(this.date.getMonth() + 1);
      this.renderCalendar();
    },
    goToday() {
      this.date = new Date();
      this.renderCalendar();
    }
  }
};
</script>
<style src="@/assets/css/style.css"></style>
<style scoped></style>
