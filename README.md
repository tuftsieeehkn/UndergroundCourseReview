# IEEE-HKN Underground Course Review

A lightweight static website for browsing anonymous course reviews submitted by Tufts students. Students can search for a course, view ratings and comments from past students, and submit new reviews through a Google Form.

## Overview

This project helps students make more informed decisions about classes by collecting and displaying course feedback in one searchable interface. It is maintained by IEEE-HKN and is designed for quick access to course information without requiring a backend or database.

## Features

- Searchable course dropdown
- Course-specific review cards
- Ratings across multiple dimensions, including:
  - overall course rating
  - overall professor rating
  - workload/time commitment
  - difficulty
  - theoretical vs. project-based emphasis
- Anonymous student comments
- Link to a Google Form for submitting new reviews
- Static site architecture with no server-side app required

## Tech Stack

- HTML
- CSS
- JavaScript
- Google Forms/Google Sheets integration for review data

## Project Structure

- `index.html` — main landing page
- `home.html` — alternate page version with the same content
- `style.css` — page styling and layout
- `responses.js` — CSV parsing and interaction logic for loading review data
- `hkn.png` — HKN branding graphic

## How to Run

Because this is a static site, you can run it in any of the following ways:

1. Open `index.html` directly in a browser, or
2. Serve the folder locally:

```bash
cd /Users/aoifeoreilly/Desktop/HKN/UndergroundCourseReview
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
```

## Data Source

The site loads course review data from a published Google Sheets CSV URL defined in `responses.js`. This means the reviews update automatically when the source spreadsheet is refreshed.

## Contributing

To improve or expand the site:

- update the front-end layout in `index.html` and `style.css`
- adjust filtering or review rendering in `responses.js`
- keep the form link and review metadata aligned with the source spreadsheet

## Notes

This project is intentionally simple and static, which makes it easy to deploy on GitHub Pages, a basic web host, or any local web server.
