# Project Site

Project Site is a multi-page static website built with HTML, CSS and JavaScript.

The project was created as an early web development project and deployed on Vercel.

## Stack

- HTML
- CSS
- JavaScript
- Vercel

## Features

- Multi-page website structure
- Static frontend implementation
- Custom CSS styling
- Basic JavaScript logic
- Browser-based usage
- Deployment on Vercel
- Lightweight project structure

## Project structure

```text
test site/
  index.html
  css/
  js/
  assets/

README.md
```

## Requirements

- Browser
- Internet connection for deployed version
- Python 3 is optional for local static server

## How to run

Clone the repository:

```bash
git clone https://github.com/GriphinTerner/project_site.git
cd project_site
```

Open the main HTML file in your browser:

```text
test site/index.html
```

You can also run a local static server.

If the files are located in the root folder, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

If the files are located inside the `test site` folder, move into it first:

```bash
cd "test site"
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Demo

The deployed version is available here:

```text
https://ag-site.vercel.app
```

## Files description

### `index.html`

Main website page.

It contains the basic page structure and links to styles, scripts and other pages.

### `css/`

Stylesheets for website layout and visual design.

### `js/`

JavaScript files for client-side logic.

### `assets/`

Images, icons and other static files.

## Troubleshooting

### The website opens without styles

Check that CSS file paths are correct.

### Images are not displayed

Check that image paths inside HTML and CSS files are correct.

### Local server does not start

Use Python 3:

```bash
python3 -m http.server 8000
```

or:

```bash
python -m http.server 8000
```

## Recommended `.gitignore`

```gitignore
.DS_Store
.idea/
.vscode/
*.log
```

## License

This project is intended for educational and portfolio purposes.
