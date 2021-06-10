<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AttachmentDetail from '../components/attachment-detail/AttachmentDetail.svelte';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock1 } from '../../build/dist/lib/queries/attachment';

    const client = apollo(true);

    setupLocales();
</script>

<Meta title="Components/Attachment/Detail" component={AttachmentDetail} argTypes={{}} />

<Template let:args>
    <AttachmentDetail data={mock1.data.attachment} {...args} />
</Template>

<Story name="Detail" />
