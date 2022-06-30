<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-sheet min-height="70vh" rounded="lg">
        <p>{{ getUserName }}</p>
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
