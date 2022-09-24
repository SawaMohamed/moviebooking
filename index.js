const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelct = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelct.value;

// Save selected movie index and price
setMovieData=(movieIndex, moviePrice)=>{
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
// Update total and count
updateSelectedCount=()=>{
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat =>[...seats].indexOf(seat))
    
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}
//last
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem(
        'selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index)=>{
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelct.selectedIndex = selectedMovieIndex;
    }
}
// Movie select event
movieSelct.addEventListener('change', e =>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
})
// Seat event
container.addEventListener('click', e =>{
    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')
    ){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});
updateSelectedCount();