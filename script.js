const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const showSelect = document.getElementById('show');

populateUI();

let ticketPrice = +showSelect.value;

//Save selected show index and price
function setShowData(showIndex, showPrice) {
  localStorage.setItem('selectedShowIndex', showIndex);
  localStorage.setItem('selectedShowPrice', showPrice);
}

//Update total and counter
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const selectedSeatsCount = selectedSeats.length;

  //Copy selected seats into arr
  //Map through array
  //Return a new array of indexes

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedShowIndex = localStorage.getItem('selectedShowIndex');

  if (selectedShowIndex !== null) {
    showSelect.selectedIndex = selectedShowIndex;
  }
}

//Show select event listener
showSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setShowData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seat click event listener
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

//Inital count and total set
updateSelectedCount();
