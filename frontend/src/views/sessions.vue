<template>
  <div class="loginContainer">
    <v-toolbar>
      <v-toolbar-title>Sessions</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          @click="logout()"
          flat
        >Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout row>
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <v-card>
          <v-toolbar
            color="grey"
            class="mt-4"
            dark
          >
            <v-toolbar-title>Online Users</v-toolbar-title>
          </v-toolbar>

          <v-list two-line>
            <template v-for="(item, index) in onlineUsers">

              <v-divider
                :key="index"
              ></v-divider>

              <v-list-tile :key="index">
                <v-list-tile-avatar>
                  <v-icon>user</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import localForage from "localforage";
export default {
  data() {
    return {
      onlineUsers: []
    };
  },
  methods: {
    logout() {
      let _this = this;
      localForage
        .removeItem("userData")
        .then(function() {
          _this.$router.go();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    findObjectByKey(objArray, key, value) {
      if (!objArray.length) return false;
      for (var i = 0; i < objArray.length; i++) {
        if (objArray[i][key] === value) {
          return objArray[i];
        }
      }
    }
  },
  mounted() {
    const socket = io("http://localhost:3000");
    socket.on("userJoined", function(userData) {
      // console.log(JSON.stringify(userData.user));
      let user = this.findObjectByKey(this.onlineUsers, 'email', userData.user.email);
      if (!user) {
        this.onlineUsers.push(userData.user);
      }
    });
    localForage
      .getItem("userData")
      .then(function(value) {
        socket.emit("userJoined", value);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>
