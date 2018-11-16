# unit-4-game

# Star Wars RPFG ReadMe

1. How The Game Works:

    * The game works by prompting the player to chose one of four characters as a hero to fight the remaining three characters. After the hero is chosen the page prompts the player to chose an enemy to be fought one at a time until the hero's HP is gone or all enemies are defeated. When in combat, the player hits the attack button which cause the hero to attack the enemy's HP and the enemy to counter-attack the hero's HP. The hero's attack will increase each attack but counter attacks are constant values for each character.

2. How the page is structured:

    * The page is sectioned into divs with several divs not visable until a charater is chosen and moved to their respective hero, enemy, and defeated enemy divs. 

    * The visibilty is contorled within the game.js click statements. 

3. How the game script works:

    1. Where character stats are stored and how they are manipulated:

        * Initial character stats are stored in 4 objects: character1 through character4. A Reset function assigns the bojects properties as attributes for each characters HTML ID. As the game progresses the HTML attributes for each charater will be changed and not the object properties.

    2. Reset Function:

        * The reset function will be called upon page load, or after victory or defeat alert is called. It assigns character stats, as mentioned above, from each character's object and moves all character divs to their initial positions.

    3. Chose Hero function and click event:

        * Each character div has the class "chose-character" that when clicked on will call the choseHero function. The function uses a for loop for each character id and assigns the class "hero" to the character clicked on and the class "enemy" for all other characters. 
        
        * To prevent the player from chosing multiple heros an extra variable "currentHeroId" is changed to 1 and will prevent the function from looping through again and assigning multiple heros.

        * The function also appends the chosen hero to the hero-div and makes the heading visable.

    4. Select Enemy function:

        * A click event using the "enemy" class as the selector uses a for loop to match the charater ID of the clicked on enemy. The number is stored in the currentEnemyId variable so it can be called upon during the fight.

        * The function moves the selected character's div to the enemy div and changes the enemy header to be visable.

    5. Attack Button click event:

        * Clicking on the attack button triggers a click event that assign the hero and enemy attributes as varibales within the function and then attack, counter-attack and HP values are calculated.

        * If statements are used to hero and enemy HP. 
            
            * If both alive the attack calculations occur. 

            * If enemy below zero then the enemy is moved to the defeat div, currentEnemyId is set to 0 so the next enemy can be selected.

            * If all enemies are defeated a victory alert is displayed and the game is reset.

            * If hero hp drops below 0 a defeat alert is displayed and the game is reset.



    