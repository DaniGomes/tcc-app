<template>
    <v-layout row wrap class="text-xs-center">
		<v-flex md6 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
		</v-flex>
		<v-flex xs12 md6 class="grey lighten-4">
			<v-container style="position: relative;top: 13%;" class="text-xs-center">
				<v-card flat class="pa-4">
					<v-card-title primary-title>
						<h2>Login</h2>
					</v-card-title>
					<v-form>
						<v-text-field prepend-icon="person" name="Email" label="Email" typ="email" v-model="email"></v-text-field>
						<v-text-field prepend-icon="lock" name="Password" label="Password" type="password" v-model="password"></v-text-field>
						<v-card-actions>
							<v-btn color="info" large block @click="login">Login</v-btn>
						</v-card-actions>
					</v-form>
				</v-card>
			</v-container>
		</v-flex>	
    </v-layout>
</template>
<script>
export default {
	name: 'Login',
	data: () => ({
		email: '',
		password: ''
	}),
	methods: {
		login(){
			this.$http.post('/sessions', {email: this.email, password: this.password}).then(response => {
				if(response.data){
					localStorage.setItem('tbUser', response.data.token)
					if(response.data.aluno === true) {
						localStorage.setItem('tipoUser', 'aluno')
						this.$store.commit('setTipoUser', 'aluno')
						this.$store.commit('setIdUser', response.data.user.aluno.id)
						this.$store.login
						this.$router.push(`/aluno/${response.data.user.aluno.id}`)
					} 
					else {
						this.$http.get('disciplinas').then(dis => {
							var coords = dis.data.map(el => { return el.coordenador });
							if(coords.includes(response.data.user.name)) {
								localStorage.setItem('tipoUser', 'coord')
								this.$store.commit('setTipoUser', 'coord')
							}
							else {
								this.$store.commit('setTipoUser', 'orien')
								localStorage.setItem('tipoUser', 'orien')
							}
						})
						this.$store.login;
						this.$router.push('/alunos');
					}
					
				}
			})
		}
	}
}
</script>
