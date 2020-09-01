<template>
  <v-card>
    <v-card-title class="headline blue darken-2 white--text">
      Nova atividade
    </v-card-title>

    <v-card-text>
      <v-text-field label="Nome da atividade" v-model="atividade.nome"/>
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        :return-value.sync="atividade.prazo"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px">
        <v-text-field
          slot="activator"
          v-model="atividade.prazo"
          label="Prazo"
          prepend-icon="event"
          readonly/>
        <v-date-picker v-model="atividade.prazo" @input="$refs.menu.save(atividade.prazo)"/>
      </v-menu>
      <v-select :items="disciplinas" label="Pertence a" v-model="atividade.disciplina_id" 
      item-text="nome" item-value="id" />
      <v-checkbox hide-details label="Requer validação" v-model="atividade.validacao"/>
      <v-checkbox hide-details label="Requer avaliação" v-model="avaliacao"/>
      <v-radio-group hide-details v-model="atividade.avaliacao" :disabled="!avaliacao">
        <v-radio label="por nota" value="nota"/>
        <v-radio label="por conceito" value="conceito"/>
      </v-radio-group>
      <v-text-field hide-details label="Observações" v-model="atividade.observacoes"/>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn v-if="footer" @click="$router.push({ path: 'modelos' })">Recuperar modelo</v-btn>
      <v-btn v-if="footer" @click="criarAtividade">Começar do zero</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat @click="criarAtividade">Criar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NovaAtividade',
  props: {
    footer: {
      type: Boolean
    },
    modelo: {
      type: String
    }
  },
  data: () => ({
    avaliacao: false,
    disciplinas: [],
    atividade: {
      nome: '',
      prazo: '',
      validacao: false,
      avaliacao: '',
      observacoes: '',
      modelo: null,
      liberada: 0
    },
    menu: false,

  }),
  created(){
    this.getDisciplinas();
  },
  methods: {
    getDisciplinas() {
			this.disciplinas = [];
			this.$http.get('disciplinas').then(response => {
				this.disciplinas = response.data
			})
    },
    criarAtividade() {
      this.atividade.modelo = this.modelo
      this.$http.post(`disciplinas/${this.atividade.disciplina_id}/atividades`, this.atividade).then(() => {
        this.$emit('fechaModal')
        this.$router.push({ path: '/disciplinas' })
      });
    }
  }
}
</script>

<style>

</style>
