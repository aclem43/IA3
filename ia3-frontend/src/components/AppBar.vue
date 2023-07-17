<template>
  <v-app-bar density="compact" rounded>
    <v-app-bar-title>Realtime Traffic Application</v-app-bar-title>
    <template v-slot:append>
      <v-btn class="text-none" stacked href="/">
        <v-icon>mdi-cctv</v-icon>
      </v-btn>
      <v-btn class="text-none" stacked href="/events">
        <!-- <v-badge content="2"> -->
        <v-icon>mdi-bell</v-icon>
        <!-- </v-badge> -->
      </v-btn>
    </template>
  </v-app-bar>
</template>
