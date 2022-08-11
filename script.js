var input_box=$('#date-container input');
var button=$('#button-container');
var imagecontainer =$('#image-container');

button.click(function()
{

    console.log(parseInt(input_box.val().split('/')[2]).toString()+"-"+parseInt(input_box.val().split('/')[1]).toString()+"-"+parseInt(input_box.val().split('/')[0]).toString());
    $.ajax({
        method: "GET",
        url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
        data: 
        {
            earth_date:parseInt(input_box.val().split('/')[2]).toString()+"-"+parseInt(input_box.val().split('/')[1]).toString()+"-"+parseInt(input_box.val().split('/')[0]).toString(),
            api_key:"OAyZz1s0hCCTdjs8qTBYYz5lkudaKHGVOenq9Y9v"
        },
        success: function (response) {
            $('img').remove();
            if(response.photos.length==0)
            {
                window.alert('No photos on this date!');
                return;
            }
            for(let photo of response.photos)
            {
                let image_link=photo.img_src;
                console.log(image_link);
                $(document.createElement('img')).attr('src', image_link).appendTo($('#image-container'));
            }
        }
    });
}).fail=function()
{
    window.alert("Please select a valid date!");
};
