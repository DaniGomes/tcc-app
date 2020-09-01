<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>
      Novo campo
    </v-card-title>

    <v-card-text>
      <v-text-field v-model="campo.titulo" label="Nome do campo"/>
      <v-select :items="tipos" v-model="campo.tipo" label="Tipo do campo"></v-select>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        flat
        @click="$emit( 'addCampo' );">
        Adicionar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NovoCampo',
  data: () => ({
    tipos: [
      'Texto',
      'Área de texto',
      'Número',
      'Data',
      'PDF',
      'Imagem',
      'Caixa de seleção',
      'Caixa de checagem'
    ]
  }),
  props: {
    campo: {
      type: Object,
      required: true
    }
  }
}
</script>
