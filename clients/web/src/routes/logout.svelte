<script lang="ts">
    import { onMount } from "svelte";

    import { goto, stores } from "@sapper/app";
    const { session } = stores();

    onMount(() => {
      const handleLogout = async () => {
          const response = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: null,
          });
        };
      handleLogout();

      const logoutUrl = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout?redirect_uri=${process.env.URL}`;
      console.log('*** logoutUrl', logoutUrl);

      setTimeout(() => {
        window && window.location.replace(logoutUrl);
    }, 100);
    }
    );
</script>
