// $(document).on('change','#imageUploader', function(){ uploadFile($(this)); });

function uploadFile(imger, cb){
    var formData = new FormData();
    formData.append("avatar", imger[0].files[0]);
    console.log(imger[0].files[0].type)
    if(imger[0].files[0].type != "image/png" && imger[0].files[0].type != "image/jpeg" && imger[0].files[0].type != "image/gif")
    {
        alert("Comon... Only images are allowed...");
        return 0;
    }
    $.ajax({
        url: 'http://localhost:3001/image',  //Server script to process data
        type: 'POST',
        xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
                myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
            }
            return myXhr;
        },
        //Ajax events
        beforeSend: beforeSendHandler,
        success: function(data){
                // imger.next().attr("value","").trigger('input');
                // imger.next().attr("value",data).trigger('input');
                // imger.next().next().attr("src",data);
                cb(data);
        },
        error: errorHandler,
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
    });
};

function beforeSendHandler(){}

function errorHandler(e){
    console.log(e)
}

function progressHandlingFunction(a){
}