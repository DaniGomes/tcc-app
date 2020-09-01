<template>
	<v-layout row wrap class="pa-2">
		<v-flex xs8 md10 class="pt-3 pl-2">
			<h2 class="headline mb-0">Modelos</h2>
		</v-flex>
		<v-flex xs4 md2 class="pt-1 pb-2">
			<v-btn color="info" @click="$router.push({ path: 'modelo' })">Adicionar</v-btn> 
		</v-flex>
		<v-flex xs12>
			<DataTable :cabecalho="cabecalho" :itens="modelos"/>
		</v-flex>
	</v-layout>
</template>
<script>
import DataTable from '../components/DataTable.vue';
export default {
	name: 'Modelos',
	components: { DataTable },
	data: () => ({
		cabecalho: [
			{
				text: 'Nome',
				value: 'nome'
			}
		],
		modelos: [],
	}),
	created() {
		this.getModelos();
	},
	methods: {
		getModelos() {
			this.modelos = [];
			this.$http.get('modelos').then(response => {
				this.modelos = response.data;
				this.colocaLinks();
			})
		},
		colocaLinks() {
			this.modelos.forEach(modelo => {
				modelo.link = 'modelo/' + modelo.id
			});
		}
	}

}
</script>

