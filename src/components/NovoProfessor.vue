<template>
	<v-form>
		<v-container>
			<v-layout row wrap>

				<v-flex xs12 sm6 md4>
					<v-text-field v-model="professor.name" label="Nome" />
				</v-flex>
				<v-flex xs12 sm6 md4>
					<v-text-field v-model="professor.username" label="Matrícula" />
				</v-flex>
				<v-flex xs12 sm6 md4>
					<v-text-field v-model="professor.email" label="Email" />
				</v-flex>
				<v-flex xs12 sm6 md4>
					<v-text-field v-model="professor.origem" label="Origem" />
				</v-flex>
				<v-flex xs12 sm6 md4>
					<v-text-field v-model="professor.password" type="password" label="Senha" />
				</v-flex>
				<v-flex xs12 sm6 md4>
					<v-text-field v-model="senha"  type="password" label="Confrmação de senha" />
				</v-flex>
				
			</v-layout>
		</v-container>
	</v-form>
</template>
<script>
export default {
	name: 'NovoProfessor',
	props: [ 'professor' ],
	data: () => ({
		senha: ""
	}),
	beforeDestroy() {
		this.senha = "";
	},
	created() {
		this.senha = "";
	}
}
</script>
