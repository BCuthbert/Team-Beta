from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from behave import given, when, then 
import time

#helper functions imported from helper.py
from features.steps.helper import key_press, begin_game

@given('that I have switched to the angle attack option')
def step_impl(context):
  context.driver = webdriver.Chrome()
  begin_game(context)
  key_press(context, 'd', 0.06)
  key_press(context, 's', 1)
  key_press(context, 'd', 1)
  key_press(context, '1', 0.1)
  key_press(context, '1', 0.1)

@when('I press the attack button and click to create the angle node')
def step_impl(context):
  angleShot = ActionChains(context.driver)
  angleShot.move_by_offset(120, 120)
  angleShot.click()
  angleShot.perform()
  time.sleep(0.5)
  angleShot.move_by_offset(68, 68)
  angleShot.perform()
  time.sleep(2)

@then('I am able to fire the attack on the second click')
def step_impl(context):
  angleShot = ActionChains(context.driver)
  angleShot.move_by_offset(120, 120)
  angleShot.click()
  angleShot.perform() 
  time.sleep(0.5)
  angleShot.move_by_offset(68, 68)
  angleShot.perform()
  time.sleep(2)


  


