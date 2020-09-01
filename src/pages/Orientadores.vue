<template>
	<v-layout row wrap class="pa-2">
		<v-flex xs8 md10 class="pt-3 pl-2">
			<h2 class="headline mb-0">Orientadores e coorientadores</h2>
		</v-flex>
		<v-flex xs4 md2 class="pt-1 pb-2">
			<v-btn color="info" @click="modal_novo = true">Adicionar</v-btn> 
		</v-flex>
		<v-flex xs12>
			<DataTable :cabecalho="cabecalho" :itens="orientadores"/>
		</v-flex>

		<v-dialog v-model="modal_novo" width="900">
			<ModalPadrao titulo="Cadastrar novo professor" subtitulo="" :novo="true" :carregou="true" :deuErro="false" :loading="false" 
			txtBtn="Salvar" :footer="true" @action="addOrientador" @delete="false" @close="modal_novo = false" >
				<novo-professor :professor="orientador"/>
			</ModalPadrao>
		</v-dialog>

	</v-layout>
</template>
<script>
import DataTable from '../components/DataTable.vue';
import NovoProfessor from '../components/NovoProfessor.vue';
import ModalPadrao from '../components/ModalPadrao.vue';
export default {
	name: 'Orientadores',
	components: { DataTable, ModalPadrao, NovoProfessor },
	data: () => ({
		cabecalho: [
			{
				text: 'Nome',
				value: 'name'
			},
			{
				text: 'Email',
				value: 'email'
			},
			{
				text: 'Origem',
				value: 'origem'
			}
		],
		orientadores: [],
		modal_novo: false,
		orientador: {}
	}),
	created(){
		this.limpaOrientador();
		this.getOrientadores();
	},
	methods: {
		addOrientador(){
			this.$http.post('professores', this.orientador).then(() => {
				this.modal_novo = false;
				this.limpaOrientador();
				this.getOrientadores();
			});
		},
		getOrientadores(){
			this.orientadores = [];
			this.$http.get('professores').then(response => {
			
				response.data.forEach(prof => {
					const professor = {};

					professor.name = prof.usuario.name;
					professor.username = prof.usuario.username;
					professor.email = prof.usuario.email;
					professor.origem = prof.origem;
					
					this.orientadores.push(professor);
				});
			})
		},
		limpaOrientador(){
			this.orientador = {
				name: "",
				username: "",
				email: "",
				password: "",
				origem: ""
			}
		}
	}
}
</script>

