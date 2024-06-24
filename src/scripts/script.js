window.onload = function () {
	let is_flip = false;
	let is_deck_cards_modal_open = false;
	let deck_id = "set1";
	let set_size = 8;
	let number_of_deck = 5;

	let image_id_array = []


	let deck_cards_modal = document.getElementById("deck-of-cards-modal");
	let desks_list = document.getElementById("decks-list");
	let deck_cards_modal_close_button = document.getElementById("deck-of-cards-modal-button-close");
	

	let cards_desk = document.getElementById("cards-desk");
	let cards_line = document.getElementById("cards-line");

	let mix_cards_button = document.getElementById("mix-cards-button");
	let flip_cards_button = document.getElementById("flip-cards-button");
	let choose_deck_button = document.getElementById("choose-deck-button");
	let clear_desk_button = document.getElementById("clear-desk-button");

	function createSet() {
		for (const index in image_id_array) {
			let block = document.createElement("div")
			let card = document.createElement("span")

			block.setAttribute("data-flip", is_flip.toString())
			
			card.style.backgroundImage = "url(\"/assets/" + deck_id + "/" + image_id_array[index].toString() + ".png\")";

			block.appendChild(card)
			
			cards_line.appendChild(block)
		}
	}

	function build_new_set() {
		clear_deck()
		image_id_array = [...Array(set_size+1).keys()];
		delete image_id_array[0]
		createSet()
	}

	function clear_desk() {
		cards_desk.innerHTML = ""
	}

	function clear_deck() {
		cards_line.innerHTML = ""
	}

	build_new_set()

	clear_desk_button.addEventListener("click", function() {
		clear_desk()
		build_new_set()
	})

	mix_cards_button.addEventListener("click", function() {
		clear_deck()
		mix_image_id_array()
		createSet()
	})

	flip_cards_button.addEventListener("click", function() {
		is_flip = !is_flip

		document.querySelectorAll("#cards-line div").forEach ( block => {
			block.setAttribute("data-flip", is_flip.toString())
		})
	})

	choose_deck_button.addEventListener("click", function() {
		is_deck_cards_modal_open = true

		deck_cards_modal.setAttribute("data-open", is_deck_cards_modal_open)
		window.scrollTo(0, 0);
		document.body.style.overflow = "hidden"
	})

	deck_cards_modal_close_button.addEventListener("click", close_deck_cards_modal)
	function close_deck_cards_modal() {
		is_deck_cards_modal_open = false
		deck_cards_modal.setAttribute("data-open", is_deck_cards_modal_open)
		document.body.style.overflow = ""
	}

	async function build_decks() {
		for (let index = 1; index <= number_of_deck; index++) {
			let deck_name = "set" + index
			
			fetch('http://localhost:3000/assets/' + deck_name + "/description.txt")
				.then(response => response.text())
				.then((data) => {
					build_deck_profile(deck_name, data)
				})
		}

		const build_deck_profile = (deck_name, text) => {

			let block = document.createElement("div")
			let profile = document.createElement("img")
			let paragraph = document.createElement("p")
			let button = document.createElement("button")

			block.setAttribute("data-deck-name", deck_name)
			profile.src = "/assets/" + deck_name + "/profile.jpg"
			paragraph.textContent = text

			button.textContent = "Use"
			button.addEventListener("click", function() {
				deck_id = button.parentElement.getAttribute("data-deck-name")
				build_new_set()
				close_deck_cards_modal()
				window.scrollTo(0, document.body.scrollHeight);
			})

			block.appendChild(profile)
			block.appendChild(paragraph)
			block.appendChild(button)
			
			desks_list.appendChild(block)
		}
	}

	
	build_decks()

	function mix_image_id_array() {
		const createRandomNumbers = (min, max) => {
			const randomNumbers = new Set();
			const range = max - min + 1;
			while (randomNumbers.size < range) {
				randomNumbers.add(Math.floor(Math.random() * range) + min);
			}
			return Array.from(randomNumbers);
		};
		image_id_array = createRandomNumbers(1, set_size); // Adjust min and max as needed
	}
};
