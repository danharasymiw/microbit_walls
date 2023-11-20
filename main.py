"""
Game where walls appear from the top of the display
and move towards the player located at the bottom
Players use A and B to move left and right to avoid
the walls. Game slowly speeds up over time.
When a player hits the wall, the game ends and their
score is displayed. Game then starts again.
"""

# TODOs
# Must be a better way than unplotting and plotting leds for movement
#   basic.clear_screen() is simpler, but appears kinda flickery
# Global variables are gross.

def move_walls():
    global gap_x, gap_y, score
    gap_y = gap_y + 1

    for x in range(5):
        if x != gap_x:
            led.unplot(x, gap_y - 1)
            led.plot(x, gap_y)

    if gap_y > 5:
        gap_x = randint(0, 4)
        gap_y = -1
        score = score + 1

def move_player(direction):
    global player_x, player_y
    led.unplot(player_x, player_y)
    if direction == 1:
        player_x = (player_x + direction) % 5
    elif player_x - 1 < 0:
        player_x = 4
    else:
        player_x = player_x - 1
    led.plot(player_x, player_y)

def on_button_pressed_a():
    move_player(-1)

def on_button_pressed_b():
    move_player(1)

input.on_button_pressed(Button.A, on_button_pressed_a)
input.on_button_pressed(Button.B, on_button_pressed_b)

# Main game loop
def on_forever():
    global player_x, player_y, gap_x, gap_y, score
    score = 0
    player_x = 2
    player_y = 4
    gap_y = -3
    gap_x = 2

    playing = True
    while playing:
        basic.pause(500 - score * 10)
        led.plot(player_x, player_y)
        move_walls()
        if player_y == gap_y and player_x != gap_x:
            basic.show_number(score)
            basic.pause(5000)
            basic.clear_screen()
            playing = False

basic.forever(on_forever)