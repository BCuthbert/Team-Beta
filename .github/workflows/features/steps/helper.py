#This code navigates to and starts the game

from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

def begin_game(context):
  context.driver = webdriver.Chrome(); 
  context.driver.get('https://bcuthbert.github.io/Team-Beta/')
  start_button = context.driver.find_element(By.XPATH, "/html/body/button[2]") 
  time.sleep(2)
  start_button.click()
  return context

def single_key_input(context, key_to_press, keyboard_event):
  js_event = f"window.dispatchEvent(new KeyboardEvent('{keyboard_event}', {{'key':'{key_to_press}'}}));"
  context.driver.execute_script(js_event)
  time.sleep(0.1)

#Simulates user input of key on keyboard, including key press down, holding, and key press release
def key_press(context, keyToPress, timeToWait):
  single_key_input(context, keyToPress, 'keydown')
  time.sleep(timeToWait)
  single_key_input(context, keyToPress, 'keyup')
