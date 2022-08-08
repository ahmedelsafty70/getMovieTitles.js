import fetch from "node-fetch";
globalThis.fetch = fetch

async function moviesAtCertainPage(subString,page_no){
    let url = ' https://jsonmock.hackerrank.com/api/movies/search/?page=' + page_no + '&Title=' + subString;
    try{
        let res = await fetch(url);
        const data = await res.json();
        return data;
    } catch(error){
        console.log(error);
    }
}

async function calculatingNoOfPages(subString){
    let url = ' https://jsonmock.hackerrank.com/api/movies/search/?Title=' + subString;
    try{
        let res = await fetch(url);
        const data = await res.json();
        return data.total_pages;
    } catch(error){
        console.log(error);
    }
}

async function renderMovies(subString){
    const arrTitlesName = [];
    let counter=0;
    let no_of_pages = await calculatingNoOfPages(subString);;

    for(let page_no=0; page_no<no_of_pages; page_no++){
        
        let movieAtSpecificPage = await moviesAtCertainPage(subString,page_no);

        for (const movie of movieAtSpecificPage.data) {
            arrTitlesName[counter] = movie.Title;   
            counter++;
        }
    }

    arrTitlesName.sort();
    
    for(const index in arrTitlesName){
        console.log(arrTitlesName[index]);
    }

    
}

renderMovies('spider');