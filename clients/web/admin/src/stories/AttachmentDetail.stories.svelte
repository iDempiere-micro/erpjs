<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AttachmentDetail from '../components/attachment-detail/AttachmentDetail.svelte';
    import { setupLocales } from '../i18n';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";
    import {mock1} from "../lib/queries/attachment";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta title="Components/Attachment/Detail" component={AttachmentDetail} argTypes={{}} />

<Template let:args>
    <AttachmentDetail data={mock1.data.attachment} {...args} />
</Template>

<Story name="Detail" />
