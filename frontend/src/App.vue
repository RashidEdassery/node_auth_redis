<template>
  <v-app :dark="false">
    <v-content id="mainContentWrapper">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',  
  methods: {
    //
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato:300,400");
* {
  font-family: "Lato", sans-serif !important;
  font-weight: 400 !important;
}
.light_gray_border{
  border: 1px solid rgba(204, 204, 204, 0.5) !important;
}
.border_radius_25{
  border-radius: 25px !important;
}
.ft-w-600{
  font-weight: 600 !important;
}
* {
  font-family: "Lato", sans-serif !important;
  font-weight: 400 !important;
  /* color: #262626; */
}
/* UserManagement */
.regLoginHead {
  font-size: 32px;
  text-align: left;
  margin-left: 16px;
  margin-top: 22px;
}
</style>
