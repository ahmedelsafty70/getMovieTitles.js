import fetch from "node-fetch";
globalThis.fetch = fetch

const arrTitlesName = [];
const arrOfPromises = [];
let firstPageData;
let total_pages = 1;
let counter =0;
let subString='water';


async function moviesAtCertainPage(subString,page_no){
    let url = ' https://jsonmock.hackerrank.com/api/movies/search/?page=' + page_no + '&Title=' + subString;
    try{
        let res = await fetch(url);
        let data = await res.json();
        return data;
    } catch(error){
        console.log(error);
    }
}

function fetchForAPromise(subString, page_no){
    console.log(page_no)
    let url = ' https://jsonmock.hackerrank.com/api/movies/search/?page=' + page_no + '&Title=' + subString;
    return fetch(url).then(res => res.json());
}

async function handlingPromises(){
    let page_no = 1;
    firstPageData = await moviesAtCertainPage(subString, page_no);//calling first promise using async and await
    arrTitlesName.push(firstPageData);
    total_pages = firstPageData.total_pages;
    while(total_pages>page_no){// saving all promises in the array
        
        page_no++;
        let promise = fetchForAPromise(subString, page_no);
        arrOfPromises.push(promise);

    }
    return arrOfPromises;
}

const promiseArr = await handlingPromises();//extracting data from the array of the promises
const result = await Promise.all(promiseArr);
console.log("result", result);


firstPageData.data.forEach(element => {//filling titles of the first-page
    counter++;
    arrTitlesName.push(element.Title);
});

for(let i=0;i< result.length;i++){ //filling titles of the rest of promises
    for(let j=0;j<result[i].data.length;j++){
        counter++;
        arrTitlesName[counter] = result[i].data[j].Title;
       
    }
}

arrTitlesName.sort(); //sort at the end more effcient

for(const index in arrTitlesName){
    console.log(arrTitlesName[index]);
}
console.log(`Total = ${counter}`);


// doSomething(subString,1)
//   //.then((url) => fetch(url))
//   .then((res) => {
//    return res.json()
// })
//   .then((data) => {
//     let page_no = data.page;
//     let total_pages = 1;

//     while(total_pages){

//         total_pages = data.total_pages;
//             data.data.forEach(element => {
//                 arrTitlesName.push(element.Title);
//             });
//         if(total_pages>page_no){
//             page_no++;
//             doSomething(subString,page_no); 
//         } else {
//             total_pages=0;
//         }   
//     }
//   })
//   .catch((error)=>{
//     console.log(error);
//   })
//   .then(() => {
//     arrTitlesName.sort();
    
//     for(const index in arrTitlesName){
//         console.log(arrTitlesName[index]);
//     }
// });



// async function renderMovies(subString){
  
//     let counter=0;
//     let movieAtSpecificPage;
//     let page_no=0;
//     let total_pages = 1;
    
//     while(total_pages){
        
//         try {
//             page_no++;
//             movieAtSpecificPage = await moviesAtCertainPage(subString,page_no);
//             total_pages = movieAtSpecificPage.total_page;
//             movieAtSpecificPage.data.forEach(element => {
//                 arrTitlesName.push(element.Title);
//             });
//             total_pages=total_pages>page_no;
            
//         } catch (error) {
//             console.log(error);
//             break;
//         }
//         for (const movie of movieAtSpecificPage.data) { //saving all movies titles in an array
//             arrTitlesName[counter] = movie.Title;   
//             counter++;
//         }
//     }

  

//     arrTitlesName.sort(); //sort at the end more effcient
    
//     for(const index in arrTitlesName){
//         console.log(arrTitlesName[index]);
//     }

    
// }