# Circuit Playground HID Keyboard

import time

import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
from adafruit_hid.keycode import Keycode
from digitalio import DigitalInOut, Direction, Pull
from adafruit_circuitplayground import cp

# the keyboard object!
# sleep for a bit to avoid a race condition on some systems
time.sleep(1)
kbd = Keyboard(usb_hid.devices)
# we're americans :)
layout = KeyboardLayoutUS(kbd)

print("Waiting for button presses")

was_pressed = False

while True:
    # check each button
    # when pressed, the LED will light up,
    # when released, the keycode or string will be sent
    # this prevents rapid-fire repeats!
    if cp.touch_A1:
        was_pressed = True
    if not cp.touch_A1 and was_pressed:
        #layout.write(k)
        kbd.press(Keycode.SHIFT, Keycode.E)  # press...
        kbd.release_all()  # release!
        was_pressed = False

    time.sleep(0.01)
