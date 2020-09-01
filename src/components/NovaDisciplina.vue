<template>
	<v-form>
		<v-container>
			<v-layout row wrap>

				<v-flex xs12 sm6 md4>
					<v-text-field v-model="disciplina.nome" label="Nome" />
				</v-flex>
				<v-flex xs12 sm6 md4>
					<v-text-field v-model="disciplina.codigo" label="Código" />
				</v-flex>
				<v-flex xs12 sm6 md4>
					<v-select :items="professores" v-model="disciplina.coordenador" label="Coordenador"
					item-text="nome" item-value="nome" />
				</v-flex>
				
			</v-layout>
		</v-container>
	</v-form>
</template>
<script>
export default {
	name: 'NovaDisciplina',
	props: [ 'disciplina' ],
	data: () => ({
		professores: []
	}),
	created() {
		this.getCoordenadores()
	},
	methods: {
		getCoordenadores(){
			this.professores = [];
			this.$http.get('professores').then(response => {
				
				response.data.forEach(prof => {
					const professor = {};

					professor.nome = prof.usuario.name;
					professor.id = prof.id;
					
					this.professores.push(professor);
				});
			})
		},
	}
}
</script>
