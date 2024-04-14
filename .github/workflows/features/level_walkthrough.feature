Feature: Walk through first level 
  In order to progress through the level
  As a user
  I want to be able to use the arrow keys to navigate 
  To travel from the start to the end of the level 

  Scenario: Walking through the first level
  Given that the level has loaded and the player character is at the spawn point
  When I press the arrow keys
  Then I should be able to walk from the spawn point to the next room