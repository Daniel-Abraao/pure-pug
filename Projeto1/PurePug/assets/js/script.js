// INÍCIO SCRIPT NAVBAR
    window.onscroll = function() {
        const docScrollTop = document.documentElement.scrollTop;
        if(docScrollTop > 100) {
            document.querySelector("header").classList.add("fixed")
        }else {
             document.querySelector("header").classList.remove("fixed")
        }
    }

    const headerBurguer = document.querySelector(".header-burger");

    headerBurguer.addEventListener("click", function() {
        document.querySelector('.header-navbar').classList.toggle("show");
    })
        
// FIM SCRIP NAVBAR

// INÍCIO FILTRO GALERIA
    const filterButtons = document.querySelector("#filter-btns").children;
    const items = document.querySelector(".portfolio-gallery").children

    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", function() {
            for (let j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove("active")   
            }
            this.classList.add("active");
            const target = this.getAttribute("data-target")

            for (let k = 0; k < items.length; k++) {
                items[k].style.display = "none";
                if(target == items[k].getAttribute("data-id")) {
                    items[k].style.display = "block";
                }  
                if(target == "todos") {
                    items[k].style.display = "block";
                }
            }
        })
    }    
// FIM FILTRO GALERIA

// INÍCIO LIGHTBOX
    const closeLightbox = document.querySelector(".close-lightbox")
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = lightbox.querySelector("img");

        lightbox.addEventListener("click", function() {
            if(event.target != lightboxImage) {
                lightbox.classList.remove("show");
                lightbox.classList.add("hide");
            }
        })

        closeLightbox.addEventListener("click", function() {
            lightbox.classList.remove("show");
            lightbox.classList.add("hide");
        })

    const gallery = document.querySelector(".portfolio-gallery");
    const galleryItem = gallery.querySelectorAll(".gallery-item");

    galleryItem.forEach((element) => {
        element.querySelector(".fa-plus").addEventListener("click", function() {
            lightbox.classList.remove("hide");
            lightbox.classList.add("show");
            lightboxImage.src = element.querySelector("img").getAttribute("src");
        })
    })
// FIM LIGHTBOX

// INÍCIO TESTIMONIALS SLIDER
const sliderContainer = document.querySelector(".testimonials-slider");
const slides = sliderContainer.children;
const containerWidth = sliderContainer.offsetWidth;
const margin = 15;
let itemPerSlide = 0;
let slideDots;

    // INÍCIO RESPOSIVIDADE DO SLIDER
        const responsive = [
            {breakPoint: {width: 0, item:1}},
            {breakPoint: {width: 991, item:2}}
        ]
        function load() {
            for(let i = 0; i < responsive.length; i++) {
                if(window.innerWidth > responsive[i].breakPoint.width) {
                    itemPerSlide = responsive[i].breakPoint.item;
                }
            }
            start();
        }
        function start() {
            totalWidth = 0;
            for(let i=0; i <slides.length; i++) {
                slides[i].style.width = (containerWidth/itemPerSlide) - margin + "px";
                slides[i].style.margin = margin/2 + "px";
                totalWidth += containerWidth/itemPerSlide;
            }      
            sliderContainer.style.width =  totalWidth + "px";

            slideDots = Math.ceil(slides.length/itemPerSlide);

            for(let i = 0; i < slideDots; i++) {
                const div = document.createElement("div");
                div.id=i;
                div.setAttribute("onclick", "controlSlide(this)");
                if(i == 0){
                    div.classList.add("active");
                }
            document.querySelector(".slider-controls").appendChild(div);
            }
        }
    // INÍCIO RESPOSIVIDADE DO SLIDER
   
let currentSlide = 0;
let autoSlide = 0;

function controlSlide(element){
    clearInterval(timer);
    timer = setInterval(autoPlay, 5000);
    autoSlide = element.id;
    currentSlide = element.id;
    changeSlide(currentSlide);
}
function changeSlide(currentSlide) {
    controlButtons = document.querySelector(".slider-controls").children;
    
    for(let i = 0; i < controlButtons.length; i++) {
        controlButtons[i].classList.remove("active")   
    }
    controlButtons[currentSlide].classList.add("active")

    sliderContainer.style.marginLeft  =- (containerWidth*currentSlide) + "px";
}

function autoPlay() {
    if(autoSlide == slideDots - 1) {
        autoSlide = 0;
    }else {
        autoSlide++;
    }
    changeSlide(autoSlide)
}

let timer = setInterval(autoPlay, 5000);

window.onload = load();
// FIM TESTIMONIALS SLIDER
    