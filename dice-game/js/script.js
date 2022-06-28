//initialisation de jQuery
$(function($){
    
    const newGameBtn = $('#new_game_btn');
    const rollBtn = $('#roll_btn');
    const holdBtn = $('#hold_btn');

    const rollAndHold = $('#roll_and_hold')

    const p1GlobalScore = $('#p1_global_score');
    const p2GlobalScore = $('#p2_global_score');

    const p1CurrentScore = $('#p1_current_score');
    const p2CurrentScore = $('#p2_current_score');

    const diceDisplay = $('.dice')

    let p1Turn = true

    //upadte display of the active player 
    function updateTurnDisplay() {
        if(p1Turn) {
            $("#player1").addClass('current_player');
            $("#player2").removeClass('current_player');
            $(".p1_side").addClass('active_side');
            $(".p2_side").removeClass('active_side');

        } else {
            $("#player2").addClass('current_player');
            $("#player1").removeClass('current_player');
            $(".p2_side").addClass('active_side');
            $(".p1_side").removeClass('active_side');

        }
    }

    //display victory message
    function displayWinner() {
        rollAndHold.hide()
        let winner
        p1Turn ? winner = 1 : winner = 2
        $( `<p id='winner_is' class='text-center mt-auto mb-0 text-danger responsive-text-2'>PLAYER ${winner} WIN !</p>` ).insertAfter(newGameBtn)
    }
 
    //reset parameters on pressing 'new game'
    newGameBtn.click(() => {
        $('#winner_is').remove();
        rollAndHold.show()
        p1GlobalScore.html("0");
        p2GlobalScore.html("0");
        p1CurrentScore.html("0");
        p2CurrentScore.html("0");
        p1Turn = true;
        updateTurnDisplay()
    })

    //rolling the dice
    rollBtn.click(() => {
        const number = Math.floor(Math.random() * 6) + 1;
        diceDisplay.attr('src', `./img/${number}.PNG`);
        if(number === 1) { //on 1 loose points and change turn
            p1Turn ? p1CurrentScore.html('0'): p2CurrentScore.html('0');
            p1Turn = !p1Turn;
        } else {
            if(p1Turn) {
                p1CurrentScore.html(number + Number(p1CurrentScore.html()))
            } else {
                p2CurrentScore.html(number + Number(p2CurrentScore.html()))
            }
        }
        updateTurnDisplay()
    })

    //on pressing 'hold', add current score to global and change turn
    holdBtn.click(() => {
        if(p1Turn) {
            p1GlobalScore.html(parseInt(p1CurrentScore.html()) + parseInt(p1GlobalScore.html()))
            p1CurrentScore.html(0)
        } else {
            p2GlobalScore.html(parseInt(p2CurrentScore.html()) + parseInt(p2GlobalScore.html()))
            p2CurrentScore.html(0)
        }
        if(parseInt(p1GlobalScore.html()) >= 100 || parseInt(p2GlobalScore.html()) >= 100){
            displayWinner()
        }
        p1Turn = !p1Turn;
        updateTurnDisplay()
    })

    updateTurnDisplay()
})