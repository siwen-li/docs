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

    // 1. 获取本地存储的城市，如果没有则默认为 '安顺市'
    const STORAGE_KEY = 'viki_custom_city';
    let currentCity = localStorage.getItem(STORAGE_KEY) || '安顺市';

    // 创建悬浮提示框 (如果不存在)
    let floatTip = document.getElementById('weather-float-tip');
    if (!floatTip) {
        floatTip = document.createElement('div');
        floatTip.id = 'weather-float-tip';
        // 添加一点基础样式确保提示框可用，实际样式可以在CSS中定义
        floatTip.style.position = 'fixed';
        floatTip.style.display = 'none';
        floatTip.style.zIndex = '9999';
        floatTip.style.background = 'rgba(0,0,0,0.8)';
        floatTip.style.color = '#fff';
        floatTip.style.padding = '5px 10px';
        floatTip.style.borderRadius = '4px';
        floatTip.style.fontSize = '12px';
        floatTip.style.pointerEvents = 'none';
        document.body.appendChild(floatTip);
    }

    // 2. 核心加载函数
    const loadWeather = (city) => {
        container.innerHTML = '<span>⌛ 正在加载天气...</span>';
        
        // 对中文城市名进行编码
        const apiUrl = `https://60s.viki.moe/v2/weather?query=${encodeURIComponent(city)}`;

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

                    // 注意：给城市 span 添加了 cursor: pointer 和 onclick 事件
                    // 还在 title 提示用户可以点击
                    container.innerHTML = `
                        <span class="w-item w-city" id="weather-city-btn" title="点击切换城市" style="cursor:pointer;border-bottom: 1px dashed currentColor">📍 ${loc.city}</span><span class="w-split">|</span>
                        <span class="w-item"><b>${w.condition}</b> ${w.temperature}°C</span><span class="w-split">|</span>
                        <span class="w-item">🌬️ ${w.wind_direction} ${w.wind_power}级</span><span class="w-split">|</span>
                        <span class="w-item">🍃 空气${air.quality} ${air.aqi}</span><span class="w-split">|</span>
                        <span class="w-item w-interactive" data-desc="${clothes.description}">👕 ${clothes.name}: ${clothes.level}</span><span class="w-split">|</span>
                        <span class="w-item w-interactive" data-desc="${comfort.description}">😌 ${comfort.name}: ${comfort.level}</span>
                    `;

                    // 重新绑定交互事件
                    bindInteractions();
                    // 绑定切换城市事件
                    bindCityChange(loc.city);

                } else {
                    container.innerHTML = `<span style="color:red; cursor:pointer;" id="weather-retry">❌ 未找到"${city}"，点击重试</span>`;
                    document.getElementById('weather-retry').addEventListener('click', () => changeCityUI());
                }
            })
            .catch((e) => {
                console.error(e);
                container.innerText = '❌ 天气服务不可用';
            });
    };

    // 3. 绑定悬浮提示交互
    function bindInteractions() {
        container.querySelectorAll('.w-interactive').forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                floatTip.textContent = item.getAttribute('data-desc');
                floatTip.style.display = 'block';
                updatePos(e, floatTip);
            });
            item.addEventListener('mousemove', (e) => updatePos(e, floatTip));
            item.addEventListener('mouseleave', () => floatTip.style.display = 'none');
        });
    }

    // 4. 绑定城市切换逻辑 (点击后变成输入框)
    function bindCityChange(currentDisplayCity) {
        const cityBtn = document.getElementById('weather-city-btn');
        if(cityBtn) {
            cityBtn.addEventListener('click', () => changeCityUI(currentDisplayCity));
        }
    }

    // 切换为输入框 UI 的逻辑
    function changeCityUI(oldCityName = '') {
        // 防止重复点击清空容器
        if(document.getElementById('weather-city-input')) return;

        container.innerHTML = `
            <span>📍 </span>
            <input type="text" id="weather-city-input" value="${oldCityName}" 
                   style="width: 80px; padding: 2px; border: 1px solid #ccc; border-radius: 4px; outline: none;" 
                   placeholder="输入城市">
            <button id="weather-city-save" style="cursor:pointer; margin-left:5px;">确定</button>
            <button id="weather-city-cancel" style="cursor:pointer; margin-left:5px;">取消</button>
        `;
        
        const input = document.getElementById('weather-city-input');
        const saveBtn = document.getElementById('weather-city-save');
        const cancelBtn = document.getElementById('weather-city-cancel');

        input.focus();
        input.select(); // 自动全选文本，方便直接输入替换

        // 确认修改逻辑
        const confirmChange = () => {
            const newCity = input.value.trim();
            if (newCity) {
                currentCity = newCity;
                localStorage.setItem(STORAGE_KEY, newCity); // 保存到本地
                loadWeather(newCity); // 重新加载
            } else {
                // 如果输入为空，恢复旧的
                loadWeather(currentCity);
            }
        };

        // 绑定事件：回车确认，ESC取消
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') confirmChange();
            if (e.key === 'Escape') loadWeather(currentCity);
        });
        saveBtn.addEventListener('click', confirmChange);
        cancelBtn.addEventListener('click', () => loadWeather(currentCity));
    }

    function updatePos(e, tip) {
        const x = e.clientX + 15, y = e.clientY + 15;
        tip.style.left = (x + tip.offsetWidth > window.innerWidth ? e.clientX - tip.offsetWidth - 10 : x) + 'px';
        tip.style.top = y + 'px';
    }

    // 启动默认加载
    loadWeather(currentCity);
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