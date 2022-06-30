<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-img
        alt="Wikisource logo"
        class="shrink mr-2"
        contain
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Wikisource_Small_Index.svg/240px-Wikisource_Small_Index.svg.png"
        transition="scale-transition"
        width="52"
      />

      <v-toolbar-title size="large">Wikisource Contest</v-toolbar-title>

      <v-btn href="#" text plain :ripple="false" to="/">
        <span class="mr-2">Home</span>
      </v-btn>

      <v-btn href="#" text plain :ripple="false" to="/contests">
        <span class="mr-2">Contests</span>
      </v-btn>

      <v-btn href="#" text plain :ripple="false" to="/graph">
        <span class="mr-2">Graph</span>
      </v-btn>

      <v-btn href="#" text plain :ripple="false" to="/about">
        <span class="mr-2">About</span>
      </v-btn>

      <v-spacer></v-spacer>

      <div v-if="getUserName">
        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
          color="link"
        >
          <span class="mr-2">{{ getUserName }}, Logout</span>
          <v-icon color="red">mdi-login</v-icon>
        </v-btn>
      </div>

      <div v-else>
        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
          color="link"
        >
          <span class="mr-2">Login</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters(["getUserName"]),
  },
  methods: {
    ...mapActions(["getUserDetails"]),
  },
  created: function () {
    this.getUserDetails();
  },
};
</script>
