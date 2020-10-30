<script lang="typescript">
    import type { EventData } from "@nativescript/core";
    import { TnsOAuthClient, ITnsOAuthTokenResult } from "nativescript-oauth2";

    let message: string = "Blank Svelte Native App"

    const onButtonTap = (args: EventData) => {
        const client = new TnsOAuthClient('keycloak');

        client.loginWithCompletion((tokenResult: ITnsOAuthTokenResult, error) => {
            if (error) {
                console.error("back to main page with error: ");
                console.error(error);
            } else {
                console.log("back to main page with access token: ");
                console.log(tokenResult);
            }
            });
    }
</script>

<page>
    <actionBar title="Svelte Native App" />
    <gridLayout>
        <label class="info" horizontalAlignment="center" verticalAlignment="middle" textWrap="true">
            <formattedString>
                <span class="fas" text="&#xf135;" />
                <span text=" {message}" />
            </formattedString>
        </label>
        <button text="Button" on:tap="{onButtonTap}" />
    </gridLayout>
</page>

<style>
    .info .fas {
        color: #3A53FF;
    }
    .info {
        font-size: 20;
    }
</style>
