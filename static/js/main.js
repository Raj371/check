(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Screenshot carousel
    $(".screenshot-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        dots: true,
        items: 1
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);



// input file js

let selectedFile;
document.getElementById("file").addEventListener("change",event => {
    console.log(document.getElementById('file').value);
    selectedFile = event.target.files[0];
})
document.getElementById("search").addEventListener("click", (e) => {
    e.preventDefault();
    console.log(document.getElementById('file').value);
    // selectedFile = document.getElementById('file').value;

    var Status = document.getElementById('status');
    var content = document.getElementById('content');
    if(selectedFile){
        let num = document.getElementById('number').value;
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            // console.log(event.target.result);
            let data = event.target.result;
            let workbook = XLSX.read(data,{type:"binary"});
            // console.log(workbook);
            let flag = false;
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                rowObject.forEach(row => {
                   
                    if(row.number == num){
                        Status.innerHTML = `${row.status}`
                        Status.style.color=row.status=="selected" ? "green" : "red";
                        content.innerHTML = row.status=="selected"?"Lorem ipsum  consectetur adipisicing elit. Natus esse magni beatae vero consequatur itaque. Voluptates fugiat dignissimos perferendis magni." : "m dolor, sit amet consectetur adipisicing elit. Natus esse magni beatae vero consequatur itaque. Voluptates fugiat dignissimos perferendis magni";
                        flag=true;
                    }
                    
                })
                if(!flag){
                    Status.innerHTML = "Number not found";
                        Status.style.color="black";
                        content.innerHTML = "Lorem ipsum  consectetur adipisicing elit. Natus esse magni beatae vero consequatur itaque. Voluptates fugiat dignissimos perferendis magni.";
                }
            })
        }
    }
})