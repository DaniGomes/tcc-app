<template>
  <v-card class="custom-card with-header less-padding">
    <v-card-title class="headline cc-header">
      <v-layout row wrap align-center>
        <v-flex xs12 sm10 class="text-xs-center text-sm-left">
          {{ titulo }}
          <h4 v-if="subtitulo.length > 0" class="grey--text"> {{ subtitulo }} </h4>
        </v-flex>
        <v-flex xs12 sm2 class="text-xs-center text-sm-right">
          <v-btn icon small class="white mb-0 btn-icon" @click="$emit('close')">
            <v-icon class="red--text">close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-title>

    <v-card-text class="cc-content">
      <div style="position: relative">
        <v-layout v-if="!carregou" justify-center>
          <v-icon v-if="deuErro" x-large color="red"> warning </v-icon>
          <v-progress-circular v-else indeterminate v-bind:size="50" color="primary" />
        </v-layout>

        <div v-if="!carregou" />

        <div>
          <slot />
        </div>
      </div>
    </v-card-text>

    <v-card-actions v-if="footer" class="cc-footer">
      <v-layout>
        <v-btn class="error" @click="$emit('delete')" :disabled="!carregou" v-if="!this.novo"> {{ txtApagar }} </v-btn>
        <v-spacer />
        <v-btn class="blue white--text" @click="$emit('action')" :disabled="!carregou" :loading="loading"> {{ txtBtn }} </v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ModalPadrao',
  props: {
    titulo: {
      type: String,
      default: 'Título'
    },
    subtitulo: {
      type: String,
      default: ''
    },
    novo: {
      type: Boolean,
      default: true
    },
    carregou: {
      type: Boolean,
      default: true
    },
    txtBtn: {
      type: String,
      default: 'Salvar'
    },
    txtApagar: {
      type: String,
      default: 'Apagar'
    },
    deuErro: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: true
    }
  }
};
</script>
