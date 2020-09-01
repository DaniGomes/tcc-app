<template>
  <v-container>
    <v-flex xs12>
			<h2>Nome da atividade</h2> 
		</v-flex>
    <v-layout row wrap>
      <v-flex v-for="campo in myArray" :key="campo.titulo" xs12>
        {{ campo.titulo }} : {{ campo.valor }}
      </v-flex>
      <v-flex xs3/>
      <v-flex xs2>
        <v-btn color="success" @click="validar">Validar</v-btn> 
      </v-flex>
      <v-flex xs2>
        <v-btn color="success" disabled>Dar nota / conceito</v-btn> 
      </v-flex>
      <v-flex xs6>
        <v-text-field disabled v-model="submissao.nota" label="Nota / conceito" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'Submissao',
  data: () => ({
    submissao: {},
    myArray: []
  }),
  created() {
    this.$http.get(`submissoes/${this.$route.params.id}`).then(response => {
      this.submissao = response.data
      if(this.submissao.conteudo)
        this.myArray = JSON.parse(this.submissao.conteudo)
    })
  },
  methods: {
    validar() {
      this.submissao.status = 'Aceita'
    }
  }
}
</script>

