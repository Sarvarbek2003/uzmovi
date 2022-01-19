let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
// let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'

let append = document.querySelector('.append')
let btn = document.querySelectorAll('.btns')
let button = document.querySelector('.btn')
let search = document.querySelector('#search')
let input1 = document.querySelector("#min")
let input2 = document.querySelector("#max")
let score = document.querySelector("#score")
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")
let title = document.querySelector(".title")
let result 


async function top_rated(arg = 1){
    let res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${arg}`)
    res = await res.json()
    result = res.results
    paganation(res.total_pages)
    butt(res.total_pages)
    rend(result)
    filter(result)
}


async function popular(arg = 1){
    let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${arg}`)
    res = await res.json()
    result = res.results
    paganation(res.total_pages)
    butt(res.total_pages)
    rend(result)
    filter(result)
}

async function upcoming(arg = 1){
    let res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${arg}`)
    res = await res.json()
    result = res.results
    paganation(res.total_pages)
    butt(res.total_pages)
    rend(result)
    filter(result)
    
}

function butt(arg){
btn.forEach(el => {
    el.addEventListener('click', event =>{
        if(el.value == 'top_rated') top_rated(1)
        if(el.value == 'popular') popular(1)
        if(el.value == 'upcoming') upcoming(1)
    })

});
}

let prevv = 1
function paganation(arg){
    console.log(arg);
    prev.addEventListener('click', el => {
        if(prevv>1){
            prevv--
            title.textContent = prevv + '/' + arg           
        }else alert('invalit page')
    })
    next.addEventListener('click', el => {
        console.log(arg)
        if(prevv < arg){
            prevv++
            title.textContent = prevv + '/' + arg
        }else alert('invalit page')
    })

}


function rend(arg){
    append.innerHTML = null
    for (let e of arg){
        let div = document.createElement('div')
        div.setAttribute('class','movie')
        div.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${e.poster_path}" alt="${e.title}">
                <div class="movie-info">
                   <h3>${e.title}</h3>
                   <span class="orange">${e.vote_average}</span>
                </div>
                <span class="date">${e.release_date}</span>
        `
        append.append(div)
}
}
let filterdata = []
function filter(arr){
    button.addEventListener('click', el =>{
        filterdata=[]
        arr.forEach(ell =>{
            if (search.value) {
				if(ell.title.includes(search.value)){
					count = 0
					filterdata.push(ell)
				}
			}else count = 1
		}) 
		if (count == 1) filterdata.push(...arr)
        
        let filteryear = []
		let yearCount = 0
		if((input1.value || input2.value)){
			filterdata.forEach(el => {
				if (input1.value && input2.value){
					if (input1.value > input2.value){
						alert("Invalid Year")
						return
					}
					if (el.release_date.split('-')[0] >= input1.value && el.release_date.split('-')[0] <= input2.value){
						filteryear.push(el)
						yearCount = 1
					}else yearCount = 1
				}else if (input1.value){
					if (el.release_date.split('-')[0] >= input1.value){
						filteryear.push(el)
						yearCount = 1
					}else yearCount = 1
				}
				else if(input2.value){
					if (el.release_date.split('-')[0] <= input2.value){
						filteryear.push(el)
						yearCount = 1
					}else yearCount = 1
				}
			})
		}else yearCount = 0
		if(yearCount == 1) filterdata = filteryear

        let scoredata = []
        let scount = 0
        filterdata.forEach(el =>{
            if(!score.value) return
            if(score.value <= el.vote_average){
                scoredata.push(el)
                scount = 1
            }
            
        })
        if(scount == 1) filterdata = scoredata

        rend(filterdata)
})
}






butt()

top_rated()
