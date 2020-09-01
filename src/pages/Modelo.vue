<template>
  <v-layout row wrap class="pa-2">
    <v-flex xs12>
      <v-text-field label="Nome do modelo" v-model="modelo.nome"/>
    </v-flex>
      
    <Formulario :myArray="myArray"/>

    <v-flex xs6 offset-sm10>
      <v-checkbox label="Criar atividade" v-model="checkbox_atividade"/>
    </v-flex> 
    <v-flex xs6 offset-sm10>
      <v-btn color="success" @click="salvar">Salvar modelo</v-btn> 
    </v-flex>

    <!-- Modal nova atividade -->
    <v-dialog v-model="dialog_atividade" :footer="false" width="1200">
      <NovaAtividade :modelo="modelo.json" @fechaModal="dialog_atividade=false"/>
    </v-dialog>

  </v-layout>
</template>

<script>
import NovaAtividade from '../components/NovaAtividade'
import Formulario from '../components/Formulario'

export default {
  name: 'Modelo',
  components: { NovaAtividade, Formulario },
  data: () => ({
    myArray: [],
    checkbox_atividade: false,
    dialog_campo: false,
    dialog_atividade: false,
    campo: {},
    modelo: {
			nome: '',
			tipo: '',
			json: null
    },
    editando: false
  }),
  created(){
    if(this.$route.params.id){
      this.$http.get(`modelos/${this.$route.params.id}`).then(response => {
        this.modelo = response.data;
        this.myArray = JSON.parse(response.data.json);
        this.editando = true;
      });
    }
  },
  methods: {
    salvar(){
      if(!this.editando) {
        const modelo = {
          nome: this.modelo.nome,
          tipo: this.modelo.tipo,
          json: JSON.stringify(this.myArray)
        }
        this.$http.post('modelos', modelo).then(() => {
          if(this.checkbox_atividade){
            this.dialog_atividade = true;
          } else {
            this.$router.push({ path: '/modelos' })
          }
        })
      }
      else {
        this.modelo.json = JSON.stringify(this.myArray)
        this.$http.put('modelos/' + this.modelo.id, this.modelo).then(() => {
          if(this.checkbox_atividade){
            this.dialog_atividade = true;
          } else {
            this.$router.push({ path: '/modelos' })
          }
        })
      }
    }
  }
}
</script>
