<template>
	<v-data-table :headers="cabecalho" :items="itens">
		<template slot="items" slot-scope="props">
			<td v-for="dado in cabecalho" :key="dado.value" @click="$router.push({ path: props.item['link'] })">{{ props.item[dado.value] }}</td>
		</template>
	</v-data-table>
</template>

<script>
export default {
	name: 'DataTable',
	props: {
		cabecalho: {
			type: Array
		},
		itens: {
			type: Array
		}
	}
}
</script>
