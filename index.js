console.log('connect');
//s-1: load categories dynamically
const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    console.log('data: ', data);
    console.log('data.data: ', data.data);

    // console.log('data.data.category: ',data.data.category);   
    const tabContainer = document.getElementById('tab-container');
    const trimedData = data.data;
    trimedData.forEach((cat) => {
        //console.log("button cat for tabs: ", cat);
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="handleLoadCategoryButton('${cat.category_id}')" class="btn">${cat.category}</button>

        `
        tabContainer.appendChild(div);
    })
}

//s-1(a): loading or bringing categories
const handleLoadCategoryButton = async (catId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catId}`);
    const data = await response.json();
    console.log('sp data -cat: ', data.data);

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const eachDataCard = data.data;
    console.log('eachDataCard :', eachDataCard);


    // now write forEach function for eachDataCard.
    eachDataCard.forEach((card) => {
        //console.log("card: ", card);
        //console.log("img :", card.thumbnail);
        //console.log("authors: ", card.authors);
        const x = card.authors[0];

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-compact w-full bg-base-100 shadow-xl">
           
            <img class="w-full max-h-40" src=${card.thumbnail} />
            
            <div class="card-body">
            <div class="flex justify-start gap-2">
            
                    <div>
                        <img class="rounded-full  w-16 h-16" src=${x.profile_picture}/>
                    </div>
            
                    <div>
                        <h2 class="card-title">${card.title}</h2>
                        <p>${x.profile_name}</p>
                        <p>${card.others.views} views</p>
                    </div>
                </div>

            </div>    

        </div>
        
        
        `
        cardContainer.appendChild(div);
    })

}




handleCategory();
handleLoadCategoryButton("1000");