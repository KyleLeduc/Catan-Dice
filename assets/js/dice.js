const {Howl, Howler} = require('howler');

// array of dice rolls 36
var cardMaster = [
    "2",
    "3",
    "3",
    "4",
    "4",
    "4",
    "5",
    "5",
    "5",
    "5",
    "6",
    "6",
    "6",
    "6",
    "6",
    "7",
    "7",
    "7",
    "7",
    "7",
    "7",
    "8",
    "8",
    "8",
    "8",
    "8",
    "9",
    "9",
    "9",
    "9",
    "10",
    "10",
    "10",
    "11",
    "11",
    "12",
]
var rollTracker = [];
var cardList = [];
var gameNumber = 1
var diceSound = new Howl({
    src: ['/sounds/DiceRollSound.mp3'],
    preload: true,
    onend: function() {
        var pickedCard = pickCard();
        $("#rollBtn").attr("disabled", false);
        $("#gameReset").removeClass("disabled d-none");
        $("#statsReset").removeClass("d-none");
        console.log(pickedCard);
        if(pickedCard == 7)
        {
            robberSound.play();
        }
    }
});

var robberSound = new Howl({
    src: ['/sounds/robberSound.mp3'],
    preload: true
});

deckReset();

// Dice roll button
$("#rollBtn").click(function(){
    $(this).attr("disabled", true);
    $(this).effect( "shake", {times: 6}, 1200);
    diceSound.play();
})

// New game button
$("#gameReset").click(function(){
    if(rollTracker.length !== 0) {
        newGraph();
        saveGame();
        reset();
        gameNumber += 1;
        $("#gameReset").addClass("disabled");
    }
})

// Page reload button
$("#statsReset").click(function(){
    location.reload();
})

// Event delegation click listener to show/hide game stats using event.target
$("#rollStats").on("click", "button", (e) => {
    $(e.target).next().toggleClass("d-none");
});


// Reset the deck function
function deckReset(){
    // Clear the remaining deck cards
    cardList = [];
    // Copy the master list to the play deck
    cardList = cardMaster.slice();
}

// Save game display multiple games and clear the roll stats
function saveGame(){
    $("#rollStats").html(
        $("#rollStats").html() + 
        '<div class="my-3 text-center">' +
            '<button class="btn btn-sm statsBtn">Game ' + gameNumber + '</button>' +
            '<div class="my-3 d-none">' +
                '<div class="d-flex justify-content-center" id="graph' + gameNumber + '">' + '</div> ' +
                '<div class="mt-2 col-md-9 d-inline-flex justify-content-center"> Roll Timeline:  ' + rollTracker + '</div>' +
            '</div>' +
        '</div>'
        );
    rollTracker = [];
    Plotly.newPlot('graph' + gameNumber, data, layout, config);
}


// select random number from array and remove it
function pickCard(){
    if(cardList.length < 5){
        deckReset();
    }
    var random = Math.floor(Math.random() * cardList.length);
    var pickedCard = cardList[random];
    cardList.splice(random, 1);
    rollTracker.push(pickedCard);
    // Update text to display roll
    $("h3").text("You rolled: " + pickedCard);
    // display rollTracker as "Amount of rolls this game:
    $("h4").text("Dice roll count: " + rollTracker.length);
    return pickedCard;
}


// reset button functionality
function reset(){
    // reset text
    $("h3").text("Click the dice to begin");
    $("h4").text("The dice haven't been rolled yet");
    // reset deck
    deckReset();
}


// Plotly graph of rolls
var layout
var data
var config = {
            responsive: true,
            staticPlot: true
        }
function newGraph(){
        layout = {
            // title: {
            //     text:'Game ' + gameNumber
            // },
            margin: {
                l: 50,
                r: 15,
                b: 50,
                t: 20,
                pad: 10
            },
            width: 300,
            height: 300,
            plot_bgcolor:"#f5f5f5",
            paper_bgcolor:"#f5f5f5",
            xaxis: {
                title: "Number of Rolls",
                titlefont:{
                    size: 18,
                },
                dtick: '1',
                ticks: 'outside'
            },
            yaxis: {
                range: [1.9,12.5],
                title: "Number Rolled",
                titlefont:{
                    size: 18,
                },
                tick0: '0',
                dtick: '1',
            }
        }
    data = [
        {
            y: rollTracker,
            type: 'histogram',
            histfunc: 'count',
            ybins: {
                end: 13, 
                size: .5, 
                start: 2,
                step: 1
            }
        }
    ];
}


// Todo
// Styling
    // speed up plotly scaling
    // customize button colors