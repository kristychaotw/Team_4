//// regionNow click animation - show regionMenu 
document.querySelector('.regionNow').addEventListener("click",function(){
    if(this.classList.contains('active')){
        this.classList.remove('active')
        document.querySelector('.regionMenu').classList.remove('active')
    }else{
        this.classList.add('active')
        document.querySelector('.regionMenu').classList.add('active')
    }
})