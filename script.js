document.addEventListener('DOMContentLoaded', function () {
    // Movie List Array
    const movieList = [
        { movieName: "Flash", price: 7 },
        { movieName: "Spiderman", price: 5 },
        { movieName: "Batman", price: 4 },
        { movieName: "Pathan", price: 6 },
        { movieName: "Crew", price: 3 },
        { movieName: "Hanuman", price: 4 },
        { movieName: "Captain America", price: 8.5 },
        { movieName: "Batman 2", price: 4.56}
    ];

    // Dropdown menu update
    const selectMovie = document.getElementById('selectMovie');

    movieList.forEach((movie, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = movie.movieName;
        selectMovie.appendChild(option);
    });

    // Default movie name and price
    let selectedMovie = movieList[0];
    document.getElementById('movieName').textContent = selectedMovie.movieName;
    document.getElementById('moviePrice').textContent = `$ ${selectedMovie.price}`;

    selectMovie.addEventListener('change', function () {
        selectedMovie = movieList[this.value];
        document.getElementById('movieName').textContent = selectedMovie.movieName;
        document.getElementById('moviePrice').textContent = `$ ${selectedMovie.price}`;
        updateTotalPrice();
    });

    // Seats
    const seats = document.querySelectorAll('#seatCont .seat:not(.occupied)');
    const selectedSeats = [];

    seats.forEach(seat => {
        seat.addEventListener('click', function () {
            if (seat.classList.contains('occupied')) {
                return;
            }

            if (seat.classList.contains('selected')) {
                seat.classList.remove('selected');
                const index = selectedSeats.indexOf(seat);
                if (index > -1) {
                    selectedSeats.splice(index, 1);
                }
            } else {
                seat.classList.add('selected');
                selectedSeats.push(seat);
            }
            updateTotalPrice();
            updateSelectedSeats();
        });
    });

    function updateTotalPrice() {
        const totalPrice = selectedSeats.length * selectedMovie.price;
        document.getElementById('totalPrice').textContent = `$ ${totalPrice}`;
    }

    function updateSelectedSeats() {
        const selectedSeatsHolder = document.getElementById('selectedSeatsHolder');
        selectedSeatsHolder.innerHTML = '';
        if (selectedSeats.length === 0) {
            selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
        } else {
            selectedSeats.forEach(seat => {
                const seatNumber = Array.from(seat.parentElement.children).indexOf(seat) + 1;
                const seatEl = document.createElement('div');
                seatEl.classList.add('selectedSeat');
                seatEl.textContent = `Seat ${seatNumber}`;
                selectedSeatsHolder.appendChild(seatEl);
            });
        }
    }

    // Continue Button
    const continueBtn = document.getElementById('proceedBtn');
    continueBtn.addEventListener('click', function () {
        if (selectedSeats.length === 0) {
            alert('Oops no seat Selected');
        } else {
            alert('Yayy! Your Seats have been booked');
            selectedSeats.forEach(seat => {
                seat.classList.remove('selected');
                seat.classList.add('occupied');
            });
            document.getElementById('totalPrice').textContent = '$ 0';
            updateSelectedSeats();
        }
    });

    // Cancel Button
    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', function () {
        selectedSeats.forEach(seat => {
            seat.classList.remove('selected');
        });
        document.getElementById('totalPrice').textContent = '$ 0';
        updateSelectedSeats();
    });
});

