from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from behave import given, when, then 
import time

#helper functions imported from helper.py
from features.steps.helper import key_press, begin_game


@given('that the level has loaded and the player character is at the spawn point')
def step_impl(context):
  context.driver = webdriver.Chrome()
  begin_game(context)

@when('I press the arrow keys')
def step_impl(context):
  key_press(context, 'd', 0.06)
  key_press(context, 's', 1)
  key_press(context, 'd', 1)
  key_press(context, 's', 2)
  key_press(context, 'd', 0.5)
  key_press(context, 'w', 0.5)
  key_press(context, 'd', 1)
  key_press(context, 'w', 0.5)
  key_press(context, 'd', 1.3)

@then('I should be able to walk from the spawn point to the next room')
def step_impl(context):
  key_press(context, 's', 1)
  key_press(context, 'd', 1)


