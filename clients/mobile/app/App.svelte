<script lang="typescript">
    import type { EventData } from "@nativescript/core";
    import { TnsOAuthClient, ITnsOAuthTokenResult } from "nativescript-oauth2";
    import { apollo } from './lib/apollo';
    import gql from 'graphql-tag';

    let message: string = "Blank Svelte Native App"

    const EVERYTHING = gql`
      {
        customers {
          id
          legalName
        }
      }
    `;


    const onButtonTap = (args: EventData) => {
        const client = new TnsOAuthClient('keycloak');

        client.loginWithCompletion((tokenResult: ITnsOAuthTokenResult, error) => {
            if (error) {
                console.error("back to main page with error: ");
                console.error(error);
            } else {
                console.log("back to main page with access token: ");
                console.log(tokenResult);

                const {accessToken} = tokenResult;

                const client = apollo(accessToken);
                client.query({
                      query: EVERYTHING,
                  }).then((data)=> {console.log('*** data', data);})
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
</style>
