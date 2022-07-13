// const { post } = require("../../controllers/api/reviewRoutes");

const searchFormHandler = async function(event) {
    event.preventDefault();

    const search = document.querySelector('#search-input').value.trim();

    console.log(search);

    // const results = await fetch(`/api/review`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         name: search,
    //         // phone: phoneNumber,
    //         // email,
    //         // rating,
    //         // review,
    //     }),
    //     headers: { 'Content-Type': 'application/json' },
    // }) 
    // const reviews = await results.json();
    // console.log(reviews)
    document.location.replace('/reviews/' + search);
};

document.querySelector('#search-form').addEventListener('submit', searchFormHandler);