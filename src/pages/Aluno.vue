<template>
	<v-layout row wrap class="pa-2">
		<v-flex xs12 class="pt-3 pl-2 pb-2">
			<h2 v-if="aluno.usuario" class="headline mb-0">{{ aluno.usuario.name }}</h2>
		</v-flex>
		<v-flex xs12>
			<DataTable :cabecalho="cabecalho" :itens="submissoes" :loading="loading"/>
		</v-flex>
	</v-layout>
</template>
<script>
import DataTable from '../components/DataTable.vue';
export default {
	name: 'Aluno',
	components: { DataTable },
	data: () => ({
		cabecalho: [
			{
				text: 'Atividade',
				value: 'nome'
			},
			{
				text: 'Disciplina',
				value: 'disciplina_nome'
			},
			{
				text: 'Prazo',
				value: 'prazo'
			},
			{
				text: 'Status',
				value: 'status'
			}
		],
		submissoes: [],
		aluno: {},
		loading: true
	}),
	created() {
		this.loading = true;
		this.$http.get('alunos/'+this.$route.params.id).then(response => {
			this.aluno = response.data;
		})

		let atividades = []
		let disciplinas = []

		const promises = []
		promises.push(this.$http.get('atividades'))
		promises.push(this.$http.get('disciplinas'))
		
		Promise.all(promises)
			.then(resolves => {
				atividades = resolves[0].data
				disciplinas = resolves[1].data

				this.$http.get('submissoes').then(response => {
					this.submissoes = response.data.filter(submissao => {
						return submissao.aluno_id == this.$route.params.id
					}) //filtra as submissões do aluno em questão

					this.submissoes.forEach(sub => {
						const atividade = atividades.find(element => {
							return element.id === sub.atividade_id
						}) //coloca o nome da atividade na submissão
						const disciplina = disciplinas.find(element => {
							return element.id === atividade.disciplina_id
						})
						sub.nome = atividade.nome ? atividade.nome : ''
						sub.prazo = atividade.prazo ? atividade.prazo : ''
						sub.disciplina_nome = disciplina ? disciplina.nome : ''
						sub.disciplina_id = disciplina ? disciplina.id : 0
					})
					this.colocaLinks()
					this.loading = false
				})
			})

		this.$http.get('atividades').then(response => {
			atividades = response.data
		})
		
		this.$http.get('disciplinas').then(response => {
			disciplinas = response.data
		})
	},
	methods: {
		colocaLinks() {
			this.submissoes.forEach(element => {
				element.link = '/disciplina/' + element.disciplina_id + '/atividade/' + element.atividade_id + '/' + element.id
			});
		}
	}
}
</script>

