'use strict';

/**
 * Xの各文字列を置換する
 */
const init: (() => void) = function() {
  // 「(旧:Twitter)」やその変形を削除
  replaceTextOnPage(/(\(|（)?旧 ?(:|：)?(Twitter|Ｔｗｉｔｔｅｒ|ツイッター)(\)|）)?/gi, '');

  // 「x.com」を「twitter.com」に置換
  replaceTextOnPage(/x\.com/gi, 'twitter.com');

  // 「X」を「Twitter」に置換
  replaceTextOnPage(/(X|Ｘ)/g, 'Twitter');

  // 「エックス」を「ツイッター」に置換
  replaceTextOnPage(/(エックス|ｴｯｸｽ)/g, 'ツイッター');

  // 「ポスト」を「ツイート」に置換
  replaceTextOnPage(/ポスト/g, 'ツイート');

  // 「いいね」を「お気に入り」に置換
  replaceTextOnPage(/いいね/g, 'お気に入り');
};

/**
 * 特定の文字列を置換する
 * @param from 置換前の文字列の正規表現
 * @param to 置換後の文字列
 */
const replaceTextOnPage: ((from: string | RegExp, to: string) => void) = function(from, to) {
  const elements = document.querySelectorAll('body, body *:not(script):not(noscript):not(style)');

  elements.forEach((element) => {
    if (element.childNodes.length) {
      element.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent) {
            node.textContent = node.textContent.replace(from, to);
          }
        }
      });
    }
  });
}

const mutationObserver = new MutationObserver(init)
const config = {
  childList: true,
  subtree: true
}
mutationObserver.observe(document, config)