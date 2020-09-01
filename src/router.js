import Vue from 'vue'
import Router from 'vue-router'
import Alunos from './pages/Alunos.vue'
import Aluno from './pages/Aluno.vue'
import Orientadores from './pages/Orientadores.vue'
import Disciplinas from './pages/Disciplinas.vue'
import Disciplina from './pages/Disciplina.vue'
import Atividade from './pages/Atividade.vue'
import Submissao from './pages/Submissao.vue'
import Modelo from './pages/Modelo.vue'
import Modelos from './pages/Modelos.vue'
import Page404 from './pages/Page404.vue'
import Login from './pages/Login.vue'
import Menu from './components/Menu.vue'
import store from './store.js'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/',
			name: 'Menu',
			component: Menu,
			meta: { auth: true },
			children: [
				{
					path: '/alunos',
					component: Alunos
				},
				{
					path: '/aluno/:id',
					component: Aluno
				},
				{
					path: '/orientadores',
					component: Orientadores
				},
				{
					path: '/disciplinas',
					component: Disciplinas
				},
				{
					path: '/disciplina/:id',
					component: Disciplina
				},
				{
					path: '/disciplina/:dis/atividade/:id/:res/:sub',
					component: Atividade
				},
				{
					path: '/disciplina/:dis/atividade/:id/:sub',
					component: Atividade
				},
				{
					path: '/disciplina/:dis/atividade/:id',
					component: Atividade
				},
				{
					path: '/submissao',
					component: Submissao
				},
				{
					path: '/modelo',
					component: Modelo
				},
				{
					path: '/modelo/:id',
					component: Modelo
				},
				{
					path: '/modelos',
					component: Modelos
				},
				{
					path: '*',
					component: Page404
				}
			]
		}
	]
});

router.beforeEach((to, from, next) => {
	const tipoUser = localStorage.getItem('tipoUser')
	const token = localStorage.getItem('tbUser')
	if(!token) {
		localStorage.clear();
		next();
	}
	if(tipoUser) {
		switch (tipoUser) {
			case 'aluno':
				store.commit('setTipoUser', 'aluno')
				next()
				break;

			case 'coord':
				store.commit('setTipoUser', 'coord')
				next()
				break;

			case 'orien':
				store.commit('setTipoUser', 'orien')
				next()
				break;
		
			default:
				next()
				break;
		}
	} else next()
});

export default router;
