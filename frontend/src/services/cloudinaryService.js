const CLOUD_NAME = 'travelmaker'

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = 'wfirfq3z';

export default {
    uploadImg
};

// on submit call to this function
function uploadImg(formData, ev) {
    console.log('cloudinaryServ got', formData);
    
    ev.preventDefault();
   
    // A function to be called if request succeeds
    function onSuccess(res) {
        console.log('uploadedImg', res);
        console.log('uploadedImg', res.url);
        return res;
    }

    return doUploadImg(formData, onSuccess);
}

function doUploadImg(formData, onSuccess) {
    formData.append('upload_preset', UPLOAD_PRESET);

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.json()
    })
    .then(onSuccess)
    .catch(function (error) {
        console.error(error)
    })
}
