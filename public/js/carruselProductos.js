

let swiper = new Swiper('.swiper-container', {
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev'
	},
	slidesPerView: 1,
	spaceBetween: 10,
	// init: false,
	pagination: {
	  el: '.swiper-pagination',
	  clickable: true,
	},

  
	breakpoints: {
	  620: {
		slidesPerView: 1,
		spaceBetween: 20,
	  },
	  680: {
		slidesPerView: 2,
		spaceBetween: 40,
	  },
	  920: {
		slidesPerView: 3,
		spaceBetween: 40,
	  },
	  1240: {
		slidesPerView: 4,
		spaceBetween: 50,
	  },
	} 
    });


let carrusel = document.querySelector("#carruselMovil")

let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth

let intervalo = null;

let step = 1;

let start = () =>{
	intervalo = setInterval(function(){
		carrusel.scrollLeft = carrusel.scrollLeft + step;
		if(carrusel.scrollLeft === maxScrollLeft){
			step = step * -1;
		}
		else if(carrusel.scrollLeft === 0){
			step = step * -1;
		}
	},10)
}
let stop = () =>{
	clearInterval(intervalo)
}

carrusel.addEventListener("mouseover", ()=>{
	stop()
})

carrusel.addEventListener("mouseout", () =>{
	start()
})
start()