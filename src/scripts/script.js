window.onload = function () {
	let is_flip = false;
	var is_dragging = false;
	let is_deck_cards_modal_open = false;
	let deck_id = "set1";
	let set_size = 50;
	let number_of_deck = 2;
	const currentUrl = "https://arttherapyshopbydaniela.github.io/Service-MAC/";

	const position = { 
		x: 0, 
		y: 0 
	}

	let image_id_array = []


	let deck_cards_modal = document.getElementById("deck-of-cards-modal");
	let desks_list = document.getElementById("decks-list");
	let deck_cards_modal_close_button = document.getElementById("deck-of-cards-modal-button-close");
	

	let cards_desk = document.getElementById("cards-desk");
	let cards_line = document.getElementById("cards-line");

	let fullscreen_desk_button = document.getElementById("fullscreen-desk-button");
	let fullscreen_toggle_button = document.getElementById("fullscreen-toggle-button");
	let mix_cards_button = document.getElementById("mix-cards-button");
	let flip_cards_button = document.getElementById("flip-cards-button");
	let choose_deck_button = document.getElementById("choose-deck-button");
	let clear_desk_button = document.getElementById("clear-desk-button");

	function createSet() {
		for (let i = 0; i < image_id_array.length; i++) {
			moveCardToDeck(image_id_array[i])
		}
	}

	function moveCardToDesk(card_id) {
		let block = document.createElement("div")
		let card = document.createElement("span")

		block.setAttribute("data-card-id", card_id.toString())
		block.classList.add("draggable")

		card.style.backgroundImage = "url(\"" + currentUrl + "assets/" + deck_id + "/" + card_id + ".jpg\")";

		block.appendChild(card)

		block.addEventListener('mousedown', 
			handleMouseDown
		)

		block.addEventListener("click", function(event) {
			if (is_dragging) {
				event.preventDefault()
				event.stopImmediatePropagation();
				return
			}
			block.remove() // TODO: set timer
			moveCardToDeck(card_id)
			image_id_array.push(card_id)
			console.log("click");
		})

		cards_desk.appendChild(block)

		function handleMouseDown(event) {
			is_dragging = false;
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}
		
		function handleMouseMove(event) {
			is_dragging = true;
		}  
		
		function handleMouseUp(event) {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		}

		updateDragable("#cards-desk div[data-card-id=\"" + card_id.toString() + "\"]")
		// updateDragable(block)
	}

	function moveCardToDeck(card_id) {
		let block = document.createElement("div")
		let card = document.createElement("span")

		block.setAttribute("data-flip", is_flip.toString())
		block.setAttribute("data-card-id", card_id.toString())
		
		card.style.backgroundImage = "url(\"" + currentUrl + "assets/" + deck_id + "/" + card_id.toString() + ".jpg\")";

		block.appendChild(card)

		block.addEventListener("click", function() {
			let index = image_id_array.indexOf(card_id)
			let temp = image_id_array.slice(0,index).concat(image_id_array.slice(index+1,image_id_array.length))
			image_id_array = temp
			block.remove() // TODO: set timer
			moveCardToDesk(card_id)
		})
		
		cards_line.appendChild(block)
	}

	function build_new_deck() {
		clear_deck()
		image_id_array = [...Array(set_size+1).keys()];
		image_id_array = image_id_array.slice(1, set_size+1)
		createSet()
	}

	function clear_desk() {
		cards_desk.innerHTML = ""
	}

	function clear_deck() {
		cards_line.innerHTML = ""
	}

	build_new_deck()

	clear_desk_button.addEventListener("click", function() {
		clear_desk()
		build_new_deck()
	})

	mix_cards_button.addEventListener("click", function() {
		clear_deck()
		mix_image_id_array()
		createSet()
	})

	fullscreen_desk_button.addEventListener("click", function() {
		cards_desk.classList.add("fullscreen")
		fullscreen_desk_button.classList.add("hide")
		fullscreen_toggle_button.classList.add("show")
		window.scrollTo(0, cards_desk.scrollIntoView);
	})

	fullscreen_toggle_button.addEventListener("click", function() {
		cards_desk.classList.remove("fullscreen")
		fullscreen_desk_button.classList.remove("hide")
		fullscreen_toggle_button.classList.remove("show")

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
			
			fetch(currentUrl + 'assets/' + deck_name + "/description.txt")
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
			profile.src = currentUrl + 'assets/' + deck_name + "/profile.jpg"
			paragraph.textContent = text

			button.textContent = "Use"
			button.addEventListener("click", function() {
				deck_id = button.parentElement.getAttribute("data-deck-name")
				clear_desk()
				build_new_deck()
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
		const suffle = (array) => {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			return array
		};

		let temp = suffle(image_id_array); // Adjust min and max as needed
		image_id_array = temp
	}
	  
	  // create a snap modifier which changes the event coordinates to the closest
	  // corner of a grid
	  const snap100x100 = interact.modifiers.snap({
		targets: [interact.snappers.grid({ x: 20, y: 20 })],
		relativePoints: [{ x: 0.5, y: 0.5 }],
	  })

	  const restriction = interact.modifiers.restrictRect({
		  restriction: 'parent'
	})

	function updateDragable() {
		interact('.draggable').draggable({
			listeners: {
				start (event) {
					const style = window.getComputedStyle(event.target);
					const matrix = new DOMMatrix(style.transform);
					position.x = matrix.m41
					position.y = matrix.m42
				},	
				move (event) { 
					position.x += event.dx
					position.y += event.dy
			
					event.target.style.transform = 
						`translate(${position.x}px, ${position.y}px)`
				}
			},
			modifiers: [snap100x100, restriction]
		})
	}
};
