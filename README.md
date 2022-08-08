# getMovieTitles.js

#### Given a string substr, getMovieTitles() must perform the following tasks:

Query https://jsonmock.hackerrank.com/api/movies/search/?Title=substr (replace substr).
Initialize the titles array to store total string elements. Store the Title of each movie meeting the search criterion in the titles array.
Sort titles in ascending order and return it as your answer.
Example to get page 2 of a search result:
https://jsonmock.hackerrank.com/api/movies/search/?Title=Spiderman&page=2
