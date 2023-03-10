const APIKEY = 'RYQXrBPpy0X8j0AzedFTeD5dole0qLd4';

const container = document.createElement('div');
container.classList.add('container-fluid');
document.body.appendChild(container);

const header = document.querySelector('header');
const meniu = ['All']

async function fetchData(){
    try {
        const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${APIKEY}`);
        const data = await response.json();

        console.log(data.results);

        for (let i in data.results){
        
            const card = document.createElement('div');
            card.classList.add('card');
            container.appendChild(card);
            
            const img = document.createElement('img');
            img.classList.add('card-img-top');
            card.appendChild(img);
            if(data.results[i].multimedia == null){
                console.log(data.results[i].multimedia);
                card.remove();
                    continue;
                }
            img.setAttribute('src', data.results[i].multimedia[0].url);
                
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            card.appendChild(cardBody);

            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = `${data.results[i].title}`;
            cardBody.appendChild(title);

            const cardSection = document.createElement('h6');
            cardSection.classList.add('card-text');
            cardSection.textContent = `${data.results[i].section}`;
            cardBody.appendChild(cardSection);

            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = `${data.results[i].abstract}`;
            cardBody.appendChild(cardText);

            const link = document.createElement('a');
            link.classList.add('btn');
            link.classList.add('btn-primary');
            link.setAttribute('href', data.results[i].short_url);
            link.setAttribute('target', '_blank');
            link.textContent = "Link";
            cardBody.appendChild(link);
            
            console.log(data.results[i].section);
            if (!meniu.includes(data.results[i].section)) {
                meniu.push(data.results[i].section);
            }
        }
        const card_sections = document.querySelectorAll('h6');
        const my_buttons = document.getElementsByTagName('button');

        console.log(meniu);

        meniu.forEach(section => {
            const myBtn = document.createElement('button');
            myBtn.innerText = section;
            header.appendChild(myBtn);
        })

        console.log(my_buttons);
        console.log(card_sections);

        for (let i of my_buttons){
            i.addEventListener('click', () => { getSection(i.innerText)})
        }

        const getSection = (section) => {
            for (let i of card_sections) {
                if (section === i.innerText || section === 'All') {
                    i.parentNode.parentNode.setAttribute(
                        'style',
                        'display: block;'
                    )
                } else {
                    i.parentNode.parentNode.setAttribute(
                        'style',
                        'display: none;'
                    )
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}
fetchData();