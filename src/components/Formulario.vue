<template>
  <v-layout row wrap>
    <v-flex xs12>
      <draggable v-model="myArray" :options="{group:'titulo'}" @start="drag=true" @end="drag=false">
        <v-card class="ma-3" v-for="element in myArray" :key="element.id">
          <v-card-title primary-title>
            
            <v-text-field v-if="element.tipo == 'Texto'" :label="element.titulo" />
            <v-textarea v-else-if="element.tipo == 'Área de texto'" :label="element.titulo" />
            <v-text-field v-else-if="element.tipo == 'Número'" :label="element.titulo" type="number" />
            <v-date-picker  v-else-if="element.tipo == 'Data'" :label="element.titulo" 
            v-model="picker" :landscape="true" :reactive="false" />
            <v-text-field v-else-if="element.tipo == 'PDF'" :label="element.titulo" type="file" />
            <v-text-field v-else-if="element.tipo == 'Imagem'" :label="element.titulo" type="file" />
            <v-switch v-else-if="element.tipo == 'Caixa de seleção'" :label="element.titulo" />
            <v-checkbox v-else-if="element.tipo == 'Caixa de checagem'" :label="element.titulo" />
            
            <v-icon class="grey--text"> drag_indicator </v-icon>
            <v-icon @click="delCampo(element)" class="grey--text"> close </v-icon>
          </v-card-title>
        </v-card>
      </draggable>
    </v-flex>
    <v-flex xs6 offset-sm5>
      <v-btn color="info" @click="dialog_campo = true">Novo campo</v-btn> 
    </v-flex>

    <!-- Modal novo campo -->
    <v-dialog v-model="dialog_campo" width="500">
      <NovoCampo :campo="campo" @addCampo="addCampo"/>
    </v-dialog>

  </v-layout>
</template>
<script>
import draggable from 'vuedraggable'
import NovoCampo from '../components/NovoCampo'
import cloneDeep from 'lodash'

export default {
  name: 'Formulario',
  components: {
    draggable, NovoCampo
  },
  props: {
    myArray: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    dialog_campo: false,
    campo: {},
    picker: null,
    editando: false
  }),
  methods: {
    addCampo(){
    	const campo = this.campo;
      	this.campo = {};
      	campo.id = this.myArray.length;
      	this.myArray.push(campo);
      	this.dialog_campo = false;
    },
    delCampo(campo){
		const pos = this.myArray.indexOf(campo)
      	this.myArray.splice(pos, 1);
    }
  }
}
</script>


