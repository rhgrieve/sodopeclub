const template = document.createElement('template');
template.innerHTML = `
<style>
    #sodope-nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5em;
        border-radius: 10px 10px 0 0;
        box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
        width: 150px;
        position: fixed;
        bottom: 0em;
        right: 0.5em;
    }

    #sodope-nav > #sodope-link {
        font-size: 0.75em;
        text-decoration: none;
        color: gray;
    }

    #sodope-nav > #nav-links {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    #sodope-nav > #nav-links a {
        font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace; 
        color: rgb(219, 39, 119);
    }

    #sodope-nav a {
        flex: 1;
    }

    #sodope-nav a:last-child {
        text-align: right;
    }

    #sodope-nav a:hover {
        letter-spacing: 0.1em;
        font-style: italic;
    }

</style>

<div id="sodope-nav">
    <a id="sodope-link" href="https://sodope.club">★ sodope.club ★</a>
    <div id="nav-links">
        <a id="prevBtn" href="">prev</a>
        <a id="randomBtn" href="">random</a>
        <a id="nextBtn" href="">next</a>
    </div>
</div>
`;

class SoDopeNav extends HTMLElement {
    constructor() {
        super();
        const username = this.getAttribute('username');
        this.attachShadow({ mode: 'open' });
        window.shadow = this.shadowRoot;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.getElementById('prevBtn').href = `https://sodope.club/${username}/prev`;
        this.shadowRoot.getElementById('randomBtn').href = `https://sodope.club/${username}/random`;
        this.shadowRoot.getElementById('nextBtn').href = `https://sodope.club/${username}/next`;
    }

    // connectedCallback() { }

    // disconnectedCallback() { }
}

if ('customElements' in window) {
    customElements.define('sodope-nav', SoDopeNav);
}