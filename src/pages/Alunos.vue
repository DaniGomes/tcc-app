<template>
	<v-layout row wrap class="pa-2">
		<v-flex xs8 md10 class="pt-3 pl-2">
			<h2 class="headline mb-0">Alunos</h2>
		</v-flex>
		<v-flex xs4 md2 class="pt-1 pb-2">
			<v-btn color="info" @click="modal_novo = true">Adicionar</v-btn>
		</v-flex>
		<v-flex xs12>
			<DataTable :cabecalho="cabecalho" :itens="alunos"/>
		</v-flex>
		
		<v-dialog v-model="modal_novo" width="900">
			<ModalPadrao titulo="Cadastrar novo aluno" subtitulo="" :novo="true" :carregou="true" :deuErro="false" :loading="false" 
			txtBtn="Salvar" :footer="true" @action="addAluno" @delete="false" @close="modal_novo = false" >
				<novo-aluno :aluno="aluno"/>
			</ModalPadrao>
		</v-dialog>

	</v-layout>
</template>
<script>
import DataTable from '../components/DataTable.vue';
import ModalPadrao from '../components/ModalPadrao.vue';
import NovoAluno from '../components/NovoAluno.vue';
export default {
	name: 'Alunos',
	components: { DataTable, ModalPadrao, NovoAluno },
	data: () => ({
		cabecalho: [
			{
				text: 'Nome',
				value: 'name'
			},
			{
				text: 'Matrícula',
				value: 'username'
			},
			{
				text: 'Orientador',
				value: 'orientador'
			},
			{
				text: 'Tema',
				value: 'tema'
			},
			{
				text: 'Email',
				value: 'email'
			}
		],
		alunos: [],
		modal_novo: false,
		aluno: {},
		orientadores: []
	}),
	created() {
		this.limpaAluno();
		this.getOrientadores();
		this.getAlunos();
	},
	methods: {
		addAluno() {
			this.$http.post('alunos', this.aluno).then(() => {
				this.modal_novo = false;
				this.limpaAluno();
				this.getAlunos();
			});
		},
		getAlunos() {
			this.alunos = [];
			this.$http.get('alunos').then(response => {
			
				response.data.forEach(estudante => {
					const aluno = {};

					aluno.id = estudante.id;
					aluno.name = estudante.usuario.name;
					aluno.username = estudante.usuario.username;
					aluno.email = estudante.usuario.email;
					const prof = this.orientadores.find(element => { 
						return element.id === estudante.orientador
					})
					if(prof) aluno.orientador = prof.name
					aluno.tema = estudante.tema;
					
					this.alunos.push(aluno);
				});
				this.colocaLinks()
			})
		},
		getOrientadores(){
			this.orientadores = [];
			this.$http.get('professores').then(response => {
			
				response.data.forEach(prof => {
					const professor = {};

					professor.name = prof.usuario.name;
					professor.id = prof.id;
					
					this.orientadores.push(professor);
				});
			})
		},
		limpaAluno() {
			this.aluno = {
				name: "",
				username: "",
				email: "",
				password: "",
				tema: ""
			}
		},
		colocaLinks() {
			this.alunos.forEach(aluno => {
				aluno.link = 'aluno/' + aluno.id
			});
		}
		
	}
}
</script>

