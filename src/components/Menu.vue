<template>
	<div>
		<v-navigation-drawer
			persistent
			:mini-variant="miniVariant"
			:clipped="clipped"
			v-model="drawer"
			enable-resize-watcher
			fixed
			app
			>
			<v-list>
				<v-list-tile
					value="true"
					v-for="(item, i) in items"
					v-if="estaEm($store.state.tipo_user, item.users)"
					:key="i" @click="$router.push(item.link)"
					>
					<v-list-tile-action>
						<v-icon v-html="item.icon"></v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-text="item.title"></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar color="info" dark app :clipped-left="clipped" >
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>  
			<v-toolbar-title v-text="title" class="hidden-sm-and-down"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click.stop="logout">Sair</v-btn>
      </v-toolbar-items>  
		</v-toolbar>
		<v-content>
			<router-view/>
		</v-content>
	</div>
</template>
<script>
export default {
	name: 'Menu',
	data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'school',
          title: 'Alunos',
          link: '/alunos',
          users: [ 'coord', 'orien', 'admin']
        },
        {
          icon: 'list',
          title: 'Atividades',
          link: `/aluno/${this.$store.state.id_user}`,
          users: [ 'aluno']
        },
        {
          icon: 'people',
          title: 'Orientadores e coorientadores',
          link: '/orientadores',
          users: [ 'coord', 'admin']
        },
        {
          icon: 'border_color',
          title: 'Disciplinas',
          link: '/disciplinas',
          users: [ 'coord', 'admin']
        },
        {
          icon: 'widgets',
          title: 'Modelos',
          link: '/modelos',
          users: [ 'coord', 'admin']
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Sistema para controle de fluxo de atividades e disciplinas'
    }
  },
  methods: {
    estaEm(x, vetor){
      return vetor.includes(x)
    },
    logout(){
      this.$store.logout;
      localStorage.clear();
      this.$router.push('/');
    }
  }
}
</script>

