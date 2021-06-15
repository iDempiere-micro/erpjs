<script lang="ts">
    import {
        Content,
        Breadcrumb,
        BreadcrumbItem,
        Grid,
        Row,
        Column,
        Tabs,
        TabContent,
        Tab,
        Select,
        SelectItem,
    } from 'carbon-components-svelte';
    import Theme from './components/Theme.svelte';

    let theme: 'g10' = 'g10';
</script>

<Theme persist bind:theme>
    <Content style="background: none; padding: 1rem">
        <Grid>
            <Row>
                <Column noGutter>
                    <h1>Oh hello there!</h1>
                </Column>
            </Row>
        </Grid>
    </Content>
</Theme>
