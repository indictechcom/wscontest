<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-sheet min-height="70vh" rounded="lg" style="padding: 2%;">
        <div class="d-flex flex-column justify-space-between align-center">
          <v-img
            max-width="300"
            src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Wikisource_Small_Index.svg"
          ></v-img>
        </div>
        <br/>
        <br/>
        <p>
          This tool allows the <a target="__blank" href="http://meta.wikimedia.org/wiki/Wikisource">Wikisource</a> community to run the proofreading/validation contest. The contribution on Wikisource depends on proofreading/validation instead of the number of the edit.
        </p>
        <p>This tool gives stats about proofreading and validation done by users on Wikisource indexes.</p>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Home",
  computed: mapGetters( ['getUserName'] ),
  components: {},
};
</script>
