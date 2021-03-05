export const fileUpload = async (file) => {
    const cloudUrl = ' https://api.cloudinary.com/v1_1/dthr34jfv/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);
    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const cloudResponse = await response.json();
            return cloudResponse.secure_url;
        } else {
            return null;
        }
    } catch (error) {
        console.log('fileUpload eror', error);
    }
    
}