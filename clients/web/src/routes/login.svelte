<script lang="ts">
    import { onMount } from 'svelte';

	import { goto, stores } from "@sapper/app";
	const { session } = stores();	
    const self = this;
 
    onMount(() =>

    {
        // @ts-ignore
        const keycloak = new Keycloak({
            url: 'http://localhost:8080/auth',
            realm: 'erpjs',
            clientId: 'erpjs',
            flow: 'implicit',
        });
        keycloak.init().then(function(authenticated) {
        console.log(authenticated ? 'authenticated' : 'not authenticated');
        if (!authenticated) {
            keycloak.login({
                redirectUri: 'http://localhost:5000/'
            });
        } else {
            const { token } = keycloak;
            console.log('*** authenticated with token!', token);
            session.token = token;
            (window as any).token = token;

            const handleLogin = async () => {
                const response = await fetch("/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ token }),
                });
            };
            handleLogin();
            setTimeout(()=> {
                window && window.location.replace('/');
            }, 100);
        }
    }).catch(function() {
        alert('failed to initialize');
    });
    });
</script>
