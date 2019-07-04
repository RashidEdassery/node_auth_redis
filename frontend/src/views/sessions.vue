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
              <v-list-tile v-for="(item, index) in onlineUsers" :key="index">
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                </v-list-tile-content>
                <v-divider></v-divider>
              </v-list-tile>            
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import localForage from "localforage";
var findObjectByKey = function(objArray, key, value) {
  if (!objArray || !objArray.length) return false;
  for (var i = 0; i < objArray.length; i++) {
    if (objArray[i][key] === value) {
      return objArray[i];
    }
  }
};
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
    }
  },
  mounted() {
    let _this = this;
    const socket = io("http://localhost:3000");
    socket.on("newUser", function(userData) {
      console.log(JSON.stringify(userData));
      let user = findObjectByKey(
        _this.onlineUsers,
        "email",
        userData.email
      );
      if (!user) {
        _this.onlineUsers.push(userData);
      }
    });
    socket.on("onlineUsers", function(users) {
      console.log(JSON.stringify(users));
      _this.onlineUsers = users;
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
