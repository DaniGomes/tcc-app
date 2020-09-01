<template>
	<v-layout row wrap>
		<v-flex xs2>
		</v-flex>
		<v-flex xs8>
			<v-card color="brown lighten-5">
				<v-card-title primary-title>
					<div class="headline">Tema do TCC - INF 498</div>
				</v-card-title>
				<v-card-text>
					Alunos
					<v-progress-linear color="success" v-model="alunos"/>
					Orientadores
					<v-progress-linear color="success" v-model="orientadores"/>
				</v-card-text>
      </v-card>
		</v-flex>
	</v-layout>
</template>
<script>
export default {
	name: 'HomeCoordenador',
	data: () => ({
		alunos: 70,
		orientadores:55
	})
}
</script>
