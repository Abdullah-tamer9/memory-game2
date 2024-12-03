document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("Enter your name");

    if (yourName == null || yourName == "") {

        document.querySelector(".name span").innerHTML = "unkown"

    } else {

        document.querySelector(".name span").innerHTML = yourName;

    }

    document.querySelector(".control-buttons").remove();
}

let duration = 600;

let imagesBox = document.querySelector(".imagesBox");


let boxes = Array.from(imagesBox.children)

let orderRange = [...Array(boxes.length).keys()];
shuffel(orderRange)

boxes.forEach((box, index) => {
    box.style.order = orderRange[index];

    box.addEventListener(`click`, function () {

        flipbox(box);
    })
});

function flipbox(selectedbox) {

    selectedbox.classList.add(`is-flipped`);


    let allboxexflipped = boxes.filter(flippedbox => flippedbox.classList.contains("is-flipped"));

    if (allboxexflipped.length === 2) {

        stopclicking();
        checkmatch(allboxexflipped[0], allboxexflipped[1]);
    }
}

function checkmatch(firstbox, secondbox) {

    let tries = document.querySelector(".tries span");

    if (firstbox.dataset.numbers === secondbox.dataset.numbers) {

        firstbox.classList.remove("is-flipped");
        secondbox.classList.remove("is-flipped");

        firstbox.classList.add("has-match");
        secondbox.classList.add("has-match");

        document.getElementById("sucess").play();
    } else {

        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(() => {
            firstbox.classList.remove("is-flipped");
            secondbox.classList.remove("is-flipped");
        }, duration)
        document.getElementById("failed").play();
    }
}

function stopclicking() {
    imagesBox.classList.add("no-clicking")

    setTimeout(() => {
        imagesBox.classList.remove("no-clicking")
    }, duration)
}

function shuffel(array) {
    let current = array.length,
        temp,
        random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);
        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;

    }
    return array;
}

