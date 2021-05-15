import gql from 'graphql-tag';

export const ATTACHMENTS = gql`
    {
        attachments {
            id
            displayName
            isFolder
        }
    }
`;
export const mock = {
    data: {
        attachments: [
            {
                id: '1',
                displayName: 'Attachment 1.docx',
                isFolder: false,
            },
            {
                id: '2',
                displayName: 'folder 1/',
                isFolder: true,
            },
        ],
    },
};
