<template>
  <div id="box">
    <div id="inside_box">
      <h1>회원가입</h1>
      <h3>본 서비스는 만 19세 이하만 이용이 가능합니다</h3>
      <div class="set_info">
        <h2>아이디</h2>
        <div class="input_error">
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            class="input_info"
            v-model="id"
          />
          <h4>아이디는 영어와 숫자만 입력가능합니다.</h4>
        </div>
      </div>
      <div class="set_info">
        <h2>비밀번호</h2>
        <div class="input_error">
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            class="input_info"
            v-model="password"
          />
          <h4>비밀번호는 8자 이상 입력해주세요.</h4>
        </div>
      </div>
      <div class="set_info">
        <h2>비밀번호 확인</h2>
        <div class="input_error">
          <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            class="input_info"
            v-model="passwordcheck"
          />
          <h4>비밀번호가 일치합니다.</h4>
        </div>
      </div>
      <div class="set_info">
        <h2>이름</h2>
        <div class="input_error">
          <input
            type="text"
            placeholder="이름을 입력하세요"
            class="input_info"
            v-model="name"
          />
        </div>
      </div>
      <div class="space_info"></div>
      <div class="set_info">
        <h2>전화번호</h2>
        <div class="input_error">
          <input
            type="text"
            placeholder="띄어쓰기 없이 입력해 주세요."
            class="input_info"
            v-model="tel"
          />
        </div>
      </div>
      <div class="space_info"></div>
      <div class="set_info">
        <h2>생년월일</h2>
        <div class="input_error">
          <input
            type="text"
            placeholder="띄어쓰기 없이 입력해 주세요."
            class="input_info"
            v-model="birthday"
          />
        </div>
      </div>
      <div class="space_info"></div>
      <div class="set_info">
        <h2>성별</h2>
        <div
          class="gender"
          :class="{ genderchecked: isMan }"
          @click="manchecked"
        >
          <a>남</a>
        </div>
        <div
          class="gender"
          :class="{ genderchecked: !isMan }"
          @click="womanchecked"
        >
          <a>여</a>
        </div>
      </div>
      <div class="space_info"></div>
      <h2>학생증 업로드</h2>
      <input
        type="file"
        name="image"
        id="input-file"
        style="display:none;"
        accept="image/*"
        @change="onChangeImages"
      />
      <label for="input-file">
        <img :src="imageUrl" alt="My Image" id="upload_img" />
      </label>

      <button id="but_register" @click="registernew">회원가입</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      id: "",
      password: "",
      passwordcheck: "",
      name: "",
      tel: "",
      birthday: "",
      isMan: true,
      imageUrl: require("@/assets/img/upload_image.png"),
      image: "",
      gender: ""
    };
  },
  methods: {
    onChangeImages(e) {
      const file = e.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
      this.image = file;
    },
    manchecked() {
      this.isMan = true;
    },
    womanchecked() {
      this.isMan = false;
    },
    registernew() {
      const formData = new FormData();
      formData.append("id", this.id);
      formData.append("password", this.password);
      formData.append("passwordcheck", this.passwordcheck);
      formData.append("name", this.name);
      formData.append("tel", this.tel);
      formData.append("birth", this.birthday);
      formData.append("gender", this.gender);
      formData.append("image", this.image);
      axios
        .post("", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
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
  },
  watch: {
    id: function() {
      return (this.id = this.id.replace(/[^A-Za-z0-9]/gi, ""));
    },
    password: function() {
      return (this.password = this.password.replace(/[^A-Za-z0-9]/gi, ""));
    },
    passwordcheck: function() {
      return (this.passwordcheck = this.passwordcheck.replace(
        /[^A-Za-z0-9]/gi,
        ""
      ));
    },
    tel: function() {
      return (this.tel = this.tel.replace(/[^0-9]/gi, ""));
    },
    birthday: function() {
      return (this.birthday = this.birthday.replace(/[^0-9]/gi, ""));
    }
  }
};
</script>
<style src="@/assets/css/register.css"></style>
