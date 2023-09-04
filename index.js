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
    //console.log('sp data -cat: ', data.data);
    const x = data.data;
    const len =x.length;
    //console.log('len: ',len);
    

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const eachDataCard = data.data;
    console.log('eachDataCard :', eachDataCard);
    
    // console.log('each data card posted date',eachDataCard.others.posted_date);
    const noCardContainer = document.getElementById('no-card');


    // now write forEach function for eachDataCard.
    function convertSecondsToHMS(seconds) {
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const remainingSecondsFinal = remainingSeconds % 60;
      
        return {
          hours: hours,
          minutes: minutes,
          seconds: remainingSecondsFinal
        };
    }
      
      // Example usage:
      const totalSeconds = 3665; // Replace this with the number of seconds you want to convert
      const time = convertSecondsToHMS(totalSeconds);
      
      //console.log(`Hours: ${time.hours}, Minutes: ${time.minutes}, Seconds: ${time.seconds}`);
    
    eachDataCard.forEach((card) => {
            //console.log("card: ", card);
            //console.log("img :", card.thumbnail);
            //console.log("authors: ", card.authors);
            const x = card.authors[0];
            const verification = card.authors.verified;
            const y = card.others.posted_date;
            //console.log('y',y);
            const timeObject = convertSecondsToHMS(y);
            console.log('tt: ',timeObject);
            //console.log('verfication: ',verification);
            console.log('posted date: ',y);

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="relative card card-compact w-full bg-base-100 shadow-xl">

                <img class="w-full rounded-md h-[200px] object-cover " src=${card.thumbnail} />

                <p id="posted-data" class="absolute mt-32 ml-56 text-red-600">${timeObject.hours}hrs ${timeObject.minutes}min ago</p>

                <div class="card-body">
                <div class="flex justify-start gap-2">

                        <div>
                            <img class="rounded-full  w-16 h-16 object-cover" src=${x.profile_picture}/>
                        </div>

                        <div>
                            <h2 class="card-title">${card.title}</h2>
                            <p id="prof_name">${x.profile_name}<span>${x.verified?`<i class="fa-solid fa-circle-check" style="color: #005eff;"></i>`:""}</span> </p>
                            
                            <p>${card.others.views} views</p>
                        </div>
                    </div>

                </div>    

            </div>


            `
            ///
            
              

            //                           

            //
            if(y){
                const postedData = document.getElementById('posted-data');

            }
            // const span = document.createElement('span');
            // const photoName = document.getElementById('prof_name');
            // if(!verification){
            //     span.innerHTML = `
            //     sdsd
            //     `
            //     photoName.appendChild(span);
                
            //}

        noCardContainer.classList.add('hidden');
        noCardContainer.classList.remove('grid')
        cardContainer.appendChild(div);

    })

    if(x<=0 ){
        noCardContainer.classList.remove('hidden');
        noCardContainer.classList.add('grid');
    }

}




handleCategory();
handleLoadCategoryButton("1000");