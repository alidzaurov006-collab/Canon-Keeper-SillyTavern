jQuery(function () {

    const buttonHtml = `
        <div id="canon-keeper-button"
             class="list-group-item flex-container flexGap5">
            <div class="fa-solid fa-shield-halved extensionsMenuExtensionButton"></div>
            Canon Keeper
        </div>
    `;

    $('#extensionsMenu').prepend(buttonHtml);

    $('#canon-keeper-button').on('click', function () {
        openCanonKeeper();
    });

    function openCanonKeeper() {

        if ($('#canon-keeper-panel').length) {
            $('#canon-keeper-panel').remove();
            return;
        }

        const panelHtml = `
            <div id="canon-keeper-panel">

                <div class="ck-window">

                    <div class="ck-header">

                        <div class="ck-title">
                            🛡️ CANON KEEPER
                            <small>Хранитель канона</small>
                        </div>

                        <button id="ck-close">
                            ×
                        </button>

                    </div>

                    <div class="ck-status">

                        <div>
                            <span>ВСЕЛЕННАЯ</span>
                            <b>Не определена</b>
                        </div>

                        <div>
                            <span>СОСТОЯНИЕ</span>
                            <b class="ck-good">
                                🟢 Канон стабилен
                            </b>
                        </div>

                    </div>

                    <div class="ck-body">

                        <aside class="ck-sidebar">

                            <button class="active">
                                🏠 Обзор
                            </button>

                            <button>
                                👥 Персонажи
                            </button>

                            <button>
                                🌍 Мир
                            </button>

                            <button>
                                ⏳ Временная линия
                            </button>

                            <button>
                                🧠 Знания
                            </button>

                            <button>
                                ⚠️ Нарушения
                            </button>

                            <button>
                                📚 Канон
                            </button>

                            <button>
                                🔀 Изменения
                            </button>

                        </aside>

                        <main class="ck-content">

                            <section class="ck-hero">

                                <div class="ck-hero-icon">
                                    🛡️
                                </div>

                                <div>
                                    <h1>
                                        Добро пожаловать в Canon Keeper
                                    </h1>

                                    <p>
                                        Система пока не подключена к этой ролевой.
                                        Здесь будет храниться её отдельный канон,
                                        временная линия и состояние мира.
                                    </p>
                                </div>

                            </section>

                            <div class="ck-grid">

                                <div class="ck-card">
                                    <h3>👥 Персонажи</h3>
                                    <strong>0</strong>
                                    <span>известных персонажей</span>
                                </div>

                                <div class="ck-card">
                                    <h3>🌍 Мир</h3>
                                    <strong>0</strong>
                                    <span>фактов мира</span>
                                </div>

                                <div class="ck-card">
                                    <h3>📜 События</h3>
                                    <strong>0</strong>
                                    <span>событий временной линии</span>
                                </div>

                                <div class="ck-card">
                                    <h3>⚠️ Нарушения</h3>
                                    <strong>0</strong>
                                    <span>обнаружено</span>
                                </div>

                            </div>

                        </main>

                    </div>

                </div>

            </div>
        `;

        $('body').append(panelHtml);

        $('#ck-close').on('click', function () {
            $('#canon-keeper-panel').remove();
        });

    }

    console.log('[Canon Keeper] loaded');

});
