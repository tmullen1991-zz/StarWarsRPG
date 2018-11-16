$(document).ready(function () {
    // cheat message on how to win to be displayed in console
    console.log("to win: attack right to left, attacking left to right will result in loss")

    //character stats

    var character1 = {
        id: "character1",
        hp: 100,
        attackPower: 13,
        counterPower: 50,
    }
    var character2 = {
        id: "character2",
        hp: 130,
        attackPower: 14,
        counterPower: 30,
    }

    var character3 = {
        id: "character3",
        hp: 150,
        attackPower: 15,
        counterPower: 20,
    }

    var character4 = {
        id: "character4",
        hp: 190,
        attackPower: 20,
        counterPower: 5,
    }


    //variables
    var characterArray = [character1, character2, character3, character4]
    var defeatedCount = 0;
    var currentEnemyId = 0;
    var currentHeroId = 0;
    var heroBaseAttack = 0;

    //fucntions
    function reset() {
        for (i = 0; i < 4; i++) {
            //reset character class
            $(document.getElementById("character" + (i + 1))).removeClass()
            $(document.getElementById("character" + (i + 1))).addClass("col-md-2 border border-dark px-4 my-3 mx-auto chose-character bg-black")
            //reset chrarecter stats
            $(document.getElementById("character" + (i + 1))).attr(characterArray[i])
            $(document.getElementById("character" + (i + 1) + ("hp"))).text(characterArray[i].hp)
            // move characters back to start if game reaches end
            $("#initial-div").append(document.getElementById("character" + (i + 1)))
        }
        // hide headings until character is moved to them and hide attack button until attack available
        $("#enemy-div").animate({ opacity: "0" })
        $("#hero-div").animate({ opacity: "0" })
        $("#defeat-div").animate({ opacity: "0" })
        $("#attack-button").animate({ opacity: "0" })
        $("#initial-heading").text("Select your Hero")
        $("#attack-values").text("")
        defeatedCount = 0;
        currentEnemyId = 0;
        currentHeroId = 0;
        heroBaseAttack = 0;
    }
    reset()

    function choseHero(hero) {
        for (i = 1; i < 5; i++) {
            if ($(hero).attr("id") === "character" + i && currentHeroId === 0) {
                // assign hero class to selected hero, move to hero div and create a one time currentHeroId value to prevent looping through this if statement until reset
                $("#character" + i).addClass("hero")
                $("#hero-div").append(document.getElementsByClassName("hero"));
                $("#initial-heading").text("Chose your Opponent")
                $("#hero-div").animate({ opacity: "1" })
                var x = 0
                x = i
            } else if (currentHeroId === 0) {
                // set all other chraracters to enemies
                $("#character" + i).addClass("enemy-class")
            }
        }
        if (currentHeroId === 0) {
            currentHeroId = x
        }
    }

    function selectEnemy(enemy) {
        for (i = 1; i < 5; i++) {
            if (currentEnemyId === 0) {
                // move slected enemy to enemy div and log a variable number that corresponds to the character id number, this will be used during the fights as ("character"+currentsEnemyId)
                var id = $(enemy).attr("id")
                if (("character" + i) == id) {
                    currentEnemyId = i;
                    $("#enemy-div").append(enemy);
                }
                $("#initial-heading").text("FIGHT!!!")
                $("#enemy-div").animate({ opacity: "1" })
                $("#attack-button").animate({ opacity: "1" })
            }
        }
    }

    //evetns
    $(document).on("click", ".chose-character", function () {
        choseHero(this);
    });

    $(document).on("click", ".enemy-class", function () {
        selectEnemy(this);
    });

    $(document).on("click", "#attack-button", function () {
        //fight variables
        var hero = document.getElementById("character" + currentHeroId)
        var enemy = document.getElementById("character" + currentEnemyId)
        // hero variables
        var heroAttack = parseInt($(hero).attr("attackPower"))
        var heroHp = parseInt($(hero).attr("hp"))
        var heroBaseAttack = characterArray[currentHeroId - 1].attackPower
        // enemy variables
        var enemyHp = parseInt($(enemy).attr("hp"))
        var enemyCounter = parseInt($(enemy).attr("counterPower"))
        // variables for changing display HP for hero and enemy
        var heroDisplayHp = document.getElementById("character" + currentHeroId + "hp")
        var enemyDisplayHp = document.getElementById("character" + currentEnemyId + "hp")

        // fight conditionals
        if (heroHp >= 0 && enemyHp >= 0) {
            // attack
            enemyHp = enemyHp - heroAttack
            $(enemy).attr("hp", enemyHp)
            $(enemyDisplayHp).text(enemyHp)
            // counter
            heroHp = heroHp - enemyCounter
            $(hero).attr("hp", heroHp)
            $(heroDisplayHp).text(heroHp)
            // increase attack
            heroAttack = heroAttack + heroBaseAttack
            $(hero).attr("attackPower", heroAttack)
            // display attack values
            $("#attack-values").text("You attacked for " + heroAttack + " HP damage! You got counter-attacked for " + enemyCounter + " HP damage :O")
        }
        // if enemy is defeated
        if (enemyHp <= 0) {
            $("#defeat-div").append(enemy)
            $(enemyDisplayHp).text("0")
            currentEnemyId = 0
            $("#defeat-div").animate({ opacity: "1" })
            $("#enemy-div").animate({ opacity: "0" })
            $("#initial-heading").text("Enemy Down! Select Another Enemy")
            defeatedCount++
            // if all enemies are defeated the game is reset and a a victory alert is displayed
            if (defeatedCount === 3) {
                reset()
                alert("Victory!!!")
                var victoryCount = 1
            }
        }
        // if hero is defeated game is reset and a defeat alert is displayed
        if (heroHp <= 0 && victoryCount !== 1) {
            alert("Defeat :(")
            reset()
        }
    });
});