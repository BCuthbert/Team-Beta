
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

#Simulates single key input
#Used exclusively as component in keyPress function 
def singleKeyInput(keyToPress, keyboardEvent):
  jsEvent = f"window.dispatchEvent(new KeyboardEvent('{keyboardEvent}', {{'key':'{keyToPress}'}}));"
  driver.execute_script(jsEvent)
  time.sleep(0.1)

#Simulates user input of key on keyboard, including key press down, holding, and key press release
def keyPress(keyToPress, timeToWait):
  singleKeyInput(keyToPress, 'keydown')
  time.sleep(timeToWait)
  singleKeyInput(keyToPress, 'keyup')

def Attack():
  actions = ActionChains(driver)

  #Change position of mouse
  actions.move_by_offset(100, 200)
  actions.click()
  #Change position of mouse
  actions.move_by_offset(-50, -25)
  actions.click() 

  actions.perform()

def testSetup():
  startButton = driver.find_element(By.XPATH, "/html/body/button")
  #asserts that the button is on the screen 
  assert startButton.text == 'Begin Quest' 
  assert startButton.is_displayed()
  startButton.click()

  time.sleep(5)

  element_to_click = driver.find_element(By.ID, "defaultCanvas0")
  #asserts that the p5 game has actually loaded
  assert element_to_click.get_attribute("class") == "p5Canvas"

def testMovement():
  #test basic movement 
  keyPress('d', 0.07)
  keyPress('s', 1)
  keyPress('d', 1)
  keyPress('a', 0.25)

  keyPress('w', 0.5)
  keyPress('a', 0.5)
  keyPress('s', 0.5)
  keyPress('d', 0.5)

def testBasicAttacks():
#test attacks 
  Attack()
  keyPress('1', 0.1)
  Attack()
  keyPress('1', 0.1)
  Attack() 
  time.sleep(0.5)

def testSpecialActions():
  #test death through debug keybind
  keyPress('y', 3)

  #test respawn through debug keybind
  keyPress('r', 1)

  #test teleport through debug keybind
  keyPress('t', 0.25)

  #test shield through debug keybind
  keyPress('i', 0.25)

if __name__ == "__main__":
#Assumes selenium is correctly installed in the PATH
#Path errors can be caused by this line
  driver = webdriver.Chrome()

#navigate to website 
  driver.get("https://bcuthbert.github.io/Team-Beta/")

  #If you make this time shorter, the entire test will not run 
  time.sleep(2)

  testSetup()
  testMovement()
  testBasicAttacks()
  testSpecialActions()


  time.sleep(2)

  driver.quit() 
