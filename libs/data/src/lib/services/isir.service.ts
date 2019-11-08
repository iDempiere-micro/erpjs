export class IsirService {
    download() {
        const soap = require('soap');
        const url = 'https://isir.justice.cz:8443/isir_public_ws/IsirWsPublicService?wsdl';
        const args = {idPodnetu: 1};

        soap.createClient(url, (err, client) => {
            client.getIsirWsPublicPodnetId(args, (err2, result) => {
                console.log(result);
            });
        });
    }
}
