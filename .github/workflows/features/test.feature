Feature: Start Game from Main Menu
  In order to begin the game
  As a user
  I want to click the 'begin adventure' button 
  To see the first level of the game

  Scenario: Clicking the 'Begin Adventure' Button from the Start Menu  
  Given The website has loaded and the Start Menu is visible
  When I click the Begin Adventure button 
  Then the Start Menu should disappear and the first level should become visible 