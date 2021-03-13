<template>
  <div class="main_box">
    <div class="popup_view" v-if="showpopup">
      <div class="popup_bg"></div>
      <div class="popup_1" v-if="popup1">
        <p>본인의 댓글만 삭제할 수 있습니다.</p>
        <span @click="p1cls">닫기</span>
      </div>
      <div class="popup_2" v-if="popup2">
        <p>댓글을 삭제하시겠습니까?</p>
        <span id="p2cncl" @click="p2cncl">취소</span>
        <span id="p2del" @click="p2del">삭제</span>
      </div>
    </div>
    <div class="box_inside">
      <div id="post_top">
        <div class="choice_but">
          <router-link to="/post/post_new">새 게시물</router-link>
        </div>
        <div class="post_space"></div>
        <div class="choice_but" :class="{ choice_but_active: active }">
          <router-link to="/post/post_mine">나의 게시물</router-link>
        </div>
      </div>
      <div id="board_posts">
        <div class="box_small" v-for="(data, i) in results">
          <span @click="show_comment(i)"
            ><div class="title">
              <h2>{{ data.title }}</h2>
              <p class="date">{{ data.date }}</p>
            </div>
            <p class="cont">{{ data.content }}</p></span
          >
          <span v-if="show_detail[i]"
            ><div class="line"></div>
            <div
              id="comments"
              class="ifcomnone"
              v-if="results[i].comment.length == 0"
            >
              댓글이 없습니다.
            </div>
            <span class="comment_area">
              <div
                id="comments"
                v-for="(com_data, j) in results[i].comment"
                ref="comheight"
              >
                <div class="comment_reply">
                  <div class="comment">
                    <p class="name">{{ com_data.writer }}</p>
                    <p class="comm_cont">{{ com_data.com_content }}</p>
                    <button class="lets_rep" @click="show_recomment(i, j)">
                      답글달기
                    </button>
                    <img
                      class="but_del"
                      src="@/assets/img/delete.png"
                      @click="del_comment(i, j)"
                    />
                  </div>
                  <div class="reply" v-if="show_re_detail[i][j]">
                    <div class="space"></div>
                    <input
                      type="text"
                      class="reply_cont"
                      placeholder="답글을 입력하세요"
                      v-model="new_recomm[i][j]"
                    />
                    <img
                      class="but_up"
                      src="@/assets/img/round_upload.png"
                      :src="imgchange2[i][j] ? imgA : imgB"
                      @mouseover="imgmouseover2(i, j)"
                      @mouseleave="imgmouseleave2(i, j)"
                      @click="send_recom(i, j)"
                    />
                  </div>
                  <div
                    class="commx2"
                    v-for="(recom_data, k) in results[i].comment[j].recomment"
                  >
                    <div class="commx2_space"></div>
                    <p class="name">{{ recom_data.writer }}</p>
                    <p class="comm_cont">
                      {{ recom_data.recom_content }}
                    </p>
                    <img
                      class="but_del"
                      src="@/assets/img/delete.png"
                      @click="del_comment2(i, j, k)"
                    />
                  </div>
                </div>
              </div>
            </span>
            <div id="lets_comm">
              <input
                type="text"
                class="input_comm"
                placeholder="댓글을 입력하세요"
                v-model="new_comm[i]"
              />
              <img
                class="but_up"
                :src="imgchange[i] ? imgA : imgB"
                @mouseover="imgmouseover(i)"
                @mouseleave="imgmouseleave(i)"
                @click="send_com(i)"
              /></div
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Post",
  data() {
    return {
      active: true,
      picked_writer: 0,
      picked_rewriter: 0,
      imgchange: [],
      imgchange2: [],
      imgA: require("@/assets/img/round_upload.png"),
      imgB: require("@/assets/img/round_upload_hover.png"),
      showpopup: false,
      popup1: false,
      popup2: false,
      tags: [
        { tag: "#오늘의게시물", data: "" },
        { tag: "#연애", data: "" },
        { tag: "#성적", data: "" },
        { tag: "#학업", data: "" },
        { tag: "#가족관계", data: "" },
        { tag: "#친구관계", data: "" },
        { tag: "#왕따", data: "" },
        { tag: "#따돌림", data: "" }
      ],
      picked: [true, false, false, false, false, false, false, false],
      new_comm: [],
      new_recomm: [],
      show_detail: [],
      show_re_detail: [],
      results: [
        {
          id: "aaa",
          title: "너무 힘들어요",
          date: "2021.06.06",
          content: "남자친구가 바람펴요",
          comment: [
            { id: "yaya", writer: "정주영", com_content: "웅" },
            {
              id: "dafs",
              writer: "김수겸",
              com_content: "그냥 헤어지세요 ㅠㅠ"
            }
          ]
        },
        {
          id: "bbb",
          title: "연애하고 싶어요",
          date: "2021.02.27",
          content: "저는 언제쯤 커플이 될 수 있을까요?",
          comment: [
            {
              id: "asdf",
              writer: "김수겸",
              com_content: "응 나는 이미 커플이야^^",
              recomment: [
                {
                  id: "asfasdfasdfasdf",
                  writer: "정주영",
                  recom_content: "걍 죽어"
                }
              ]
            },
            {
              id: "asfadf",
              writer: "백종인",
              com_content: "애니가 더 좋아요!"
            },
            { id: "asfadf2", writer: "허정우", com_content: "씹덕아" },
            {
              id: "asfadf3",
              writer: "조만식",
              com_content: "종인..어디까지 간거야"
            },
            { id: "asfadf4", writer: "윤지", com_content: "종인 같이 보자고" },
            {
              id: "asfadf5",
              writer: "워노워노",
              com_content: "4월은 너의 거짓말!!"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.checkdata_init();
  },
  methods: {
    del_comment(i, j) {
      this.showpopup = true;
      this.picked_writer = j;
      if (this.results[i].comment[j].writer == user.name) {
        this.popup2 = true;
      } else this.popup1 = true;
    },
    del_comment2(i, j, k) {
      this.showpopup = true;
      this.picked_writer = j;
      this.picked_rewriter = k;
      if (this.results[i].comment[j].recomment[k].writer == user.name) {
        this.popup2 = true;
      } else this.popup1 = true;
    },
    p1cls() {
      this.showpopup = false;
      this.popup1 = false;
    },
    p2cncl() {
      this.showpopup = false;
      this.popup2 = false;
    },
    p2del() {
      this.showpopup = false;
      this.popup2 = false;
      //post(댓글지우기)
    },
    pick_tag(i) {
      for (var k = 0; k < this.tags.length; k++) {
        this.$set(this.picked, k, (this.picked[k] = false));
      }
      this.$set(this.picked, i, (this.picked[i] = true));
    },
    show_comment(i) {
      this.$set(this.show_detail, i, !this.show_detail[i]);
    },
    show_recomment(i, j) {
      this.$set(this.show_re_detail[i], j, !this.show_re_detail[i][j]);
    },
    imgmouseover(i) {
      this.$set(this.imgchange, i, (this.imgchange[i] = false));
    },
    imgmouseleave(i) {
      this.$set(this.imgchange, i, (this.imgchange[i] = true));
    },
    imgmouseover2(i, j) {
      this.$set(this.imgchange2[i], j, (this.imgchange2[i][j] = false));
    },
    imgmouseleave2(i, j) {
      this.$set(this.imgchange2[i], j, (this.imgchange2[i][j] = true));
    },
    checkdata_init() {
      for (var i = 0; i < this.results.length; i++) {
        this.imgchange.push(true);
        this.imgchange2.push([]);
        this.show_detail.push(false);
        this.show_re_detail.push([]);
        this.new_comm.push("");
        this.new_recomm.push([]);
        for (var j = 0; j < this.results[i].comment.length; j++) {
          this.show_re_detail[i].push(false);
          this.new_recomm[i].push("");
          this.imgchange2[i].push(true);
        }
      }
    },
    send_com(i) {
      axios({
        method: "POST",
        url: "http://172.20.10.10/api/board",
        data: {
          //id:
          board: this.results[i].id,
          main: this.new_comm[i]
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
          throw new Error(error);
        });
    },
    send_recom(i, j) {
      axios({
        method: "POST",
        url: "http://172.20.10.10/api/board",
        data: {
          //id:
          com_id: this.results[i].comment[j].id,
          main: this.new_recomm[i][j]
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
          throw new Error(error);
        });
      alert(this.results[i].comment[j].id + this.new_recomm[i][j]);
    }
  }
};
</script>
<style src="@/assets/css/style.css"></style>
