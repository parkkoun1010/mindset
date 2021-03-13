<template>
  <div class="box_inside">
    <div class="today_title" id="today_date"></div>
    <div class="box_small">
      <div class="diary_box">
        <div class="today_diary">
          <textarea
            id="diary"
            name="diary"
            placeholder="내용을 입력하세요."
            v-model="main"
          ></textarea>
        </div>
      </div>
      <div class="save_btn" @click="send_diary">저장</div>
      <div class="blank_bottom2"></div>
    </div>
    <div class="blank_bottom"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Diary_detail",
  data: {
    year: "",
    month: "",
    date: "",
    main: "",
    id: ""
  },
  mounted() {
    this.date_init();
  },
  methods: {
    date_init() {
      var date = new Date();
      var y = date.getFullYear(); // 년도
      var m = new String(date.getMonth() + 1); // 월
      var d = date.getDate(); // 일
      if (m.length == 1) {
        m = "0" + m;
      }
      if (d.length == 1) {
        d = "0" + d;
      }
      var t_date = y + "." + m + "." + d;
      document.getElementById("today_date").innerHTML = t_date;
    },
    send_diary() {
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth();
      this.date = new Date().getDate();
      axios({
        method: "POST",
        url: "http://172.20.10.10/api/diary/diarys",
        data: {
          year: this.year,
          month: this.month,
          date: this.date,
          main: this.main,
          id: "603607811944b30c7a3912da"
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
          throw new Error(error);
        });
    }
  }
};
</script>
<style src="@/assets/css/style.css"></style>
