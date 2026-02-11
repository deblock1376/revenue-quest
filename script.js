const gameState = {
    screen: 'intro',
    hero: null,
    choice: null,
    experimentCount: 0,
    history: [],
    slayMode: false,
    defeatedDragons: [], // Track specifically which dragons were slain
    obstacleTimeouts: []
};

const content = {
    heroOptions: [
        { id: 'shield', title: 'The Shield 🛡️', desc: '"I want to protect the donors I have and stop the \'Leaky Bucket\' of churn."' },
        { id: 'alchemist', title: 'The Alchemist 🧪', desc: '"I want to connect Instagram audiences to our audience funnel and turn interest into impact."' },
        { id: 'truth-teller', title: 'The Truth-Teller 🗣️', desc: '"I want to stop selling mugs and start selling the mission of our newsroom."' },
        { id: 'navigator', title: 'The Navigator 🧭', desc: '"I want to grow mid-level ($1,000–$4,999) donors with Moves Management and strategic outreach."' },
        { id: 'architect', title: 'The Architect 🏰', desc: '"I want to grow my email contact lists and list-building strategies beyond Meta/Google dependency."' }
    ],
    battles: {
        shield: {
            text: "The Churn Monster is attacking! You know that top-tier newsrooms achieve 86% retention. Do you try to Deconstruct successful frameworks or Test automated re-engagement workflows?",
            defeatStrategy: "Implementing a Deconstructed Retention Framework",
            dragon: { name: "Dragon of Legacy Churn", icon: "🐉", color: "#EF4444" },
            options: [
                { id: 'shield-1', label: 'Deconstruct successful frameworks' },
                { id: 'shield-2', label: 'Test automated re-engagement' },
                { id: 'dragon', label: 'Ignore the churn and wait for better luck' }
            ]
        },
        alchemist: {
            text: "You’ve built a following, but the funnel is clogged. Do you use Instagram Native Tools for lead generation or Deploy strategic link-in-bio pathing to move followers to your owned channels?",
            defeatStrategy: "Strategic Audience Funnel Connectivity",
            dragon: { name: "Dragon of Clogged Funnels", icon: "🐍", color: "#10B981" },
            options: [
                { id: 'alchemist-1', label: 'Use Instagram Lead Gen Tools' },
                { id: 'alchemist-2', label: 'Deploy Strategic Pathing' },
                { id: 'dragon', label: 'Post more memes and hope for the best' }
            ]
        },
        'truth-teller': {
            text: "A villager asks: 'Why should I give if I don't get a tote bag?'. Do you Deploy mission-first messaging or Run a standardized membership survey?",
            defeatStrategy: "Mission-First Value Proposition",
            dragon: { name: "Dragon of Tote-Bag Dependency", icon: "🦖", color: "#F59E0B" },
            options: [
                { id: 'truth-1', label: 'Deploy mission-first messaging' },
                { id: 'truth-2', label: 'Run a standardized membership survey' },
                { id: 'dragon', label: 'Buy more tote bags in bulk' }
            ]
        },
        navigator: {
            text: "Potential mid-level donors ($1,000–$4,999) are hidden in your data! Do you focus on Alpha-Data enrichment or Implement a formal Moves Management outreach strategy?",
            defeatStrategy: "Institutionalized Moves Management",
            dragon: { name: "Dragon of Static Data", icon: "🐊", color: "#4F46E5" },
            options: [
                { id: 'nav-1', label: 'Enrich Your Donor Data' },
                { id: 'nav-2', label: 'Start Moves Management' },
                { id: 'dragon', label: 'Wait for them to mail a check' }
            ]
        },
        architect: {
            text: "The dependency on giant platforms is a risky foundation! How do you build your own email fortress? Do you deploy 'Referral Quest' mechanics or Implement high-conversion 'On-Site' capture archetypes?",
            defeatStrategy: "Diversified List-Building (Beyond Meta)",
            dragon: { name: "Dragon of Meta-Land Dependency", icon: "🐉", color: "#6366F1" },
            options: [
                { id: 'arch-1', label: 'Deploy Referral Quest Mechanics' },
                { id: 'arch-2', label: 'Implement High-Conversion Capture' },
                { id: 'dragon', label: 'Keep building on Meta/Google land' }
            ]
        }
    },
    victory: {
        squads: ["Independent Local Newsrooms", "Mission-Driven Publishers", "Community-Led Scouts"],
        loots: {
            shield: "the 'Retention Playbook' & 'Automated Guard' gear.",
            alchemist: "the 'Audience Funnel' blueprint & 'Funnel-Mapper' lens.",
            'truth-teller': "the 'Mission-First' manifesto & 'Loyalty Shield'.",
            navigator: "the 'Mid-Level Donor' map & 'Moves Management' playbook.",
            architect: "the 'Non-Meta Email Growth' blueprints & 'Architect of the List' title."
        }
    }
};

const renderScreen = () => {
    const container = document.getElementById('game-container');
    container.innerHTML = '';

    // Add a wrapper for animations
    const screenDiv = document.createElement('div');
    screenDiv.className = 'screen';
    container.appendChild(screenDiv);

    if (gameState.screen === 'intro') {
        const p1 = gameState.experimentCount >= 1 ? 118 : 0;
        const p2 = gameState.experimentCount >= 2 ? 238 : 122;
        const p3 = gameState.experimentCount >= 3 ? 358 : 242;
        const isSpinning = gameState.experimentCount >= 3;

        screenDiv.innerHTML = `
            <h1>The Quest for the Sustainable Newsroom 2026 🏰</h1>
            <div class="flywheel-container">
                <div class="flywheel ${isSpinning ? 'spinning' : ''}" 
                     style="--p1: ${p1}deg; --p2: ${p2}deg; --p3: ${p3}deg;"></div>
                <div class="flywheel-inner">
                    ${isSpinning ? '⚙️' : '💡'}
                </div>
            </div>
            
            ${gameState.history.length > 0 ? `
                <div class="experiment-history">
                    <h4>High-Maturity Strategies Log:</h4>
                    ${gameState.history.map(item => `
                        <div class="history-item">✅ <strong>${item}</strong></div>
                    `).join('')}
                </div>
            ` : ''}

            <div class="dragon-progress-ui" style="margin-bottom: 2rem; width: 100%; max-width: 600px; text-align: left;">
                <h4 style="color: var(--ruby); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 1rem; opacity: 0.8;">Quest for Sustainable Island:</h4>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${content.heroOptions.map(hero => {
            const isDefeated = gameState.defeatedDragons.includes(hero.id);
            const battle = content.battles[hero.id];
            return `
                            <div style="background: ${isDefeated ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)'}; 
                                        border: 1px solid ${isDefeated ? 'var(--emerald)' : 'rgba(255,255,255,0.1)'}; 
                                        padding: 0.5rem 1rem; border-radius: 999px; font-size: 0.8rem; 
                                        opacity: ${isDefeated ? '1' : '0.5'}; display: flex; align-items: center; gap: 0.5rem;
                                        transition: var(--transition-standard);">
                                <span>${battle.dragon.icon}</span>
                                <span style="font-weight: bold; color: ${isDefeated ? 'var(--emerald)' : 'inherit'}">${isDefeated ? 'SLAIN' : hero.title.split(' ')[1]}</span>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>

            <p class="narrative">
                "Welcome, Hero! You’ve been tasked with saving your city from the 'Revenue Drought.' 
                In 2025, our scouts (the Solutions Lab) ran 50+ experiments to find the oasis. 
                Now, in 2026, we are moving from building the lab to scaling impact. 
                This year, it’s about <strong>Quality over Quantity</strong>—fewer experiments, deeper focus, and bigger wins."
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="action-btn" onclick="startAdventure()">Start Your Adventure</button>
                ${isSpinning ? `<button class="action-btn" style="background: var(--ruby)" onclick="slayDragons()">Slay Dragons 🐲</button>` : ''}
            </div>
        `;
    } else if (gameState.screen === 'choice') {
        screenDiv.innerHTML = `
            <h2>Choose Your Hero’s Power</h2>
            <p class="narrative">Every hero has a unique strength. Which one does your newsroom want to master this year?</p>
            <div class="options-grid">
                ${content.heroOptions.map(hero => `
                    <div class="option-card" onclick="selectHero('${hero.id}')">
                        <h3>${hero.title}</h3>
                        <p>${hero.desc}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (gameState.screen === 'battle') {
        const battle = content.battles[gameState.hero];
        screenDiv.innerHTML = `
            <div class="battle-container">
                <h2 style="color: var(--ruby); margin-bottom: 1rem;">⚔️ The "Quality" Boss Battle</h2>
                <p class="narrative" style="color: var(--text-white); margin-bottom: 2rem;">${battle.text}</p>
                <div class="options-grid" style="grid-template-columns: 1fr; max-width: 450px; margin: 0 auto;">
                    ${battle.options.map(opt => `
                        <button class="action-btn" onclick="${opt.id === 'dragon' ? "nextScreen('dragon-play')" : `completeBattle('${opt.label}')`}">${opt.label}</button>
                    `).join('')}
                    <button class="action-btn" style="background: var(--text-muted); opacity: 0.7; margin-top: 1rem;" onclick="nextScreen('choice')">Reset Choice</button>
                </div>
            </div>
        `;
    } else if (gameState.screen === 'dragon-play') {
        const canDefeat = gameState.experimentCount >= 3;
        const battle = content.battles[gameState.hero];
        const dragonInfo = battle.dragon;
        screenDiv.innerHTML = `
            <div class="dragon-screen" style="padding: 1rem; border-color: ${dragonInfo.color}; box-shadow: 0 0 50px ${dragonInfo.color}88;">
                <h2 style="color: ${dragonInfo.color}; margin-bottom: 0.5rem; z-index: 1; position: relative; text-transform: uppercase;">${dragonInfo.name} Encounter</h2>
                <p class="narrative" style="color: white; font-size: 1rem; z-index: 1; position: relative; margin-bottom: 1rem;">
                    ${canDefeat ? `The ${dragonInfo.name} awaits. You have enough data to deconstruct its legacy!` : `The ${dragonInfo.name} is too powerful! Try to jump over it...`}
                </p>
                <div id="game-area" class="game-area" style="background: linear-gradient(to bottom, ${dragonInfo.color}44, #000); border-color: ${dragonInfo.color};">
                    <div id="hero">🦸</div>
                    <div class="ground" style="background: ${dragonInfo.color};"></div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; z-index: 1; position: relative;">
                    <p id="game-status" style="font-weight: bold; color: var(--gold);">Experiments: ${gameState.experimentCount}/3</p>
                    <button class="action-btn" style="background: var(--text-muted); font-size: 0.8rem; padding: 0.5rem 1rem;" onclick="nextScreen('choice')">Reset Choice</button>
                </div>
            </div>
        `;
        startDragonScroller();
    } else if (gameState.screen === 'dragon') {
        const canDefeat = gameState.experimentCount >= 3;
        const battle = content.battles[gameState.hero];
        const dragonInfo = battle.dragon;
        const allSlain = gameState.defeatedDragons.length >= 5;

        screenDiv.innerHTML = `
            <div class="dragon-screen" style="border-color: ${dragonInfo.color}; box-shadow: 0 0 50px ${dragonInfo.color}88;">
                <div class="fire-bg" style="background: linear-gradient(0deg, ${dragonInfo.color}33, transparent);"></div>
                <h1 style="color: ${dragonInfo.color}; font-size: 3rem; z-index: 1; position: relative; font-family: 'Outfit';">${dragonInfo.icon} ${dragonInfo.name.toUpperCase()} ${dragonInfo.icon}</h1>
                <p class="narrative" style="color: white; z-index: 1; position: relative; margin: 2rem 0;">
                    ${canDefeat ?
                `Huzzah! You've run 3+ 'experiments' in the Solutions Lab. You've deconstructed the ${dragonInfo.name}. <br><br><strong>High-Quality Strategy Unlocked:</strong> ${battle.defeatStrategy}!` :
                `The ${dragonInfo.name} blocks your path! 'Fortune favors the bold, not the passive,' it roars.`}
                </p>
                <div style="z-index: 1; position: relative;">
                    ${canDefeat ?
                (allSlain ?
                    `<button class="action-btn" style="background: var(--emerald)" onclick="nextScreen('sustainable-island')">All Dragons Slain! Set Sail?</button>` :
                    `<button class="action-btn" style="background: var(--primary)" onclick="nextScreen('intro')">Dragon Slain! Continue the Quest (${gameState.defeatedDragons.length}/5)</button>`) :
                `<button class="action-btn" onclick="failQuest()">Return to the Solutions Lab (Try Again)</button>`}
                </div>
                <p style="color: var(--gold); z-index: 1; position: relative; margin-top: 1.5rem;">Total Experiments: ${gameState.experimentCount} | Dragons Defeated: ${gameState.defeatedDragons.length}/5</p>
            </div>
        `;
    } else if (gameState.screen === 'sustainable-island') {
        screenDiv.innerHTML = `
            <div class="island-screen">
                <div class="island-bg"></div>
                <h1 class="island-title">SUSTAINABLE ISLAND 🏝️</h1>
                <div class="palm-container">
                    <div class="palm">🌴</div>
                    <div class="palm">🥥</div>
                    <div class="palm">🌴</div>
                </div>
                <p class="narrative" style="color: white; font-weight: 600; font-size: 1.5rem; z-index: 1; position: relative;">
                    "Ahoy, Hero! You've navigated the treacherous waters of the 'Revenue Drought' and deconstructed the 'Dragon of the Status Quo'!"
                </p>
                <p class="narrative" style="color: var(--text-muted); z-index: 1; position: relative; margin-bottom: 3rem;">
                    By running deliberate experiments and mastering high-maturity strategies, you've reached the pinnacle of sustainability. 
                    The oasis isn't just a dream—it's your new home.
                </p>
                <div style="z-index: 1; position: relative;">
                    <button class="action-btn" style="background: var(--emerald)" onclick="nextScreen('victory')">Claim Your invitation to the Lab</button>
                </div>
            </div>
        `;
    } else if (gameState.screen === 'side-scroller') {
        screenDiv.innerHTML = `
            <h2>Hero Challenge: Reach the Oasis!</h2>
            <p class="narrative">Jump over the "Churn Monsters" and "Leaky Buckets" using the <strong>SPACEBAR</strong> or <strong>Touch</strong> to reach the Sustainable Oasis!</p>
            <div id="game-area" class="game-area">
                <div id="hero">🛡️</div>
                <div class="ground"></div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                <p id="game-status" style="font-weight: bold;">Progress: 0%</p>
                <button class="action-btn" style="background: var(--text-muted); font-size: 0.8rem; padding: 0.5rem 1rem;" onclick="nextScreen('choice')">Give Up & Restart</button>
            </div>
        `;
        startSideScroller();
    } else if (gameState.screen === 'victory') {
        const loot = content.victory.loots[gameState.hero] || "the 'General Sustainability' playbook.";
        screenDiv.innerHTML = `
            <div class="victory-card">
                <h1 style="font-size: 3.5rem; margin-bottom: 0.5rem;">VICTORY! 🏆</h1>
                <p class="narrative" style="color: var(--emerald); font-weight: 600;">You’ve unlocked your 2026 Work Group Invitation!</p>
                
                <div style="text-align: left; margin: 2rem 0; background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 1rem;">
                    <p style="margin-bottom: 1rem;"><strong>🛡️ Your Squad:</strong> Joined by fellow heroes like ${content.victory.squads.join(', ')}.</p>
                    <p style="margin-bottom: 1rem;"><strong>💎 The Loot:</strong> You’ll help create ${loot}</p>
                    <p style="color: var(--gold); border-top: 1px solid rgba(255,255,255,0.1); pt-1rem; margin-top: 1rem; padding-top: 1rem;">
                    </p>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="action-btn" style="background: linear-gradient(135deg, var(--gold), #D97706); color: black; font-weight: 800;" onclick="complete()">
                        Sign Me Up!
                    </button>
                    <button class="action-btn" style="background: var(--primary); opacity: 0.8;" onclick="nextScreen('intro')">
                        Play Again
                    </button>
                </div>
            </div>
        `;
    }
};

window.nextScreen = (screen) => {
    // Clear any active game loops
    if (gameState.gameInterval) clearInterval(gameState.gameInterval);
    if (gameState.obstacleTimeouts) gameState.obstacleTimeouts.forEach(t => clearTimeout(t));
    gameState.obstacleTimeouts = [];

    gameState.screen = screen;
    window.scrollTo(0, 0);
    renderScreen();
};

window.selectHero = (heroId) => {
    gameState.hero = heroId;
    if (gameState.slayMode) {
        nextScreen('dragon-play');
    } else {
        nextScreen('battle');
    }
};

window.startAdventure = () => {
    gameState.slayMode = false;
    nextScreen('choice');
};

window.slayDragons = () => {
    gameState.slayMode = true;
    nextScreen('choice');
};

// Transition from Battle to Side Scroller
window.completeBattle = (label) => {
    gameState.experimentCount++;
    if (label && !gameState.history.includes(label)) {
        gameState.history.push(label);
    }
    console.log(`Success Experiment ${gameState.experimentCount}: ${label}`);
    nextScreen('side-scroller');
};

window.failQuest = () => {
    nextScreen('intro');
};

const jump = () => {
    const hero = document.getElementById('hero');
    if (hero && !hero.classList.contains('jump')) {
        // Evolutionary Jump: 4 Discrete Levels (closer together)
        let height = 100; // Level 0
        if (gameState.experimentCount === 1) height = 150; // Level 1
        else if (gameState.experimentCount === 2) height = 200; // Level 2
        else if (gameState.experimentCount >= 3) height = 250; // Level 3+ (Peak Maturity)

        hero.style.setProperty('--jump-height', `${height}px`);
        hero.classList.add('jump');
        setTimeout(() => hero.classList.remove('jump'), 500);
    }
};

const showFeedback = (text) => {
    const gameArea = document.getElementById('game-area');
    if (!gameArea) return;

    // Prevent multiple messages from stacking too much
    if (document.querySelector('.game-feedback')) return;

    const feedback = document.createElement('div');
    feedback.className = 'game-feedback';
    feedback.innerText = text;
    feedback.style.cssText = `
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: var(--gold);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: bold;
        border: 1px solid var(--gold);
        z-index: 100;
        pointer-events: none;
        animation: fadeIn 0.3s ease-out forwards;
    `;
    gameArea.appendChild(feedback);

    setTimeout(() => {
        feedback.style.animation = 'fadeIn 0.3s reverse forwards';
        setTimeout(() => feedback.remove(), 300);
    }, 1500);
};

const startDragonScroller = () => {
    const hero = document.getElementById('hero');
    const gameArea = document.getElementById('game-area');
    const status = document.getElementById('game-status');
    let isGameOver = false;
    const canDefeat = gameState.experimentCount >= 3;

    // Set Hero Icon
    const icons = { shield: '🛡️', alchemist: '🧪', 'truth-teller': '🗣️', navigator: '🧭', architect: '🏰' };
    hero.innerText = icons[gameState.hero] || '🦸';

    const checkCollision = (dragon) => {
        const check = setInterval(() => {
            if (isGameOver) {
                clearInterval(check);
                return;
            }
            const heroRect = hero.getBoundingClientRect();
            const dragonRect = dragon.getBoundingClientRect();

            if (
                heroRect.right > dragonRect.left &&
                heroRect.left < dragonRect.right &&
                heroRect.bottom > dragonRect.top &&
                heroRect.top < dragonRect.bottom
            ) {
                if (canDefeat) {
                    isGameOver = true;
                    dragon.style.display = 'none';
                    dragon.remove();

                    // Record victory for this specific hero's dragon
                    if (!gameState.defeatedDragons.includes(gameState.hero)) {
                        gameState.defeatedDragons.push(gameState.hero);
                    }

                    setTimeout(() => nextScreen('dragon'), 500);
                } else {
                    isGameOver = true;
                    gameState.experimentCount++;
                    const battle = content.battles[gameState.hero];
                    const choiceLabel = battle.options.find(opt => opt.id === 'dragon').label;
                    if (!gameState.history.includes(choiceLabel)) {
                        gameState.history.push(choiceLabel);
                    }
                    console.log(`Experiment ${gameState.experimentCount} completed: ${choiceLabel}`);
                    alert("The Dragon of the Status Quo is too tall! You need more experiments to deconstruct its fire.");
                    nextScreen('dragon');
                }
                clearInterval(check);
            }
        }, 10);
        return check;
    };

    const spawnDragon = () => {
        if (isGameOver) return;

        const battle = content.battles[gameState.hero];
        const dragonInfo = battle.dragon;

        const dragon = document.createElement('div');
        dragon.className = 'obstacle slide';
        dragon.innerText = dragonInfo.icon;
        dragon.style.fontSize = '80px';
        dragon.style.width = '100px';
        dragon.style.height = '150px'; // Too tall to jump over
        dragon.style.bottom = '0';
        dragon.style.color = dragonInfo.color;
        dragon.style.display = 'flex';
        dragon.style.alignItems = 'flex-end';
        dragon.style.justifyContent = 'center';
        dragon.style.textShadow = `0 0 20px ${dragonInfo.color}`;

        gameArea.appendChild(dragon);
        checkCollision(dragon);

        setTimeout(() => {
            if (dragon.parentNode) {
                dragon.remove();
                if (!isGameOver && canDefeat) {
                    isGameOver = true;
                    nextScreen('dragon');
                }
            }
        }, 2000);
    };

    setTimeout(() => spawnDragon(), 1000);
};

const startSideScroller = () => {
    const hero = document.getElementById('hero');
    const gameArea = document.getElementById('game-area');
    const status = document.getElementById('game-status');
    let progress = 0;
    let collectedCount = 0;
    let isGameOver = false;

    // Set Hero Icon based on choice
    const icons = { shield: '🛡️', alchemist: '🧪', 'truth-teller': '🗣️', navigator: '🧭', architect: '🏰' };
    hero.innerText = icons[gameState.hero] || '🦸';

    const checkCollision = (item, onCollect) => {
        const check = setInterval(() => {
            if (isGameOver) {
                clearInterval(check);
                return;
            }
            const heroRect = hero.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();

            if (
                heroRect.right > itemRect.left &&
                heroRect.left < itemRect.right &&
                heroRect.bottom > itemRect.top &&
                heroRect.top < itemRect.bottom
            ) {
                clearInterval(check);
                onCollect();
            }
        }, 10);
        return check;
    };

    const spawnEntity = (type) => {
        if (isGameOver || progress >= 100) return;

        const entity = document.createElement('div');
        if (type === 'obstacle') {
            const obstacleIcons = ['👹', '🪣', '📉'];
            entity.className = 'obstacle slide';
            entity.innerText = obstacleIcons[Math.floor(Math.random() * obstacleIcons.length)];
            gameArea.appendChild(entity);

            checkCollision(entity, () => {
                isGameOver = true;
                alert("The Churn Monster caught you! Try again!");
                nextScreen('side-scroller');
            });
        } else {
            const collectibleIcons = ['💰', '❤️', '💎', '⭐'];
            entity.className = 'collectible slide';

            // Strategic Near-Miss Logic: Reach increases with experiments
            let currentJump = 100;
            if (gameState.experimentCount === 1) currentJump = 150;
            else if (gameState.experimentCount === 2) currentJump = 200;
            else if (gameState.experimentCount >= 3) currentJump = 250;

            // Intentionally spawn a high percentage of "teasing" rewards just out of reach
            // until the player reaches Level 3 maturity
            const isTeasing = Math.random() < 0.7 && gameState.experimentCount < 3;
            let targetHeight;

            if (isTeasing) {
                // Spawn 30-80px above current peak reach to guarantee a miss
                targetHeight = currentJump + 30 + Math.random() * 50;
            } else {
                // Spawn at reachable heights
                targetHeight = 60 + Math.random() * (currentJump - 30);
            }

            entity.style.bottom = targetHeight + 'px';
            entity.innerText = collectibleIcons[Math.floor(Math.random() * collectibleIcons.length)];
            gameArea.appendChild(entity);

            checkCollision(entity, () => {
                collectedCount++;
                entity.wasCollected = true;
                entity.style.display = 'none';
                entity.remove();
            });

            // Near Miss Detection: Triggers when the hero is horizontally aligned but vertically too low
            const nearMissCheck = setInterval(() => {
                if (isGameOver || entity.wasCollected || !entity.parentNode) {
                    clearInterval(nearMissCheck);
                    return;
                }
                const heroRect = hero.getBoundingClientRect();
                const itemRect = entity.getBoundingClientRect();

                // Detection window: hero is passing under the item
                if (heroRect.right > itemRect.left && heroRect.left < itemRect.right) {
                    // Check if they missed it vertically from below
                    // (Hero's top is below item's bottom)
                    const verticalMiss = heroRect.top - itemRect.bottom;
                    if (verticalMiss > 0 && verticalMiss < 80 && gameState.experimentCount < 3) {
                        showFeedback("Keep experimenting to jump higher!");
                        clearInterval(nearMissCheck);
                    }
                }
            }, 50);
        }

        setTimeout(() => {
            if (entity.parentNode) entity.remove();
        }, 2000);

        // Significantly more frequent spawns and higher reward density
        const nextSpawn = Math.max(300, (600 + Math.random() * 800) - (gameState.experimentCount * 80));
        // More rewards (collectible) as you mature, fewer obstacles
        const obstacleChance = Math.max(0.15, 0.4 - (gameState.experimentCount * 0.08));
        gameState.obstacleTimeouts.push(setTimeout(() => spawnEntity(Math.random() < obstacleChance ? 'obstacle' : 'collectible'), nextSpawn));
    };

    spawnEntity('obstacle');

    gameState.gameInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(gameState.gameInterval);
            return;
        }

        if (progress < 100) {
            progress += 0.5;
            status.innerHTML = `Progress: ${Math.floor(progress)}% | Supporters Gained: <strong>${collectedCount}</strong>`;

            if (progress >= 100) {
                spawnFlagpole();
            }
        }
    }, 50);

    const spawnFlagpole = () => {
        const flagpole = document.createElement('div');
        flagpole.className = 'flagpole slide';
        flagpole.innerHTML = `<div class="flag">EXPERIMENT!</div>`;
        gameArea.appendChild(flagpole);

        const checkFlagCollision = setInterval(() => {
            if (isGameOver) {
                clearInterval(checkFlagCollision);
                return;
            }
            const heroRect = hero.getBoundingClientRect();
            const poleRect = flagpole.getBoundingClientRect();

            if (heroRect.right > poleRect.left + 5) {
                clearInterval(checkFlagCollision);
                finishLevel(flagpole);
            }
        }, 10);
    };

    const finishLevel = (pole) => {
        isGameOver = true;
        hero.classList.add('hero-slide');
        const flag = pole.querySelector('.flag');
        if (flag) flag.classList.add('flag-raise');

        // Sparkle effect
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'victory-sparkle';
                sparkle.innerText = '✨';
                sparkle.style.left = (Math.random() * 100) + '%';
                sparkle.style.top = (Math.random() * 100) + '%';
                gameArea.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 800);
            }, i * 100);
        }

        setTimeout(() => {
            const miniDragon = document.createElement('div');
            miniDragon.innerText = '🐲';
            miniDragon.style.cssText = `
                position: absolute;
                right: -100px;
                top: 30%;
                font-size: 3rem;
                z-index: 10;
                transition: all 3.5s linear;
            `;
            gameArea.appendChild(miniDragon);

            setTimeout(() => {
                miniDragon.style.right = '110%';
                miniDragon.style.transform = 'scaleX(-1) rotate(-10deg)';
                showFeedback("Slay the dragon!");
            }, 100);

            setTimeout(() => {
                gameState.score = collectedCount;
                nextScreen('victory');
            }, 3700);
        }, 1500);
    };
};

window.complete = () => {
    window.open('https://3.basecamp.com/5410030/buckets/42083646/messages/9565526109', '_blank');
};

document.addEventListener('DOMContentLoaded', () => {
    renderScreen();

    // Global Event Listeners for Game Interaction
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') jump();
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('#game-area')) jump();
    });
});
