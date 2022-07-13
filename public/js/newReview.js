const newFormHandler = async function(event) {
    event.preventDefault();
  
    const guestName = document.querySelector('#guestName').value.trim();
    const phoneNumber = document.querySelector('#phoneNumber').value.trim();
    const email = document.querySelector('#email').value.trim();
    const rating = document.querySelector('input[name="rate"]:checked').value
    const review = document.querySelector('#reviewComment').value.trim()
  
    console.log(guestName);
    console.log(review);
  
    await fetch(`/api/review/new`, {
      method: 'POST',
      body: JSON.stringify({
        name: guestName,
        phone: phoneNumber,
        email,
        rating,
        review,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/reviews-all');
  };
  
document.querySelector('#reviewForm').addEventListener('submit', newFormHandler);