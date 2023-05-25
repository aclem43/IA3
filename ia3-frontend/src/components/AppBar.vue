<template>
  <v-app-bar density="compact" rounded>
    <v-app-bar-title>Application</v-app-bar-title>
    <template v-slot:append>
      <v-btn class="text-none" stacked href="/">
        <v-icon>mdi-car-multiple</v-icon>
      </v-btn>
      <v-menu open-on-hover :close-on-content-click="false" location="end">
        <template v-slot:activator="{ props }">
          <v-btn class="text-none" stacked>
            <v-badge v-bind="props" content="2">
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card width="300px">
          <v-card-title>Alerts - 2</v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-title> Construction </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-card-text>
            <v-btn variant="text" href="/events">View All</v-btn>
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>
