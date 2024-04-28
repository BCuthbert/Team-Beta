This folder contains our Mermaid files. Both markdown (.mmd) and .png are provided.

enemyobject_diagram: A 'class' diagram of the enemy object

playerobject_diagram: A 'class diagram of the player object

p5object_diagram: A simplified 'class' diagram of the p5 object contained in p5, including simplified dependencies with other objects.

p5sequence_diagram: A sequence diagram of the actual p5.js application


png format can be recreated via these commands:
  npm install -g @mermaid-js/mermaid-cli (must be installed for both png and svg conversion)

  mmdc -i mermaid_files\p5object_diagram.mmd -o mermaid_files\p5object_diagram.png
  mmdc -i mermaid_files\enemyobject_diagram.mmd -o mermaid_files\enemyobject_diagram.png
  mmdc -i mermaid_files\playerobject_diagram.mmd -o mermaid_files\playerobject_diagram.png
  mmdc -i mermaid_files\p5sequence_diagram.mmd -o mermaid_files\p5sequence_diagram.png 

svg format can be recreated via these commands: 
  npm install -g @mermaid-js/mermaid-cli (must be installed for both png and svg conversion)

  mmdc -i mermaid_files\p5object_diagram.mmd -o mermaid_files\p5object_diagram.svg
  mmdc -i mermaid_files\enemyobject_diagram.mmd -o mermaid_files\enemyobject_diagram.svg
  mmdc -i mermaid_files\playerobject_diagram.mmd -o mermaid_files\playerobject_diagram.svg
  mmdc -i mermaid_files\p5sequence_diagram.mmd -o mermaid_files\p5sequence_diagram.svg



