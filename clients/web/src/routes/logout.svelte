<script lang="ts">
    import { onMount } from "svelte";
    
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    const self = this;
    
    onMount(() => {
      // @ts-ignore
      const keycloak = new Keycloak({
        url: process.env.KEYCLOAK_BASE_URL,
        realm: "erpjs",
        clientId: "erpjs",
        flow: "implicit",
      });      

      const handleLogin = async () => {
          const response = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: null,
          });
        };
    handleLogin();
    setTimeout(() => {
        window && window.location.replace("/");
    }, 100);      

    keycloak.logout({redirectUri:'http://localhost:5000/'});
    }
    );
</script>
