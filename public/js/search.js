// const { post } = require("../../controllers/api/reviewRoutes");

const searchFormHandler = async function(event) {
    event.preventDefault();

    const search = document.querySelector('#search-input').value.trim();

    console.log(search);

    await fetch(`/api/review`, {
        method: 'PUT',
        body: JSON.stringify({
            name: search,
            // phone: phoneNumber,
            // email,
            // rating,
            // review,
        }),
        headers: { 'Content-Type': 'application/json' },
    }) 
    // const results = await review.json();
    // console.log(results)
    // document.location.replace('/reviews-all');
};

document.querySelector('#search-form').addEventListener('submit', searchFormHandler);