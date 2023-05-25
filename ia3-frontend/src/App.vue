<script setup lang="ts"></script>

<template>
  <v-app>
    <v-app-bar density="compact" rounded>
      <v-app-bar-title>Application</v-app-bar-title>
      <template v-slot:append>
        <v-btn class="text-none" stacked>
          <v-badge content="2">
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>
