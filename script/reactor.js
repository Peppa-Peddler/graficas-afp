
$( document ).ready(function() {

    var offsets = []

    $('.section').each(function(){
        offsets.push($(this).offset().top)
    })

    console.log(offsets)

    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop()
        let r = 0; l = offsets.length
        while ( l > r + 1 ){
            let mid = Math.floor ( (l + r) / 2 )
            if( offsets[ mid ] <= scroll ) r = mid
            else l = mid
        }
        $("#value").html('N'+(+r+1)+"#")
    });

});
