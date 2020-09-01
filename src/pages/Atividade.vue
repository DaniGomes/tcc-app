<template>
  <v-container>
    <v-container v-if=!validar>
      <v-flex xs10 v-if="responder==1 || atividade.liberada">
        <h2>{{ atividade.nome }}</h2>
      </v-flex>
      <v-flex xs10 v-else>
        <v-text-field v-model="atividade.nome" label="Nome da atividade" />
      </v-flex>
      <v-layout row wrap>

        <v-flex xs12 v-if="responder==0 && atividade.liberada==0">
          <Formulario :myArray="myArray"/>
        </v-flex>

        <v-flex xs12 v-else v-for="element in myArray" :key="element.id">
          <v-text-field v-if="element.tipo == 'Texto'" :label="element.titulo" v-model="element.valor" />
          <v-textarea v-else-if="element.tipo == 'Área de texto'" :label="element.titulo" v-model="element.valor" />
          <v-text-field v-else-if="element.tipo == 'Número'" :label="element.titulo" type="number" v-model="element.valor" />
          <v-date-picker  v-else-if="element.tipo == 'Data'" :label="element.titulo" 
          v-model="element.valor" :landscape="true" :reactive="false" />
          <v-text-field v-else-if="element.tipo == 'PDF'" :label="element.titulo" type="file" v-model="element.valor" />
          <v-text-field v-else-if="element.tipo == 'Imagem'" :label="element.titulo" type="file" v-model="element.valor" />
          <v-switch v-else-if="element.tipo == 'Caixa de seleção'" :label="element.titulo" v-model="element.valor" />
          <v-checkbox v-else-if="element.tipo == 'Caixa de checagem'" :label="element.titulo" v-model="element.valor" />
        </v-flex>
        
        <v-flex xs2>
          <v-btn v-if="responder==1" color="info" @click="submeter">Enviar</v-btn>
          <v-btn v-else-if="responder==0 && !atividade.liberada" color="info" @click="submeter">Salvar</v-btn>
        </v-flex>
        <v-flex v-if="responder==0 && !atividade.liberada" xs2>
          <v-btn color="info" @click="liberar" >Liberar para os alunos</v-btn> 
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-else>
      <v-layout row wrap>
        <v-flex v-for="campo in myArray" :key="campo.titulo" xs12>
          <v-text-field disabled box :label="campo.titulo" :value="campo.valor"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-btn color="success" @click="validarResposta" :disabled="!atividade.validacao">Validar</v-btn> 
        </v-flex>
        <v-flex xs2>
          <v-text-field v-model="submissao.nota" :disabled="atividade.avaliacao == ''" 
          :label="atividade.avaliacao" />
        </v-flex>
        <v-flex xs2>
          <v-btn color="success" :disabled="atividade.avaliacao == ''">Dar nota / conceito</v-btn> 
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>
<script>
import Formulario from '../components/Formulario'
export default {
  name: 'Atividade',
  components: {
    Formulario
  },
  data: () => ({
    atividade: {},
    myArray: [],
    submissao: {},
    alunos: {},
    responder: false, 
    validar: false 
  }),
  created() {
    if(this.$store.state.tipo_user === 'orien') this.validar = true;
    if(this.$store.state.tipo_user === 'aluno') this.responder = true;
    this.$http.get(`disciplinas/${this.$route.params.dis}/atividades/${this.$route.params.id}`).then(response => {
      this.atividade = response.data
      if(this.atividade.modelo)
        this.myArray = JSON.parse(this.atividade.modelo)
      if(this.responder || this.validar)
        this.$http.get(`submissoes/${this.$route.params.sub}`).then(response => {
          this.submissao = response.data
          this.submissao.nome = this.atividade.nome
          this.myArray = JSON.parse(this.submissao.conteudo)
        })
      else {
        if(this.atividade.modelo)
          this.myArray = JSON.parse(this.atividade.modelo)
      }
    })
  },
  methods: {
    submeter() {
      if(this.responder) {

      this.submissao.conteudo = JSON.stringify(this.myArray)
      this.submissao.status = 'Entregue'
      this.$http.put(`submissoes/${this.$route.params.sub}`, this.submissao)
      this.$router.push(`/aluno/${this.$store.state.id_user}`)

      } else {
        this.myArray.forEach(element => { element.valor = '' })
        this.atividade.modelo = JSON.stringify(this.myArray)
        this.atividade.liberada = false
        this.$http.put(`disciplinas/${this.$route.params.dis}/atividades/${this.$route.params.id}`, this.atividade)
        this.$router.push({ path: '/disciplinas' })

      }
    },
    liberar() {
      this.atividade.liberada = 1;
      this.$http.put(`disciplinas/${this.$route.params.dis}/atividades/${this.$route.params.id}`, this.atividade).then(() => {
        this.$http.get('alunos').then(response => { //TODO Pegar alunos de uma certa disciplina e não todos os alunos
          this.alunos = response.data
          this.alunos.forEach(aluno => {
            this.criaSubmissao(aluno)
          })
        })
        this.$router.push({ path: '/disciplinas' })
      })
    },
    criaSubmissao(aluno) {
      const submissao = {}
      
      submissao.nota = ''
      submissao.status = 'Pendente'
      submissao.conteudo = JSON.stringify(this.myArray)
      submissao.aluno_id = aluno.id
      submissao.professor_id = aluno.orientador
      submissao.atividade_id = this.atividade.id

      this.$http.post('submissoes', submissao)

    },
    validarResposta() {
      this.submissao.status = 'Aceita'
      this.$http.put(`submissoes/${this.$route.params.sub}`, this.submissao)
      this.$router.push({ path: '/alunos' })
    }
  }
}
</script>

