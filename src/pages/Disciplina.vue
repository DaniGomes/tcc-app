<template>
	<v-layout row wrap class="pa-2">
		<v-flex xs8 md10 class="pt-3 pl-2">
			<h2 class="headline mb-0">Nome da Disciplina</h2>
		</v-flex>
		<v-flex xs4 md2 class="pt-1 pb-2">
			<v-btn color="info" @click="dialog_atividade = true">Adicionar</v-btn>
		</v-flex>
		<v-flex xs12>
			<DataTable :cabecalho="cabecalho" :itens="atividades"/>
		</v-flex>

		<!-- Modal nova atividade -->
		<v-dialog v-model="dialog_atividade" :footer="true" width="1200">
			<NovaAtividade :modelo="''" @fechaModal="dialog_atividade=false"/>
		</v-dialog>

	</v-layout>
</template>
<script>
import DataTable from '../components/DataTable.vue';
import NovaAtividade from '../components/NovaAtividade'
export default {
	name: 'Disciplina',
	components: { DataTable, NovaAtividade },
	data: () => ({
		cabecalho: [
			{
				text: 'Atividade',
				value: 'nome'
			},
			{
				text: 'Prazo',
				value: 'prazo'
			}
		],
		atividades: [],
		dialog_atividade: false
	}),
	created() {
		this.$http.get(`disciplinas/${this.$route.params.id}/atividades`).then(response => {
			this.atividades = response.data
			this.colocaLinks()
		})
	},
	methods: {
		colocaLinks() {
			this.atividades.forEach(atividade => {
				atividade.link = `/disciplina/${this.$route.params.id}/atividade/` + atividade.id + '/0/0'
			});
		}
	}
}
</script>

