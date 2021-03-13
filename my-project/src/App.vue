<template>
  <div id="app" class="sb">
    <router-view
      v-if="page_title == 'login' || page_title == 'register'"
    ></router-view>
    <div class="sb" v-else>
      <div class="alarm_view" v-if="showkey">
        <div class="alarm_bg"></div>
        <div class="alarm_board">
          <div class="alarm_header">
            <h1>알림</h1>
            <img src="@/assets/img/logo_main.png" @click="close_alarm" />
          </div>
          <div class="alarm_body">
            <p style="display:none">알림이 없습니다</p>
            <div class="alarm_content">
              <div class="img_box">
                <img src="@/assets/img/chat.png" />
              </div>
              <div class="content_m">
                <span id="a"
                  >회원님의 게시글에 댓글이 달렸습니다. 확인해보세요!</span
                >
                <span id="b">2021.01.21</span>
                <hr />
              </div>
            </div>
            <div class="alarm_content">
              <div class="img_box">
                <img src="@/assets/img/chat.png" />
              </div>
              <div class="content_m">
                <span id="a"
                  >회원님의 게시글에 댓글이 달렸습니다. 확인해보세요!</span
                >
                <span id="b">2021.01.21</span>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
      <img id="circle1" src="@/assets/img/circle1.png" />
      <img id="circle2" src="@/assets/img/circle2.png" />
      <div id="back">
        <div class="top">
          <img src="@/assets/img/alarm.png" id="alarm" @click="show_alarm" />
          <img src="@/assets/img/logout.png" id="logout" />
        </div>
        <p class="hello">{{ user_name }}님, 환영합니다!</p>
        <img id="logo_white" src="@/assets/img/logo_white.png" />
      </div>
      <div id="remain">
        <router-view></router-view>
      </div>
      <img id="menubar" src="@/assets/img/menu.png" />
      <router-link to="/"
        ><img id="logomain" src="@/assets/img/logo_main.png"
      /></router-link>
      <div class="menubox">
        <div class="buttonbox" id="board">
          <router-link
            to="/board"
            class="menu"
            :class="{ active: page_title == 'board' }"
            >BOARD</router-link
          >
        </div>
        <div class="buttonbox" id="post">
          <router-link
            to="/post"
            class="menu"
            :class="{ active: page_title == 'post' }"
            >POST</router-link
          >
        </div>
        <div class="bet"></div>
        <div class="buttonbox" id="chat">
          <router-link
            to="/chat"
            class="menu"
            :class="{ active: page_title == 'chat' }"
            >CHAT</router-link
          >
        </div>
        <div class="buttonbox" id="dairy">
          <router-link
            to="/diary"
            class="menu"
            :class="{ active: page_title == 'diary' }"
            >DIARY</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      showkey: false,
      page_title: "",
      page_sub: "",
      user_name: "채영"
    };
  },
  created() {
    this.page_title = this.$route.matched[
      this.$route.matched.length - 1
    ].meta.title;
    this.page_sub = this.$route.matched[
      this.$route.matched.length - 1
    ].meta.sub;
  },
  methods: {
    show_alarm() {
      this.showkey = true;
    },
    close_alarm() {
      this.showkey = false;
    }
  },
  watch: {
    $route(to, from) {
      this.page_title = to.meta.title;
      this.page_sub = to.meta.sub;
    }
  }
};
</script>
<style src="@/assets/css/style.css"></style>
