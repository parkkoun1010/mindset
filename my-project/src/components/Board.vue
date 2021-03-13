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
      <div id="tags">
        <div
          class="tag"
          v-for="(tag, i) in tags"
          @click="pick_tag(i)"
          :class="{ picked_tag: picked[i] == true }"
        >
          {{ tag.tag }}
        </div>
      </div>
      <div id="board_posts">
        <div class="box_small" v-for="(data, i) in communities">
          <span @click="show_comment(i)"
            ><div class="title">
              <h2>{{ data.title }}</h2>
              <p class="date">{{ data.created }}</p>
            </div>
            <p class="cont">{{ data.main }}</p></span
          >
          <span v-if="show_detail[i]"
            ><div class="line"></div>
            <div id="comments" class="ifcomnone" v-if="comments[i].length == 0">
              댓글이 없습니다.
            </div>
            <span class="comment_area">
              <div id="comments" v-for="(com_data, j) in comments[i]">
                <div class="comment_reply">
                  <div class="comment">
                    <p class="name">{{ com_data.name }}</p>
                    <p class="comm_cont">{{ com_data.main }}</p>
                    <button class="lets_rep" @click="show_recomment(i, j)">
                      답글달기{{ comments[0][2] }}
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
                    v-for="(recom_data, k) in recomments[i][j]"
                  >
                    <div class="commx2_space"></div>
                    <p class="name">{{ recom_data.name }}</p>
                    <p class="comm_cont">
                      {{ recom_data.main }}
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
  name: "Board",
  data() {
    return {
      picked_board: -1,
      picked_writer: -1,
      picked_rewriter: -1,
      imgchange: [],
      imgchange2: [],
      imgA: require("@/assets/img/round_upload.png"),
      imgB: require("@/assets/img/round_upload_hover.png"),
      showpopup: false,
      popup1: false,
      popup2: false,
      tags: [
        { tag: "#오늘의게시물", ptag: "오늘의게시물" },
        { tag: "#연애", ptag: "연애" },
        { tag: "#성적", ptag: "성적" },
        { tag: "#학업", ptag: "학업" },
        { tag: "#가족관계", ptag: "가족관계" },
        { tag: "#친구관계", ptag: "친구관계" },
        { tag: "#왕따", ptag: "왕따" },
        { tag: "#따돌림", ptag: "따돌림" }
      ],
      picked: [true, false, false, false, false, false, false, false],
      new_comm: [],
      new_recomm: [],
      show_detail: [],
      show_re_detail: [],
      communities: [
        {
          title: "너무 힘들어요",
          main: "남자친구가 바람펴요",
          created: "2021.06.06",
          _id: "aaa",
          tag: "연애",
          comment: 2
        },
        {
          title: "연애하고 싶어요",
          main: "저는 언제쯤 커플이 될 수 있을까요?",
          created: "2021.02.27",
          _id: "bbb",
          tag: "연애",
          comment: 6
        }
      ],
      comments: [
        [
          {
            board: "aaa",
            _id: "yaya",
            name: "정주영",
            main: "웅",
            created: "",
            recomment: 0
          },
          {
            board: "aaa",
            _id: "dafs",
            name: "김수겸",
            main: "그냥 헤어지세요 ㅠㅠ",
            created: "",
            recomment: 0
          }
        ],
        [
          {
            board: "bbb",
            _id: "yayaasdf",
            name: "김수겸",
            main: "응 나는 이미 커플이야 ㅎ",
            created: "",
            recomment: 1
          },
          {
            board: "bbb",
            _id: "dafasdfs",
            name: "백종인",
            main: "애니가 더 좋아요!",
            created: "",
            recomment: 0
          },
          {
            board: "bbb",
            _id: "dafasdffs",
            name: "허정우",
            main: "씹덕아",
            created: "",
            recomment: 0
          },
          {
            board: "bbb",
            _id: "dafasㄹㄹdfs",
            name: "조만식",
            main: "종인...어디까지 간거야",
            created: "",
            recomment: 0
          },
          {
            board: "bbb",
            _id: "dafasdfs",
            name: "윤지",
            main: "농인 같이 보자고",
            created: "",
            recomment: 0
          },
          {
            board: "bbb",
            _id: "dafasdfs",
            name: "워노워노",
            main: "4월은 너의 거짓말!",
            created: "",
            recomment: 0
          }
        ]
      ],
      recomments: [
        [],
        [
          [
            {
              _id: "asdfasdffdf",
              comment: "yayaasdf",
              name: "정주영",
              main: "걍 죽어",
              created: ""
            }
          ]
        ]
      ]
    };
  },
  created() {
    axios.get("").then(res => {
      this.communities = [];
      this.communities.push(res.data);
    });
    this.commu_init();
  },
  methods: {
    del_comment(i, j) {
      this.showpopup = true;
      this.picked_board = i;
      this.picked_writer = j;
      if (this.comments[i][j].name == user.name) {
        this.popup2 = true;
      } else this.popup1 = true;
    },
    del_comment2(i, j, k) {
      this.showpopup = true;
      this.picked_board = i;
      this.picked_writer = j;
      this.picked_rewriter = k;
      if (this.recomments[i][j][k].name == user.name) {
        this.popup2 = true;
      } else this.popup1 = true;
    },
    p1cls() {
      this.showpopup = false;
      this.popup1 = false;
      this.picked_board = -1;
      this.picked_writer = -1;
      this.picked_rewriter = -1;
    },
    p2cncl() {
      this.showpopup = false;
      this.popup2 = false;
      this.picked_board = -1;
      this.picked_writer = -1;
      this.picked_rewriter = -1;
    },
    p2del() {
      this.showpopup = false;
      this.popup2 = false;
      if (this.picked_rewriter == -1) {
        axios
          .post("", {
            comment: this.comments[this.picked_board][this.picked_writer]._id
          })
          .then(res => {
            this.picked_board = -1;
            this.picked_writer = -1;
            this.picked_rewriter = -1;
          });
      } else {
        axios
          .post("", {
            recomment: this.recomments[this.picked_board][this.picked_writer][
              this.picked_rewriter
            ]._id
          })
          .then(res => {
            this.picked_board = -1;
            this.picked_writer = -1;
            this.picked_rewriter = -1;
          });
      }
    },
    pick_tag(i) {
      for (var k = 0; k < this.tags.length; k++) {
        this.$set(this.picked, k, (this.picked[k] = false));
      }
      this.$set(this.picked, i, (this.picked[i] = true));
      axios.post("", { tag: tags[i].ptag }).then(res => {});
    },
    show_comment(i) {
      this.$set(this.show_detail, i, !this.show_detail[i]);
      axios.post("", { board: communities[i]._id }).then(res => {
        this.comments[i] = [];
        this.comments[i].push(res.data);
      });
    },
    show_recomment(i, j) {
      this.$set(this.show_re_detail[i], j, !this.show_re_detail[i][j]);
      axios.get("").then(res => {
        this.recomments[i][j] = [];
        this.recomments[i][j].push(res.data);
      });
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
    commu_init() {
      for (var i = 0; i < this.communities.length; i++) {
        this.imgchange.push(true);
        this.imgchange2.push([]);
        this.show_detail.push(false);
        this.show_re_detail.push([]);
        this.new_comm.push("");
        this.new_recomm.push([]);
        //this.comments.push([]);
        //this.recomments.push([]);
        for (var j = 0; j < this.communities[i].comment; j++) {
          this.show_re_detail[i].push(false);
          this.new_recomm[i].push("");
          this.imgchange2[i].push(true);
          //this.recomments[i].push([]);
        }
      }
    },
    send_com(i) {
      axios({
        method: "POST",
        url: "http://172.20.10.10/api/board",
        data: {
          //id:
          board: this.communities[i]._id,
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
          com_id: this.comments[i][j]._id,
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
      alert(this.comments[i][j]._id + this.new_recomm[i][j]);
    }
  }
};
</script>
<style src="@/assets/css/style.css"></style>
