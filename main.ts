let player_x = 2
let player_y = 4
let gap_x = 2
let gap_y = -3
let score = 0
function move_walls() {
    
    gap_y = gap_y + 1
    for (let x = 0; x < 5; x++) {
        if (x != gap_x) {
            led.unplot(x, gap_y - 1)
            led.plot(x, gap_y)
        }
        
    }
    if (gap_y > 5) {
        gap_x = randint(0, 4)
        gap_y = -1
        score = score + 1
    }
    
}

function move_player(direction: number) {
    
    led.unplot(player_x, player_y)
    if (direction == 1) {
        player_x = (player_x + direction) % 5
    } else if (player_x - 1 < 0) {
        player_x = 4
    } else {
        player_x = player_x - 1
    }
    
    led.plot(player_x, player_y)
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    move_player(-1)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    move_player(1)
})
basic.forever(function on_forever() {
    
    score = 0
    player_x = 2
    player_y = 4
    gap_y = -3
    gap_x = 2
    let playing = true
    while (playing) {
        basic.pause(500 - score * 10)
        led.plot(player_x, player_y)
        move_walls()
        if (player_y == gap_y && player_x != gap_x) {
            basic.showNumber(score)
            basic.pause(5000)
            basic.clearScreen()
            playing = false
        }
        
    }
})
