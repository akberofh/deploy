// Profil fotoğrafı yükleme işlevi
const upLoadPhoto = async (file) => {
    const cloudName = 'dbbrkd8ea';  
    const uploadPreset = 'images'; 
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);  // Düzeltme burada
  
      console.log("Uploading to URL:", url);
      console.log("Form data:", formData);
  
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed:", errorText);
        throw new Error('Failed to upload photo');
      }
  
      const responseData = await response.json();
      console.log("Upload successful:", responseData);
      return responseData; // Cloudinary API'den dönen JSON yanıtını direkt olarak döndür
  
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw new Error('Failed to upload photo');
    }
  };
  
  export default upLoadPhoto;
  