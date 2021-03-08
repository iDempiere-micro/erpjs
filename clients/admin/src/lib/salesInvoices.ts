export const downloadInvoice = (baseUrl: string, token: string, id: number) => {
    fetch(baseUrl + '/../file/sales-invoice/' + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .then((json) => {
            const a = document.createElement('a');
            a.href = `data:application/pdf;base64,${json.data}`;
            a.setAttribute('download', id + '.pdf');
            a.click();
        });
};
