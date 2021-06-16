<script lang="ts">
    import {Column, Content, Grid, Row,} from 'carbon-components-svelte';
    import Header from './components/Header.svelte';
    import Theme from './components/Theme.svelte';

    let theme: 'g10' = 'g10';
</script>

<Theme persist bind:theme>
    <Header />
    <Content style="background: none; padding: 1rem">
        <Grid>
            <Row>
                <Column noGutter>
                    <div id="content" />
                </Column>
            </Row>
        </Grid>
    </Content>
</Theme>
