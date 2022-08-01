function fileValidation(){
    let fileInput = document.getElementById('inputFile');

    let filePath = fileInput.value;
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Solo archivos con estas extensiones .jpeg/.jpg/.png/.gif only.');
        fileInput.value = '';
        return false;
    }else{
        if (fileInput.file && fileInput.file[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'" width="100px" height="100px"/>';
            };
            reader.readAsDataURL(fileInput.file[0]);
        }
    }
}