const navItem = [
    {
        nav: "Home",
        id: "content1"
    },
    {
        nav: "Menu",
        id: "content2"
    },
    {
        nav: "Contact us",
        id: "content3"
    }
]
const menuFood = ["burger", "spaghetti", "sandwich"]
const [burger, spaghetti, sandwich] = menuFood
const imgLink = [
    {
        nameFood: burger,
        path: './img/burgers.png',
        pathMin: './img/burgers-min.png'
    },
    {
        nameFood: spaghetti,
        path: './img/Spaghetti.png',
        pathMin: './img/Spaghetti-min.png'
    },
    {
        nameFood: sandwich,
        path: './img/Sandwich.png',
        pathMin: './img/Sandwich-min.png'
    },
]

class SlideShow {
    constructor(imgLink) {
        this.imgLinked = imgLink
        console.log(this.imgLinked)
    }

    imageSlide() {
        const imgLinkeds = this.imgLinked

        return ( 
            imgLinkeds.map((key, i) => 
            `
            <div class="mySlides fade">
              <div class="numbertext">${i}</div>
              <img  srcset="${key.pathMin} 768w,
                           ${key.path} 960w"
                    sizes="(max-width: 768px) 768px,
                           "
                    src="${key.path}" >
              <div class="text">${key.nameFood}</div>
            </div>
            `           
         ).join('')
        )
    }

    render() {
        return `
        <div class="slideshow-container">
            ${this.imageSlide()}
        </div>
        
        <a class="prev" onclick="">&#10094;</a>
        <a class="next" onclick="">&#10095;</a>
        
        </div>
        <br>
        
        <div style="text-align:center">
          <span class="dot" onclick="currentSlide(1)"></span> 
          <span class="dot" onclick="currentSlide(2)"></span> 
          <span class="dot" onclick="currentSlide(3)"></span> 
        </div>
        <div style="text-align:center" class="button">
                        <a class="buttonC"href="#bottom-sheet">
                                <i class="fa fa-shopping-cart" style="font-size:36px"></i>
                        </a>
        </div>`
    }
}


class Header {

    constructor(navLink, imgLink) {
        this.navLink1 = navLink
        this.imgLink = imgLink
    }

    contentComponent() {
        return new SlideShow(this.imgLink).render();
    }
    
    renderNavItem() {
        const navItem = this.navLink1
        return (
            navItem.map(item => 
                `
                <div class="Navbar__Link">
                    <a href="#${item.id}" class="navLink">${item.nav}</a>
                 </div>
                `
            ).join('')
        )
    }

    headerComponent() {
        const websiteInfo = {
            title: "omah-food",
        }
        return(
            `
            <div class="half-circle">    
            <div class="Navbar">
                <div class="Navbar__Link Navbar__Link-brand">
                      <strong class="website-title">${websiteInfo.title}</strong>
                </div>
                <div class="Navbar__Link Navbar__Link-toggle">
                        <i class="fa fa-align-justify"></i>
                </div>
                <nav class="Navbar__Items">
                </nav>
                <nav class="Navbar__Items Navbar__Items--right">
                     ${this.renderNavItem()}
                </nav>
            </div></div>
            `
        )
    }


    render() {
        return `
        <div id="main">     
            <div id="header">
                ${this.headerComponent()}
            </div>
            <div id="content">
                ${this.contentComponent()}
            </div>
        </div>
        `
    }
}


function renderAllComponent(){
    const header = new Header(navItem, imgLink).render()
    document.querySelector('#app').innerHTML = header
    const navs = document.querySelectorAll('.Navbar__Items')
    navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
    document.querySelector('.Navbar__Link-toggle').addEventListener('click', classToggle);
   
}

renderAllComponent();
