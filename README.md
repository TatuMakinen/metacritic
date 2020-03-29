# Display scraped metacritic data

Project to:

- test deploying a static web page on github pages
- practice simple web scraping and page building

## Web scraping

Simple [python script](https://github.com/TatuMakinen/metacritic/blob/master/metacritic.py) that goes through all the game pages and scrapes data from HTML to a [JSON file](https://github.com/TatuMakinen/metacritic/blob/master/metacritic.json).

## [Built web page](http://TatuMakinen.github.io/metacritic)

Source code is under [app directory](https://github.com/TatuMakinen/metacritic/tree/master/app).

### Create Node App

Following: https://create-react-app.dev/docs/adding-typescript/

```bash
yarn create react-app my-app --template typescript
```

### GitHub Pages deployment

Following: https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f

```bash
gh-pages -d build
```
