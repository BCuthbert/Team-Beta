
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

#Simulates single key input
#Used exclusively as component in keyPress function 
def single_key_input(key_to_press, keyboard_event):
  js_event = f"window.dispatchEvent(new KeyboardEvent('{keyboard_event}', {{'key':'{key_to_press}'}}));"
  driver.execute_script(js_event)
  time.sleep(0.1)

#Simulates user input of key on keyboard, including key press down, holding, and key press release
def key_press(keyToPress, timeToWait):
  single_key_input(keyToPress, 'keydown')
  time.sleep(timeToWait)
  single_key_input(keyToPress, 'keyup')

def attack():
  actions = ActionChains(driver)

  #Change position of mouse
  actions.move_by_offset(100, 200)
  actions.click()
  #Change position of mouse
  actions.move_by_offset(-50, -25)
  actions.click() 

  actions.perform()

def test_setup():
  start_button = driver.find_element(By.XPATH, "/html/body/button[2]")
  #asserts that the button is on the screen 
  assert start_button.is_displayed()
  start_button.click()

  time.sleep(5)

  element_to_click = driver.find_element(By.ID, "defaultCanvas0")
  #asserts that the p5 game has actually loaded
  assert element_to_click.get_attribute("class") == "p5Canvas"

def test_movement():
  #test basic movement 
  key_press('d', 0.07)
  key_press('s', 1)
  key_press('d', 1)
  key_press('a', 0.25)

  key_press('w', 0.5)
  key_press('a', 0.5)
  key_press('s', 0.5)
  key_press('d', 0.5)

def test_basic_attacks():
#test attacks 
  attack()
  key_press('1', 0.1)
  attack() 
  time.sleep(0.5)

def test_special_actions():
  #test death through debug keybind
  key_press('y', 3)

  #test respawn through debug keybind
  key_press('r', 1)

  #test teleport through debug keybind
  key_press('t', 0.25)

  #test shield through debug keybind
  key_press('i', 0.25)

if __name__ == "__main__":
#Assumes selenium is correctly installed in the PATH
#Path errors can be caused by this line
  driver = webdriver.Chrome()

#navigate to website 
  driver.get("https://bcuthbert.github.io/Team-Beta/")

  #If you make this time shorter, the entire test will not run 
  time.sleep(3)

  test_setup()
  test_movement()
  test_basic_attacks()
  test_special_actions()


  time.sleep(2)

  driver.quit() 
