# ★ so dope club ★

## rules

1. don't be an asshole
2. don't be boring

## join the club

### add your site

1. pick a unique username
2. make a pull request adding your site to `src/_data/sites.json`
3. add the navigation links somehow 

### new hotness

the popular kids use our web component 

add the following snippet above the closing `</body>` tag:

```html
<!-- replace with your username -->
<sodope-nav username="rhg"></sodope-nav>
<script src="https://sodope.club/widget/1.0/sodope-nav.js"></script>
```

### old and busted

add links on your page for `next`, `prev` and `random` to the following endpoints (`username` is the one you chose above):

```html
<!-- replace with your username -->
<a href="sodope.club/api/[username]/prev">prev</a>
<a href="sodope.club/api/[username]/random">random</a>
<a href="sodope.club/api/[username]/next">next</a>
```
