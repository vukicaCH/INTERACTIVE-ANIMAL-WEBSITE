let introText = document.querySelector('.intro-text');
let introParagraphs = introText.querySelectorAll('p');
let tigerLink = document.querySelector('.tiger-paragraph');
let factLinks = document.querySelectorAll('.intro-nav-list-item');


function scrollToElement(query){
    let el = document.querySelector("." + query);
    let top = el.getBoundingClientRect().top;

    window.scrollTo(0, top);
} //scrolls to specific element on the page

function showIntroText(){

    introText.style.borderTop = '10px solid black';

    setTimeout(showAllParagaphs, 500);
} //shows text on the beggining of the page


function showAllParagaphs(){
    let num = 1.5;

    introParagraphs.forEach(para => {
        para.style.top = '0';
        para.style.transition = `${num}s`;
        num = num - 0.5;
    })
} //shows all paragraphs on the beggining of the page

window.addEventListener('load',()=>{setTimeout(showIntroText, 500)});


let introNavLinks = document.querySelectorAll('.intro-nav-list-link');

function hideIntroText(){

    introParagraphs.forEach(para => {
        para.style.top = '-300px'});

    setTimeout(() => {
        scrollToElement(this.dataset.location);
    }, 1000);

    setTimeout(showIntroText, 2000);
} //hide intro text and show it again after 2 seconds

introNavLinks.forEach(link => link.addEventListener('click', hideIntroText));
tigerLink.addEventListener('click', hideIntroText);

let tigerFacts = document.querySelector('.tiger-facts');
let zebraFacts = document.querySelector('.zebra-facts');
let cheetahFacts = document.querySelector('.cheetah-facts');

function changeContext(facts){
    let images = Array.from(facts.querySelectorAll('.img'));
    let paragraphs = Array.from(facts.querySelectorAll('.fact'));
    let nextButtons = Array.from(facts.querySelectorAll('.next'))

    function showData(i){
        let index = i == images.length ? 0 : i;

        for(let i = 0;i < images.length;i++){
            images[i].classList.remove('show');
            paragraphs[i].classList.remove('show');
        }


        
        setTimeout(()=>{
            images[index].classList.add('show');
            paragraphs[index].classList.add('show');
        },500);
    }

   nextButtons.forEach((button,i) => button.addEventListener('click',()=>{showData(i + 1)}));

} //show next image and fact in the container you provide

changeContext(tigerFacts);
changeContext(zebraFacts);
changeContext(cheetahFacts);


let loginForm = document.querySelector('.login-div');
let closeLogin = loginForm.querySelector('.close-login');
let openLogin = document.querySelector('.open-login');

closeLogin.addEventListener('click', closeLoginForm);
openLogin.addEventListener('click', openLoginForm);

function closeLoginForm(){
    document.body.classList.remove('open');
    document.documentElement.style.overflowY = 'initial';
} //close login form

function openLoginForm(){
    document.body.classList.add('open');
    document.documentElement.style.overflowY = 'hidden';

} //open login form


function checkForm(e){
    e.preventDefault();

    let firstName = this.querySelector('.first-name');
    let lastName = this.querySelector('.last-name');
    let email = this.querySelector('.email');
    let emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let password = this.querySelector('.password1');
    let password2 = this.querySelector('.password2');
    let passValidator = this.querySelector('.for-pass');

    if(firstName.value.includes(" ")){
        firstName.style.backgroundColor = '#ff5252';
        firstName.value = 'Invalid name';
        return;
    }

    if(firstName.value.length < 3){
        firstName.style.backgroundColor = '#ff5252';
        firstName.value = 'Name is too short';
        return;
    }

    if(lastName.value.includes(' ')){
        lastName.style.backgroundColor = '#ff5252';
        lastName.value = 'Invalid last name';
        return;
    }

    if(lastName.value.length < 3){
        lastName.style.backgroundColor = '#ff5252';
        lastName.value = 'Last name is too short';
        return;
    }

    if(!emailFormat.test(email.value)){
        email.style.backgroundColor = '#ff5252';
        email.value = 'Invalid email';
        return;
    }

    if(password.value.search(/[a-z]/i) < 0){
        passValidator.style.color = 'red';
        passValidator.innerHTML = 'Password must contain letters';
        return;
    }

    if(password.value.search(/[0-9]/i) < 0){
        passValidator.style.color = 'red';
        passValidator.innerHTML = 'Password must contain numbers';
        return;
    }

    if(password.value.length < 8){
        passValidator.style.color = 'red';
        passValidator.innerHTML = 'Password is too short.';
        return;
    }

    if(password.value !== password2.value){
        passValidator.style.color = '#red';
        passValidator.innerHTML = "Passwords don't match.";
        return;
    }

    localStorage.setItem('FirstName', firstName.value);
    localStorage.setItem('LastName', lastName.value);
    localStorage.setItem('email', email.value);
    this.submit();
} //form validation, save data after submit

form1.addEventListener('submit', checkForm);
form2.addEventListener('submit', checkForm);

function isLoggedin(){
    let email = localStorage.email;
    let footerText = document.querySelector('.footer-text');
    let footerQuotes = document.querySelector('.footer-quotes');

    if(email){
        footerText.style.display = 'none';
        openLogin.style.display = 'none';
    }else{
        footerQuotes.style.display = 'none';
    }
}

window.addEventListener('load', isLoggedin);


let quotes = document.querySelectorAll('.footer-quotes p');

function showQuote(i){

    let index = i == quotes.length ? 0 : i;
    let current = index - 1 == 0 ? 0 : i - 1;

    
        quotes[current].style.top = '60%';
        quotes[current].style.zIndex = '-1';
        quotes[current].style.opacity = '0';
        quotes[current].style.pointerEvents = 'none';
        
    
        setTimeout(()=>{
            
            quotes[index].style.pointerEvents = 'initial';
            quotes[index].style.opacity = '1';
            quotes[index].style.zIndex = '1';
            quotes[index].style.top = '50%';
            quotes[current].style.top = '40%';
    
        },500);

        
} //show next quote and hide previous one

quotes.forEach((quote,i) => quote.onclick = function(){showQuote(i + 1)});
