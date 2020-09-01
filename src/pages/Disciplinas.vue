<template>
	<v-layout row wrap class="pa-2">
		<v-flex xs8 md10 class="pt-3 pl-2">
			<h2 class="headline mb-0">Disciplinas</h2>
		</v-flex>
		<v-flex xs4 md2 class="pt-1 pb-2">
			<v-btn color="info" @click="modal_novo = true">Adicionar</v-btn> 
		</v-flex>
		<v-flex xs12>
			<DataTable :cabecalho="cabecalho" :itens="disciplinas"/>
		</v-flex>

		<v-dialog v-model="modal_novo" width="900">
			<ModalPadrao titulo="Cadastrar nova disciplina" subtitulo="" :novo="true" :carregou="true" :deuErro="false" :loading="false" 
			txtBtn="Salvar" :footer="true" @action="addDisciplina" @delete="false" @close="modal_novo = false" >
				<nova-disciplina :disciplina="disciplina"/>
			</ModalPadrao>
		</v-dialog>

	</v-layout>
</template>
<script>
import DataTable from '../components/DataTable.vue';
import ModalPadrao from '../components/ModalPadrao.vue';
import NovaDisciplina from '../components/NovaDisciplina.vue';
export default {
	name: 'Disciplinas',
	components: { DataTable, ModalPadrao, NovaDisciplina },
	data: () => ({
		cabecalho: [
			{
				text: 'Nome',
				value: 'nome'
			},
			{
				text: 'Código',
				value: 'codigo'
			},
			{
				text: 'Coordenador',
				value: 'coordenador'
			}
		],
		disciplinas: [],
		modal_novo: false,
		disciplina: {}
	}),
	created() {
		this.limpaDisciplina();
		this.getDisciplinas();
	},
	methods: {
		addDisciplina() {
			this.$http.post('disciplinas', this.disciplina).then(() => {
				this.modal_novo = false;
				this.limpaDisciplina();
				this.getDisciplinas();
			});
		},
		getDisciplinas() {
			this.disciplinas = [];
			this.$http.get('disciplinas').then(response => {
				this.disciplinas = response.data;
				this.colocaLinks();
			})
		},
		limpaDisciplina() {
			this.disciplina = {
				nome: "",
				codigo: ""
			}
		},
		colocaLinks() {
			this.disciplinas.forEach(disciplina => {
				disciplina.link = 'disciplina/' + disciplina.id
			});
		}
		
	}

}
</script>

