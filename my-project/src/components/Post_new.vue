<template>
  <div class="main_box">
    <div class="box_inside">
      <div id="post_top">
        <div class="choice_but" :class="{ choice_but_active: active }">
          <router-link to="/post/post_new">새 게시물</router-link>
        </div>
        <div class="post_space"></div>
        <div class="choice_but">
          <router-link to="/post/post_mine">나의 게시물</router-link>
        </div>
      </div>
      <div class="box_small">
        <div id="post_tag">
          <div id="post_title">
            <h2>제목</h2>
            <input
              type="text"
              class="title_cont"
              placeholder="제목을 입력하세요"
            />
          </div>
          <h2>내용</h2>
          <div id="post_cont">
            <textarea
              class="space_cont"
              placeholder="내용을 입력하세요"
            ></textarea>
          </div>
          <div id="cho_tag">
            <h2>태그</h2>
            <h3>태그는 1개만 선택할 수 있습니다.</h3>
          </div>
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
          <div id="upload_space">
            <button class="but_upload">업로드</button>
          </div>
        </div>
      </div>
      <div class="blank_bottom"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Post",
  data() {
    return {
      active: true,
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
      picked: [false, false, false, false, false, false, false, false]
    };
  },
  methods: {
    pick_tag(i) {
      for (var k = 0; k < this.tags.length; k++) {
        this.$set(this.picked, k, (this.picked[k] = false));
      }
      this.$set(this.picked, i, (this.picked[i] = true));
    }
  }
};
</script>
<style src="@/assets/css/style.css"></style>
