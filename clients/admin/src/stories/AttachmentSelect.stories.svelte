<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AttachmentSelect from '../components/attachments/AttachmentSelect.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/attachments';

    setClient(apollo(true));
    setupLocales();

    const defaultArgs = {
        onSelect: (attachmentId) => {
            console.log('onSelect', attachmentId);
        },
        id: 'attachmentId',
        label: 'Attachment',
        attachmentId: mock.data.attachments[0].id,
    };
    const requiredError = {
        form: {
            fields: {
                attachmentId: {
                    errors: ['required'],
                },
            },
        },
    };
</script>

<Meta title="Components/Attachment/Select" component={AttachmentSelect} argTypes={{}} />

<Template let:args>
    <AttachmentSelect {...args} />
</Template>

<Story name="Select" args={defaultArgs} />
<Story name="Multi" args={{ ...defaultArgs, isMulti: true }} />
