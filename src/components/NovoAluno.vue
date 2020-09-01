<template>
	<v-form>
		<v-container>
			<v-layout row wrap>

				<v-flex xs12 sm6 md4>
					<v-text-field v-model="aluno.name" label="Nome" />
				</v-flex>
				<v-flex xs12 sm6 md4>
					<v-text-field v-model="aluno.username" label="Matrícula" />
				</v-flex>
				<v-flex xs12 sm6 md4>
					<v-text-field v-model="aluno.email" label="Email" />
				</v-flex>
				<v-flex xs12 sm6 md6>
					<v-text-field v-model="aluno.password" type="password" label="Senha" />
				</v-flex>
				<v-flex xs12 sm6 md6>
					<v-text-field v-model="senha" type="password" label="Confirmação de senha" />
				</v-flex>
				<v-flex xs12 sm6 md6>
					<v-select :items="orientadores" v-model="aluno.orientador" label="Orientador" 
					item-text="nome" item-value="id" />
				</v-flex>
				<v-flex xs12 sm6 md6>
					<v-select :items="orientadores" v-model="aluno.coorientador" label="Coorientador"
					item-text="nome" item-value="id" />
				</v-flex>
				<v-flex xs12 sm12 md12>
					<v-text-field v-model="aluno.tema" label="Tema" />
				</v-flex>
				
			</v-layout>
		</v-container>
	</v-form>
</template>
<script>
export default {
	name: 'NovoAluno',
	props: [ 'aluno' ],
	data: () => ({
		orientadores: [],
		senha: ""
	}),
	beforeDestroy() {
		this.senha = "";
	},
	created() {
		this.senha = "";
		this.getOrientadores();
	},
	methods: {
		getOrientadores(){
			this.orientadores = [];
			this.$http.get('professores').then(response => {
				
				response.data.forEach(prof => {
					const professor = {};

					professor.nome = prof.usuario.name;
					professor.id = prof.id;
					
					this.orientadores.push(professor);
				});
			})
		},
	}
}
</script>
