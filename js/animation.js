// show regionMenu when click regionNow
function showRegionMenu(){
    if(this.classList.contains('active')){
        this.classList.remove('active')
        document.querySelector('.regionMenu').classList.remove('active')
    }else{
        this.classList.add('active')
        document.querySelector('.regionMenu').classList.add('active')
    }
}

const regionNow = document.querySelector('.regionNow');
regionNow.addEventListener('click',showRegionMenu)

