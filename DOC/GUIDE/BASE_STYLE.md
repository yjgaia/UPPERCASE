# UPPERCASE의 기본 스타일
각 웹 브라우저마다 기본 스타일에 차이가 있습니다. UPPERCASE의 기본 스타일은 이러한 차이를 없애주고, 모든 브라우저에서 기본 스타일을 같은 스타일로 초기화 해 주는 역할을 합니다. 또한 사이트가 아닌 애플리케이션 개발이 주 목적이니 만큼 검은 배경에 흰 글씨를 기본으로 합니다.

기본 스타일의 내용은 아래 CSS 파일에 작성되어 있습니다.

`UPPERCASE-BOOT/R/BASE_STYLE.css`

```css
/* CSS RESET */
body, div, ul, li, h1, h2, h3, h4, h5, h6, form, input, textarea, p, th, td {
	margin: 0;
	padding: 0;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
img {
	border: 0;
}
ul {
	list-style: none;
}
th {
	font-style: normal;
	font-weight: normal;
	text-align: left;
}
h1, h2, h3, h4, h5, h6 {
	font-size: 100%;
	font-weight: normal;
}
input, textarea, select {
	font-family: inherit;
	font-size: inherit;
	font-weight: inherit;
}

/* UPPERCASE BASE STYLE */
* {
	-webkit-overflow-scrolling: touch;
	-moz-overflow-scrolling: touch;
	-o-overflow-scrolling: touch;
	-ms-overflow-scrolling: touch;
	overflow-scrolling: touch;
}
html, body {
	background-color: #000;
	color: #fff;
	word-wrap: break-word;
	font-family: 'Helvetica Neue', Helvetica, 'Segoe UI', Arial, freesans, sans-serif;
	font-size: 14px;
	/* Prevent font scaling in landscape */
	-webkit-text-size-adjust: none;
	-moz-text-size-adjust: none;
	-o-text-size-adjust: none;
	-ms-text-size-adjust: none;
	text-size-adjust: none;
}
input[type='submit'] {
	-webkit-appearance: none;
	-moz-appearance: none;
	-o-appearance: none;
	-ms-appearance: none;
	appearance: none;
	border-radius: 0;
}
table {
	width: 100%;
}
th, td {
	border: 0;
}
textarea {
	width: 15em;
	height: 5em;
}
a {
	color: inherit;
	cursor: pointer;
	text-decoration: none;
}
p {
	line-height: 1.5em;
}
```