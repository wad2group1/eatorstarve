<template>
  <body>
    <dialog id="dialog-rounded" class="nes-dialog is-rounded">
      <form style="text-align: center">
        <h4>Are you Sure?</h4>
        <br /><br />
        <p>
          No other players will be allowed to join after results has been
          generated.
        </p>
        <menu class="dialog-menu p-0">
          <button class="nes-btn is-primary" type="button" @click="generate">
            Yes
          </button>
          <button class="nes-btn" type="button" @click="close">No</button>
        </menu>
      </form>
    </dialog>

    <dialog id="exitModal" class="nes-dialog is-rounded dialog">
      <div style="text-align: center">
        <h4>Wait!</h4>
        <p>Heading back to Home Page?<br /><br /></p>
        <small>
          Note: You can come back to this page by rejoining this room! <br />
        </small>

        <br />
        <button
          class="nes-btn is-warning"
          style="margin-bottom: 10px"
          type="button"
          @click="home"
        >
          Yes, Goodbye!
        </button>
        <button class="nes-btn" @click="close2">Cancel</button>
      </div>
    </dialog>

    <div class="container-sm p-0">
      <div class="row mx-0">
        <div class="col-3 col-md-2 mt-2 px-0">
          <button class="nes-btn is-error" type="button" @click="exit">
            Quit
          </button>
        </div>

        <div class="col-6 col-md-8 mt-2 px-2">
          <h1 class="logo">The End</h1>
        </div>
        <div class="user col-3 col-md-2 mt-2 px-0 mb-2 nes-container">
          {{ code }}
        </div>
        <div class="col-md-1 col-lg-1" />
        <div class="col-12 col-md-10 col-lg-10 mt-5">
          <div class="main_component nes-container is-rounded text-center">
            <h5>Completed:</h5>
            <div class="container">
              <div class="row">
                <!-- <div class="col"></div> -->
                <div class="user_list col">
                  <ul>
                    <li v-for="user of answered.users" :key="user">
                      <img
                        :src="get_avatar(user)"
                        style="width: 40px; height: auto"
                      />
                      {{ user }}
                    </li>
                  </ul>
                </div>
                <!-- <div class="col-2"></div> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User List -->

      <div class="result">
        <!-- Generate Result Dialog -->

        <div class="col-12">
          <div class="text_component container nes-container is-rounded">
            <div class="row py-sm-4">
              <div class="col-12">
                <div class="text_container">
                  Do you want to generate results?

                  <div class="hider">
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                  </div>
                </div>
              </div>

              <!-- <div class="col"></div> -->
              <div class="col-12">
                <div>
                  <button
                    class="nes-btn is-warning"
                    type="button"
                    @click="enter()"
                  >
                    Generate
                  </button>
                </div>

                <!-- <div class="enter d-none d-sm-block">
              Press 'Enter' to continue
            </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <GenerateResultsComponent :code="code"/>
<UsernameCheckerComponent /> -->
  </body>
</template>

<script>
import router from "@/router";
import { useSessionStore } from "../stores/session";
import axios from "axios";
import { reactive } from "vue";

export default {
  name: "HoldingView",
  setup() {
    const store = useSessionStore();
    return {
      username: store.getUsername,
    };
  },
  data() {
    return {
      code: this.$route.params.code,
      answered: reactive({ users: [] }),
      value: "",
      visible: "hidden",
    };
  },

  created() {
    setTimeout(() => (this.visible = ``), 2500);
  },

  mounted() {
    axios
      .get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}`)
      .then((response) => {
        this.answered.users = response.data;
      });
    setInterval(
      function () {
        axios
          .get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}`)
          .then((response) => {
            this.answered.users = response.data;
          });
      }.bind(this),
      3000
    );
  },

  methods: {
    home: function () {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      router.push("/");
    },
    next: function () {
      router.push({ name: "Results", params: { id: this.code } });
    },
    get_avatar(user) {
      return "https://avatars.dicebear.com/api/pixel-art/" + user + ".svg";
    },
    enter() {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      document.getElementById("dialog-rounded").showModal();
    },
    close() {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      document.getElementById("dialog-rounded").close().preventDefault();
    },
    close2() {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      document.getElementById("exitModal").close();
    },
    exit() {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      document.getElementById("exitModal").showModal();
    },
    generate() {
      let buttonpress = new Audio("../../buttonpress.mp3");
      buttonpress.play();
      router.push({ name: "Result", params: { id: this.code } });
    },
  },
};
</script>

<style scoped>
div.nes-container {
  background-color: white;
}

.nes-btn {
  width: calc(100% - 8px);
  height: 56px;
}

.logo {
  text-align: center;
  margin: 0;
  padding-top: 10px;
}

.user {
  padding: 20px;
  text-align: center;
  height: 70px;
}

@keyframes typing {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}

div.main_component {
  padding-top: 10px;
  margin-right: auto;
  margin-left: auto;
  width: 55%;
  height: 100%;
  background-color: rgb(247, 213, 29);
  min-height: 250px;
  min-width: 300px;
}

.user_list {
  overflow-y: auto;
  bottom: 20px;
  top: 70px;
  text-align: left;
  right: 15px;
}

div.text_component {
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  width: 100%;
  height: auto;
  text-align: left;
  background-color: white;
  padding-top: 0px;
  padding-bottom: 0px;
}

.result {
  position: absolute;
  bottom: 0px;
  left: 4px;
  right: 4px;
}

.text_container {
  position: relative;
}

.hider {
  margin: 0;
  top: 0;
  width: 100%;
}

.hider p {
  position: relative;
  clear: both;
  margin: 0;
  float: right; /* makes animation go left-to-right */
  width: 0; /* graceful degradation: if animation doesn't work, these are invisible by default */
  /* height: 15px; */
  background: white; /* same as page background */
  animation: typing 1s steps(30, end);
  animation-delay: 1s;
  animation-fill-mode: both; /* load first keyframe on page load, leave on last frame at end */
}

.hider p:nth-child(2) {
  animation-delay: 4s;
}

.hider p:nth-child(3) {
  animation-delay: 8s;
}

li {
  list-style-type: none;
  text-align: left;
  margin: 10px;
}

img {
  margin-right: 20px;
}

body {
  height: 100%;
  background: linear-gradient(
      0deg,
      rgba(245, 200, 95, 0.66),
      rgba(245, 200, 95, 0.66)
    ),
    url(../assets/bg1.jpeg);
  box-shadow: 7px 12px 18px rgba(0, 0, 0, 0.25);
}

.typewriter button {
  width: 100px;
}
</style>
