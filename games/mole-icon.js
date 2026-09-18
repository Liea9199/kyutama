// 玖球(モグラ)のSVGを生成する共通関数。ミニゲーム間で見た目を揃えるために使う。
function moleSvgMarkup(idSuffix, furColor) {
  var gid = 'tailGrad' + idSuffix;
  var gidEarL = 'earGradL' + idSuffix;
  var gidEarR = 'earGradR' + idSuffix;
  var fur = furColor ? furColor : 'var(--mole-fur)';
  var furLight = furColor ? furColor : 'var(--mole-fur-light)';
  var furMid = furColor ? furColor : 'var(--mole-fur-mid)';
  return '<svg class="mole-svg" viewBox="-18 -32 156 148" aria-hidden="true">' +
  '<defs>' +
  '<linearGradient id="' + gid + '" x1="92" y1="98" x2="106" y2="6" gradientUnits="userSpaceOnUse">' +
  '<stop offset="0%" stop-color="' + fur + '"/>' +
  '<stop offset="50%" stop-color="' + furMid + '"/>' +
  '<stop offset="100%" stop-color="' + fur + '"/>' +
  '</linearGradient>' +
  '<linearGradient id="' + gidEarL + '" x1="45" y1="35" x2="45" y2="-32" gradientUnits="userSpaceOnUse">' +
  '<stop offset="0%" stop-color="' + fur + '"/>' +
  '<stop offset="100%" stop-color="#FFFFFF"/>' +
  '</linearGradient>' +
  '<linearGradient id="' + gidEarR + '" x1="75" y1="35" x2="75" y2="-32" gradientUnits="userSpaceOnUse">' +
  '<stop offset="0%" stop-color="' + fur + '"/>' +
  '<stop offset="100%" stop-color="#FFFFFF"/>' +
  '</linearGradient>' +
  '</defs>' +
  '<path d="M33,34 L41,-24 Q45,-32 49,-24 L59,36 Z" fill="url(#' + gidEarL + ')"/>' +
  '<path d="M37,30 L43,-14 Q45,-20 47,-14 L55,32 Z" fill="' + furLight + '"/>' +
  '<path d="M87,34 L79,-24 Q75,-32 71,-24 L61,36 Z" fill="url(#' + gidEarR + ')"/>' +
  '<path d="M83,30 L77,-14 Q75,-20 73,-14 L65,32 Z" fill="' + furLight + '"/>' +
  '<path d="M92,98 C124,101 136,58 114,26 L106,6 L99,28 C90,48 88,74 92,98 Z" fill="url(#' + gid + ')"/>' +
  '<ellipse cx="43" cy="105" rx="15" ry="9.5" fill="' + fur + '"/>' +
  '<ellipse cx="77" cy="105" rx="15" ry="9.5" fill="' + fur + '"/>' +
  '<ellipse cx="10" cy="76" rx="9" ry="6.5" fill="' + fur + '"/>' +
  '<ellipse cx="110" cy="76" rx="9" ry="6.5" fill="' + fur + '"/>' +
  '<ellipse cx="60" cy="66" rx="48" ry="44" fill="' + fur + '"/>' +
  '<ellipse cx="34" cy="76" rx="7" ry="4.5" fill="#F3A6C4" opacity=".55"/>' +
  '<ellipse cx="86" cy="76" rx="7" ry="4.5" fill="#F3A6C4" opacity=".55"/>' +
  '<path d="M52,66 Q42,54 34,58" fill="none" stroke="var(--ink)" stroke-width="4.5" stroke-linecap="round"/>' +
  '<path d="M68,66 Q78,54 86,58" fill="none" stroke="var(--ink)" stroke-width="4.5" stroke-linecap="round"/>' +
  '<circle cx="83" cy="72" r="1.8" fill="var(--ink)"/>' +
  '<path d="M50,84 Q53,92 57,84 Q60,80 63,84 Q67,92 70,84" fill="none" stroke="var(--ink)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';
}
