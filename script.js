import * as bscEngine from './bscEngine/bscEngine.js'; // Importálunk mindent a bscEngine-ből

// Várunk, hogy betöltsön az oldal, csak utána hajtjuk végre a kódot
window.addEventListener('load', () => {
    // Megváltoztatjuk a játék nevét
    const title = new bscEngine.ChangeGameName('First game in engine');
    // Új jelenet (scene) készítése (canvas tag)
    const scene = bscEngine.createScene;

    // 2023.01.17. --- Basic game and canvas animation
    const canvas = document.getElementById('canvas1'); // Canvas lekérése ID alapján
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;
    // A játék osztály, ahol megírjuk a játékunkat
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.assets = new bscEngine.LoadAssets({
                'layer1' : 'ground',
                'layer2' : 'trees',
                'layer3' : 'mountains',
                'animated-player' : 'animated-player',
                'static-player' : 'static-player'
            }, 'png');
            //this.speed = 1;
            this.background = new bscEngine.ParallaxBackground(this, ['layer1', 'layer3', 'layer2'], [1, 0.2, 0.5], 1768, 500, 0, 0, 'left');
            this.player = new bscEngine.SideScrollerPlayer(this, 120, 190, 20, 100);
            this.player.controller = new bscEngine.SideScrollerController(this, this.player, 'ArrowUp', 'ArrowDown', ' ', 0.5, 3);
            this.player.shooter = new bscEngine.SideScrollerShooter(this, this.player, 10, 3, 3, 80, 30, 'right');
            //this.player.sprite = new bscEngine.StaticSprite('static-player', this.player);
            this.player.sprite = new bscEngine.AnimatedSprite('animated-player', this.player, 0, 0, 37);
            // Lőszer kezelése
            this.ammoTimer = 0;
            this.ammoInterval = 500;
            this.maxAmmo = 50;
            // UI elkészítése
            this.ui = new bscEngine.UI(this, 25, 'Helvetica', 'yellow');
            this.enemyGenerator = new bscEngine.EnemyGenerator(this, 56, 33.8, 'left');
            this.enemyTimer = 0;
            this.enemyInterval = 500;
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 100;
            this.physics = new bscEngine.Physics(this);
            this.gameTime = 0;
            this.timeLimit = 30000;
        }
        update(deltaTime) {
            this.background.update();
            if (!this.gameOver) this.gameTime += deltaTime;
            if (this.gameTime > this.timeLimit) this.gameOver = true;
            this.player.update();
            // Lőszer kezelése
            if (this.ammoTimer > this.ammoInterval) {
                if (this.player.ammo < this.maxAmmo) this.player.ammo++;
                this.ammoTimer = 0;
            }
            else {
                this.ammoTimer += deltaTime;
            }
            this.enemyGenerator.enemies.forEach(enemy => {
                enemy.update();
                if (this.physics.checkCollision(this.player, enemy) && !this.gameOver) {
                    if (this.score > 0) this.score -= 5;
                    enemy.markedForDeletion = true;
                }
                this.player.projectiles.forEach(projectile => {
                    if (this.physics.checkCollision(projectile, enemy)) {
                        enemy.lives--;
                        projectile.markedForDeletion = true;
                        if (enemy.lives <= 0) {
                            enemy.markedForDeletion = true;
                            if (!this.gameOver) this.score += 15;
                            if (this.score >= this.winningScore) this.gameOver = true;
                        }
                    }
                });
            });
            this.enemyGenerator.enemies = this.enemyGenerator.enemies.filter(enemy => !enemy.markedForDeletion);
            // Ellenségek generálásának kezelése
            if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
                // Random koordináták az ellenségek generálásához
                let x = this.width;
                let y = Math.random() * (this.height * 0.9 - 33.8);
                let speedX = Math.random() * -1.5 - 0.5;
                this.enemyGenerator.addEnemy(x, y, speedX, 5);
                this.enemyTimer = 0;
            }
            else {
                this.enemyTimer += deltaTime;
            }
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            // UI elemek kezelése
            context.save();
            this.ui.drawText(context, 'Pontszám: ' + this.score, 20, 40, 'white', 25, 'Helvetica');
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'black';
            this.ui.drawMultipleObjects(context, this.player.ammo, 20, 50, 3, 20, 5, 0);
            const formattedTime = (this.gameTime * 0.001).toFixed(1);
            this.ui.drawText(context, 'Idő: ' + formattedTime, 20, 100, 'blue', 20, 'Helvetica');
            if (this.gameOver) {
                this.enemyGenerator.enemies.forEach(enemy => {
                    enemy.markedForDeletion = true;
                });
                context.textAlign = 'center';
                let message;
                if (this.score >= this.winningScore) {
                    message = 'Gratulálok! Nyertél!';
                }
                else {
                    message = 'Vesztettél! Legközelebb több sikerrel jársz!';
                }
                this.ui.drawText(context, message, this.width*0.5, this.height*0.5, 'white', 40, 'Helvetica');
            } 
            context.restore();
            this.enemyGenerator.drawEnemies(context);
        }
    }
    
    let lastTime = 0;
    const game = new Game(canvas.width, canvas.height);
    // Animációs ciklus (60 FPS)
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Töröljük a korábban kirajzolt dolgokat
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate); // Végtelen ciklus lesz az animate argumentum miatt
    }
    animate(0);
});