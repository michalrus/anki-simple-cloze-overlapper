const ASK_ALL_CLOZE = 'ask-all';
const CONFIG_SPLIT_RE = /[,\s|.]+/;
const CARD_NUM_RE = /(?<=\bcard)[1-9]\d*\b/;
const CLOZE_RE = /\{\{c([1-9]\d*)::(.*?)(?:::(.*?))?\}\}/g;

function revealAllCallback(e) {
    const target = e.currentTarget;
    window.requestAnimationFrame(() => {
        renderClozes(true);
        target.hidden = true;
    });
}

export function renderClozes(revealAllClozes) {
    const config = document.getElementById('cloze-config').content
                           .textContent.split(CONFIG_SPLIT_RE);
    const revealAllButton = document.getElementById('reveal-all-button');
    const clozeSrc = document.getElementById('cloze-source').innerHTML;

    const contextBefore = config[0] === '0' ? 0 : (+config[0] || 1);
    const contextAfter = +config[1] || 0;
    const showNonContext = (config[2] || 'true').toLowerCase() === 'true';
    revealAllClozes ??= (config[3] || 'false').toLowerCase() === 'true';
    const showInactiveHints = (config[4] || 'false').toLowerCase() === 'true';

    const curCard = +(
        document.body.className.match(CARD_NUM_RE)?.[0]
            ?? document.getElementById('qa_box')?.className.match(CARD_NUM_RE)?.[0]
            ?? document.getElementById('anki-cloze').content
                       .querySelector('.cloze[data-ordinal]')?.dataset['ordinal']
            ?? 1
    );
    const isBack = !!revealAllButton;
    const askAll = new RegExp(
        String.raw`\{\{c${curCard}::${ASK_ALL_CLOZE}(?:::.*?)?\}\}`).test(clozeSrc);

    let unrevealedClozesPresent = false;
    document.getElementById('rendered-cloze').innerHTML = clozeSrc.replaceAll(
        CLOZE_RE, (_, cardNum, cloze, hint) => {
            cardNum = +cardNum;
            hint ??= '...';
            // ASK_ALL_CLOZE itself is never shown.
            if (cloze === ASK_ALL_CLOZE) {
                return '';
            }
            if (cardNum === curCard || askAll) {
                const span = document.createElement('span');
                span.className = 'cloze';
                span.dataset['ordinal'] = cardNum;
                if (isBack) {
                    span.innerHTML = cloze;
                } else {
                    span.dataset['cloze'] = cloze;
                    span.innerHTML = `[${hint}]`;
                }
                return span.outerHTML;
            }
            if (curCard - contextBefore <= cardNum && cardNum <= curCard + contextAfter) {
                return cloze;
            }
            if (showNonContext) {
                if (isBack && revealAllClozes) {
                    return cloze;
                }
                unrevealedClozesPresent = true;
                return `[${showInactiveHints ? hint : '...'}]`;
            }
            return '';
        }
    );

    if (isBack && unrevealedClozesPresent) {
        revealAllButton.addEventListener(
            'click', revealAllCallback, { once: true, passive: true });
        revealAllButton.hidden = false;
    }
}
