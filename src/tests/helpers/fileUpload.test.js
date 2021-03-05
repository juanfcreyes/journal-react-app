import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dthr34jfv', 
    api_key: '478539795717682', 
    api_secret: 'eITlUFT_KcNFcmCwIHsXR0qp9O8' 
});

describe('Pruebas sobre fileUpload', () => {

    test('Debe cargar una imagen y recuperar la url de la carga', async () => {
        const response = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png') ;
        const blob = await response.blob();
        const file = new File([blob], 'foto.jpeg');
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
        const segments = url.split('/')
        const id = segments[segments.length -1].split('.')[0];
        cloudinary.v2.api.delete_resources(id, {}, () => {});
    }, 15000); 

    test('Debe retorner un error', async () => {
        const file = new File([], 'foto.jpeg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
});
