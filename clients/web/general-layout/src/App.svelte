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
	} from "carbon-components-svelte";
	import Header from "./components/Header.svelte";
	import Theme from "./components/Theme.svelte";

	let theme: "g10" = "g10";
</script>

<Theme persist bind:theme>
	<Header />
	<Content style="background: none; padding: 1rem">
		<Grid>
			<Row>
				<Column lg="{16}">
					<Breadcrumb noTrailingSlash aria-label="Page navigation">
						<BreadcrumbItem href="/">Getting started</BreadcrumbItem>
					</Breadcrumb>
					<h1 style="margin-bottom: 1.5rem">Design &amp; build with Carbon and Snowpack!</h1>
				</Column>
			</Row>

			<Row>
				<Column noGutter>
					<div id='content'></div>
				</Column>
			</Row>
		</Grid>
	</Content>
</Theme>
