/** 
Game where walls appear from the top of the display
and move towards the player located at the bottom
Players use A and B to move left and right to avoid
the walls. Game slowly speeds up over time.
When a player hits the wall, the game ends and their
score is displayed. Game then starts again.

 */
//  TODOs
//  Must be a better way than unplotting and plotting leds for movement
//    basic.clear_screen() is simpler, but appears kinda flickery
//  Global variables are gross.       
function move_player(direction: number) {
    /** 
    Moves the player left or right.
    Movement wraps around to other side of the screen.
    
 */
    
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
function move_walls() {
    /** 
    Moves the wall downwards. Plot every LED on the row except
    for where the gap in the wall is located. Once a wall is
    off screen, move it back to the top.
    
 */
    
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
    }
    
}

let playing = false
let score = 0
let gap_y = 0
let gap_x = 0
let player_y = 0
let player_x = 0
player_x = 2
player_y = 4
gap_x = 2
gap_y = -3
basic.forever(function on_forever() {
    
    score = 0
    player_x = 2
    player_y = 4
    gap_y = -3
    gap_x = 2
    playing = true
    while (playing) {
        basic.pause(500 - score * 10)
        led.plot(player_x, player_y)
        move_walls()
        if (player_y == gap_y) {
            if (player_x == gap_x) {
                score = score + 1
            } else {
                playing = false
            }
            
        }
        
    }
    basic.showNumber(score)
    basic.pause(5000)
    basic.clearScreen()
    playing = false
})
