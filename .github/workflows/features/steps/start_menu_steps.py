from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from behave import given, when, then 
import time

@given('The website has loaded and the Start Menu is visible')
def step_impl(context):
  context.driver = webdriver.Chrome()
  context.driver.get('https://bcuthbert.github.io/Team-Beta/')

  start_button = context.driver.find_element(By.XPATH, "/html/body/button")
  #asserts that the button is on the screen 
  assert start_button.text == 'Begin Quest'
  assert start_button.is_displayed()
  

@when('I click the Begin Adventure button')
def step_impl(context):
  start_button = context.driver.find_element(By.XPATH, "/html/body/button")
  #Waits until the animation has finished playing
  time.sleep(2)
  start_button.click()

@then('the Start Menu should disappear and the first level should become visible')
def step_impl(context):
  p5js_canvas = context.driver.find_element(By.ID, "defaultCanvas0")
  assert p5js_canvas.get_attribute("class") == "p5Canvas"
  time.sleep(1)