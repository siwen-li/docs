/* docs/assets/custom.js */

/**
 * =============================================================================
 * 模块一：答案之书 (Answer Book)
 * =============================================================================
 */
function initAnswerBook() {
    const container = document.getElementById('typewriter-container');
    const textElement = document.getElementById('typewriter-text');
    const cursorElement = document.getElementById('typewriter-cursor');

    if (!container || !textElement) return;
    if (container.dataset.initialized === 'true') return;
    container.dataset.initialized = 'true';

    let isAnimating = false; 
    const initialText = "答案之书";
    const config = { typeSpeed: 120, deleteSpeed: 60, loadingText: "正在探寻...", apiUrl: 'https://60s.viki.moe/v2/answer' };

    textElement.textContent = initialText;
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const deleteText = async () => {
        let currentText = textElement.textContent;
        while (currentText.length > 0) {
            currentText = currentText.slice(0, -1);
            textElement.textContent = currentText;
            await wait(config.deleteSpeed);
        }
    };

    const typeText = async (text) => {
        for (let i = 0; i < text.length; i++) {
            textElement.textContent += text.charAt(i);
            await wait(config.typeSpeed);
        }
    };

    const fetchAnswer = async () => {
        try {
            const controller = new AbortController();
            setTimeout(() => controller.abort(), 5000);
            const response = await fetch(config.apiUrl, { signal: controller.signal, headers: { 'Accept': 'application/json' }});
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            return (data.code === 200 && data.data && data.data.answer) ? data.data.answer : "心中的疑惑，终有定数";
        } catch (error) {
            return "心中的疑惑，终有定数"; 
        }
    };

    const startJourney = async () => {
        if (isAnimating) return;
        isAnimating = true;
        if (cursorElement) { cursorElement.style.animation = 'none'; cursorElement.style.opacity = '1'; }
        await deleteText();
        const loadingPromise = typeText(config.loadingText);
        const fetchPromise = fetchAnswer();
        await loadingPromise; 
        const answer = await fetchPromise;
        await wait(300); 
        await deleteText();
        await typeText(answer);
        if (cursorElement) cursorElement.style.animation = 'blink 1.5s infinite';
        isAnimating = false;
    };

    container.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => this.style.transform = '', 150);
        startJourney();
    });

    if (!window.answerBookKeyHandler) {
        window.answerBookKeyHandler = function(e) {
            const currentContainer = document.getElementById('typewriter-container');
            if (currentContainer && (e.key === 'a' || e.key === 'A')) {
                currentContainer.click();
            }
        };
        document.addEventListener('keydown', window.answerBookKeyHandler);
    }
}


/**
 * =============================================================================
 * 模块二：天气组件 (Weather Widget)
 * =============================================================================
 */
function initWeather() {
    const container = document.getElementById('viki-weather-container');
    if (!container) return;

    // 防止重复请求，如果已经有内容就不再请求(可选)
    // 但为了实时性，这里每次都刷新
    
    const apiUrl = 'https://60s.viki.moe/v2/weather?query=%E5%AE%89%E9%A1%BA%E5%B8%82'; 
    container.innerHTML = '<span>⌛ 正在加载天气...</span>';

    let floatTip = document.getElementById('weather-float-tip');
    if (!floatTip) {
        floatTip = document.createElement('div');
        floatTip.id = 'weather-float-tip';
        document.body.appendChild(floatTip);
    }

    fetch(apiUrl)
        .then(res => res.json())
        .then(res => {
            if (res.code === 200) {
                const w = res.data.weather;
                const air = res.data.air_quality;
                const loc = res.data.location;
                const indices = res.data.life_indices;
                const getIndex = (key, name) => indices.find(i => i.key === key) || { name, level: '-', description: '暂无' };
                const clothes = getIndex('clothes', '穿衣');
                const comfort = getIndex('comfort', '舒适度');
                
                container.innerHTML = `
                    <span class="w-item">📍 ${loc.city}</span><span class="w-split">|</span>
                    <span class="w-item"><b>${w.condition}</b> ${w.temperature}°C</span><span class="w-split">|</span>
                    <span class="w-item">🌬️ ${w.wind_direction} ${w.wind_power}级</span><span class="w-split">|</span>
                    <span class="w-item">🍃 空气${air.quality} ${air.aqi}</span><span class="w-split">|</span>
                    <span class="w-item w-interactive" data-desc="${clothes.description}">👕 ${clothes.name}: ${clothes.level}</span><span class="w-split">|</span>
                    <span class="w-item w-interactive" data-desc="${comfort.description}">😌 ${comfort.name}: ${comfort.level}</span>
                `;

                container.querySelectorAll('.w-interactive').forEach(item => {
                    item.addEventListener('mouseenter', (e) => {
                        floatTip.textContent = item.getAttribute('data-desc');
                        floatTip.style.display = 'block';
                        updatePos(e, floatTip);
                    });
                    item.addEventListener('mousemove', (e) => updatePos(e, floatTip));
                    item.addEventListener('mouseleave', () => floatTip.style.display = 'none');
                });
            } else { container.innerText = '❌ 天气加载失败'; }
        })
        .catch(() => container.innerText = '❌ 天气服务不可用');

    function updatePos(e, tip) {
        const x = e.clientX + 15, y = e.clientY + 15;
        tip.style.left = (x + tip.offsetWidth > window.innerWidth ? e.clientX - tip.offsetWidth - 10 : x) + 'px';
        tip.style.top = y + 'px';
    }
}






/**
 * =============================================================================
 * 模块：一言 (Hitokoto)
 * =============================================================================
 */
function initHitokoto() {
    // 注意：这里 ID 改成了 hitokoto-container
    const container = document.getElementById('hitokoto-container');
    const textEl = document.getElementById('hitokoto-text');

    if (!container || !textEl) return;
    
    if (container.dataset.init === 'done') return;
    container.dataset.init = 'done';

    const fetchHitokoto = async () => {
        // 加载时稍微变淡
        container.style.opacity = '0.5';
        
        try {
            const res = await fetch('https://60s.viki.moe/v2/hitokoto');
            const json = await res.json();

            if (json.code === 200 && json.data) {
                textEl.textContent = json.data.hitokoto;
            }
        } catch (e) {
            textEl.textContent = "生活明朗，万物可爱。";
        } finally {
            container.style.opacity = '1';
        }
    };

    container.onclick = fetchHitokoto;
    fetchHitokoto();
}


/**
 * =============================================================================
 * 核心加载器：适配 MkDocs Material Instant Loading (无刷新跳转)
 * =============================================================================
 */
(function() {
    function initializeAllComponents() {
        console.log("初始化所有组件..."); 
        initAnswerBook();
        initWeather();
        initHitokoto();
    }

    // 1. 支持 Material 主题的无刷新跳转
    if (window.document$) {
        window.document$.subscribe(function() {
            initializeAllComponents();
        });
    } 
    // 2. 兜底支持首次加载
    else {
        if (document.readyState === 'loading') {
            document.addEventListener("DOMContentLoaded", initializeAllComponents);
        } else {
            initializeAllComponents();
        }
    }
})();